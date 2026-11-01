// Authentic 3D Indian Railways Train Model (ICF / Rajdhani / Garib Rath / Vande Bharat)
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { OB } from '../config';

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, g: c.getContext('2d') as CanvasRenderingContext2D };
}

/** Authentic Indian Railways coach side texture with yellow safety band, barred windows, and IR logos. */
export function indianTrainTexture() {
  const W = 512, H = 256;
  const { c, g } = canvas(W, H);

  // Default coach body (white/light base so instancedColor tints it authentically)
  g.fillStyle = '#f1f5f9';
  g.fillRect(0, 0, W, H);

  // Roof strip at top
  g.fillStyle = '#64748b';
  g.fillRect(0, 0, W, 48);
  // Roof corrugated ventilation lines
  g.fillStyle = '#475569';
  for (let x = 8; x < W; x += 16) {
    g.fillRect(x, 8, 8, 32);
  }

  // Indian Railways iconic canary yellow safety stripe along the window band
  g.fillStyle = '#facc15';
  g.fillRect(0, 52, W, 104);

  // Thin red/orange accent pinstripe above and below yellow band
  g.fillStyle = '#dc2626';
  g.fillRect(0, 48, W, 4);
  g.fillRect(0, 156, W, 4);

  // Coach Body Lower Section
  g.fillStyle = '#cbd5e1';
  g.fillRect(0, 160, W, H - 160);

  // Dark tinted passenger windows with iconic Indian Railways horizontal safety bars
  const windowCount = 8;
  const winW = 38, winH = 46;
  const startX = 36;
  const spacing = (W - startX * 2 - winW * windowCount) / (windowCount - 1);

  for (let i = 0; i < windowCount; i++) {
    const wx = Math.round(startX + i * (winW + spacing));
    const wy = 78;

    // Window frame
    g.fillStyle = '#1e293b';
    g.fillRect(wx - 2, wy - 2, winW + 4, winH + 4);

    // Tinted dark glass
    g.fillStyle = '#0f172a';
    g.fillRect(wx, wy, winW, winH);

    // Glass reflection highlight
    g.fillStyle = 'rgba(255, 255, 255, 0.25)';
    g.beginPath();
    g.moveTo(wx, wy);
    g.lineTo(wx + 16, wy);
    g.lineTo(wx, wy + 28);
    g.closePath();
    g.fill();

    // Indian Railways window safety bars
    g.fillStyle = '#94a3b8';
    for (let barY = wy + 10; barY < wy + winH - 6; barY += 10) {
      g.fillRect(wx, barY, winW, 2);
    }
  }

  // Coach Doors at both ends with vertical grab handles
  for (const dx of [6, W - 28]) {
    g.fillStyle = '#334155';
    g.fillRect(dx, 60, 22, 160);
    // Door window
    g.fillStyle = '#0f172a';
    g.fillRect(dx + 3, 72, 16, 28);
    // Yellow safety grab rail
    g.fillStyle = '#eab308';
    g.fillRect(dx + (dx === 6 ? 20 : 0), 90, 3, 90);
  }

  // Bilingual Indian Railways Typography along the letterboard
  g.fillStyle = '#0f172a';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = 'bold 15px "Noto Sans Devanagari", "Mangal", sans-serif';
  g.fillText('भारतीय रेल · INDIAN RAILWAYS', W / 2, 64);

  // Coach details / class stencil
  g.font = 'bold 12px monospace, sans-serif';
  g.fillStyle = '#334155';
  g.fillText('IR-SUPERFAST EXPRESS · COACH 12842', W / 2, 174);

  // Undercarriage dark skirt
  g.fillStyle = '#090d16';
  g.fillRect(0, H - 28, W, 28);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

/** Build the composite 3D Indian Railways train carriage with buffers, cowcatcher, and top headlight dome. */
export function createIndianTrainMesh(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'train';

  const w = OB.train.halfW * 2; // 2.3m
  const h = OB.train.yt;         // 3.4m
  const l = OB.train.depth;      // 6.74m

  const trainTex = indianTrainTexture();
  const bodyMat = new THREE.MeshLambertMaterial({ map: trainTex });
  const roofMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
  const metalMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
  const chromeMat = new THREE.MeshLambertMaterial({ color: 0xe2e8f0 });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  // 1. Main Coach Body - Chunky and rounded cartoon proportions
  const bodyGeo = new RoundedBoxGeometry(w, h * 0.88, l, 3, 0.12);
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
  bodyMesh.position.y = (h * 0.88) / 2;
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  group.add(bodyMesh);

  // 2. Corrugated Arched Roof
  const roofGeo = new THREE.CylinderGeometry(w * 0.52, w * 0.52, l, 16, 1, false, 0, Math.PI);
  const roofMesh = new THREE.Mesh(roofGeo, roofMat);
  roofMesh.rotation.z = Math.PI / 2;
  roofMesh.rotation.y = Math.PI / 2;
  roofMesh.position.y = h * 0.88;
  roofMesh.castShadow = true;
  roofMesh.receiveShadow = true;
  group.add(roofMesh);

  // Roof AC units / ventilator pods - rounded cartoon modules
  for (const rz of [-1.8, 0, 1.8]) {
    const acGeo = new RoundedBoxGeometry(1.3, 0.22, 1.1, 2, 0.05);
    const acMesh = new THREE.Mesh(acGeo, roofMat);
    acMesh.position.set(0, h * 0.98, rz);
    acMesh.castShadow = true;
    group.add(acMesh);
  }

  // 3. Front Face Details (on near side +Z / locomotive front)
  const frontZ = l / 2 + 0.02;

  // Twin Heavy Steel Shock Buffers (Signature Indian Railways buffers)
  for (const side of [-0.72, 0.72]) {
    const shankGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.28, 8);
    const shank = new THREE.Mesh(shankGeo, metalMat);
    shank.rotation.x = Math.PI / 2;
    shank.position.set(side, 0.65, frontZ + 0.1);

    const padGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.04, 12);
    const pad = new THREE.Mesh(padGeo, metalMat);
    pad.rotation.x = Math.PI / 2;
    pad.position.set(side, 0.65, frontZ + 0.24);

    group.add(shank);
    group.add(pad);
  }

  // Front Cow-Catcher / Cattle Guard (Plow)
  const plowGeo = new THREE.ConeGeometry(0.85, 0.45, 4);
  const plow = new THREE.Mesh(plowGeo, metalMat);
  plow.rotation.y = Math.PI / 4;
  plow.position.set(0, 0.22, frontZ + 0.08);
  group.add(plow);

  // Top Center High-Beam Locomotive Headlight Dome
  const lampHousingGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.22, 12);
  const lampHousing = new THREE.Mesh(lampHousingGeo, chromeMat);
  lampHousing.rotation.x = Math.PI / 2;
  lampHousing.position.set(0, h * 0.82, frontZ + 0.08);

  const lampLensGeo = new THREE.CircleGeometry(0.15, 12);
  const lampLens = new THREE.Mesh(lampLensGeo, lampMat);
  lampLens.position.set(0, h * 0.82, frontZ + 0.2);

  group.add(lampHousing);
  group.add(lampLens);

  return group;
}
