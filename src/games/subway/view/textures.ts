// Textures drawn on a canvas at start-up: stylized hand-painted gradients, baked AO and cartoon materials.
import * as THREE from 'three';

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, g: c.getContext('2d') as CanvasRenderingContext2D };
}
function tex(c: HTMLCanvasElement, repeat = true) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.generateMipmaps = true;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.anisotropy = 8;
  return t;
}
// deterministic noise so every load looks the same
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

/** Utility: Soft top-to-bottom linear gradient (brighter top, darker bottom) */
export function vGrad(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, top: string, bot: string) {
  const gr = g.createLinearGradient(x, y, x, y + h);
  gr.addColorStop(0, top);
  gr.addColorStop(1, bot);
  g.fillStyle = gr;
  g.fillRect(x, y, w, h);
}

/** Utility: Baked Ambient Occlusion corner/edge vignette */
export function applyCornerAO(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, strength = 0.3) {
  // Top/bottom edge contact shadows
  const topShadow = g.createLinearGradient(x, y, x, y + Math.min(16, h * 0.25));
  topShadow.addColorStop(0, `rgba(0,0,0,${strength * 0.7})`);
  topShadow.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = topShadow;
  g.fillRect(x, y, w, Math.min(16, h * 0.25));

  const botShadow = g.createLinearGradient(x, y + h - Math.min(24, h * 0.35), x, y + h);
  botShadow.addColorStop(0, 'rgba(0,0,0,0)');
  botShadow.addColorStop(1, `rgba(0,0,0,${strength})`);
  g.fillStyle = botShadow;
  g.fillRect(x, y + h - Math.min(24, h * 0.35), w, Math.min(24, h * 0.35));

  // Corner radial AO
  const r = Math.min(w * 0.35, h * 0.35, 48);
  if (r > 4) {
    const rad = g.createRadialGradient(x + w / 2, y + h / 2, Math.max(w, h) * 0.35, x + w / 2, y + h / 2, Math.max(w, h) * 0.58);
    rad.addColorStop(0, 'rgba(0,0,0,0)');
    rad.addColorStop(1, `rgba(0,0,0,${strength * 0.5})`);
    g.fillStyle = rad;
    g.fillRect(x, y, w, h);
  }
}

/** One lane of Indian Railways broad-gauge track: dark granite ballast stone gravel, concrete PSC sleepers with yellow safety tips, polished steel rails. */
export function trackTexture() {
  const S = 256;
  const { c, g } = canvas(S, S);

  // Ballast: rich warm slate granite with top-to-bottom depth
  vGrad(g, 0, 0, S, S, '#333e50', '#202733');
  for (let i = 0; i < 2800; i++) {
    const v = 42 + rnd() * 45;
    g.fillStyle = `rgb(${v},${v + 5},${v + 12})`;
    g.fillRect(rnd() * S, rnd() * S, 2 + rnd() * 3, 2 + rnd() * 3);
  }

  // Indian Railways Pre-stressed Concrete (PSC) Sleepers with soft gradient & bevel
  for (let k = 0; k < 4; k++) {
    const y = k * (S / 4) + 8;
    // Ambient Occlusion drop shadow beneath sleeper
    g.fillStyle = 'rgba(0,0,0,0.45)';
    g.fillRect(14, y + 27, S - 28, 6);

    // Concrete main body with top-to-bottom sunlight gradient
    vGrad(g, 16, y, S - 32, 26, '#cbd5e1', '#64748b');

    // Bevel highlight on top
    g.fillStyle = 'rgba(255,255,255,0.45)';
    g.fillRect(16, y, S - 32, 4);

    // Bottom shadow
    g.fillStyle = '#334155';
    g.fillRect(16, y + 23, S - 32, 3);

    // Indian Railways yellow safety markings on sleeper ends with rounded bevel
    vGrad(g, 16, y + 4, 8, 18, '#fde047', '#ca8a04');
    vGrad(g, S - 24, y + 4, 8, 18, '#fde047', '#ca8a04');
  }

  // Broad-gauge steel rails with AO underneath and shiny specular top
  for (const x of [0.22, 0.78]) {
    // Soft AO shadow under the rail
    const rx = Math.round(x * S);
    const railShad = g.createLinearGradient(rx - 14, 0, rx + 14, 0);
    railShad.addColorStop(0, 'rgba(0,0,0,0)');
    railShad.addColorStop(0.5, 'rgba(0,0,0,0.6)');
    railShad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = railShad;
    g.fillRect(rx - 14, 0, 28, S);

    // Rusted rail base plates
    vGrad(g, rx - 9, 0, 18, S, '#92400e', '#5a2205');
    // Rail web
    vGrad(g, rx - 6, 0, 12, S, '#64748b', '#334155');
    // Polished chrome rail head (bright metallic reflection)
    vGrad(g, rx - 3, 0, 6, S, '#ffffff', '#cbd5e1');
    g.fillStyle = '#ffffff';
    g.fillRect(rx - 1, 0, 2, S);
  }
  return tex(c);
}

/** Indian Railway platform paving: terracotta station tiles with yellow tactile caution ribbing. */
export function pavingTexture() {
  const S = 256;
  const { c, g } = canvas(S, S);

  // Terracotta platform flagstones with soft top-to-bottom ambient lighting
  vGrad(g, 0, 0, S, S, '#9d174d', '#701a35');
  for (let i = 0; i < 800; i++) {
    const v = 115 + rnd() * 40;
    g.fillStyle = `rgba(${v + 25},${Math.floor(v * 0.28)},${Math.floor(v * 0.42)},0.45)`;
    g.fillRect(rnd() * S, rnd() * S, 2, 2);
  }

  // Tile grid with bevel highlight and shadow grout lines
  for (let k = 0; k <= 4; k++) {
    const p = k * 64;
    // Dark grout groove
    g.strokeStyle = '#380410';
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(0, p); g.lineTo(S, p); g.stroke();
    g.beginPath(); g.moveTo(p, 0); g.lineTo(p, S); g.stroke();
    // Soft bevel highlight edge
    g.strokeStyle = 'rgba(255,255,255,0.18)';
    g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(0, p + 2); g.lineTo(S, p + 2); g.stroke();
    g.beginPath(); g.moveTo(p + 2, 0); g.lineTo(p + 2, S); g.stroke();
  }

  // Yellow tactile warning border with embossed warning domes
  vGrad(g, 0, 0, 36, S, '#fde047', '#ca8a04');
  g.fillStyle = 'rgba(0,0,0,0.3)';
  g.fillRect(34, 0, 3, S);

  for (let y = 4; y < S; y += 12) {
    vGrad(g, 4, y, 28, 6, '#fef08a', '#a16207');
    g.fillStyle = 'rgba(255,255,255,0.4)';
    g.fillRect(5, y, 26, 2);
  }
  return tex(c);
}

export function groundTexture() {
  const S = 128;
  const { c, g } = canvas(S, S);
  // Lush stylized cartoon green grass with soft vertical gradient
  vGrad(g, 0, 0, S, S, '#4d7c0f', '#365314');
  for (let i = 0; i < 400; i++) {
    const v = rnd();
    g.fillStyle = v > 0.6 ? 'rgba(163,230,53,0.45)' : 'rgba(20,40,10,0.5)';
    g.fillRect(rnd() * S, rnd() * S, 3, 3);
  }
  // Soft scattered cartoon clover/daisies
  for (let i = 0; i < 24; i++) {
    const fx = rnd() * (S - 8) + 4;
    const fy = rnd() * (S - 8) + 4;
    g.fillStyle = '#fef08a';
    g.beginPath();
    g.arc(fx, fy, 2, 0, Math.PI * 2);
    g.fill();
  }
  return tex(c);
}

export type WeatherKind = 'day' | 'sunset' | 'rain' | 'night' | 'snow';

export interface WeatherConfig {
  sky: THREE.Texture;
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
  sunColor: THREE.Color;
  sunIntensity: number;
  hemiSky: THREE.Color;
  hemiGround: THREE.Color;
  streetlights: number; // 0 = off, 1 = full on
  rain: number;         // 0 = none, 1 = monsoon rain
  snow: number;         // 0 = none, 1 = snow storm
}

function makeSky(stops: [number, string][]) {
  const { c, g } = canvas(4, 256);
  const gr = g.createLinearGradient(0, 0, 0, 256);
  for (const [stop, col] of stops) gr.addColorStop(stop, col);
  g.fillStyle = gr;
  g.fillRect(0, 0, 4, 256);
  return tex(c, false);
}

export function createWeatherPresets(): Record<WeatherKind, WeatherConfig> {
  return {
    day: {
      sky: makeSky([[0, '#0284c7'], [0.35, '#38bdf8'], [0.75, '#7dd3fc'], [0.94, '#dbeafe'], [1, '#fef3c7']]),
      fogColor: new THREE.Color('#bae6fd'),
      fogNear: 85,
      fogFar: 340,
      sunColor: new THREE.Color('#fff7e6'),
      sunIntensity: 2.1,
      hemiSky: new THREE.Color('#68b8ff'),
      hemiGround: new THREE.Color('#e0b885'),
      streetlights: 0,
      rain: 0,
      snow: 0,
    },
    sunset: {
      sky: makeSky([[0, '#1e1b4b'], [0.35, '#312e81'], [0.60, '#ea580c'], [0.82, '#f59e0b'], [1, '#ffedd5']]),
      fogColor: new THREE.Color('#ea580c'),
      fogNear: 60,
      fogFar: 270,
      sunColor: new THREE.Color('#fed7aa'),
      sunIntensity: 2.0,
      hemiSky: new THREE.Color('#ffedd5'),
      hemiGround: new THREE.Color('#854d0e'),
      streetlights: 0.35,
      rain: 0,
      snow: 0,
    },
    rain: {
      sky: makeSky([[0, '#0f172a'], [0.4, '#1e293b'], [0.75, '#334155'], [1, '#475569']]),
      fogColor: new THREE.Color('#334155'),
      fogNear: 35,
      fogFar: 190,
      sunColor: new THREE.Color('#94a3b8'),
      sunIntensity: 0.85,
      hemiSky: new THREE.Color('#64748b'),
      hemiGround: new THREE.Color('#1e293b'),
      streetlights: 1.0,
      rain: 1.0,
      snow: 0,
    },
    night: {
      sky: makeSky([[0, '#020617'], [0.4, '#090d16'], [0.75, '#1e1b4b'], [1, '#312e81']]),
      fogColor: new THREE.Color('#0c1427'),
      fogNear: 50,
      fogFar: 240,
      sunColor: new THREE.Color('#60a5fa'),
      sunIntensity: 0.65,
      hemiSky: new THREE.Color('#1e293b'),
      hemiGround: new THREE.Color('#090d16'),
      streetlights: 1.0,
      rain: 0,
      snow: 0,
    },
    snow: {
      sky: makeSky([[0, '#334155'], [0.4, '#64748b'], [0.75, '#cbd5e1'], [1, '#f1f5f9']]),
      fogColor: new THREE.Color('#e2e8f0'),
      fogNear: 40,
      fogFar: 210,
      sunColor: new THREE.Color('#f8fafc'),
      sunIntensity: 1.4,
      hemiSky: new THREE.Color('#e2e8f0'),
      hemiGround: new THREE.Color('#94a3b8'),
      streetlights: 0.6,
      rain: 0,
      snow: 1.0,
    },
  };
}

/** Mumbai bright daytime sky: vibrant azure blue fading to warm golden horizon. */
export function skyTexture() {
  return makeSky([[0, '#0284c7'], [0.35, '#38bdf8'], [0.75, '#7dd3fc'], [0.94, '#dbeafe'], [1, '#fef3c7']]);
}
export const HORIZON = new THREE.Color('#bae6fd');

/** Soft round dot for glows and sparks. */
export function glowTexture() {
  const S = 64;
  const { c, g } = canvas(S, S);
  const gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.25, 'rgba(255,255,255,0.65)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, S, S);
  return tex(c, false);
}

/** Power-up cards: a rounded tile with a simple drawn icon. */
export function powerTexture(kind: 'magnet' | 'shoes' | 'double' | 'star' | 'jet') {
  const S = 128;
  const { c, g } = canvas(S, S);
  const bg = { magnet: '#e8414b', shoes: '#2fb36b', double: '#f2a516', star: '#f59e0b', jet: '#ea580c' }[kind];
  g.fillStyle = 'rgba(255,255,255,0.95)';
  round(g, 4, 4, S - 8, S - 8, 26);
  g.fill();
  g.fillStyle = bg;
  round(g, 12, 12, S - 24, S - 24, 20);
  g.fill();
  g.lineCap = 'round';
  g.strokeStyle = '#fff';
  g.fillStyle = '#fff';
  if (kind === 'magnet') {
    g.lineWidth = 18;
    g.beginPath();
    g.arc(64, 60, 26, Math.PI, 0, true);
    g.stroke();
    g.beginPath(); g.moveTo(38, 60); g.lineTo(38, 88); g.moveTo(90, 60); g.lineTo(90, 88); g.stroke();
    g.strokeStyle = '#2a2a2a';
    g.lineWidth = 18;
    g.lineCap = 'butt';
    g.beginPath(); g.moveTo(38, 84); g.lineTo(38, 98); g.moveTo(90, 84); g.lineTo(90, 98); g.stroke();
  } else if (kind === 'shoes') {
    // a sneaker on a spring
    g.beginPath();
    g.moveTo(30, 70); g.lineTo(30, 40); g.lineTo(52, 40); g.quadraticCurveTo(60, 58, 96, 62);
    g.quadraticCurveTo(104, 64, 102, 74); g.lineTo(30, 74); g.closePath();
    g.fill();
    g.strokeStyle = '#fff';
    g.lineWidth = 6;
    g.beginPath();
    for (let i = 0; i < 4; i++) { g.moveTo(44, 82 + i * 6); g.lineTo(84, 85 + i * 6); }
    g.stroke();
  } else if (kind === 'star') {
    // Golden Star with 5x multiplier
    g.fillStyle = '#fffbeb';
    g.font = 'bold 54px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('★', 64, 52);
    g.font = '900 24px system-ui, sans-serif';
    g.fillText('5X', 64, 92);
  } else if (kind === 'jet') {
    // Rocket Jetpack
    g.fillStyle = '#fffbeb';
    g.font = 'bold 52px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('🚀', 64, 52);
    g.font = '900 22px system-ui, sans-serif';
    g.fillText('JET', 64, 92);
  } else {
    g.font = 'bold 64px system-ui, sans-serif';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('×2', 64, 68);
  }
  return tex(c, false);
}

/** Authentic Indian Railways Station Signboard (Canary yellow background, black border & bilingual bold text). */
export function stationSignTexture(nameHindi: string, nameEng: string) {
  const W = 512, H = 160;
  const { c, g } = canvas(W, H);
  // Yellow board with soft top-to-bottom gradient
  vGrad(g, 0, 0, W, H, '#fef08a', '#eab308');
  applyCornerAO(g, 0, 0, W, H, 0.25);

  // Outer glossy bevel highlight
  g.fillStyle = 'rgba(255, 255, 255, 0.55)';
  g.fillRect(0, 0, W, 5);

  // Double black border
  g.strokeStyle = '#18181b';
  g.lineWidth = 8;
  g.strokeRect(6, 6, W - 12, H - 12);
  g.lineWidth = 3;
  g.strokeRect(16, 16, W - 32, H - 32);

  // Text
  g.fillStyle = '#09090b';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = 'bold 44px "Noto Sans Devanagari", "Mangal", sans-serif';
  g.fillText(nameHindi, W / 2, 54);
  g.font = '900 36px "Arial Black", system-ui, sans-serif';
  g.fillText(nameEng, W / 2, 108);
  return tex(c, false);
}

function round(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

/** Yellow and black hazard stripes for the ramps with soft gradient and bevel. */
export function rampTexture() {
  const S = 128;
  const { c, g } = canvas(S, S);
  // Warm cartoon yellow background gradient
  vGrad(g, 0, 0, S, S, '#fde047', '#d97706');

  // Chunky diagonal hazard stripes with depth
  for (let k = -2; k < 4; k++) {
    const gr = g.createLinearGradient(k * 48, S, k * 48 + 24 + S, 0);
    gr.addColorStop(0, '#1e293b');
    gr.addColorStop(1, '#090d16');
    g.fillStyle = gr;
    g.beginPath();
    g.moveTo(k * 48, S); g.lineTo(k * 48 + 24, S); g.lineTo(k * 48 + 24 + S, 0); g.lineTo(k * 48 + S, 0);
    g.closePath();
    g.fill();
  }

  // Soft bevel horizontal highlights
  g.fillStyle = 'rgba(255,255,255,0.2)';
  for (let y = 0; y < S; y += 16) g.fillRect(0, y, S, 3);

  // Soft baked corner AO
  applyCornerAO(g, 0, 0, S, S, 0.35);
  return tex(c);
}

/** Authentic Indian Railways ICF Passenger Coach Livery Texture (Navy Blue, Cream Stripes, Stencil Markings). */
export function icfLiveryTexture() {
  const W = 512, H = 256;
  const { c, g } = canvas(W, H);

  // Base Royal Navy Blue with top-to-bottom sunlight gradient
  vGrad(g, 0, 0, W, H, '#025eb2', '#00254d');

  // Roofline highlight strip
  g.fillStyle = 'rgba(255, 255, 255, 0.25)';
  g.fillRect(0, 0, W, 8);

  // Upper & Lower Cream Accent Stripes with soft drop shadows
  g.fillStyle = 'rgba(0,0,0,0.4)';
  g.fillRect(0, 54, W, 5);
  g.fillRect(0, 210, W, 5);

  vGrad(g, 0, 36, W, 18, '#fffbeb', '#fde68a');
  vGrad(g, 0, 192, W, 18, '#fffbeb', '#fde68a');

  // End Door Hazard Chevron Stripes
  for (let s of [0, W - 48]) {
    vGrad(g, s, 0, 48, H, '#fde047', '#ca8a04');
    for (let k = -2; k < 6; k++) {
      g.fillStyle = '#0f172a';
      g.beginPath();
      g.moveTo(s + k * 16, H);
      g.lineTo(s + k * 16 + 8, H);
      g.lineTo(s + k * 16 + 24, 0);
      g.lineTo(s + k * 16 + 16, 0);
      g.closePath();
      g.fill();
    }
  }

  // Windows with aluminum frames and blue glossy reflection
  for (let x = 64; x <= W - 110; x += 44) {
    // Drop shadow under window
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.fillRect(x - 2, 70, 36, 62);

    // Silver frame with bevel
    vGrad(g, x - 2, 70, 34, 58, '#e2e8f0', '#64748b');

    // Glossy glass gradient reflection
    const winGrad = g.createLinearGradient(x, 72, x + 30, 126);
    winGrad.addColorStop(0, '#38bdf8');
    winGrad.addColorStop(0.35, '#0284c7');
    winGrad.addColorStop(1, '#091e3a');
    g.fillStyle = winGrad;
    g.fillRect(x, 72, 30, 54);

    // Curtains
    vGrad(g, x + 2, 72, 8, 22, '#fef08a', '#d97706');
    vGrad(g, x + 20, 72, 8, 22, '#fef08a', '#d97706');

    // Window glass reflection diagonal sheen
    g.fillStyle = 'rgba(255,255,255,0.35)';
    g.beginPath();
    g.moveTo(x + 2, 72); g.lineTo(x + 14, 72); g.lineTo(x + 4, 126); g.lineTo(x + 2, 126);
    g.closePath();
    g.fill();
  }

  // Authentic Coach Details and Stencil Lettering
  g.fillStyle = '#fde047';
  g.font = 'bold 16px "Noto Sans Devanagari", sans-serif';
  g.fillText('भारतीय रेल', 70, 28);
  g.font = 'bold 13px system-ui, sans-serif';
  g.fillText('INDIAN RAILWAYS', 160, 28);

  // Destination Board at center
  vGrad(g, 140, 142, 232, 24, '#fef08a', '#facc15');
  g.strokeStyle = '#0f172a';
  g.lineWidth = 1.5;
  g.strokeRect(140, 142, 232, 24);
  g.fillStyle = '#0f172a';
  g.font = '900 11px system-ui, sans-serif';
  g.textAlign = 'center';
  g.fillText('MUMBAI CENTRAL ⇄ NEW DELHI RAJDHANI', 256, 158);
  g.textAlign = 'left';

  // Coach number
  g.fillStyle = '#ffffff';
  g.font = 'bold 13px monospace';
  g.fillText('NER 22451 / A1', 400, 28);

  // Deep baked AO contact shadow along bottom undercarriage
  applyCornerAO(g, 0, 0, W, H, 0.4);
  return tex(c, false);
}

/** Vande Bharat Express Semi-High Speed Aerodynamic Livery Texture. */
export function vandeBharatLiveryTexture() {
  const W = 512, H = 256;
  const { c, g } = canvas(W, H);

  // Pearl White Body with soft top-to-bottom ambient lighting
  vGrad(g, 0, 0, W, H, '#ffffff', '#cbd5e1');

  // Aerodynamic Navy Blue Swoosh with gradient
  vGrad(g, 0, 60, W, 100, '#0f3866', '#06162a');

  // Saffron / Orange Speed Accent Stripe
  vGrad(g, 0, 164, W, 12, '#fb923c', '#c2410c');
  vGrad(g, 0, 52, W, 6, '#7dd3fc', '#0284c7');

  // Continuous Panoramic Dark Glass Ribbon with gloss reflection
  const grad = g.createLinearGradient(0, 72, 0, 148);
  grad.addColorStop(0, 'rgba(56, 189, 248, 0.55)');
  grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.35)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.88)');
  g.fillStyle = grad;
  g.fillRect(40, 72, W - 80, 76);

  // Subtle window pane dividers
  g.fillStyle = '#1e293b';
  for (let x = 85; x < W - 80; x += 45) {
    g.fillRect(x, 72, 3, 76);
  }

  // Digital Amber LED Destination Display
  vGrad(g, 200, 84, 112, 22, '#27272a', '#09090b');
  g.fillStyle = '#fbbf24';
  g.font = '900 11px monospace';
  g.textAlign = 'center';
  g.fillText('VANDE BHARAT', 256, 100);
  g.textAlign = 'left';

  // Modern Vande Bharat Logo & Tricolor Band
  g.fillStyle = '#0a2540';
  g.font = '900 18px system-ui, sans-serif';
  g.fillText('वन्दे भारत', 50, 36);
  g.font = '800 14px system-ui, sans-serif';
  g.fillText('EXPRESS', 140, 36);

  // Indian Tricolor Stripe
  g.fillStyle = '#f97316'; g.fillRect(W - 140, 24, 70, 4);
  g.fillStyle = '#ffffff'; g.fillRect(W - 140, 28, 70, 4);
  g.fillStyle = '#16a34a'; g.fillRect(W - 140, 32, 70, 4);

  // Aerodynamic Bottom Skirting & Grill with AO
  vGrad(g, 0, 220, W, 36, '#475569', '#1e293b');
  g.fillStyle = '#090d16';
  for (let x = 60; x < W - 60; x += 14) g.fillRect(x, 226, 8, 20);

  applyCornerAO(g, 0, 0, W, H, 0.25);
  return tex(c, false);
}

/** Heavy Industrial BCNHL Corrugated Freight Boxcar Texture. */
export function freightLiveryTexture() {
  const W = 512, H = 256;
  const { c, g } = canvas(W, H);

  // Rust-Red Oxide Steel Body with vertical gradient
  vGrad(g, 0, 0, W, H, '#991b1b', '#571306');

  // Corrugated steel vertical ribs with sunlight bevels
  for (let x = 0; x < W; x += 12) {
    vGrad(g, x, 0, 5, H, '#b91c1c', '#7f1d1d');
    vGrad(g, x + 5, 0, 7, H, '#450a0a', '#200505');
  }

  // Central Double Sliding Heavy Freight Door with drop shadow
  g.fillStyle = 'rgba(0,0,0,0.5)';
  g.fillRect(188, 18, 136, 220);

  vGrad(g, 190, 20, 132, 216, '#5a2205', '#291003');
  g.strokeStyle = '#1c1917';
  g.lineWidth = 4;
  g.strokeRect(190, 20, 132, 216);
  // Door vertical locking bar
  vGrad(g, 254, 16, 6, 224, '#a8a29e', '#57534e');

  // Yellow & Black Hazard Chevron Bars along the bottom
  for (let x = 0; x < W; x += 32) {
    vGrad(g, x, 236, 16, 20, '#fde047', '#ca8a04');
  }

  // Industrial White Stencil Markings
  g.fillStyle = '#f1f5f9';
  g.font = '900 18px monospace';
  g.fillText('CR BCNHL 22104', 30, 60);
  g.font = 'bold 12px monospace';
  g.fillText('TARE 24.6 T', 30, 84);
  g.fillText('CARRY 64.4 T', 30, 104);
  g.fillText('CENTRAL RAILWAY', 30, 130);
  g.fillText('RETURN 11-2029', 30, 150);

  // White inspection box
  g.strokeStyle = '#f1f5f9';
  g.lineWidth = 2;
  g.strokeRect(360, 48, 110, 70);
  g.font = 'bold 11px monospace';
  g.fillText('NOT TO BE', 374, 72);
  g.fillText('LOOSE SHUNTED', 368, 92);

  applyCornerAO(g, 0, 0, W, H, 0.4);
  return tex(c, false);
}

/** Mumbai Suburban Local AC EMU Livery Texture (Stainless Steel & Royal Purple). */
export function mumbaiLocalLiveryTexture() {
  const W = 512, H = 256;
  const { c, g } = canvas(W, H);

  // Brushed Stainless Steel Silver with gradient
  vGrad(g, 0, 0, W, H, '#f1f5f9', '#94a3b8');
  for (let y = 0; y < H; y += 4) {
    g.fillStyle = (y % 8 === 0) ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)';
    g.fillRect(0, y, W, 2);
  }

  // Mumbai AC Local Royal Purple Bands with soft gradient
  vGrad(g, 0, 36, W, 32, '#7e22ce', '#3b0764');
  vGrad(g, 0, 172, W, 32, '#7e22ce', '#3b0764');

  // Bright Yellow Safety Accents around Doors with soft drop shadow
  for (const dx of [90, 240, 390]) {
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.fillRect(dx - 34, 38, 68, 184);

    vGrad(g, dx - 32, 40, 64, 180, '#fde047', '#eab308');
    // Double sliding doors
    vGrad(g, dx - 28, 48, 26, 172, '#64748b', '#334155');
    vGrad(g, dx + 2, 48, 26, 172, '#64748b', '#334155');
    // Door glass
    vGrad(g, dx - 24, 60, 18, 48, '#38bdf8', '#0f172a');
    vGrad(g, dx + 6, 60, 18, 48, '#38bdf8', '#0f172a');
    // Red footboard warning stripe
    vGrad(g, dx - 32, 218, 64, 8, '#f87171', '#b91c1c');
  }

  // Windows between doors
  for (const wx of [40, 175, 325, 475]) {
    vGrad(g, wx - 20, 80, 40, 64, '#38bdf8', '#090d16');
    g.fillStyle = '#94a3b8';
    g.fillRect(wx - 2, 80, 4, 64);
  }

  // Bright Red LED Destination Signboard
  vGrad(g, 150, 4, 212, 28, '#1e293b', '#09090b');
  g.fillStyle = '#ef4444';
  g.font = '900 12px monospace';
  g.textAlign = 'center';
  g.fillText('चर्चगेट - विरार फास्ट · FAST LOCAL', 256, 23);
  g.textAlign = 'left';

  // First class indicators
  g.fillStyle = '#ef4444';
  g.font = '900 14px system-ui, sans-serif';
  g.fillText('FIRST CLASS', 20, 28);
  g.fillText('प्रथम श्रेणी', 400, 28);

  applyCornerAO(g, 0, 0, W, H, 0.35);
  return tex(c, false);
}

/** Subway Surfers style chunky cartoon obstacle stripe texture (diagonal candy stripes with bevel). */
export function obstacleStripeTexture(color1 = '#ef4444', color2 = '#ffffff') {
  const S = 128;
  const { c, g } = canvas(S, S);
  vGrad(g, 0, 0, S, S, color1, color1);
  g.fillStyle = color2;
  for (let k = -2; k < 6; k++) {
    g.beginPath();
    g.moveTo(k * 32, S);
    g.lineTo(k * 32 + 16, S);
    g.lineTo(k * 32 + 16 + S, 0);
    g.lineTo(k * 32 + S, 0);
    g.closePath();
    g.fill();
  }
  // Soft top highlight bevel & bottom shadow
  const hl = g.createLinearGradient(0, 0, 0, S);
  hl.addColorStop(0, 'rgba(255,255,255,0.4)');
  hl.addColorStop(0.3, 'rgba(255,255,255,0)');
  hl.addColorStop(0.8, 'rgba(0,0,0,0)');
  hl.addColorStop(1, 'rgba(0,0,0,0.4)');
  g.fillStyle = hl;
  g.fillRect(0, 0, S, S);
  return tex(c);
}

/** Classic Railway Station Clock Face (Parchment dial, bold Roman/Arabic numerals, ornate hands). */
export function stationClockTexture() {
  const S = 256;
  const { c, g } = canvas(S, S);

  // Outer bronze / brass bezel
  const bezel = g.createRadialGradient(S / 2, S / 2, S * 0.4, S / 2, S / 2, S * 0.5);
  bezel.addColorStop(0, '#d97706');
  bezel.addColorStop(0.5, '#fde68a');
  bezel.addColorStop(1, '#78350f');
  g.fillStyle = bezel;
  g.beginPath();
  g.arc(S / 2, S / 2, S * 0.49, 0, Math.PI * 2);
  g.fill();

  // Cream parchment dial with soft vignette
  const dial = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S * 0.45);
  dial.addColorStop(0, '#fffbeb');
  dial.addColorStop(0.85, '#fef3c7');
  dial.addColorStop(1, '#d97706');
  g.fillStyle = dial;
  g.beginPath();
  g.arc(S / 2, S / 2, S * 0.44, 0, Math.PI * 2);
  g.fill();

  // Dial markings
  g.strokeStyle = '#1c1917';
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const isHour = i % 3 === 0;
    const r1 = S * (isHour ? 0.34 : 0.38);
    const r2 = S * 0.42;
    g.lineWidth = isHour ? 4 : 2;
    g.beginPath();
    g.moveTo(S / 2 + Math.cos(angle) * r1, S / 2 + Math.sin(angle) * r1);
    g.lineTo(S / 2 + Math.cos(angle) * r2, S / 2 + Math.sin(angle) * r2);
    g.stroke();
  }

  // Clock hands (showing 10:10)
  g.fillStyle = '#1c1917';
  g.lineCap = 'round';
  // Hour hand
  g.lineWidth = 5;
  g.beginPath();
  g.moveTo(S / 2, S / 2);
  g.lineTo(S / 2 - 40, S / 2 - 35);
  g.stroke();
  // Minute hand
  g.lineWidth = 3.5;
  g.beginPath();
  g.moveTo(S / 2, S / 2);
  g.lineTo(S / 2 + 50, S / 2 - 50);
  g.stroke();

  // Central brass cap
  g.fillStyle = '#d97706';
  g.beginPath();
  g.arc(S / 2, S / 2, 8, 0, Math.PI * 2);
  g.fill();

  return tex(c, false);
}

/** Bollywood Cinema Theaters & Movie Billboards (DDLJ, Sholay, RRR, Jawan). */
export function cinemaBillboardTexture(index: number) {
  const W = 512, H = 320;
  const { c, g } = canvas(W, H);

  // Outer Billboard Steel Frame & Glowing Neon Border
  g.fillStyle = '#090d16';
  g.fillRect(0, 0, W, H);
  g.strokeStyle = '#f59e0b';
  g.lineWidth = 8;
  g.strokeRect(4, 4, W - 8, H - 8);

  // 4 Iconic Blockbuster Posters
  if (index % 4 === 0) {
    // 1. DDLJ (Dilwale Dulhania Le Jayenge - Maratha Mandir Record Run)
    const gr = g.createLinearGradient(0, 0, W, H);
    gr.addColorStop(0, '#78350f');
    gr.addColorStop(0.5, '#b45309');
    gr.addColorStop(1, '#f59e0b');
    g.fillStyle = gr;
    g.fillRect(12, 12, W - 24, H - 24);

    g.fillStyle = '#fef08a';
    g.font = '900 32px "Impact", system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillText('DILWALE DULHANIA', W / 2, 70);
    g.fillText('LE JAYENGE', W / 2, 110);

    g.fillStyle = '#ffffff';
    g.font = 'bold 20px "Georgia", serif';
    g.fillText('COME... FALL IN LOVE', W / 2, 155);

    g.fillStyle = '#facc15';
    g.fillRect(60, 190, W - 120, 48);
    g.fillStyle = '#451a03';
    g.font = '900 18px system-ui, sans-serif';
    g.fillText('MARATHA MANDIR · 25+ YEARS', W / 2, 220);

    g.fillStyle = '#fef08a';
    g.font = 'bold 16px system-ui, sans-serif';
    g.fillText('★ HOUSEFULL TODAY ★', W / 2, 275);
  } else if (index % 4 === 1) {
    // 2. SHOLAY (Greatest Action Blockbuster)
    g.fillStyle = '#1c1917';
    g.fillRect(12, 12, W - 24, H - 24);

    g.fillStyle = '#ea580c';
    g.font = '900 48px "Impact", system-ui, sans-serif';
    g.textAlign = 'center';
    g.fillText('SHOLAY', W / 2, 85);

    g.fillStyle = '#fbbf24';
    g.font = '900 20px system-ui, sans-serif';
    g.fillText('शोले · 70MM STEREO SOUND', W / 2, 130);

    g.fillStyle = '#dc2626';
    g.fillRect(50, 160, W - 100, 50);
    g.fillStyle = '#fff';
    g.font = '900 19px system-ui, sans-serif';
    g.fillText('THE GREATEST ACTION FILM', W / 2, 192);

    g.fillStyle = '#94a3b8';
    g.font = 'bold 15px system-ui, sans-serif';
    g.fillText('MINERVA THEATER · RECORD RUN', W / 2, 255);
  } else if (index % 4 === 2) {
    // 3. RRR (Spectacular Blockbuster)
    const gr = g.createLinearGradient(0, 0, W, 0);
    gr.addColorStop(0, '#991b1b');
    gr.addColorStop(1, '#0284c7');
    g.fillStyle = gr;
    g.fillRect(12, 12, W - 24, H - 24);

    g.fillStyle = '#facc15';
    g.font = '900 64px "Arial Black", sans-serif';
    g.textAlign = 'center';
    g.fillText('R R R', W / 2, 95);

    g.fillStyle = '#ffffff';
    g.font = '800 20px system-ui, sans-serif';
    g.fillText('RISE · ROAR · REVOLT', W / 2, 145);

    g.fillStyle = '#0f172a';
    g.fillRect(60, 180, W - 120, 48);
    g.fillStyle = '#38bdf8';
    g.font = '900 18px system-ui, sans-serif';
    g.fillText('S.S. RAJAMOULI SPECTACLE', W / 2, 210);

    g.fillStyle = '#fbbf24';
    g.font = 'bold 16px system-ui, sans-serif';
    g.fillText('WINNER OSCAR® AWARD', W / 2, 270);
  } else {
    // 4. JAWAN (Blockbuster Action)
    g.fillStyle = '#09090b';
    g.fillRect(12, 12, W - 24, H - 24);

    g.fillStyle = '#ef4444';
    g.font = '900 52px "Impact", sans-serif';
    g.textAlign = 'center';
    g.fillText('JAWAN', W / 2, 85);

    g.fillStyle = '#fbbf24';
    g.font = '900 20px system-ui, sans-serif';
    g.fillText('READY CHIEF!', W / 2, 130);

    g.fillStyle = '#1e293b';
    g.fillRect(60, 165, W - 120, 50);
    g.fillStyle = '#f8fafc';
    g.font = '900 20px system-ui, sans-serif';
    g.fillText('SHAH RUKH KHAN', W / 2, 196);

    g.fillStyle = '#ef4444';
    g.font = 'bold 16px system-ui, sans-serif';
    g.fillText('ALL TIME ALL INDIA BLOCKBUSTER', W / 2, 260);
  }

  return tex(c, false);
}

/** Mumbai Landmark Themed Gantries crossing over railway corridor. */
export function landmarkGantryTexture(index: number) {
  const W = 512, H = 140;
  const { c, g } = canvas(W, H);

  const landmarks = [
    { hi: 'मरीन ड्राइव', en: "MARINE DRIVE · QUEEN'S NECKLACE", top: '#0284c7', bot: '#075985', text: '#ffffff' },
    { hi: 'बांद्रा बैंडस्टैंड', en: 'BANDRA BANDSTAND PROMENADE', top: '#0d9488', bot: '#115e59', text: '#fef08a' },
    { hi: 'छत्रपति शिवाजी टर्मिनस', en: 'CSMT HERITAGE TERMINAL', top: '#9d174d', bot: '#701a35', text: '#fef08a' },
    { hi: 'जुहू बीच', en: 'JUHU BEACH · SUNSET SHORE', top: '#ea580c', bot: '#9a3412', text: '#ffffff' },
    { hi: 'गेटवे ऑफ इंडिया', en: 'GATEWAY OF INDIA · MUMBAI', top: '#1d4ed8', bot: '#1e3a8a', text: '#facc15' },
    { hi: 'दादर फूल मार्केट', en: 'DADAR FLOWER MARKET', top: '#16a34a', bot: '#166534', text: '#ffffff' },
  ];
  const lm = landmarks[index % landmarks.length];

  vGrad(g, 0, 0, W, H, lm.top, lm.bot);
  applyCornerAO(g, 0, 0, W, H, 0.25);

  // Border with top highlight
  g.strokeStyle = '#ffffff';
  g.lineWidth = 5;
  g.strokeRect(6, 6, W - 12, H - 12);
  g.fillStyle = 'rgba(255, 255, 255, 0.45)';
  g.fillRect(8, 8, W - 16, 4);

  // Bilingual Landmark Typography
  g.fillStyle = lm.text;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = 'bold 36px "Noto Sans Devanagari", system-ui, sans-serif';
  g.fillText(lm.hi, W / 2, 45);
  g.font = '900 22px system-ui, sans-serif';
  g.fillText(lm.en, W / 2, 95);

  return tex(c, false);
}

/** Authentic Indian street shops (Chai, Medical, Pav Bhaji, Jewellery). */
export function indianShopTexture(index: number) {
  const S = 256;
  const { c, g } = canvas(S, S);

  const shops = [
    { hi: 'चाय & समोसा', en: 'BOMBAY CHAI & CAFE', top: '#d97706', bot: '#78350f', bannerTop: '#b45309', bannerBot: '#451a03' },
    { hi: 'अपना मेडिकल', en: 'APNA PHARMACY 24/7', top: '#16a34a', bot: '#14532d', bannerTop: '#15803d', bannerBot: '#052e16' },
    { hi: 'मुंबई पाव भाजी', en: 'MUMBAI PAV BHAJI', top: '#ea580c', bot: '#9a3412', bannerTop: '#c2410c', bannerBot: '#431407' },
    { hi: 'कल्याण ज्वैलर्स', en: 'KALYAN JEWELLERS', top: '#4338ca', bot: '#1e1b4b', bannerTop: '#3730a3', bannerBot: '#0f172a' },
  ];
  const sh = shops[index % shops.length];

  // Shop building wall with gradient & AO
  vGrad(g, 0, 0, S, S, '#f1f5f9', '#cbd5e1');

  // Shop canopy awning with soft scalloped shading
  for (let x = 0; x < S; x += 32) {
    if (x % 64 === 0) vGrad(g, x, 0, 32, 50, sh.top, sh.bot);
    else vGrad(g, x, 0, 32, 50, '#ffffff', '#e2e8f0');
    // Drop shadow under awning
    g.fillStyle = 'rgba(0,0,0,0.2)';
    g.fillRect(x, 46, 32, 4);
  }

  // Shop Signboard
  vGrad(g, 10, 52, S - 20, 60, sh.bannerTop, sh.bannerBot);
  g.strokeStyle = '#facc15';
  g.lineWidth = 3;
  g.strokeRect(10, 52, S - 20, 60);

  g.fillStyle = '#fef08a';
  g.textAlign = 'center';
  g.font = 'bold 22px "Noto Sans Devanagari", sans-serif';
  g.fillText(sh.hi, S / 2, 78);
  g.font = '800 13px system-ui, sans-serif';
  g.fillText(sh.en, S / 2, 100);

  // Rolling steel shutter (closed/open shop front) with gradient slats
  vGrad(g, 16, 120, S - 32, 130, '#94a3b8', '#475569');
  for (let y = 120; y < S - 6; y += 8) {
    g.fillStyle = 'rgba(255,255,255,0.25)';
    g.fillRect(16, y, S - 32, 2);
    g.fillStyle = 'rgba(0,0,0,0.3)';
    g.fillRect(16, y + 6, S - 32, 2);
  }

  applyCornerAO(g, 0, 0, S, S, 0.3);
  return tex(c, false);
}
