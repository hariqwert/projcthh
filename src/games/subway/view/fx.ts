// Sparks, dust and speed lines. Fixed-size pools drawn as one InstancedMesh each.
import * as THREE from 'three';
import { glowTexture } from './textures';

interface P {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  life: number; max: number; size: number; grav: number;
  color: THREE.Color; world: boolean;
}

const m4 = new THREE.Matrix4();
const q = new THREE.Quaternion();
const v = new THREE.Vector3();
const s = new THREE.Vector3();

export class Fx {
  mesh: THREE.InstancedMesh;
  lines: THREE.InstancedMesh;
  lineMat: THREE.MeshBasicMaterial;
  rainLines: THREE.InstancedMesh;
  rainMat: THREE.MeshBasicMaterial;
  snowMesh: THREE.InstancedMesh;
  snowMat: THREE.MeshBasicMaterial;
  private ps: P[] = [];
  private free: P[] = [];
  private lineData: { x: number; y: number; z: number; len: number }[] = [];
  private rainData: { x: number; y: number; z: number }[] = [];
  private snowData: { x: number; y: number; z: number; size: number; phase: number }[] = [];
  private time = 0;
  constructor(scene: THREE.Scene, public cap = 220) {
    const mat = new THREE.MeshBasicMaterial({
      map: glowTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false,
    });
    this.mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), mat, cap);
    for (let i = 0; i < cap; i++) this.mesh.setColorAt(i, new THREE.Color(1, 1, 1));
    this.mesh.frustumCulled = false;
    this.mesh.count = 0;
    this.mesh.renderOrder = 5;
    scene.add(this.mesh);
    for (let i = 0; i < cap; i++) {
      this.free.push({ x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 0, max: 1, size: 1, grav: 0, color: new THREE.Color(), world: true });
    }
    this.lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, fog: false });
    const N = 40;
    this.lines = new THREE.InstancedMesh(new THREE.BoxGeometry(0.035, 0.035, 1), this.lineMat, N);
    this.lines.frustumCulled = false;
    this.lines.renderOrder = 6;
    scene.add(this.lines);
    for (let i = 0; i < N; i++) this.lineData.push(this.newLine(-Math.random() * 40));

    // Monsoon rain streaks
    const RAIN_N = 140;
    this.rainMat = new THREE.MeshBasicMaterial({ color: 0xa5b4fc, transparent: true, opacity: 0, depthWrite: false, fog: false });
    this.rainLines = new THREE.InstancedMesh(new THREE.BoxGeometry(0.018, 0.55, 0.018), this.rainMat, RAIN_N);
    this.rainLines.frustumCulled = false;
    this.rainLines.renderOrder = 6;
    scene.add(this.rainLines);
    for (let i = 0; i < RAIN_N; i++) {
      this.rainData.push({
        x: (Math.random() - 0.5) * 16,
        y: Math.random() * 12,
        z: -Math.random() * 35,
      });
    }

    // Himalayan / Kashmir winter falling snow flakes
    const SNOW_N = 120;
    this.snowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, fog: false });
    this.snowMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), this.snowMat, SNOW_N);
    this.snowMesh.frustumCulled = false;
    this.snowMesh.renderOrder = 6;
    scene.add(this.snowMesh);
    for (let i = 0; i < SNOW_N; i++) {
      this.snowData.push({
        x: (Math.random() - 0.5) * 18,
        y: Math.random() * 12,
        z: -Math.random() * 38,
        size: 0.6 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  private newLine(z: number) {
    // around the edges of the view, not in the middle where the runner is
    const a = Math.random() * Math.PI * 2;
    const r = 3.2 + Math.random() * 4;
    return { x: Math.cos(a) * r * 1.3, y: 2.6 + Math.sin(a) * r * 0.75, z, len: 2 + Math.random() * 3 };
  }

  burst(x: number, y: number, z: number, n: number, color: THREE.ColorRepresentation, o: { speed?: number; up?: number; size?: number; life?: number; grav?: number; world?: boolean } = {}) {
    const c = new THREE.Color(color);
    for (let i = 0; i < n; i++) {
      const p = this.free.pop();
      if (!p) return;
      const sp = o.speed ?? 3;
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * 2 - 1;
      p.x = x; p.y = y; p.z = z;
      p.vx = Math.cos(a) * sp * Math.sqrt(1 - e * e);
      p.vy = e * sp * 0.6 + (o.up ?? 1.5);
      p.vz = Math.sin(a) * sp * Math.sqrt(1 - e * e);
      p.life = p.max = (o.life ?? 0.5) * (0.7 + Math.random() * 0.6);
      p.size = (o.size ?? 0.35) * (0.6 + Math.random() * 0.8);
      p.grav = o.grav ?? 6;
      p.color.copy(c);
      p.world = o.world ?? true;
      this.ps.push(p);
    }
  }

  update(dt: number, camera: THREE.Camera, worldSpeed: number, speedFactor: number, rainFactor = 0, snowFactor = 0) {
    this.time += dt;
    q.copy(camera.quaternion);
    let n = 0;
    for (let i = this.ps.length - 1; i >= 0; i--) {
      const p = this.ps[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.free.push(p);
        this.ps.splice(i, 1);
        continue;
      }
      p.vy -= p.grav * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += (p.vz + (p.world ? worldSpeed : 0)) * dt;
      const k = p.life / p.max;
      const sz = p.size * (0.4 + 0.6 * k);
      m4.compose(v.set(p.x, p.y, p.z), q, s.set(sz, sz, sz));
      this.mesh.setMatrixAt(n, m4);
      this.mesh.setColorAt(n, p.color.clone().multiplyScalar(Math.min(1, k * 1.6)));
      n++;
    }
    this.mesh.count = n;
    this.mesh.visible = n > 0;
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    // speed lines
    this.lineMat.opacity = 0.32 * speedFactor;
    this.lines.visible = speedFactor > 0.02;
    for (let i = 0; i < this.lineData.length; i++) {
      const l = this.lineData[i];
      l.z += worldSpeed * 1.6 * dt;
      if (l.z > 8) this.lineData[i] = Object.assign(l, this.newLine(-40 - Math.random() * 10));
      m4.compose(v.set(l.x, l.y, l.z), q.identity(), s.set(1, 1, l.len * (0.5 + speedFactor)));
      this.lines.setMatrixAt(i, m4);
    }
    this.lines.instanceMatrix.needsUpdate = true;

    // monsoon rain streaks
    this.rainMat.opacity = 0.52 * rainFactor;
    this.rainLines.visible = rainFactor > 0.02;
    if (this.rainLines.visible) {
      for (let i = 0; i < this.rainData.length; i++) {
        const r = this.rainData[i];
        r.y -= 28 * dt;
        r.z += worldSpeed * dt * 0.7;
        if (r.y < 0) {
          r.y = 10 + Math.random() * 4;
          r.x = (Math.random() - 0.5) * 16;
          r.z = -Math.random() * 32;
        }
        m4.compose(v.set(r.x, r.y, r.z), q.identity(), s.set(1, 1, 1));
        this.rainLines.setMatrixAt(i, m4);
      }
      this.rainLines.instanceMatrix.needsUpdate = true;
    }

    // falling snow flakes
    this.snowMat.opacity = 0.85 * snowFactor;
    this.snowMesh.visible = snowFactor > 0.02;
    if (this.snowMesh.visible) {
      for (let i = 0; i < this.snowData.length; i++) {
        const sf = this.snowData[i];
        sf.y -= 4.2 * dt;
        sf.x += Math.sin(this.time * 2.2 + sf.phase) * 0.85 * dt;
        sf.z += worldSpeed * dt * 0.35;
        if (sf.y < 0) {
          sf.y = 9 + Math.random() * 4;
          sf.x = (Math.random() - 0.5) * 18;
          sf.z = -Math.random() * 35;
        }
        m4.compose(v.set(sf.x, sf.y, sf.z), q, s.set(sf.size, sf.size, sf.size));
        this.snowMesh.setMatrixAt(i, m4);
      }
      this.snowMesh.instanceMatrix.needsUpdate = true;
    }
  }

  /** Show one of everything so its shader is compiled before play. */
  warm(camera: THREE.Camera) {
    this.burst(0, 1, -5, 1, 0xffffff);
    this.update(0, camera, 0, 1, 1, 1);
    this.lines.visible = true;
    this.rainLines.visible = true;
    this.snowMesh.visible = true;
  }
  clear() {
    for (const p of this.ps) this.free.push(p);
    this.ps.length = 0;
    this.mesh.count = 0;
  }
}
