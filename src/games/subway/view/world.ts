// The three.js scene. The runner stays at z = 0 and the world is drawn relative to it, so numbers stay small.
// Light count, materials and meshes are all made up front; play only moves instances.
import * as THREE from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Instanced } from './pools';
import { Fx } from './fx';
import { PlayerView } from './player';
import { ChaserView } from './chaser';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {
  createPoliceVehicle, createPlatformPeople, createRocketJetMesh,
  createRiverBridgeMesh, createCableStayedBridgeMesh, createStoneArchViaductMesh, createModernFlyoverBridgeMesh,
  createStationShedMesh, createModernMetroStationMesh, createHeritageDomeStationMesh, createSuburbanPlatformStationMesh,
  createIcfTrainMesh, createVandeBharatTrainMesh, createFreightTrainMesh, createMumbaiLocalTrainMesh,
  createCinemaBillboardMesh, createLandmarkGantryMesh, createIndianShopMesh,
  create3DCoinMesh, createCartoonLowBarrier, createCartoonHurdle, createCartoonOverhead, createCartoonRampMesh,
} from './indianProps';
import { getSelectedCharacter } from '../characters';
import { trackTexture, pavingTexture, groundTexture, glowTexture, powerTexture, rampTexture, stationSignTexture, HORIZON, createWeatherPresets, type WeatherKind, type WeatherConfig } from './textures';
import { LANE_W, laneX, CAR_LEN, CAR_GAP, VIEW_AHEAD, OB } from '../config';
import type { Sim } from '../sim/sim';
import type { SimEvent, PowerKind, Ob } from '../sim/types';
import { Rng } from '../sim/rng';

/** Subway Surfers signature curved world vertex shader: gently bends position.y downward with distance squared. */
export function setupCurvedWorldShader(curvature = 0.00085) {
  if ((THREE.ShaderChunk as any).__curvedWorldApplied) return;
  (THREE.ShaderChunk as any).__curvedWorldApplied = true;

  const projectReplacement = `
vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif

// World position before projection
vec4 curvedWorldPos = modelMatrix * mvPosition;
// Distance ahead along track (player is at z=0, ahead is negative Z)
float dist = max(0.0, -curvedWorldPos.z - 4.0);
// Quadratic horizon curve
curvedWorldPos.y -= ${curvature.toFixed(6)} * (dist * dist);
mvPosition = viewMatrix * curvedWorldPos;

gl_Position = projectionMatrix * mvPosition;
`;

  THREE.ShaderChunk.project_vertex = projectReplacement;

  const origWorldPos = THREE.ShaderChunk.worldpos_vertex;
  THREE.ShaderChunk.worldpos_vertex = origWorldPos.replace(
    'worldPosition = modelMatrix * worldPosition;',
    `worldPosition = modelMatrix * worldPosition;
float shadowDist = max(0.0, -worldPosition.z - 4.0);
worldPosition.y -= ${curvature.toFixed(6)} * (shadowDist * shadowDist);`
  );
}

const m4 = new THREE.Matrix4();
const q = new THREE.Quaternion();
const e = new THREE.Euler();
const v = new THREE.Vector3();
const one = new THREE.Vector3(1, 1, 1);
const sc = new THREE.Vector3();

// Authentic Indian Railways Liveries:
// 0: ICF Classic Express Blue (Navy blue)
// 1: Rajdhani Express Crimson Red
// 2: Garib Rath / Duronto Emerald Green
// 3: Vande Bharat Express (Crisp White & Navy)
// 4: Tejas / Shatabdi Saffron Orange
const TRAIN_TINTS = [
  new THREE.Color('#004b99'),
  new THREE.Color('#a81c1c'),
  new THREE.Color('#047857'),
  new THREE.Color('#f1f5f9'),
  new THREE.Color('#ea580c'),
];
const POWER_COLORS: Record<PowerKind, THREE.Color> = {
  magnet: new THREE.Color('#ff5a64'),
  shoes: new THREE.Color('#3ee08a'),
  double: new THREE.Color('#ffc23d'),
  star: new THREE.Color('#f59e0b'),
  jet: new THREE.Color('#ea580c'),
};
const LIGHT = new THREE.Color(1.0, 0.92, 0.65);
const LIGHT_RED = new THREE.Color(1.0, 0.25, 0.2);
const LIGHT_YELLOW = new THREE.Color(1.0, 0.88, 0.4);
const FLAT = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
const GROUND_LEN = 420;
const SIDEWALK_IN = 3.9; // inner edge of the sidewalk from the track centre
const SIDEWALK_OUT = 7.4;

interface House { type: number; side: number; d: number; len: number; depth: number }

export type SceneryZoneKind = 'city' | 'bridge' | 'station';

export interface ScenerySegment {
  id: number;
  kind: SceneryZoneKind;
  modelIndex: number; // 0, 1, 2, 3 for 4 distinct 3D models
  d0: number;
  d1: number;
}

export class World {
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  player: PlayerView;
  chaser: ChaserView;
  fx: Fx;
  policeCars: Instanced;
  platformPeople: Instanced;
  bridgePools: Instanced[] = [];
  stationPools: Instanced[] = [];
  trainPools: Instanced[] = [];
  cinemaPools: Instanced[] = [];
  landmarkPools: Instanced[] = [];
  shopPools: Instanced[] = [];
  rocketJet: THREE.Group;
  weatherPresets: Record<WeatherKind, WeatherConfig>;
  private pools: Record<string, Instanced> = {};
  private coins: Instanced;
  private halos: Instanced;
  private powerCards: Record<PowerKind, Instanced>;
  private poles: Instanced;
  private stationSigns: Instanced;
  private scrollTex: THREE.Texture[] = [];
  private houses: Instanced[] = [];
  private houseSize: { len: number; depth: number }[] = [];
  private placed: House[] = [];
  private nextHouse = [0, 0];
  segments: ScenerySegment[] = [];
  private segmentFrontier = 0;
  private nextSegmentId = 0;
  private sceneryRng = new Rng(1337);
  private rng = new Rng(99);
  private camY = 0;
  private shake = 0;
  private flash = 0;
  private aspect = 1;
  private lightningTimer = 4.0;
  private lightningFlash = 0;
  time = 0;

  constructor(core: GLTF, quality: { shadowSize: number }) {
    // Enable Subway Surfers signature curved world vertex shader globally
    setupCurvedWorldShader(0.00085);

    this.weatherPresets = createWeatherPresets();
    const s = this.scene;
    s.background = this.weatherPresets.day.sky;
    s.fog = new THREE.Fog(this.weatherPresets.day.fogColor, 85, 340);
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.3, 340);

    // Vibrant Subway Surfers Atmosphere: Sky blue hemisphere light + warm ground bounce
    this.hemi = new THREE.HemisphereLight(0x68b8ff, 0xe0b885, 1.45);
    s.add(this.hemi);

    // Warm sunlight with soft diffused shadows
    this.sun = new THREE.DirectionalLight(0xfff7e6, 2.1);
    this.sun.position.set(9, 22, 4);
    this.sun.target.position.set(0, 0, -14);
    this.sun.castShadow = true;
    const sh = this.sun.shadow;
    sh.mapSize.set(quality.shadowSize, quality.shadowSize);
    Object.assign(sh.camera, { left: -16, right: 16, top: 30, bottom: -30, near: 2, far: 70 });
    sh.bias = -0.0005;
    sh.normalBias = 0.02;
    sh.radius = 2.0;
    s.add(this.sun, this.sun.target);

    // Soft daytime ambient fill light so shadows are softly diffused, never pitch black
    const ambientFill = new THREE.AmbientLight(0xfffaed, 0.45);
    s.add(ambientFill);

    this.buildGround();
    // poles along the track, every 16 m
    const post = new THREE.BoxGeometry(0.18, 6.9, 0.18).translate(0, 3.45, 0);
    const arm = new THREE.BoxGeometry(1.9, 0.12, 0.12).translate(-0.85, 6.6, 0);
    const lamp = new THREE.BoxGeometry(0.5, 0.14, 0.3).translate(-1.7, 6.48, 0);
    const poleGeo = mergeGeometries([post, arm, lamp])!;
    const poleMesh = new THREE.Mesh(poleGeo, new THREE.MeshLambertMaterial({ color: 0x59606b }));
    this.poles = new Instanced(poleMesh, 40, s, { cast: true, name: 'pole' });

    // Authentic Indian Railways Station Signboard ("मुंबई सेंट्रल / MUMBAI CENTRAL")
    const signTex = stationSignTexture('मुंबई सेंट्रल', 'MUMBAI CENTRAL');
    const signMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.75), new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide }));
    this.stationSigns = new Instanced(signMesh, 24, s, { cast: true, name: 'sign' });

    // Obstacles from core.glb
    const node = (n: string) => {
      const o = core.scene.getObjectByName(n);
      if (!o) throw new Error('missing model ' + n);
      return o;
    };

    // 4 Distinct 3D Indian Train Models:
    // 0: Classic ICF Blue Express
    // 1: Streamlined Aerodynamic Vande Bharat EMU
    // 2: Heavy Industrial BCNHL Freight Boxcar
    // 3: Mumbai Suburban Local AC EMU with diamond pantograph
    this.trainPools = [
      new Instanced(createIcfTrainMesh(), 35, s, { cast: true, receive: true, name: 'train_icf' }),
      new Instanced(createVandeBharatTrainMesh(), 35, s, { cast: true, receive: true, name: 'train_vande_bharat' }),
      new Instanced(createFreightTrainMesh(), 35, s, { cast: true, receive: true, name: 'train_freight' }),
      new Instanced(createMumbaiLocalTrainMesh(), 35, s, { cast: true, receive: true, name: 'train_mumbai_local' }),
    ];

    // 4 Giant Bollywood Cinema Billboards (DDLJ, Sholay, RRR, Jawan)
    this.cinemaPools = [
      new Instanced(createCinemaBillboardMesh(0), 6, s, { cast: true, receive: true, name: 'cinema_ddlj' }),
      new Instanced(createCinemaBillboardMesh(1), 6, s, { cast: true, receive: true, name: 'cinema_sholay' }),
      new Instanced(createCinemaBillboardMesh(2), 6, s, { cast: true, receive: true, name: 'cinema_rrr' }),
      new Instanced(createCinemaBillboardMesh(3), 6, s, { cast: true, receive: true, name: 'cinema_jawan' }),
    ];

    // 6 Mumbai Landmark Gantries (Marine Drive, Bandra, CSMT, Juhu, Gateway, Dadar)
    this.landmarkPools = [
      new Instanced(createLandmarkGantryMesh(0), 4, s, { cast: true, receive: true, name: 'gantry_marine_drive' }),
      new Instanced(createLandmarkGantryMesh(1), 4, s, { cast: true, receive: true, name: 'gantry_bandra' }),
      new Instanced(createLandmarkGantryMesh(2), 4, s, { cast: true, receive: true, name: 'gantry_csmt' }),
      new Instanced(createLandmarkGantryMesh(3), 4, s, { cast: true, receive: true, name: 'gantry_juhu' }),
      new Instanced(createLandmarkGantryMesh(4), 4, s, { cast: true, receive: true, name: 'gantry_gateway' }),
      new Instanced(createLandmarkGantryMesh(5), 4, s, { cast: true, receive: true, name: 'gantry_dadar' }),
    ];

    // 4 Indian Street Shops (Bombay Chai, Apna Pharmacy, Pav Bhaji, Kalyan Jewellers)
    this.shopPools = [
      new Instanced(createIndianShopMesh(0), 8, s, { cast: true, receive: true, name: 'shop_chai' }),
      new Instanced(createIndianShopMesh(1), 8, s, { cast: true, receive: true, name: 'shop_pharmacy' }),
      new Instanced(createIndianShopMesh(2), 8, s, { cast: true, receive: true, name: 'shop_pavbhaji' }),
      new Instanced(createIndianShopMesh(3), 8, s, { cast: true, receive: true, name: 'shop_jewellers' }),
    ];

    // Thick, chunky, rounded Subway Surfers cartoon obstacles
    this.pools.low = new Instanced(createCartoonLowBarrier(), 24, s, { cast: true, receive: true });
    this.pools.hurdle = new Instanced(createCartoonHurdle(), 24, s, { cast: true, receive: true });
    this.pools.overhead = new Instanced(createCartoonOverhead(), 24, s, { cast: true, receive: true });
    this.pools.ramp = new Instanced(createCartoonRampMesh(), 16, s, { cast: true, receive: true });

    // Fully 3D chunky spinning gold coin with embossed star
    const coin = create3DCoinMesh();
    this.coins = new Instanced(coin, 320, s, { cast: false });
    const glowMat = new THREE.MeshBasicMaterial({ map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), glowMat);
    glow.name = 'glow';
    this.halos = new Instanced(glow, 340, s, { colors: true });
    for (const p of this.halos.parts) p.mesh.renderOrder = 4;
    const card = (k: PowerKind) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: powerTexture(k), transparent: true, alphaTest: 0.1 }));
      m.name = 'power-' + k;
      return new Instanced(m, 4, s);
    };
    this.powerCards = { magnet: card('magnet'), shoes: card('shoes'), double: card('double'), star: card('star'), jet: card('jet') };

    this.policeCars = new Instanced(createPoliceVehicle(), 16, s, { cast: true, receive: true, name: 'police_car' });
    this.platformPeople = new Instanced(createPlatformPeople(), 32, s, { cast: true, receive: true, name: 'commuters' });

    // 4 Distinct 3D Bridge Models:
    // 0: Warren through-truss steel girder bridge
    // 1: Bandra-Worli Sea Link cable-stayed bridge
    // 2: Heritage Western Ghats stone arch viaduct
    // 3: Modern elevated prestressed concrete segmental flyover
    this.bridgePools = [
      new Instanced(createRiverBridgeMesh(), 8, s, { cast: true, receive: true, name: 'bridge_truss' }),
      new Instanced(createCableStayedBridgeMesh(), 8, s, { cast: true, receive: true, name: 'bridge_cable' }),
      new Instanced(createStoneArchViaductMesh(), 8, s, { cast: true, receive: true, name: 'bridge_arch' }),
      new Instanced(createModernFlyoverBridgeMesh(), 8, s, { cast: true, receive: true, name: 'bridge_flyover' }),
    ];

    // 4 Distinct 3D Station Models:
    // 0: Victorian vaulted iron & ribbed glass shed
    // 1: Modern gull-wing cantilever metro canopy
    // 2: Heritage red-brick Indo-Saracenic central terminal with onion domes
    // 3: Suburban platform with gabled corrugated tin roof and A-frame trusses
    this.stationPools = [
      new Instanced(createStationShedMesh(), 12, s, { cast: true, receive: true, name: 'station_shed' }),
      new Instanced(createModernMetroStationMesh(), 12, s, { cast: true, receive: true, name: 'station_metro' }),
      new Instanced(createHeritageDomeStationMesh(), 12, s, { cast: true, receive: true, name: 'station_heritage' }),
      new Instanced(createSuburbanPlatformStationMesh(), 12, s, { cast: true, receive: true, name: 'station_suburban' }),
    ];

    const rawPlayer = core.scene.getObjectByName('player')!;
    const inspectorModel = clone(rawPlayer);
    this.player = new PlayerView(core, s);
    this.player.applyCharacter(getSelectedCharacter());
    this.chaser = new ChaserView(inspectorModel, core.animations, s);

    this.rocketJet = createRocketJetMesh();
    this.rocketJet.position.set(0, 0.95, 0.22);
    this.rocketJet.rotation.y = Math.PI;
    this.rocketJet.visible = false;
    this.player.root.add(this.rocketJet);
    this.fx = new Fx(s);
    this.resetScenery();
  }

  private buildGround() {
    const s = this.scene;
    const z = -GROUND_LEN / 2 + 30;
    const track = trackTexture();
    track.repeat.set(3, GROUND_LEN / LANE_W);
    // Subdivide 120 segments along length so ground curves smoothly with vertex shader
    const trackMesh = new THREE.Mesh(new THREE.PlaneGeometry(LANE_W * 3, GROUND_LEN, 4, 120), new THREE.MeshLambertMaterial({ map: track }));
    trackMesh.rotation.x = -Math.PI / 2;
    trackMesh.position.set(0, 0, z);
    trackMesh.receiveShadow = true;
    s.add(trackMesh);
    // gravel strip between the tracks and the sidewalk
    const edge = trackTexture();
    edge.repeat.set(0.3, GROUND_LEN / LANE_W);
    edge.offset.x = 0.35;
    for (const side of [-1, 1]) {
      const w = SIDEWALK_IN - LANE_W * 1.5;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, GROUND_LEN, 2, 120), new THREE.MeshLambertMaterial({ map: edge }));
      m.rotation.x = -Math.PI / 2;
      m.position.set(side * (LANE_W * 1.5 + w / 2), 0, z);
      s.add(m);
    }
    // sidewalks
    const pave = pavingTexture();
    pave.repeat.set(1.5, GROUND_LEN / 3);
    for (const side of [-1, 1]) {
      const w = SIDEWALK_OUT - SIDEWALK_IN;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, GROUND_LEN, 2, 120), new THREE.MeshLambertMaterial({ map: pave }));
      m.rotation.x = -Math.PI / 2;
      m.position.set(side * (SIDEWALK_IN + w / 2), 0.25, z);
      m.receiveShadow = true;
      s.add(m);
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.25, GROUND_LEN, 1, 1, 120), new THREE.MeshLambertMaterial({ color: 0x949ba6 }));
      curb.position.set(side * (SIDEWALK_IN - 0.06), 0.125, z);
      s.add(curb);
    }
    // ground beyond the sidewalks
    const grass = groundTexture();
    grass.repeat.set(20, GROUND_LEN / 6);
    const g = new THREE.Mesh(new THREE.PlaneGeometry(120, GROUND_LEN, 12, 120), new THREE.MeshLambertMaterial({ map: grass }));
    g.rotation.x = -Math.PI / 2;
    g.position.set(0, -0.02, z);
    g.receiveShadow = true;
    s.add(g);
    // overhead wires: uniform along the track, subdivided so they follow the world curvature
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x2b2f36 });
    for (let l = 0; l < 3; l++) {
      const w = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, GROUND_LEN, 1, 1, 120), wireMat);
      w.position.set(laneX(l), 6.45, z);
      s.add(w);
    }
    this.scrollTex = [track, edge, pave, grass];
  }

  /** Houses arrive later (scenery.glb loads in the background). */
  addScenery(gltf: GLTF) {
    for (let i = 1; i <= 5; i++) {
      const o = gltf.scene.getObjectByName('house' + i);
      if (!o) continue;
      const box = new THREE.Box3().setFromObject(o);
      const size = box.getSize(new THREE.Vector3());
      this.houses.push(new Instanced(o, 14, this.scene, { cast: true, receive: true, name: 'house' + i }));
      this.houseSize.push({ len: size.x, depth: size.z });
    }
  }

  warmScenery(renderer: THREE.WebGLRenderer) {
    for (const h of this.houses) for (const p of h.parts) {
      const m = p.mesh.material as THREE.MeshLambertMaterial;
      if (m.map) renderer.initTexture(m.map);
    }
  }

  get hasScenery() {
    return this.houses.length > 0;
  }

  resize(w: number, h: number) {
    this.aspect = w / h;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  event(ev: SimEvent) {
    this.chaser.event(ev);
    const fx = this.fx;
    switch (ev.type) {
      case 'coin':
        fx.burst(ev.x, ev.y, 0, 5, 0xffd75a, { speed: 2.4, up: 1.5, size: 0.4, life: 0.35, grav: 3 });
        break;
      case 'power':
        fx.burst(ev.x, ev.y, 0, 26, POWER_COLORS[ev.kind], { speed: 5, up: 2, size: 0.55, life: 0.6, grav: 2 });
        this.flash = 0.25;
        break;
      case 'land':
        if (ev.fall > 0.6) fx.burst(this.player.root.position.x, this.player.root.position.y + 0.1, 0.2, 6, 0x9a8f80, { speed: 2, up: 0.6, size: 0.5, life: 0.4, grav: 1 });
        break;
      case 'stumble':
        this.shake = 0.35;
        fx.burst(ev.x, ev.y + 1, -0.3, 10, 0xffffff, { speed: 3.5, up: 1, size: 0.35, life: 0.35 });
        break;
      case 'bump':
        this.shake = 0.15;
        break;
      case 'crash':
        this.shake = 0.8;
        fx.burst(ev.x, ev.y + 1, -0.6, 28, 0xffb347, { speed: 6, up: 2, size: 0.6, life: 0.6, grav: 5 });
        break;
    }
  }

  ensureSegments(ahead: number, pd: number) {
    if (this.segments.length === 0) {
      const initialLen = this.sceneryRng.int(160, 260);
      this.segments.push({
        id: this.nextSegmentId++,
        kind: 'city',
        modelIndex: 0,
        d0: -60,
        d1: initialLen,
      });
      this.segmentFrontier = initialLen;
    }

    while (this.segmentFrontier < ahead) {
      const lastSeg = this.segments[this.segments.length - 1];
      const lastKind = lastSeg.kind;
      const roll = this.sceneryRng.next();

      let nextKind: SceneryZoneKind;
      if (lastKind === 'bridge') {
        nextKind = roll < 0.65 ? 'city' : 'station';
      } else if (lastKind === 'station') {
        nextKind = roll < 0.60 ? 'city' : 'bridge';
      } else {
        if (roll < 0.35) {
          nextKind = 'city';
        } else if (roll < 0.70) {
          nextKind = 'bridge';
        } else {
          nextKind = 'station';
        }
      }

      const chosenModel = this.sceneryRng.int(0, 3);

      if (nextKind === 'city') {
        const cityLens = [160, 220, 280, 340];
        const addLen = this.sceneryRng.pick(cityLens);
        if (lastKind === 'city') {
          lastSeg.d1 += addLen;
          this.segmentFrontier += addLen;
        } else {
          const d0 = this.segmentFrontier;
          const d1 = d0 + addLen;
          this.segments.push({
            id: this.nextSegmentId++,
            kind: 'city',
            modelIndex: 0,
            d0,
            d1,
          });
          this.segmentFrontier = d1;
        }
      } else if (nextKind === 'bridge') {
        const bridgeLens = [64, 96, 128, 160];
        const len = this.sceneryRng.pick(bridgeLens);
        const d0 = this.segmentFrontier;
        const d1 = d0 + len;
        this.segments.push({
          id: this.nextSegmentId++,
          kind: 'bridge',
          modelIndex: chosenModel,
          d0,
          d1,
        });
        this.segmentFrontier = d1;
      } else {
        const stationLens = [48, 72, 96, 120];
        const len = this.sceneryRng.pick(stationLens);
        const d0 = this.segmentFrontier;
        const d1 = d0 + len;
        this.segments.push({
          id: this.nextSegmentId++,
          kind: 'station',
          modelIndex: chosenModel,
          d0,
          d1,
        });
        this.segmentFrontier = d1;
      }
    }

    // Prune segments that have scrolled far behind the player
    this.segments = this.segments.filter((s) => s.d1 > pd - 120);
  }

  sync(sim: Sim, dt: number, menu: boolean) {
    this.time += dt;
    const pd = sim.d;
    this.ensureSegments(pd + VIEW_AHEAD + 120, pd);
    const zOf = (d: number) => -(d - pd);

    // scrolling ground
    for (const t of this.scrollTex) t.offset.y = (pd / (GROUND_LEN / t.repeat.y)) % 1;

    // 4 Distinct 3D Indian Trains + core obstacles
    for (const pool of this.trainPools) pool.begin();
    for (const k in this.pools) this.pools[k].begin();

    const movers: Ob[] = [];
    for (const o of sim.obs) {
      if (o.d0 > pd + VIEW_AHEAD || o.d1 < pd - 12) continue;
      const x = laneX(o.lane);
      if (o.kind === 'train' || o.kind === 'mtrain') {
        const trainIndex = (o.variant !== undefined ? o.variant : o.id) % 4;
        const pool = this.trainPools[trainIndex];
        for (let c = 0; c < o.cars; c++) {
          const dc = o.d0 + c * (CAR_LEN + CAR_GAP) + CAR_LEN / 2;
          m4.makeTranslation(x, 0, zOf(dc));
          pool.add(m4);
        }
        if (o.kind === 'mtrain') movers.push(o);
      } else {
        m4.makeTranslation(x, 0, zOf((o.d0 + o.d1) / 2));
        this.pools[o.kind].add(m4);
      }
    }
    for (const pool of this.trainPools) pool.end();
    for (const k in this.pools) this.pools[k].end();

    // coins + soft warm white glow
    this.coins.begin();
    this.halos.begin();
    q.setFromEuler(e.set(0, this.time * 3.2, 0));
    const camQ = this.camera.quaternion;
    const gold = new THREE.Color(1.0, 0.95, 0.75).multiplyScalar(0.65);
    for (const c of sim.coinList) {
      if (c.d > pd + VIEW_AHEAD - 20) continue;
      const z = zOf(c.d);
      m4.compose(v.set(c.x, c.y, z), q, one);
      this.coins.add(m4);
      m4.compose(v.set(c.x, c.y, z + 0.05), camQ, sc.set(1.4, 1.4, 1.4));
      this.halos.add(m4, gold);
    }

    // power-up cards
    for (const k in this.powerCards) this.powerCards[k as PowerKind].begin();
    for (const p of sim.powers) {
      if (p.d > pd + VIEW_AHEAD - 20) continue;
      const z = zOf(p.d);
      const bob = Math.sin(this.time * 3 + p.d) * 0.12;
      m4.compose(v.set(laneX(p.lane), p.y + bob, z), camQ, sc.set(1.1, 1.1, 1.1));
      this.powerCards[p.kind].add(m4);
      m4.compose(v.set(laneX(p.lane), p.y + bob, z + 0.05), camQ, sc.set(2.6, 2.6, 2.6));
      this.halos.add(m4, POWER_COLORS[p.kind]);
    }
    for (const k in this.powerCards) this.powerCards[k as PowerKind].end();

    // moving trains: headlights that blink, and a band of light thrown on the track ahead of them
    for (const o of movers) {
      const x = laneX(o.lane);
      const z = zOf(o.d0) + 0.08;
      const blink = 0.75 + 0.25 * Math.sin(this.time * 14 + o.id);
      const far = Math.max(0, o.d0 - pd);
      const size = 1.6 + far * 0.035;
      for (const side of [-1, 1]) {
        const on = side < 0 ? blink : 1.75 - blink;
        m4.compose(v.set(x + side * 0.72, 0.95, z), camQ, sc.set(size, size, size));
        this.halos.add(m4, LIGHT.clone().multiplyScalar(on));
      }
      m4.compose(v.set(x, 2.9, z), camQ, sc.set(1.1, 1.1, 1.1));
      this.halos.add(m4, LIGHT_RED.clone().multiplyScalar(blink));
      const len = 18;
      m4.compose(v.set(x, 0.06, z + len / 2), FLAT, sc.set(2.2, len, 1));
      this.halos.add(m4, LIGHT.clone().multiplyScalar(0.35 + 0.15 * blink));
    }
    this.coins.end();
    this.halos.end();

    // Automatic Climatic & Weather Transition: Day (0-450m) -> Sunset (450-900m) -> Monsoon Rain (900-1350m) -> Night (1350-1800m) -> Snow (1800-2250m)
    const cycleLen = 450;
    const cycleIdx = Math.floor(pd / cycleLen) % 5;
    const kinds: WeatherKind[] = ['day', 'sunset', 'rain', 'night', 'snow'];
    const curW = this.weatherPresets[kinds[cycleIdx]];
    const nextW = this.weatherPresets[kinds[(cycleIdx + 1) % 5]];
    const blendT = (pd % cycleLen) > 370 ? Math.min(1, ((pd % cycleLen) - 370) / 80) : 0;

    // Switch sky background texture
    const activeSky = blendT > 0.5 ? nextW.sky : curW.sky;
    if (this.scene.background !== activeSky) this.scene.background = activeSky;

    // Interpolate atmospheric fog
    const fog = this.scene.fog as THREE.Fog;
    fog.color.lerpColors(curW.fogColor, nextW.fogColor, blendT);
    fog.near = curW.fogNear + (nextW.fogNear - curW.fogNear) * blendT;
    fog.far = curW.fogFar + (nextW.fogFar - curW.fogFar) * blendT;

    // Interpolate sunlight & hemisphere light
    this.sun.color.lerpColors(curW.sunColor, nextW.sunColor, blendT);
    this.sun.intensity = curW.sunIntensity + (nextW.sunIntensity - curW.sunIntensity) * blendT;
    this.hemi.color.lerpColors(curW.hemiSky, nextW.hemiSky, blendT);
    this.hemi.groundColor.lerpColors(curW.hemiGround, nextW.hemiGround, blendT);

    const curStreetlight = curW.streetlights + (nextW.streetlights - curW.streetlights) * blendT;
    const curRain = curW.rain + (nextW.rain - curW.rain) * blendT;
    const curSnow = (curW.snow || 0) + ((nextW.snow || 0) - (curW.snow || 0)) * blendT;

    // Dynamic Thunder & Lightning Flash simulation during Rain Weather
    if (curRain > 0.25) {
      this.lightningTimer -= dt;
      if (this.lightningTimer <= 0) {
        this.lightningFlash = 1.0;
        this.lightningTimer = 2.5 + Math.random() * 4.5;
      }
    } else {
      this.lightningTimer = 3.0;
    }
    if (this.lightningFlash > 0) {
      this.lightningFlash = Math.max(0, this.lightningFlash - dt * 6.5);
      const stroke = Math.sin(this.lightningFlash * 25) > 0.1 ? this.lightningFlash : this.lightningFlash * 0.25;
      this.sun.intensity += stroke * 6.0;
      fog.color.lerp(new THREE.Color('#dbeafe'), stroke * 0.85);
    }

    // poles & automatic streetlights on/off (skip inside covered railway stations)
    this.poles.begin();
    const first = Math.floor((pd - 10) / 16) * 16;
    for (let d = first; d < pd + VIEW_AHEAD; d += 16) {
      const inStation = this.segments.some((s) => s.kind === 'station' && d >= s.d0 && d < s.d1);
      if (!inStation) {
        m4.makeTranslation(SIDEWALK_IN + 0.3, 0.25, zOf(d));
        this.poles.add(m4);
        m4.makeRotationY(Math.PI).setPosition(-SIDEWALK_IN - 0.3, 0.25, zOf(d + 8));
        this.poles.add(m4);

        if (curStreetlight > 0.05) {
          const poolCol = LIGHT_YELLOW.clone().multiplyScalar(0.42 * curStreetlight);
          const z1 = zOf(d);
          m4.compose(v.set(SIDEWALK_IN - 0.6, 0.08, z1), FLAT, sc.set(2.8, 2.8, 1));
          this.halos.add(m4, poolCol);
          const z2 = zOf(d + 8);
          m4.compose(v.set(-SIDEWALK_IN + 0.6, 0.08, z2), FLAT, sc.set(2.8, 2.8, 1));
          this.halos.add(m4, poolCol);
        }
      }
    }
    this.poles.end();

    // Indian Railway station signboards ("मुंबई सेंट्रल / MUMBAI CENTRAL") inside station zones
    this.stationSigns.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'station') continue;
      for (let d = seg.d0 + 6; d < seg.d1; d += 24) {
        if (d >= pd - 20 && d <= pd + VIEW_AHEAD + 20) {
          m4.makeRotationY(-Math.PI / 2).setPosition(SIDEWALK_IN + 0.55, 1.35, zOf(d));
          this.stationSigns.add(m4);
        }
      }
    }
    this.stationSigns.end();

    // 1. Indian Covered Railway Stations (4 Distinct 3D Architectures)
    for (const pool of this.stationPools) pool.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'station') continue;
      const pool = this.stationPools[(seg.modelIndex || 0) % 4];
      for (let sd = seg.d0 + 12; sd < seg.d1; sd += 24) {
        if (sd >= pd - 24 && sd <= pd + VIEW_AHEAD + 20) {
          m4.makeTranslation(0, 0, zOf(sd));
          pool.add(m4);
        }
      }
    }
    for (const pool of this.stationPools) pool.end();

    // 2. Scenic Indian River Railway Bridges (4 Distinct 3D Architectures)
    for (const pool of this.bridgePools) pool.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'bridge') continue;
      const pool = this.bridgePools[(seg.modelIndex || 0) % 4];
      for (let bd = seg.d0 + 16; bd < seg.d1; bd += 32) {
        if (bd >= pd - 32 && bd <= pd + VIEW_AHEAD + 30) {
          m4.makeTranslation(0, 0, zOf(bd));
          pool.add(m4);
        }
      }
    }
    for (const pool of this.bridgePools) pool.end();

    // Indian Station Commuters waiting on platform inside railway stations
    this.platformPeople.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'station') continue;
      for (let d = seg.d0 + 12; d < seg.d1; d += 24) {
        if (d >= pd - 24 && d <= pd + VIEW_AHEAD + 20) {
          const side = (Math.floor(d / 24) % 2 === 0) ? 1 : -1;
          m4.makeRotationY(side > 0 ? -Math.PI / 2 : Math.PI / 2).setPosition(side * 5.2, 0.25, zOf(d));
          this.platformPeople.add(m4);
        }
      }
    }
    this.platformPeople.end();

    // Indian Police Vehicles parked on city roadsides
    this.policeCars.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'city') continue;
      const firstCar = Math.ceil((seg.d0 + 24) / 72) * 72;
      for (let d = firstCar; d <= seg.d1 - 24; d += 72) {
        if (d >= pd - 40 && d <= pd + VIEW_AHEAD + 20) {
          const side = (Math.floor(d / 72) % 2 === 0) ? 1 : -1;
          m4.makeRotationY(side > 0 ? 0 : Math.PI).setPosition(side * (SIDEWALK_OUT + 1.8), 0.25, zOf(d));
          this.policeCars.add(m4);
        }
      }
    }
    this.policeCars.end();

    // Mumbai Landmark Overhead Gantries (spans across tracks)
    for (const pool of this.landmarkPools) pool.begin();
    for (const seg of this.segments) {
      const gd = seg.d0 + 4;
      if (gd >= pd - 20 && gd <= pd + VIEW_AHEAD + 30) {
        const landmarkIdx = Math.abs(seg.id) % this.landmarkPools.length;
        m4.makeTranslation(0, 0, zOf(gd));
        this.landmarkPools[landmarkIdx].add(m4);
      }
    }
    for (const pool of this.landmarkPools) pool.end();

    // Giant Bollywood Cinema Billboards (DDLJ, Sholay, RRR, Jawan) in city zones
    for (const pool of this.cinemaPools) pool.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'city') continue;
      const firstB = Math.ceil((seg.d0 + 16) / 64) * 64;
      for (let d = firstB; d <= seg.d1 - 16; d += 64) {
        if (d >= pd - 30 && d <= pd + VIEW_AHEAD + 30) {
          const side = (Math.floor(d / 64) % 2 === 0) ? 1 : -1;
          const posterIdx = Math.floor(d / 64) % this.cinemaPools.length;
          m4.makeRotationY(side > 0 ? -Math.PI / 2 : Math.PI / 2).setPosition(side * (SIDEWALK_OUT + 2.2), 0, zOf(d));
          this.cinemaPools[posterIdx].add(m4);
        }
      }
    }
    for (const pool of this.cinemaPools) pool.end();

    // Indian Street Shops (Bombay Chai, Apna Pharmacy, Pav Bhaji, Kalyan Jewellers)
    for (const pool of this.shopPools) pool.begin();
    for (const seg of this.segments) {
      if (seg.kind !== 'city') continue;
      const firstS = Math.ceil((seg.d0 + 32) / 48) * 48;
      for (let d = firstS; d <= seg.d1 - 20; d += 48) {
        if (d >= pd - 30 && d <= pd + VIEW_AHEAD + 30) {
          const side = (Math.floor(d / 48) % 2 === 0) ? -1 : 1;
          const shopIdx = Math.floor(d / 48) % this.shopPools.length;
          m4.makeRotationY(side > 0 ? -Math.PI / 2 : Math.PI / 2).setPosition(side * (SIDEWALK_OUT + 3.2), 0, zOf(d));
          this.shopPools[shopIdx].add(m4);
        }
      }
    }
    for (const pool of this.shopPools) pool.end();

    this.syncHouses(pd, zOf);

    // runner, chaser (Inspector & Dog), camera, effects
    if (menu) this.player.menu(dt);
    this.chaser.update(sim, dt, menu);
    this.updateCamera(sim, dt, menu);
    const speedFactor = menu || !sim.alive ? 0 : Math.max(0, Math.min(1, (sim.speed - 14) / 12));
    this.fx.update(dt, this.camera, menu || !sim.alive ? 0 : sim.speed, speedFactor, curRain, curSnow);

    // power trails & enhanced rocket jet thruster exhaust
    if (!menu && sim.alive) {
      const px = sim.x, py = sim.y;
      if (sim.power.shoes > 0 && Math.random() < dt * 30) this.fx.burst(px + (Math.random() - 0.5) * 0.4, py + 0.1, 0.3, 1, 0x3ee08a, { speed: 0.6, up: 0.4, size: 0.3, life: 0.4, grav: 0 });
      if (sim.power.magnet > 0 && Math.random() < dt * 20) this.fx.burst(px, py + 1.2, 0, 1, 0xff5a64, { speed: 1.5, up: 0, size: 0.25, life: 0.3, grav: 0, world: false });
      if (sim.power.double > 0 && Math.random() < dt * 12) this.fx.burst(px, py + 2.0, 0, 1, 0xffc23d, { speed: 0.8, up: 0.8, size: 0.25, life: 0.5, grav: 0, world: false });
      if (sim.power.jet > 0) {
        this.rocketJet.visible = true;
        const ending = sim.power.jet < 1.8;
        const sputter = ending && Math.sin(this.time * 35) < 0;
        if (!sputter) {
          for (const side of [-0.15, 0.15]) {
            this.fx.burst(px + side, py + 0.6, 0.35, 3, 0xff4500, { speed: 4.5, up: -5.5, size: 0.35, life: 0.28, grav: 0 });
            this.fx.burst(px + side, py + 0.5, 0.35, 2, 0xffcc00, { speed: 3.0, up: -4.5, size: 0.25, life: 0.22, grav: 0 });
            if (Math.random() < 0.35) {
              this.fx.burst(px + side, py + 0.3, 0.45, 1, 0xe2e8f0, { speed: 1.5, up: -2.0, size: 0.4, life: 0.35, grav: 0 });
            }
          }
        } else {
          this.fx.burst(px, py + 0.4, 0.4, 1, 0x64748b, { speed: 1.2, up: -1.0, size: 0.45, life: 0.4, grav: 0 });
        }
      } else {
        this.rocketJet.visible = false;
      }
    } else {
      this.rocketJet.visible = false;
    }
  }

  private syncHouses(pd: number, zOf: (d: number) => number) {
    if (!this.houses.length) return;
    this.placed = this.placed.filter((h) => h.d + h.len / 2 > pd - 60);
    for (const side of [0, 1]) {
      if (this.nextHouse[side] < pd - 60) this.nextHouse[side] = pd - 60;
      let guard = 0;
      while (this.nextHouse[side] < pd + VIEW_AHEAD && guard++ < 40) {
        const curD = this.nextHouse[side];
        const seg = this.segments.find((s) => curD >= s.d0 && curD < s.d1);
        if (!seg) break;

        if (seg.kind !== 'city') {
          this.nextHouse[side] = seg.d1 + 2;
          continue;
        }

        const used = new Array(this.houses.length).fill(0);
        for (const h of this.placed) used[h.type]++;
        const choices = this.houses.map((_, i) => i).filter((i) => used[i] < this.houses[i].capacity);
        if (!choices.length) break;
        const type = this.rng.pick(choices);
        const { len, depth } = this.houseSize[type];

        if (curD + len > seg.d1) {
          this.nextHouse[side] = seg.d1 + 2;
          continue;
        }

        this.placed.push({ type, side, d: curD + len / 2, len, depth });
        this.nextHouse[side] += len + this.rng.range(1, 4);
      }
    }
    for (const h of this.houses) h.begin();
    for (const h of this.placed) {
      const sgn = h.side === 0 ? 1 : -1;
      m4.makeRotationY(sgn > 0 ? -Math.PI / 2 : Math.PI / 2).setPosition(sgn * (SIDEWALK_OUT + 0.6 + h.depth / 2), 0, zOf(h.d));
      this.houses[h.type].add(m4);
    }
    for (const h of this.houses) h.end();
  }

  resetScenery(seed?: number) {
    this.placed = [];
    this.nextHouse = [-60, -60];
    this.segments = [];
    this.segmentFrontier = 0;
    this.nextSegmentId = 0;
    const actualSeed = seed !== undefined ? seed : ((Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0);
    this.sceneryRng = new Rng(actualSeed);
    this.rocketJet.visible = false;
    this.player.reset();
    this.chaser.reset();
  }

  private updateCamera(sim: Sim, dt: number, menu: boolean) {
    const cam = this.camera;
    const portrait = Math.max(0, Math.min(1, (1.2 - this.aspect) / 0.72));
    if (menu) {
      const t = this.time * 0.15;
      const wide = this.aspect > 1.25;
      cam.position.set(Math.sin(t) * 0.8 + (wide ? -1.2 : 0), 1.7 + portrait * 0.2, -4.2 - portrait * 0.6);
      cam.fov = 52 + portrait * 4;
      cam.updateProjectionMatrix();
      cam.lookAt(wide ? -2.2 : 0, wide ? 0.95 : 0.45 - portrait * 0.15, 0);
      this.camY = 0;
      return;
    }
    const target = sim.grounded ? sim.y : Math.max(sim.groundY, Math.min(sim.y, this.camY + 1.0));
    this.camY += (target - this.camY) * Math.min(1, dt * 5);
    // In mobile portrait, keep the camera significantly closer to the runner
    const dist = 5.2 - portrait * 1.1;
    const height = 2.65 - portrait * 0.2;
    const sx = sim.x;
    let ox = 0, oy = 0;
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt);
      const a = this.shake * 0.5;
      ox = (Math.random() - 0.5) * a;
      oy = (Math.random() - 0.5) * a;
    }
    cam.position.set(sx + ox, this.camY + height + oy, dist);
    const speedFactor = Math.max(0, Math.min(1, (sim.speed - 12) / 15));
    // Narrower FOV on mobile keeps runner large, bold, and immersive
    const fov = 56 - portrait * 3 + speedFactor * 7;
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov += (fov - cam.fov) * Math.min(1, dt * 3);
      cam.updateProjectionMatrix();
    }
    cam.lookAt(sim.x, this.camY + (sim.power.jet > 0 ? 0.75 : 1.15), sim.power.jet > 0 ? -22 : -17);
  }

  takeFlash() {
    const f = this.flash;
    this.flash = 0;
    return f;
  }

  /** Put one of every instanced thing in view, so every shader compiles now, not mid-run. */
  warm(renderer: THREE.WebGLRenderer) {
    const all = [
      ...this.trainPools,
      this.pools.low,
      this.pools.hurdle,
      this.pools.overhead,
      this.pools.ramp,
      this.coins,
      this.halos,
      this.poles,
      this.stationSigns,
      this.policeCars,
      this.platformPeople,
      ...this.bridgePools,
      ...this.stationPools,
      ...this.landmarkPools,
      ...this.cinemaPools,
      ...this.shopPools,
      ...Object.values(this.powerCards),
      ...this.houses,
    ];
    for (const p of all) {
      p.begin();
      m4.makeTranslation(0, 1, -6);
      p.add(m4, new THREE.Color(1, 1, 1));
      p.end();
    }
    this.fx.warm(this.camera);
    for (const a of Object.values(this.player.actions)) a.play();
    renderer.compile(this.scene, this.camera);
    renderer.render(this.scene, this.camera);
    for (const a of Object.values(this.player.actions)) a.stop();
    this.player.current = null;
    for (const p of all) { p.begin(); p.end(); }
    this.fx.clear();
  }
}
