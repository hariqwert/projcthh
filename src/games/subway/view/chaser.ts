// The Indian Police Inspector & faithful Police Dog chasing Jake!
import * as THREE from 'three';
import type { Sim } from '../sim/sim';
import type { SimEvent } from '../sim/types';

export class ChaserView {
  root = new THREE.Group();
  inspector: THREE.Group;
  dog: THREE.Group;
  private mixer: THREE.AnimationMixer | null = null;
  private actions: Record<string, THREE.AnimationAction> = {};
  private currentClip: string | null = null;

  // Dog leg pivots for gallop animation
  private dogLegs: THREE.Group[] = [];
  private dogTail!: THREE.Group;
  private dogHead!: THREE.Group;
  private dogTime = 0;

  // Chase dynamics (runner is at z = 0, chaser is at +z behind the runner)
  x = 0;
  y = 0;
  z = 2.1;
  targetZ = 2.1;
  private stumbleTime = 0;

  constructor(inspectorModel: THREE.Object3D, animations: THREE.AnimationClip[], scene: THREE.Scene) {
    this.inspector = new THREE.Group();
    this.dog = new THREE.Group();
    this.root.add(this.inspector);
    this.root.add(this.dog);
    scene.add(this.root);

    this.buildInspector(inspectorModel, animations);
    this.buildDog();
  }

  private buildInspector(cloned: THREE.Object3D, animations: THREE.AnimationClip[]) {
    // Face towards -Z (towards the runner)
    cloned.rotation.y = Math.PI;

    // Khaki uniform materials
    const khakiMat = new THREE.MeshLambertMaterial({ color: 0xbaa076 }); // Indian Police khaki
    const beltMat = new THREE.MeshLambertMaterial({ color: 0x361f12 });  // Dark brown Sam Browne leather
    const bootMat = new THREE.MeshLambertMaterial({ color: 0x18181b });  // Black service boots
    const badgeMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b }); // Gold Ashoka/star emblem
    const capBandMat = new THREE.MeshLambertMaterial({ color: 0xdc2626 }); // Crimson red cap band
    const mustacheMat = new THREE.MeshLambertMaterial({ color: 0x09090b }); // Black mustache

    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = false;
        mesh.frustumCulled = false;
        // Apply khaki uniform to clothes
        if (mesh.name.includes('Body')) {
          mesh.material = khakiMat;
        }
      }
    });

    // Attach Indian Police Peaked Service Cap & Mustache to Head Bone
    const headBone = cloned.getObjectByName('mixamorig:Head');
    if (headBone) {
      const capGroup = new THREE.Group();
      capGroup.position.set(0, 0.18, 0.04);
      capGroup.rotation.x = 0.12;

      // Khaki crown
      const crownGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.08, 12);
      const crown = new THREE.Mesh(crownGeo, khakiMat);
      capGroup.add(crown);

      // Crimson band around cap
      const bandGeo = new THREE.CylinderGeometry(0.124, 0.124, 0.032, 12);
      const band = new THREE.Mesh(bandGeo, capBandMat);
      band.position.y = -0.025;
      capGroup.add(band);

      // Gold Ashoka badge
      const badgeGeo = new THREE.BoxGeometry(0.04, 0.045, 0.02);
      const badge = new THREE.Mesh(badgeGeo, badgeMat);
      badge.position.set(0, -0.02, 0.128);
      capGroup.add(badge);

      // Black shiny visor
      const visorGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.015, 12, 1, false, 0, Math.PI);
      const visor = new THREE.Mesh(visorGeo, bootMat);
      visor.position.set(0, -0.04, 0.08);
      visor.rotation.x = 0.25;
      capGroup.add(visor);

      headBone.add(capGroup);

      // Iconic Indian Police Handlebar Mustache
      const stacheGroup = new THREE.Group();
      stacheGroup.position.set(0, 0.06, 0.12);
      for (const side of [-1, 1]) {
        const wing = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.07, 6), mustacheMat);
        wing.position.set(side * 0.045, 0, 0);
        wing.rotation.z = side * 1.35;
        wing.rotation.y = side * 0.2;
        stacheGroup.add(wing);
      }
      headBone.add(stacheGroup);
    }

    // Attach Police Lathi (Baton) to Right Hand
    const rHand = cloned.getObjectByName('mixamorig:RightHand');
    if (rHand) {
      const batonGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.8, 8);
      const batonMat = new THREE.MeshLambertMaterial({ color: 0x4a2c16 });
      const baton = new THREE.Mesh(batonGeo, batonMat);
      baton.position.set(0, -0.25, 0);
      baton.rotation.x = Math.PI / 4;
      rHand.add(baton);
    }

    this.inspector.add(cloned);

    // Setup animations
    this.mixer = new THREE.AnimationMixer(cloned);
    for (const clip of animations) {
      this.actions[clip.name] = this.mixer.clipAction(clip);
    }
    this.playClip('run');
  }

  private buildDog() {
    const dogRoot = new THREE.Group();
    const coatBrown = new THREE.MeshLambertMaterial({ color: 0x784a28 });
    const saddleBlack = new THREE.MeshLambertMaterial({ color: 0x1c1917 });
    const redCollar = new THREE.MeshLambertMaterial({ color: 0xdc2626 });
    const goldTag = new THREE.MeshLambertMaterial({ color: 0xf59e0b });

    // Torso
    const bodyGeo = new THREE.BoxGeometry(0.24, 0.28, 0.62);
    const body = new THREE.Mesh(bodyGeo, coatBrown);
    body.position.y = 0.38;
    body.castShadow = true;
    dogRoot.add(body);

    // Saddle marking on back
    const saddleGeo = new THREE.BoxGeometry(0.25, 0.1, 0.36);
    const saddle = new THREE.Mesh(saddleGeo, saddleBlack);
    saddle.position.set(0, 0.48, -0.02);
    dogRoot.add(saddle);

    // Head group
    this.dogHead = new THREE.Group();
    this.dogHead.position.set(0, 0.52, -0.32);

    const headGeo = new THREE.BoxGeometry(0.18, 0.17, 0.2);
    const headMesh = new THREE.Mesh(headGeo, coatBrown);
    this.dogHead.add(headMesh);

    // Snout
    const snoutGeo = new THREE.BoxGeometry(0.11, 0.1, 0.16);
    const snout = new THREE.Mesh(snoutGeo, saddleBlack);
    snout.position.set(0, -0.03, -0.16);
    this.dogHead.add(snout);

    // Pointed alert ears
    for (const side of [-1, 1]) {
      const earGeo = new THREE.ConeGeometry(0.045, 0.12, 4);
      const ear = new THREE.Mesh(earGeo, saddleBlack);
      ear.position.set(side * 0.07, 0.12, 0.02);
      ear.rotation.z = side * -0.2;
      this.dogHead.add(ear);
    }

    // Collar & tag
    const collarGeo = new THREE.BoxGeometry(0.2, 0.04, 0.14);
    const collar = new THREE.Mesh(collarGeo, redCollar);
    collar.position.set(0, -0.06, 0.04);
    this.dogHead.add(collar);

    const tagGeo = new THREE.SphereGeometry(0.025, 6, 6);
    const tag = new THREE.Mesh(tagGeo, goldTag);
    tag.position.set(0, -0.09, -0.04);
    this.dogHead.add(tag);

    dogRoot.add(this.dogHead);

    // 4 Running legs
    const legGeo = new THREE.BoxGeometry(0.07, 0.28, 0.08);
    const legMat = coatBrown;
    const legPositions: [number, number, number][] = [
      [-0.1, 0.28, -0.2], // Front Left
      [0.1, 0.28, -0.2],  // Front Right
      [-0.1, 0.28, 0.2],  // Back Left
      [0.1, 0.28, 0.2],   // Back Right
    ];

    for (const [lx, ly, lz] of legPositions) {
      const legPivot = new THREE.Group();
      legPivot.position.set(lx, ly, lz);
      const legMesh = new THREE.Mesh(legGeo, legMat);
      legMesh.position.y = -0.14;
      legMesh.castShadow = true;
      legPivot.add(legMesh);
      dogRoot.add(legPivot);
      this.dogLegs.push(legPivot);
    }

    // Wagging tail
    this.dogTail = new THREE.Group();
    this.dogTail.position.set(0, 0.44, 0.3);
    const tailGeo = new THREE.CylinderGeometry(0.025, 0.015, 0.25, 6);
    const tailMesh = new THREE.Mesh(tailGeo, coatBrown);
    tailMesh.position.set(0, 0.08, 0.09);
    tailMesh.rotation.x = 0.8;
    this.dogTail.add(tailMesh);
    dogRoot.add(this.dogTail);

    // Scale
    dogRoot.scale.set(0.85, 0.85, 0.85);
    this.dog.add(dogRoot);
  }

  private playClip(name: string) {
    if (this.currentClip === name) return;
    const action = this.actions[name];
    if (!action) return;
    action.reset().fadeIn(0.12).play();
    if (this.currentClip && this.actions[this.currentClip]) {
      this.actions[this.currentClip].fadeOut(0.12);
    }
    this.currentClip = name;
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.z = 2.1;
    this.targetZ = 2.1;
    this.stumbleTime = 0;
    this.root.visible = true;
    this.playClip('run');
  }

  event(ev: SimEvent) {
    if (ev.type === 'stumble') {
      // Jake stumbled! Inspector surges forward aggressively right to Jake's back!
      this.targetZ = 0.95;
      this.stumbleTime = 3.5;
    } else if (ev.type === 'crash') {
      // Caught / crashed: Inspector rushes in to tackle!
      this.targetZ = 0.25;
      this.stumbleTime = 99;
    }
  }

  update(sim: Sim, dt: number, menu: boolean) {
    if (menu) {
      // On title screen: stand near Jake in full view!
      this.root.visible = true;
      this.inspector.position.set(0.95, 0, -0.6);
      this.inspector.rotation.y = -0.35;
      this.dog.position.set(1.5, 0, -0.5);
      this.playClip('idle');
      if (this.mixer) this.mixer.update(dt);
      return;
    }
    this.root.visible = true;
    this.inspector.rotation.y = 0;

    // Countdown stumble surge timer
    if (this.stumbleTime > 0) {
      this.stumbleTime -= dt;
      if (this.stumbleTime <= 0 && sim.alive) {
        this.targetZ = 2.1; // Smoothly drop back to normal following distance
      }
    }

    // Spring chase position in Z (metres behind runner)
    const zRate = this.targetZ < this.z ? 7.5 : 2.0;
    this.z += (this.targetZ - this.z) * Math.min(1, dt * zRate);

    // Track runner X position directly
    this.x += (sim.x - this.x) * Math.min(1, dt * 10.0);
    this.y += (sim.groundY - this.y) * Math.min(1, dt * 14.0);

    // Position Inspector right behind Jake
    this.inspector.position.set(this.x, this.y, this.z);

    // Position Dog right on his flank
    this.dog.position.set(this.x + 0.65, this.y, this.z + 0.1);

    // Sync Inspector animation
    if (this.mixer) {
      if (sim.alive) {
        this.playClip('run');
        const runSpeedScale = 0.85 + sim.speed / 20;
        if (this.actions['run']) this.actions['run'].timeScale = runSpeedScale;
      } else {
        this.playClip('runlookback');
      }
      this.mixer.update(dt);
    }

    // Animate Dog Gallop & Tail
    if (sim.alive && sim.speed > 0) {
      this.dogTime += dt * (sim.speed * 0.95);
      const swing = Math.sin(this.dogTime * 3.2) * 0.55;
      if (this.dogLegs.length === 4) {
        this.dogLegs[0].rotation.x = swing;
        this.dogLegs[1].rotation.x = -swing;
        this.dogLegs[2].rotation.x = -swing;
        this.dogLegs[3].rotation.x = swing;
      }
      this.dogTail.rotation.y = Math.sin(this.dogTime * 5.0) * 0.45;
      this.dogHead.position.y = 0.52 + Math.abs(Math.sin(this.dogTime * 3.2)) * 0.035;
    }
  }
}
