// Indian Railways & Mumbai Scenery: 4 Trains with authentic liveries, 4 River Bridges, 4 Stations, Cinema Theaters, Landmarks & Props
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {
  icfLiveryTexture, vandeBharatLiveryTexture, freightLiveryTexture, mumbaiLocalLiveryTexture,
  cinemaBillboardTexture, landmarkGantryTexture, indianShopTexture,
  obstacleStripeTexture, stationClockTexture, rampTexture,
} from './textures';
import { OB } from '../config';

/** Fully 3D chunky spinning gold coin with embossed star and metallic sheen. */
export function create3DCoinMesh(): THREE.Mesh {
  const radius = 0.42;
  const thickness = 0.16;

  let cyl = new THREE.CylinderGeometry(radius, radius, thickness, 24, 1);
  cyl.rotateX(Math.PI / 2);
  let cylNon = cyl.toNonIndexed();

  let rimFront = new THREE.TorusGeometry(radius * 0.90, 0.045, 8, 24).toNonIndexed();
  rimFront.translate(0, 0, thickness * 0.45);
  let rimBack = new THREE.TorusGeometry(radius * 0.90, 0.045, 8, 24).toNonIndexed();
  rimBack.translate(0, 0, -thickness * 0.45);

  const shape = new THREE.Shape();
  const points = 5;
  for (let i = 0; i < points * 2; i++) {
    const l = i % 2 === 1 ? radius * 0.22 : radius * 0.52;
    const a = (i / points) * Math.PI - Math.PI / 2;
    const x = Math.cos(a) * l;
    const y = Math.sin(a) * l;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  let starGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: false });
  let starNon = starGeo.index ? starGeo.toNonIndexed() : starGeo;
  starNon.translate(0, 0, thickness * 0.42);
  const starGeoBack = starNon.clone();
  starGeoBack.translate(0, 0, -thickness * 0.88);

  const geos = [cylNon, rimFront, rimBack, starNon, starGeoBack];
  for (const g of geos) {
    if (!g.attributes.normal) g.computeVertexNormals();
  }
  const merged = mergeGeometries(geos)!;

  const mat = new THREE.MeshStandardMaterial({
    color: 0xffb703,
    roughness: 0.24,
    metalness: 0.85,
    emissive: 0x5c3800,
  });

  const mesh = new THREE.Mesh(merged, mat);
  mesh.name = 'coin3d';
  return mesh;
}

/** Subway Surfers style chunky cartoon low barrier with rounded posts & candy stripes. */
export function createCartoonLowBarrier(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'low';
  const stripeMat = new THREE.MeshLambertMaterial({ map: obstacleStripeTexture('#ef4444', '#ffffff') });
  const woodMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

  for (const side of [-0.85, 0.85]) {
    const foot = new THREE.Mesh(new RoundedBoxGeometry(0.32, 0.12, 0.65, 2, 0.04), metalMat);
    foot.position.set(side, 0.06, 0);
    foot.castShadow = true;
    group.add(foot);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.88, 14), woodMat);
    post.position.set(side, 0.48, 0);
    post.castShadow = true;
    group.add(post);

    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.14, 12), lampMat);
    cap.position.set(side, 0.95, 0);
    group.add(cap);
  }

  for (const y of [0.42, 0.75]) {
    const beam = new THREE.Mesh(new RoundedBoxGeometry(2.1, 0.26, 0.10, 3, 0.04), stripeMat);
    beam.position.set(0, y, 0.05);
    beam.castShadow = true;
    group.add(beam);
  }
  return group;
}

/** Subway Surfers style chunky cartoon track hurdle with rounded tubular bar. */
export function createCartoonHurdle(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'hurdle';
  const yellowStripeMat = new THREE.MeshLambertMaterial({ map: obstacleStripeTexture('#eab308', '#1e293b') });
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
  const footMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });

  for (const side of [-0.95, 0.95]) {
    const foot = new THREE.Mesh(new RoundedBoxGeometry(0.28, 0.08, 0.48, 2, 0.03), footMat);
    foot.position.set(side, 0.04, 0);
    group.add(foot);

    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.22, 12), metalMat);
    leg.position.set(side, 0.62, 0);
    leg.castShadow = true;
    group.add(leg);
  }

  const bar = new THREE.Mesh(new RoundedBoxGeometry(2.2, 0.24, 0.12, 3, 0.05), yellowStripeMat);
  bar.position.set(0, 1.1, 0);
  bar.castShadow = true;
  group.add(bar);

  return group;
}

/** Subway Surfers style chunky cartoon overhead clearance gantry. */
export function createCartoonOverhead(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'overhead';
  const stripeMat = new THREE.MeshLambertMaterial({ map: obstacleStripeTexture('#eab308', '#090d16') });
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x475569 });
  const redLampMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  for (const side of [-1.08, 1.08]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.10, 2.7, 12), metalMat);
    col.position.set(side, 1.35, 0);
    col.castShadow = true;
    group.add(col);

    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), redLampMat);
    beacon.position.set(side, 2.76, 0);
    group.add(beacon);
  }

  const beam = new THREE.Mesh(new RoundedBoxGeometry(2.35, 0.45, 0.16, 3, 0.06), stripeMat);
  beam.position.set(0, 2.45, 0);
  beam.castShadow = true;
  group.add(beam);

  return group;
}

/** Cartoon Ramp Wedge with hazard stripes and rounded safety curbs. */
export function createCartoonRampMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'ramp';
  const w = OB.ramp.halfW, L = OB.ramp.depth / 2, H = OB.ramp.yt;
  const p = [
    [-w, 0, L], [w, 0, L], [-w, 0, -L], [w, 0, -L], [-w, H, -L], [w, H, -L],
  ];
  const tris: number[][] = [
    [0, 1, 5], [0, 5, 4],
    [0, 4, 2],
    [1, 3, 5],
    [2, 4, 5], [2, 5, 3],
  ];
  const pos: number[] = [], uv: number[] = [];
  for (const t of tris) for (const i of t) {
    pos.push(...p[i]);
    uv.push((p[i][0] + w) / (2 * w), (L - p[i][2]) / (2 * L) * 3 + p[i][1] * 0.3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.computeVertexNormals();
  const rampBody = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: rampTexture(), side: THREE.FrontSide }));
  rampBody.castShadow = true;
  rampBody.receiveShadow = true;
  group.add(rampBody);

  const railMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });
  const railLen = Math.hypot(H, 2 * L);
  const railAngle = Math.atan2(H, 2 * L);
  for (const side of [-w, w]) {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, railLen, 12), railMat);
    rail.position.set(side, H / 2 + 0.15, 0);
    rail.rotation.x = -railAngle - Math.PI / 2;
    rail.castShadow = true;
    group.add(rail);
  }

  return group;
}

/** 3D Indian Police Vehicle (Mahindra Bolero / Tata Sumo Police Interceptor Jeep) */
export function createPoliceVehicle(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'police_car';

  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
  const darkGlassMat = new THREE.MeshLambertMaterial({ color: 0x0f172a });
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
  const tireMat = new THREE.MeshLambertMaterial({ color: 0x09090b });
  const blueBeaconMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
  const redBeaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  // 1. Lower Body & Chasis
  const bodyGeo = new THREE.BoxGeometry(1.7, 0.75, 3.8);
  const body = new THREE.Mesh(bodyGeo, whiteMat);
  body.position.y = 0.65;
  body.castShadow = true;
  group.add(body);

  // Blue police stripe along sides
  const stripeGeo = new THREE.BoxGeometry(1.72, 0.14, 3.2);
  const stripeMat = new THREE.MeshLambertMaterial({ color: 0x1d4ed8 });
  const stripe = new THREE.Mesh(stripeGeo, stripeMat);
  stripe.position.set(0, 0.62, 0);
  group.add(stripe);

  // 2. Cabin Roof & Tinted Glass
  const cabinGeo = new THREE.BoxGeometry(1.5, 0.7, 2.2);
  const cabin = new THREE.Mesh(cabinGeo, whiteMat);
  cabin.position.set(0, 1.35, -0.2);
  cabin.castShadow = true;
  group.add(cabin);

  // Windshield & Windows
  const glassGeo = new THREE.BoxGeometry(1.54, 0.5, 1.9);
  const glass = new THREE.Mesh(glassGeo, darkGlassMat);
  glass.position.set(0, 1.35, -0.2);
  group.add(glass);

  // 3. Roof Flashing Police Lightbar (Blue + Red Strobe Beacon)
  const barBaseGeo = new THREE.BoxGeometry(1.1, 0.06, 0.22);
  const barBase = new THREE.Mesh(barBaseGeo, metalMat);
  barBase.position.set(0, 1.73, -0.2);
  group.add(barBase);

  const redBeaconGeo = new THREE.BoxGeometry(0.45, 0.12, 0.18);
  const redBeacon = new THREE.Mesh(redBeaconGeo, redBeaconMat);
  redBeacon.position.set(-0.25, 1.82, -0.2);
  group.add(redBeacon);

  const blueBeaconGeo = new THREE.BoxGeometry(0.45, 0.12, 0.18);
  const blueBeacon = new THREE.Mesh(blueBeaconGeo, blueBeaconMat);
  blueBeacon.position.set(0.25, 1.82, -0.2);
  group.add(blueBeacon);

  // 4. Wheels & Heavy Rubber Tires
  const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.24, 12);
  wheelGeo.rotateZ(Math.PI / 2);
  const wheelPos: [number, number, number][] = [
    [-0.85, 0.38, 1.15],
    [0.85, 0.38, 1.15],
    [-0.85, 0.38, -1.15],
    [0.85, 0.38, -1.15],
  ];
  for (const pos of wheelPos) {
    const tire = new THREE.Mesh(wheelGeo, tireMat);
    tire.position.set(...pos);
    tire.castShadow = true;
    group.add(tire);
  }

  // 5. Headlights & Front Bullbar (Nudge bar)
  for (const side of [-0.6, 0.6]) {
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.08), headlightMat);
    lamp.position.set(side, 0.65, 1.92);
    group.add(lamp);
  }
  const bullbar = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.45, 0.12), metalMat);
  bullbar.position.set(0, 0.55, 1.95);
  group.add(bullbar);

  return group;
}

/** 3D Platform People (Indian Commuters & Passengers) */
export function createPlatformPeople(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'commuters';

  const headMat = new THREE.MeshLambertMaterial({ color: 0x92400e }); // Indian skin tone
  const whiteKurtaMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });
  const darkPantMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const sareeMat = new THREE.MeshLambertMaterial({ color: 0xdb2777 });   // Bright magenta saree
  const bagMat = new THREE.MeshLambertMaterial({ color: 0x78350f });

  // Person 1: Commuter with office bag
  const p1 = new THREE.Group();
  p1.position.set(-0.6, 0, 0);

  const head1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), headMat);
  head1.position.y = 1.6;
  head1.castShadow = true;
  p1.add(head1);

  const body1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.65, 0.25), whiteKurtaMat);
  body1.position.y = 1.15;
  body1.castShadow = true;
  p1.add(body1);

  const legs1 = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.8, 0.22), darkPantMat);
  legs1.position.y = 0.42;
  legs1.castShadow = true;
  p1.add(legs1);

  const bag1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.32), bagMat);
  bag1.position.set(0.28, 0.9, 0);
  p1.add(bag1);
  group.add(p1);

  // Person 2: Woman in vibrant Indian saree
  const p2 = new THREE.Group();
  p2.position.set(0.6, 0, 0.3);

  const head2 = new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 8), headMat);
  head2.position.y = 1.5;
  head2.castShadow = true;
  p2.add(head2);

  const sareeBody = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.36, 1.3, 10), sareeMat);
  sareeBody.position.y = 0.72;
  sareeBody.castShadow = true;
  p2.add(sareeBody);
  group.add(p2);

  return group;
}

/** Enhanced High-Power Rocket Jetpack attached to Jake's back */
export function createRocketJetMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'rocket_jetpack';

  const metalMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const orangeMat = new THREE.MeshLambertMaterial({ color: 0xea580c });
  const nozzMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const strapMat = new THREE.MeshLambertMaterial({ color: 0x09090b });
  const thrusterGlowMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });

  const packBase = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.52, 0.16), metalMat);
  packBase.position.set(0, 0, 0);
  group.add(packBase);

  const harness = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.48, 0.22), strapMat);
  harness.position.set(0, 0, -0.04);
  group.add(harness);

  for (const side of [-0.15, 0.15]) {
    const canister = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.62, 12), orangeMat);
    canister.position.set(side, 0.04, 0.08);
    canister.castShadow = true;
    group.add(canister);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), metalMat);
    cap.position.set(side, 0.35, 0.08);
    group.add(cap);

    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.11, 0.18, 12), nozzMat);
    nozzle.position.set(side, -0.35, 0.08);
    group.add(nozzle);

    const glowInterior = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, 0.06, 8), thrusterGlowMat);
    glowInterior.position.set(side, -0.42, 0.08);
    group.add(glowInterior);
  }

  return group;
}

/* =========================================================================
   4 DISTINCT 3D BRIDGE MODELS (Track Unsubmerged, River 3.2m Below)
   ========================================================================= */

/** Bridge Model 1 of 4: Iconic Indian Railways Through-Truss Steel Girder Bridge */
export function createRiverBridgeMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'bridge_truss';

  const steelMat = new THREE.MeshLambertMaterial({ color: 0xb91c1c }); // Rust-red oxide steel
  const deckMat = new THREE.MeshLambertMaterial({ color: 0x334155 });  // Ballast deck
  const waterMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 }); // River water deep blue
  const pierMat = new THREE.MeshLambertMaterial({ color: 0x475569 });  // Concrete bridge pier

  const spanLen = 32;
  const girderH = 5.2;

  // 1. Bridge Deck Ballast Bed (Beneath tracks at y = -0.06m)
  const deck = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.14, spanLen), deckMat);
  deck.position.set(0, -0.07, 0);
  deck.receiveShadow = true;
  group.add(deck);

  // 2. Steel Girders on Left and Right (x = -4.4m and x = +4.4m, clear clearance for all 3 tracks)
  for (const side of [-4.4, 4.4]) {
    const bChord = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, spanLen), steelMat);
    bChord.position.set(side, 0.22, 0);
    group.add(bChord);

    const tChord = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.45, spanLen), steelMat);
    tChord.position.set(side, girderH, 0);
    group.add(tChord);

    for (let z = -spanLen / 2; z <= spanLen / 2; z += 4) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.26, girderH, 0.26), steelMat);
      post.position.set(side, girderH / 2, z);
      group.add(post);
    }

    for (let z = -spanLen / 2; z < spanLen / 2; z += 4) {
      const diagGeo = new THREE.BoxGeometry(0.18, 0.18, Math.hypot(4, girderH));
      const diag = new THREE.Mesh(diagGeo, steelMat);
      diag.position.set(side, girderH / 2, z + 2);
      diag.rotation.x = Math.atan2(girderH, 4);
      group.add(diag);
    }
  }

  // Overhead Portal Braces (y = 5.2m, well above Jake running on train roof)
  for (let z = -spanLen / 2; z <= spanLen / 2; z += 8) {
    const cross = new THREE.Mesh(new THREE.BoxGeometry(9.1, 0.25, 0.25), steelMat);
    cross.position.set(0, girderH, z);
    group.add(cross);
  }

  // 3. River Water deep down in the river canyon (y = -3.2m, never touches the tracks)
  const water = new THREE.Mesh(new THREE.PlaneGeometry(64, spanLen), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.2, 0);
  water.receiveShadow = true;
  group.add(water);

  // 4. Heavy Concrete Bridge Piers extending down from deck into the riverbed
  for (const pz of [-spanLen / 3, spanLen / 3]) {
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.8, 3.4, 12), pierMat);
    pier.position.set(0, -1.7, pz);
    group.add(pier);
  }

  return group;
}

/** Bridge Model 2 of 4: Bandra-Worli Sea Link Style Cable-Stayed Pylon Bridge */
export function createCableStayedBridgeMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'bridge_cable';

  const pylonMat = new THREE.MeshLambertMaterial({ color: 0xf1f5f9 }); // Brilliant White Concrete
  const cableMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });   // Steel Stay Cables
  const deckMat = new THREE.MeshLambertMaterial({ color: 0x334155 });    // Dark Road/Rail Deck
  const waterMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });   // Deep Blue Sea
  const pierMat = new THREE.MeshLambertMaterial({ color: 0x475569 });

  const spanLen = 32;
  const pylonH = 11.5;

  // Deck beneath tracks
  const deck = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.16, spanLen), deckMat);
  deck.position.set(0, -0.08, 0);
  deck.receiveShadow = true;
  group.add(deck);

  // Side crash barriers
  for (const side of [-4.5, 4.5]) {
    const barrier = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.1, spanLen), deckMat);
    barrier.position.set(side, 0.55, 0);
    barrier.castShadow = true;
    group.add(barrier);
  }

  // Twin Diamond Pylon Towers & Stay Cables
  for (const side of [-5.2, 5.2]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.55, pylonH, 0.55), pylonMat);
    leg.position.set(side, pylonH / 2, 0);
    leg.castShadow = true;
    group.add(leg);

    for (let z = -spanLen / 2 + 2; z <= spanLen / 2 - 2; z += 4) {
      const dist = Math.hypot(z, pylonH - 0.5);
      const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, dist, 6), cableMat);
      cable.position.set(side, (pylonH + 0.5) / 2, z / 2);
      cable.rotation.x = Math.atan2(z, pylonH);
      group.add(cable);
    }
  }

  // Sea water deep down at y = -3.2m
  const water = new THREE.Mesh(new THREE.PlaneGeometry(64, spanLen), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.2, 0);
  water.receiveShadow = true;
  group.add(water);

  for (const pz of [-spanLen / 3, spanLen / 3]) {
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.0, 3.4, 12), pierMat);
    pier.position.set(0, -1.7, pz);
    group.add(pier);
  }

  return group;
}

/** Bridge Model 3 of 4: Colonial Heritage Stone Masonry Arch Viaduct */
export function createStoneArchViaductMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'bridge_arch';

  const stoneMat = new THREE.MeshLambertMaterial({ color: 0x78716c }); // Weathered Historic Sandstone
  const darkStoneMat = new THREE.MeshLambertMaterial({ color: 0x57534e });
  const waterMat = new THREE.MeshLambertMaterial({ color: 0x0369a1 });
  const spanLen = 32;

  // Deck beneath tracks (y = -0.08m, strictly below tracks at y = 0)
  const deck = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.16, spanLen), darkStoneMat);
  deck.position.set(0, -0.08, 0);
  deck.receiveShadow = true;
  group.add(deck);

  // Side parapet walls at x = ±4.5m (well clear of the track corridor)
  for (const side of [-4.5, 4.5]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.25, spanLen), stoneMat);
    wall.position.set(side, 0.62, 0);
    wall.castShadow = true;
    group.add(wall);

    const coping = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.18, spanLen), darkStoneMat);
    coping.position.set(side, 1.3, 0);
    group.add(coping);

    for (let z = -spanLen / 2; z <= spanLen / 2; z += 4) {
      const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.45, 0.55), darkStoneMat);
      pilaster.position.set(side, 0.65, z);
      group.add(pilaster);
    }
  }

  // Heavy Stone Viaduct Piers extending down beneath deck (y = -0.16m) into riverbed (y = -3.2m)
  for (const pz of [-spanLen / 3, spanLen / 3]) {
    const pier = new THREE.Mesh(new THREE.BoxGeometry(9.0, 3.0, 2.2), darkStoneMat);
    pier.position.set(0, -1.65, pz);
    pier.castShadow = true;
    group.add(pier);

    // Stone corbels under the deck overhang
    for (const side of [-4.5, 4.5]) {
      const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.45, 2.4), stoneMat);
      corbel.position.set(side, -0.3, pz);
      group.add(corbel);
    }
  }

  // Stone spandrel flank walls under the side parapets (below deck, x = ±4.35m)
  for (const side of [-4.35, 4.35]) {
    const spandrel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.4, spanLen), stoneMat);
    spandrel.position.set(side, -0.85, 0);
    group.add(spandrel);
  }

  // River water deep down at y = -3.2m
  const water = new THREE.Mesh(new THREE.PlaneGeometry(64, spanLen), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.2, 0);
  water.receiveShadow = true;
  group.add(water);

  return group;
}

/** Bridge Model 4 of 4: Modern High-Speed Concrete Box-Girder Rail Flyover */
export function createModernFlyoverBridgeMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'bridge_flyover';

  const concreteMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 }); // Prestressed Concrete
  const barrierMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
  const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });   // Yellow safety hazard strip
  const waterMat = new THREE.MeshLambertMaterial({ color: 0x0284c7 });
  const pierMat = new THREE.MeshLambertMaterial({ color: 0x475569 });

  const spanLen = 32;

  // Segmental concrete box-girder directly beneath the tracks
  const girder = new THREE.Mesh(new THREE.BoxGeometry(8.8, 1.1, spanLen), concreteMat);
  girder.position.set(0, -0.65, 0);
  girder.castShadow = true;
  group.add(girder);

  for (const side of [-4.5, 4.5]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.4, spanLen), barrierMat);
    wall.position.set(side, 0.7, 0);
    wall.castShadow = true;
    group.add(wall);

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.12, spanLen), stripeMat);
    stripe.position.set(side, 1.35, 0);
    group.add(stripe);
  }

  for (const pz of [-spanLen / 3, spanLen / 3]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.4, 3.2, 16), pierMat);
    col.position.set(0, -2.2, pz);
    col.castShadow = true;
    group.add(col);
  }

  // River water at y = -3.2m
  const water = new THREE.Mesh(new THREE.PlaneGeometry(64, spanLen), waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, -3.2, 0);
  water.receiveShadow = true;
  group.add(water);

  return group;
}

/* =========================================================================
   STATION ACCESSORIES: BENCHES & CLOCKS
   ========================================================================= */

function createStationBench(): THREE.Group {
  const b = new THREE.Group();
  const wood = new THREE.MeshLambertMaterial({ color: 0xb45309 });
  const iron = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  // Seat slats with rounded bevels
  for (let s = 0; s < 3; s++) {
    const slat = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.04, 0.12, 2, 0.02), wood);
    slat.position.set(0, 0.42, -0.12 + s * 0.14);
    slat.castShadow = true;
    b.add(slat);
  }
  // Backrest slats
  for (let s = 0; s < 2; s++) {
    const slat = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.12, 0.04, 2, 0.02), wood);
    slat.position.set(0, 0.62 + s * 0.16, -0.22);
    slat.castShadow = true;
    b.add(slat);
  }
  // Cast iron legs
  for (const x of [-0.65, 0.65]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.42, 8), iron);
    leg.position.set(x, 0.21, 0);
    leg.castShadow = true;
    b.add(leg);
  }
  return b;
}

function createStationClockMesh(): THREE.Group {
  const clock = new THREE.Group();
  const clockMat = new THREE.MeshBasicMaterial({ map: stationClockTexture() });
  const bracketMat = new THREE.MeshLambertMaterial({ color: 0x1c1917 });

  // Double-sided clock dial
  const dialFront = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), clockMat);
  dialFront.position.z = 0.06;
  clock.add(dialFront);

  const dialBack = new THREE.Mesh(new THREE.CircleGeometry(0.55, 24), clockMat);
  dialBack.rotation.y = Math.PI;
  dialBack.position.z = -0.06;
  clock.add(dialBack);

  // Rim housing
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.12, 24), bracketMat);
  rim.rotation.x = Math.PI / 2;
  clock.add(rim);

  // Ornate iron wall bracket
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.8), bracketMat);
  arm.position.set(0, 0.6, 0);
  clock.add(arm);

  return clock;
}

/* =========================================================================
   4 DISTINCT 3D STATION MODELS (24m Depth each)
   ========================================================================= */

/** Station Model 1 of 4: Subway Surfers Style Grand Arched Victorian Vault Canopy */
export function createStationShedMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'station_shed';

  const ironMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const glassMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
  const platformMat = new THREE.MeshLambertMaterial({ color: 0x831843 });
  const curbMat = new THREE.MeshLambertMaterial({ color: 0xfacc15 });

  const shedW = 10.4, shedH = 7.6, shedD = 24;

  for (const side of [-1, 1]) {
    const plat = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.5, shedD, 2, 0.04), platformMat);
    plat.position.set(side * 5.2, 0.25, 0);
    plat.receiveShadow = true;
    group.add(plat);

    const curb = new THREE.Mesh(new RoundedBoxGeometry(0.14, 0.52, shedD, 2, 0.02), curbMat);
    curb.position.set(side * 3.95, 0.26, 0);
    group.add(curb);

    // Platform benches for waiting passengers
    const bench1 = createStationBench();
    bench1.position.set(side * 5.3, 0.5, -shedD / 4);
    bench1.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    group.add(bench1);

    const bench2 = createStationBench();
    bench2.position.set(side * 5.3, 0.5, shedD / 4);
    bench2.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    group.add(bench2);
  }

  // Hanging station clock at entrance
  const clock = createStationClockMesh();
  clock.position.set(0, 5.8, 0);
  group.add(clock);

  for (let z = -shedD / 2; z <= shedD / 2; z += 6) {
    const rib = new THREE.Mesh(new THREE.TorusGeometry(shedW / 2, 0.16, 8, 24, Math.PI), ironMat);
    rib.rotation.y = Math.PI / 2;
    rib.rotation.x = Math.PI / 2;
    rib.position.set(0, shedH * 0.72, z);
    rib.castShadow = true;
    group.add(rib);

    for (const side of [-shedW / 2 + 0.2, shedW / 2 - 0.2]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, shedH * 0.75, 10), ironMat);
      col.position.set(side, (shedH * 0.75) / 2, z);
      col.castShadow = true;
      group.add(col);
    }
  }

  const roofSkin = new THREE.Mesh(new THREE.CylinderGeometry(shedW / 2, shedW / 2, shedD, 24, 1, true, 0, Math.PI), glassMat);
  roofSkin.rotation.z = Math.PI / 2;
  roofSkin.rotation.y = Math.PI / 2;
  roofSkin.position.set(0, shedH * 0.72, 0);
  group.add(roofSkin);

  return group;
}

/** Station Model 2 of 4: Contemporary Gull-Wing Cantilever Metro Canopy */
export function createModernMetroStationMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'station_metro';

  const steelMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const whitePanelMat = new THREE.MeshLambertMaterial({ color: 0xf1f5f9 });
  const ledCyanMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
  const platformMat = new THREE.MeshLambertMaterial({ color: 0x475569 });

  const shedD = 24;

  for (const side of [-1, 1]) {
    const plat = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.5, shedD, 2, 0.04), platformMat);
    plat.position.set(side * 5.2, 0.25, 0);
    plat.receiveShadow = true;
    group.add(plat);

    // Modern platform bench
    const bench = createStationBench();
    bench.position.set(side * 5.3, 0.5, 0);
    bench.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    group.add(bench);

    for (let z = -shedD / 2 + 3; z <= shedD / 2 - 3; z += 9) {
      const pylon = new THREE.Mesh(new RoundedBoxGeometry(0.35, 6.2, 0.55, 2, 0.04), steelMat);
      pylon.position.set(side * 5.8, 3.1, z);
      pylon.castShadow = true;
      group.add(pylon);

      const wing = new THREE.Mesh(new RoundedBoxGeometry(3.6, 0.16, 8.8, 2, 0.03), whitePanelMat);
      wing.position.set(side * 4.4, 6.2, z);
      wing.rotation.z = side * -0.18;
      wing.castShadow = true;
      group.add(wing);

      const led = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 8.8), ledCyanMat);
      led.position.set(side * 2.7, 6.4, z);
      group.add(led);
    }
  }

  const clock = createStationClockMesh();
  clock.position.set(0, 5.8, 0);
  group.add(clock);

  return group;
}

/** Station Model 3 of 4: Colonial Indo-Saracenic Red-Brick Terminal with Onion Domes */
export function createHeritageDomeStationMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'station_heritage';

  const brickMat = new THREE.MeshLambertMaterial({ color: 0x991b1b }); // Victorian Red Brick
  const stoneMat = new THREE.MeshLambertMaterial({ color: 0xfef08a }); // Cream Porbandar Sandstone
  const domeMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });  // Burnished Copper / Gold Dome
  const platformMat = new THREE.MeshLambertMaterial({ color: 0x78350f });

  const shedD = 24;

  for (const side of [-1, 1]) {
    const plat = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.5, shedD, 2, 0.04), platformMat);
    plat.position.set(side * 5.2, 0.25, 0);
    plat.receiveShadow = true;
    group.add(plat);

    const colonnade = new THREE.Mesh(new RoundedBoxGeometry(0.65, 5.5, shedD, 2, 0.05), brickMat);
    colonnade.position.set(side * 5.8, 2.75, 0);
    colonnade.castShadow = true;
    group.add(colonnade);

    const bench = createStationBench();
    bench.position.set(side * 5.3, 0.5, 0);
    bench.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    group.add(bench);

    for (let z = -shedD / 2 + 4; z <= shedD / 2; z += 8) {
      const arch = new THREE.Mesh(new RoundedBoxGeometry(0.72, 1.2, 3.8, 2, 0.04), stoneMat);
      arch.position.set(side * 5.8, 4.8, z - 2);
      group.add(arch);

      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.7), domeMat);
      dome.position.set(side * 5.8, 6.2, z);
      dome.castShadow = true;
      group.add(dome);

      const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.16, 1.4, 8), stoneMat);
      spire.position.set(side * 5.8, 7.3, z);
      group.add(spire);
    }
  }

  const clock = createStationClockMesh();
  clock.position.set(0, 5.5, 0);
  group.add(clock);

  return group;
}

/** Station Model 4 of 4: Suburban Gabled Corrugated Tin Roof Platform */
export function createSuburbanPlatformStationMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'station_suburban';

  const tinMat = new THREE.MeshLambertMaterial({ color: 0x475569 }); // Corrugated Tin Grey
  const trussMat = new THREE.MeshLambertMaterial({ color: 0xd97706 });// Oxide Yellow A-frame steel
  const platformMat = new THREE.MeshLambertMaterial({ color: 0x64748b });

  const shedD = 24;

  for (const side of [-1, 1]) {
    const plat = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.5, shedD, 2, 0.04), platformMat);
    plat.position.set(side * 5.2, 0.25, 0);
    plat.receiveShadow = true;
    group.add(plat);

    const bench = createStationBench();
    bench.position.set(side * 5.3, 0.5, 0);
    bench.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2;
    group.add(bench);

    for (let z = -shedD / 2 + 3; z <= shedD / 2 - 3; z += 9) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 5.2, 12), trussMat);
      post.position.set(side * 5.2, 2.6, z);
      post.castShadow = true;
      group.add(post);

      const roofLeft = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 8.8), tinMat);
      roofLeft.position.set(side * 4.6, 5.4, z);
      roofLeft.rotation.z = side * 0.25;
      roofLeft.castShadow = true;
      group.add(roofLeft);

      const roofRight = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 8.8), tinMat);
      roofRight.position.set(side * 5.8, 5.4, z);
      roofRight.rotation.z = side * -0.25;
      roofRight.castShadow = true;
      group.add(roofRight);
    }
  }

  const clock = createStationClockMesh();
  clock.position.set(0, 5.2, 0);
  group.add(clock);

  return group;
}

/* =========================================================================
   4 DISTINCT 3D TRAIN MODELS WITH HIGH-DEFINITION LIVERY TEXTURES
   ========================================================================= */

/** 3D Train Model 1 of 4: Classic ICF Indian Passenger Coach (Navy Blue, Cream Stripes, Stencils) */
export function createIcfTrainMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'train_icf';

  const liveryMat = new THREE.MeshLambertMaterial({ map: icfLiveryTexture() });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x18181b });  // Undercarriage Bogies
  const roofMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });  // Corrugated Silver Roof
  const bufferMat = new THREE.MeshLambertMaterial({ color: 0x09090b });

  const w = 2.3, l = 6.74, h = 2.5;

  // Coach Body with authentic livery map and rounded cartoon edges
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, l, 3, 0.12), liveryMat);
  body.position.set(0, 1.85, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Rounded Corrugated Roof
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, l, 16, 1, false, 0, Math.PI), roofMat);
  roof.rotation.z = Math.PI / 2;
  roof.rotation.y = Math.PI / 2;
  roof.position.set(0, 3.1, 0);
  roof.castShadow = true;
  group.add(roof);

  // Bogies and Wheels
  for (const z of [-l / 3.5, l / 3.5]) {
    const bogie = new THREE.Mesh(new RoundedBoxGeometry(w * 0.9, 0.45, 1.6, 2, 0.05), darkMat);
    bogie.position.set(0, 0.35, z);
    bogie.castShadow = true;
    group.add(bogie);
  }

  // Buffers and Couplers on ends
  for (const z of [-l / 2 - 0.08, l / 2 + 0.08]) {
    for (const x of [-0.65, 0.65]) {
      const buf = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.18, 12), bufferMat);
      buf.rotation.x = Math.PI / 2;
      buf.position.set(x, 0.85, z);
      group.add(buf);
    }
  }

  return group;
}

/** 3D Train Model 2 of 4: Vande Bharat Semi-High Speed Aerodynamic Bullet EMU */
export function createVandeBharatTrainMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'train_vandebharat';

  const liveryMat = new THREE.MeshLambertMaterial({ map: vandeBharatLiveryTexture() });
  const roofPodMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x18181b });
  const whiteMat = new THREE.MeshLambertMaterial({ color: 0xf8fafc });

  const w = 2.3, l = 6.74, h = 2.5;

  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, l, 3, 0.14), liveryMat);
  body.position.set(0, 1.85, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Aerodynamic streamlined roof fairings & AC pods
  const roof = new THREE.Mesh(new RoundedBoxGeometry(w * 0.96, 0.35, l, 2, 0.08), whiteMat);
  roof.position.set(0, 3.22, 0);
  roof.castShadow = true;
  group.add(roof);

  for (const z of [-1.5, 1.5]) {
    const pod = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.22, 1.8, 2, 0.06), roofPodMat);
    pod.position.set(0, 3.42, z);
    pod.castShadow = true;
    group.add(pod);
  }

  // Aerodynamic nose slope on forward edge
  const nose = new THREE.Mesh(new RoundedBoxGeometry(w * 0.94, 0.6, 0.6, 2, 0.08), whiteMat);
  nose.position.set(0, 1.45, -l / 2 - 0.2);
  nose.rotation.x = 0.45;
  group.add(nose);

  for (const z of [-l / 3.5, l / 3.5]) {
    const bogie = new THREE.Mesh(new RoundedBoxGeometry(w * 0.85, 0.4, 1.5, 2, 0.05), darkMat);
    bogie.position.set(0, 0.35, z);
    bogie.castShadow = true;
    group.add(bogie);
  }

  return group;
}

/** 3D Train Model 3 of 4: Heavy Industrial BCNHL Corrugated Freight Boxcar */
export function createFreightTrainMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'train_freight';

  const liveryMat = new THREE.MeshLambertMaterial({ map: freightLiveryTexture() });
  const steelMat = new THREE.MeshLambertMaterial({ color: 0x44403c });  // Dark Structural Steel
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  const w = 2.3, l = 6.74, h = 2.8;

  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, l, 3, 0.10), liveryMat);
  body.position.set(0, 1.95, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Structural Roof Catwalk
  const catwalk = new THREE.Mesh(new RoundedBoxGeometry(0.85, 0.08, l - 0.2, 2, 0.02), steelMat);
  catwalk.position.set(0, 3.4, 0);
  group.add(catwalk);

  // End Climbing Ladder
  for (const y of [1.2, 1.7, 2.2, 2.7, 3.2]) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 8), steelMat);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, y, -l / 2 - 0.05);
    group.add(rung);
  }

  for (const z of [-l / 3.5, l / 3.5]) {
    const bogie = new THREE.Mesh(new RoundedBoxGeometry(w * 0.9, 0.45, 1.6, 2, 0.05), darkMat);
    bogie.position.set(0, 0.35, z);
    bogie.castShadow = true;
    group.add(bogie);
  }

  return group;
}

/** 3D Train Model 4 of 4: Mumbai Suburban Local AC EMU with Rooftop Pantograph */
export function createMumbaiLocalTrainMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'train_local';

  const liveryMat = new THREE.MeshLambertMaterial({ map: mumbaiLocalLiveryTexture() });
  const purpleMat = new THREE.MeshLambertMaterial({ color: 0x581c87 });
  const copperMat = new THREE.MeshLambertMaterial({ color: 0xd97706 }); // Pantograph Copper / Orange
  const steelMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x18181b });

  const w = 2.3, l = 6.74, h = 2.5;

  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, l, 3, 0.12), liveryMat);
  body.position.set(0, 1.85, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Curved EMU Roof
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(w / 2, w / 2, l, 16, 1, false, 0, Math.PI), purpleMat);
  roof.rotation.z = Math.PI / 2;
  roof.rotation.y = Math.PI / 2;
  roof.position.set(0, 3.1, 0);
  roof.castShadow = true;
  group.add(roof);

  // Rooftop Diamond Pantograph
  const pantoBase = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.08, 1.6, 2, 0.02), steelMat);
  pantoBase.position.set(0, 3.44, 0);
  group.add(pantoBase);

  const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), copperMat);
  arm1.position.set(0, 3.65, -0.4);
  arm1.rotation.x = 0.5;
  group.add(arm1);

  const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.45, 0.06), copperMat);
  arm2.position.set(0, 3.65, 0.4);
  arm2.rotation.x = -0.5;
  group.add(arm2);

  const shoe = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.05, 0.2, 2, 0.02), copperMat);
  shoe.position.set(0, 3.85, 0);
  group.add(shoe);

  for (const z of [-l / 3.5, l / 3.5]) {
    const bogie = new THREE.Mesh(new RoundedBoxGeometry(w * 0.9, 0.45, 1.6, 2, 0.05), darkMat);
    bogie.position.set(0, 0.35, z);
    bogie.castShadow = true;
    group.add(bogie);
  }

  return group;
}

/* =========================================================================
   BOLLYWOOD CINEMA BILLBOARDS, LANDMARK GANTRIES & CITY SHOPS
   ========================================================================= */

/** Giant Bollywood Movie Billboard (DDLJ, Sholay, RRR, Jawan) on side scaffolds */
export function createCinemaBillboardMesh(posterIndex = 0): THREE.Group {
  const group = new THREE.Group();
  group.name = 'cinema_billboard';

  const posterTex = cinemaBillboardTexture(posterIndex);
  const posterMat = new THREE.MeshBasicMaterial({ map: posterTex });
  const steelMat = new THREE.MeshLambertMaterial({ color: 0x334155 });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  // 1. Steel Support Lattice Posts
  for (const side of [-2.4, 2.4]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.25, 6.8, 0.25), steelMat);
    post.position.set(side, 3.4, 0);
    post.castShadow = true;
    group.add(post);
  }

  // Cross brace
  const cross = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.18, 0.18), steelMat);
  cross.position.set(0, 3.2, 0);
  group.add(cross);

  // 2. Poster Board (6m wide, 3.8m tall, elevated at y = 5.2m)
  const board = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 3.6), posterMat);
  board.position.set(0, 5.2, 0.14);
  group.add(board);

  const backFrame = new THREE.Mesh(new THREE.BoxGeometry(6.0, 3.8, 0.2), steelMat);
  backFrame.position.set(0, 5.2, 0);
  backFrame.castShadow = true;
  group.add(backFrame);

  // 3. Top Spotlights pointing down
  for (const lx of [-2.2, 0, 2.2]) {
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.6), steelMat);
    arm.position.set(lx, 7.2, 0.3);
    group.add(arm);

    const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), lampMat);
    lamp.position.set(lx, 7.0, 0.6);
    group.add(lamp);
  }

  return group;
}

/** Mumbai Landmark Overhead Gantry spanning across tracks (Marine Drive, Bandra, CST, etc.) */
export function createLandmarkGantryMesh(landmarkIndex = 0): THREE.Group {
  const group = new THREE.Group();
  group.name = 'landmark_gantry';

  const signTex = landmarkGantryTexture(landmarkIndex);
  const signMat = new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide });
  const trussMat = new THREE.MeshLambertMaterial({ color: 0x475569 }); // Structural steel

  const gantryW = 10.8;
  const gantryH = 6.4;

  // 1. Two Portal Support Towers flanking the tracks (x = -5.4m and x = +5.4m)
  for (const side of [-gantryW / 2, gantryW / 2]) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.4, gantryH, 0.4), trussMat);
    col.position.set(side, gantryH / 2, 0);
    col.castShadow = true;
    group.add(col);

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.5, 0.9), trussMat);
    base.position.set(side, 0.25, 0);
    group.add(base);
  }

  // 2. Overhead Truss Beam crossing all 3 tracks at y = 6.2m (safe clearance for roof running)
  const beam = new THREE.Mesh(new THREE.BoxGeometry(gantryW + 0.4, 0.45, 0.45), trussMat);
  beam.position.set(0, gantryH, 0);
  beam.castShadow = true;
  group.add(beam);

  // 3. Suspended Landmark Signboard (8.2m wide, 2.2m tall)
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(8.2, 2.2), signMat);
  sign.position.set(0, gantryH - 1.25, 0.05);
  group.add(sign);

  const signBack = new THREE.Mesh(new THREE.BoxGeometry(8.4, 2.3, 0.12), trussMat);
  signBack.position.set(0, gantryH - 1.25, 0);
  signBack.castShadow = true;
  group.add(signBack);

  return group;
}

/** Indian City Ground-floor Shopfront with awnings and rolling shutter */
export function createIndianShopMesh(shopIndex = 0): THREE.Group {
  const group = new THREE.Group();
  group.name = 'indian_shop';

  const shopTex = indianShopTexture(shopIndex);
  const shopMat = new THREE.MeshLambertMaterial({ map: shopTex });
  const concreteMat = new THREE.MeshLambertMaterial({ color: 0x94a3b8 });
  const tankMat = new THREE.MeshLambertMaterial({ color: 0x09090b }); // Black Sintex water tank

  // 2-Story shop building (5.5m wide, 7.5m tall, 6m deep)
  const bldg = new THREE.Mesh(new THREE.BoxGeometry(5.5, 7.5, 6.0), concreteMat);
  bldg.position.set(0, 3.75, 0);
  bldg.castShadow = true;
  bldg.receiveShadow = true;
  group.add(bldg);

  // Front facade with shop graphic
  const facade = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 5.2), shopMat);
  facade.position.set(0, 2.7, 3.02);
  group.add(facade);

  // Rooftop Sintex black water tank
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 1.4, 12), tankMat);
  tank.position.set(1.2, 8.2, 1.0);
  tank.castShadow = true;
  group.add(tank);

  return group;
}
