// ============================================================================
// Subway Surfers: Aetheris Developer Open World & Drivable Train Engine (v3.0)
// Features:
//   - Ctrl + 2 Developer Open World Sandbox
//   - Full 360° 3D Open World roaming (WASD/Sprint/Jump/Fly/Crouch)
//   - Drivable Multi-Coach Trains (2-3 coaches, Vande Bharat, ICF, Mumbai Local, Freight)
//   - Train Garage Depot with Roof Parkour & High-Voltage Hazard Floor
//   - Kerala-Inspired Backwaters Lake with Houseboat (Kettuvallam) & Palms
//   - KSRTC "Aana Vandi" Bus Stand / Terminal
//   - St. Xavier's Heritage High School with playground & school bus
//   - Cyberpunk Neon Night City Quarter with skyscrapers
//   - Volcanic Lava Mode with magma lake & stepping stone parkour
//   - Procedural Web Audio: Diesel engine chug, dual-tone horn, rail rhythm
// ============================================================================

(function () {
  'use strict';

  // State flags
  window.__devOpenWorldActive = false;
  window.__isDrivingTrain = false;
  window.__currentTrain = null;
  window.__floorIsLava = false;
  window.__flyMode = false;

  let scene, camera, renderer, playerGroup, soundSys;
  let devSceneGroup = null;
  let openWorldCamera = null;
  let camTheta = 0;       // horizontal orbit angle
  let camPhi = 0.35;      // vertical pitch angle
  let camDist = 7.5;      // distance from player
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  // Player physics in Open World
  const playerState = {
    x: 0,
    y: 0,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    yaw: 0,
    grounded: true,
    sprinting: false,
    speed: 9,
    jumpPower: 11,
    height: 1.6,
    godMode: true
  };

  // Keyboard input state
  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    crouch: false,
    drive: false,
    horn: false,
    fly: false
  };

  // Train management
  const worldTrains = [];
  let trainAudioCtx = null;
  let trainEngineOsc = null;
  let trainEngineGain = null;
  let trainHornOsc1 = null;
  let trainHornOsc2 = null;
  let trainHornGain = null;
  let trainChugTimer = 0;

  // Thematic landmark zones definitions for teleport & minimap
  const LANDMARKS = [
    { id: 'lake', name: 'Kerala Backwaters Lake', icon: '🌴', x: -65, z: 40, y: 0.5 },
    { id: 'garage', name: 'Train Garage / Depot', icon: '🏭', x: 28, z: -140, y: 0.2 },
    { id: 'bus', name: 'KSRTC Bus Terminal', icon: '🚌', x: -28, z: -40, y: 0.2 },
    { id: 'school', name: 'Heritage High School', icon: '🏫', x: -55, z: -110, y: 0.2 },
    { id: 'nightcity', name: 'Neon Night City', icon: '🌃', x: 55, z: 20, y: 0.2 },
    { id: 'lava', name: 'Volcanic Lava Rift', icon: '🌋', x: 0, z: -250, y: 0.5 },
    { id: 'tracks', name: 'Main Railway Station', icon: '🚊', x: 0, z: 0, y: 0.2 }
  ];

  // Colliders for rooftops, platforms, and ground
  const solidBoxes = [];

  // ==========================================================================
  // PROCEDURAL AUDIO SYNTHESIZER
  // ==========================================================================
  function initTrainAudio() {
    if (trainAudioCtx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      trainAudioCtx = new AudioCtx();

      // Diesel Engine Rumble
      trainEngineOsc = trainAudioCtx.createOscillator();
      trainEngineOsc.type = 'sawtooth';
      trainEngineOsc.frequency.setValueAtTime(38, trainAudioCtx.currentTime);

      const filter = trainAudioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, trainAudioCtx.currentTime);

      trainEngineGain = trainAudioCtx.createGain();
      trainEngineGain.gain.setValueAtTime(0, trainAudioCtx.currentTime);

      trainEngineOsc.connect(filter);
      filter.connect(trainEngineGain);
      trainEngineGain.connect(trainAudioCtx.destination);
      trainEngineOsc.start();

      // Horn System
      trainHornGain = trainAudioCtx.createGain();
      trainHornGain.gain.setValueAtTime(0, trainAudioCtx.currentTime);

      trainHornOsc1 = trainAudioCtx.createOscillator();
      trainHornOsc1.type = 'sawtooth';
      trainHornOsc1.frequency.setValueAtTime(311.13, trainAudioCtx.currentTime); // Eb4

      trainHornOsc2 = trainAudioCtx.createOscillator();
      trainHornOsc2.type = 'triangle';
      trainHornOsc2.frequency.setValueAtTime(392.00, trainAudioCtx.currentTime); // G4

      const hornFilter = trainAudioCtx.createBiquadFilter();
      hornFilter.type = 'bandpass';
      hornFilter.frequency.setValueAtTime(450, trainAudioCtx.currentTime);
      hornFilter.Q.setValueAtTime(2, trainAudioCtx.currentTime);

      trainHornOsc1.connect(hornFilter);
      trainHornOsc2.connect(hornFilter);
      hornFilter.connect(trainHornGain);
      trainHornGain.connect(trainAudioCtx.destination);

      trainHornOsc1.start();
      trainHornOsc2.start();
    } catch (e) {
      console.warn('Audio init warning:', e);
    }
  }

  function playSoundChime(type) {
    try {
      if (!trainAudioCtx) initTrainAudio();
      if (!trainAudioCtx) return;
      if (trainAudioCtx.state === 'suspended') trainAudioCtx.resume();

      const now = trainAudioCtx.currentTime;
      if (type === 'dev_warp') {
        // Ascending sci-fi chord arpeggio
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
          const osc = trainAudioCtx.createOscillator();
          const g = trainAudioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          g.gain.setValueAtTime(0.001, now + idx * 0.06);
          g.gain.linearRampToValueAtTime(0.12, now + idx * 0.06 + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);
          osc.connect(g);
          g.connect(trainAudioCtx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + idx * 0.06 + 0.4);
        });
      } else if (type === 'splash') {
        const osc = trainAudioCtx.createOscillator();
        const g = trainAudioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.25);
        g.gain.setValueAtTime(0.18, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(g);
        g.connect(trainAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
      } else if (type === 'lava_sizzle') {
        const osc = trainAudioCtx.createOscillator();
        const g = trainAudioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.linearRampToValueAtTime(260, now + 0.3);
        g.gain.setValueAtTime(0.25, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(g);
        g.connect(trainAudioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      }
    } catch (e) {}
  }

  function playTrainHornSound(start) {
    if (!trainAudioCtx || !trainHornGain) return;
    try {
      if (trainAudioCtx.state === 'suspended') trainAudioCtx.resume();
      const now = trainAudioCtx.currentTime;
      if (start) {
        trainHornGain.gain.cancelScheduledValues(now);
        trainHornGain.gain.setValueAtTime(trainHornGain.gain.value, now);
        trainHornGain.gain.linearRampToValueAtTime(0.35, now + 0.08);
      } else {
        trainHornGain.gain.cancelScheduledValues(now);
        trainHornGain.gain.setValueAtTime(trainHornGain.gain.value, now);
        trainHornGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
      }
    } catch (e) {}
  }

  function updateTrainEngineAudio(speedRatio) {
    if (!trainAudioCtx || !trainEngineOsc || !trainEngineGain) return;
    try {
      const now = trainAudioCtx.currentTime;
      if (speedRatio > 0.02) {
        const targetFreq = 38 + speedRatio * 85;
        const targetVol = Math.min(0.24, 0.05 + speedRatio * 0.19);
        trainEngineOsc.frequency.setTargetAtTime(targetFreq, now, 0.1);
        trainEngineGain.gain.setTargetAtTime(targetVol, now, 0.1);
      } else {
        trainEngineGain.gain.setTargetAtTime(0, now, 0.15);
      }
    } catch (e) {}
  }

  // ==========================================================================
  // PROCEDURAL 3D BUILDINGS & THEMATIC ZONES
  // ==========================================================================
  function createOpenWorldMap(T) {
    const group = new THREE.Group();
    group.name = 'OpenWorldThematicMap';

    // Materials Palette (High-fidelity PBR)
    const matWoodDark = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.85, metalness: 0.05 });
    const matWoodDeck = new THREE.MeshStandardMaterial({ color: 0xb58048, roughness: 0.75, metalness: 0.02 });
    const matThatch = new THREE.MeshStandardMaterial({ color: 0x8a6231, roughness: 0.95, metalness: 0.0 });
    const matPalmBark = new THREE.MeshStandardMaterial({ color: 0x5c4228, roughness: 0.88, metalness: 0.0 });
    const matPalmLeaf = new THREE.MeshStandardMaterial({ color: 0x228b22, roughness: 0.6, metalness: 0.05, side: THREE.DoubleSide });
    const matKsrtcRed = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.45, metalness: 0.25 });
    const matKsrtcYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4, metalness: 0.2 });
    const matBusGlass = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.15, metalness: 0.8, transparent: true, opacity: 0.75 });
    const matTire = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.9, metalness: 0.1 });
    const matChrome = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.15, metalness: 0.95 });
    const matSchoolBrick = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8, metalness: 0.05 });
    const matSchoolCream = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.75, metalness: 0.05 });
    const matSchoolRoof = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7, metalness: 0.1 });
    const matCyberDark = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.35, metalness: 0.8 });
    const matCyberGlass = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.9 });
    const matIndustrialSteel = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.65 });
    const matHazardYellow = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.5, metalness: 0.2 });
    const matLavaRock = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.95, metalness: 0.1 });

    // Procedural Glowing Magma Texture
    const lavaCanvas = document.createElement('canvas');
    lavaCanvas.width = 256;
    lavaCanvas.height = 256;
    const lCtx = lavaCanvas.getContext('2d');
    const grad = lCtx.createRadialGradient(128, 128, 20, 128, 128, 128);
    grad.addColorStop(0, '#fef08a');
    grad.addColorStop(0.3, '#f97316');
    grad.addColorStop(0.7, '#dc2626');
    grad.addColorStop(1, '#450a0a');
    lCtx.fillStyle = grad;
    lCtx.fillRect(0, 0, 256, 256);
    // Draw crackled magma veins
    lCtx.strokeStyle = '#ffedd5';
    lCtx.lineWidth = 4;
    for (let v = 0; v < 18; v++) {
      lCtx.beginPath();
      lCtx.moveTo(Math.random() * 256, Math.random() * 256);
      lCtx.lineTo(Math.random() * 256, Math.random() * 256);
      lCtx.stroke();
    }
    const lavaTex = new THREE.CanvasTexture(lavaCanvas);
    lavaTex.wrapS = THREE.RepeatWrapping;
    lavaTex.wrapT = THREE.RepeatWrapping;
    lavaTex.repeat.set(6, 6);
    const matLavaMolten = new THREE.MeshStandardMaterial({
      map: lavaTex,
      emissive: 0xff3b00,
      emissiveIntensity: 0.85,
      roughness: 0.6
    });

    // ------------------------------------------------------------------------
    // 1. KERALA-INSPIRED BACKWATERS LAKE (West: x = -65, z = 40)
    // ------------------------------------------------------------------------
    const lakeRoot = new THREE.Group();
    lakeRoot.position.set(-65, 0, 40);

    // Lake water body
    const waterGeo = new THREE.PlaneGeometry(120, 90, 32, 32);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.08,
      metalness: 0.45,
      transparent: true,
      opacity: 0.82
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, -0.25, 0);
    lakeRoot.add(waterMesh);

    // Sandy bank rim
    const bankGeo = new THREE.RingGeometry(42, 60, 24);
    const bankMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 });
    const bankMesh = new THREE.Mesh(bankGeo, bankMat);
    bankMesh.rotation.x = -Math.PI / 2;
    bankMesh.position.set(0, -0.22, 0);
    lakeRoot.add(bankMesh);

    // Kerala Kettuvallam (Traditional Houseboat)
    const houseboat = new THREE.Group();
    houseboat.name = 'KeralaHouseboat';
    // Wooden Hull
    const hullGeo = new THREE.CylinderGeometry(3.2, 2.6, 22, 12, 1, false, 0, Math.PI);
    const hull = new THREE.Mesh(hullGeo, matWoodDark);
    hull.rotation.z = Math.PI / 2;
    hull.rotation.y = Math.PI / 2;
    hull.position.set(0, 0.4, 0);
    hull.castShadow = true;
    houseboat.add(hull);

    // Thatched Roof Cabin (Valavara)
    const roofGeo = new THREE.CylinderGeometry(2.8, 2.8, 14, 16, 1, true, 0, Math.PI);
    const roof = new THREE.Mesh(roofGeo, matThatch);
    roof.rotation.z = Math.PI / 2;
    roof.rotation.y = Math.PI / 2;
    roof.position.set(0, 1.8, 0);
    roof.castShadow = true;
    houseboat.add(roof);

    // Deck & Walkway
    const deckGeo = new THREE.BoxGeometry(4.8, 0.35, 20);
    const deck = new THREE.Mesh(deckGeo, matWoodDeck);
    deck.position.set(0, 0.8, 0);
    deck.castShadow = true;
    houseboat.add(deck);

    // Brass Lantern on bow
    const lanternGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const lanternMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.9 });
    const lantern = new THREE.Mesh(lanternGeo, lanternMat);
    lantern.position.set(0, 1.9, 9.8);
    houseboat.add(lantern);

    houseboat.position.set(-6, 0.1, 8);
    houseboat.rotation.y = 0.35;
    lakeRoot.add(houseboat);
    solidBoxes.push({ minX: -76, maxX: -54, minZ: 30, maxZ: 50, topY: 1.2 });

    // Chinese Fishing Nets (Cheena Vala)
    for (let cfn = 0; cfn < 2; cfn++) {
      const netGroup = new THREE.Group();
      netGroup.position.set(16 + cfn * 16, 0, -18 + cfn * 12);
      // Cantilever wooden timber poles
      const poleGeo = new THREE.CylinderGeometry(0.18, 0.22, 14, 6);
      const mainPole = new THREE.Mesh(poleGeo, matWoodDark);
      mainPole.rotation.z = -0.55;
      mainPole.position.set(4, 5, 0);
      mainPole.castShadow = true;
      netGroup.add(mainPole);

      // Web Net mesh
      const netMeshGeo = new THREE.PlaneGeometry(8, 8);
      const netMeshMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, wireframe: true, transparent: true, opacity: 0.75 });
      const netMesh = new THREE.Mesh(netMeshGeo, netMeshMat);
      netMesh.rotation.x = -Math.PI / 2 + 0.3;
      netMesh.position.set(7.5, 1.5, 0);
      netGroup.add(netMesh);
      lakeRoot.add(netGroup);
    }

    // Coconut Palms
    function buildPalmTree(x, z, lean) {
      const palm = new THREE.Group();
      palm.position.set(x, 0, z);
      // Segmented curved trunk
      for (let s = 0; s < 7; s++) {
        const segGeo = new THREE.CylinderGeometry(0.32 - s * 0.02, 0.38 - s * 0.02, 1.4, 8);
        const seg = new THREE.Mesh(segGeo, matPalmBark);
        seg.position.set(s * lean * 0.35, s * 1.25 + 0.7, 0);
        seg.rotation.z = -lean * 0.08 * s;
        seg.castShadow = true;
        palm.add(seg);
      }
      // Fronds canopy
      const crownY = 8.8;
      const crownX = 6 * lean * 0.35;
      for (let f = 0; f < 8; f++) {
        const ang = (f / 8) * Math.PI * 2;
        const frondGeo = new THREE.PlaneGeometry(1.4, 5.2);
        const frond = new THREE.Mesh(frondGeo, matPalmLeaf);
        frond.position.set(crownX + Math.cos(ang) * 1.8, crownY, Math.sin(ang) * 1.8);
        frond.rotation.y = ang;
        frond.rotation.x = 0.6;
        palm.add(frond);
      }
      return palm;
    }

    lakeRoot.add(buildPalmTree(-22, -18, 0.6));
    lakeRoot.add(buildPalmTree(-18, 24, -0.5));
    lakeRoot.add(buildPalmTree(24, 28, 0.4));
    lakeRoot.add(buildPalmTree(28, -26, -0.6));
    lakeRoot.add(buildPalmTree(-32, 6, 0.5));
    group.add(lakeRoot);

    // ------------------------------------------------------------------------
    // 2. KSRTC BUS TERMINAL / BUS STAND (Southwest: x = -28, z = -40)
    // ------------------------------------------------------------------------
    const busRoot = new THREE.Group();
    busRoot.position.set(-28, 0, -40);

    // Concrete apron floor
    const busFloorGeo = new THREE.BoxGeometry(44, 0.4, 50);
    const busFloorMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85 });
    const busFloor = new THREE.Mesh(busFloorGeo, busFloorMat);
    busFloor.position.set(0, 0.1, 0);
    busFloor.receiveShadow = true;
    busRoot.add(busFloor);

    // Terminal Building Shelter
    const canopyGeo = new THREE.BoxGeometry(38, 0.5, 14);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.5, metalness: 0.4 });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.set(0, 6.2, -16);
    canopy.castShadow = true;
    busRoot.add(canopy);

    // Pillars for canopy
    for (let p = -16; p <= 16; p += 8) {
      const pillarGeo = new THREE.CylinderGeometry(0.25, 0.25, 6, 8);
      const pillar = new THREE.Mesh(pillarGeo, matIndustrialSteel);
      pillar.position.set(p, 3.1, -16);
      pillar.castShadow = true;
      busRoot.add(pillar);
    }

    // Terminal Signboard
    const signCanvas = document.createElement('canvas');
    signCanvas.width = 512;
    signCanvas.height = 128;
    const sCtx = signCanvas.getContext('2d');
    sCtx.fillStyle = '#0369a1';
    sCtx.fillRect(0, 0, 512, 128);
    sCtx.fillStyle = '#facc15';
    sCtx.font = 'bold 36px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('KSRTC BUS TERMINAL', 256, 52);
    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 22px sans-serif';
    sCtx.fillText('ആനവണ്ടി ബസ് സ്റ്റാൻഡ് • PLATFORMS 1 - 4', 256, 96);
    const terminalSignTex = new THREE.CanvasTexture(signCanvas);
    const termSign = new THREE.Mesh(new THREE.PlaneGeometry(16, 3), new THREE.MeshStandardMaterial({ map: terminalSignTex }));
    termSign.position.set(0, 6.8, -8.9);
    busRoot.add(termSign);

    // KSRTC "Aana Vandi" Bus Builder
    function createKsrtcBus(colorTop, colorBottom, busLabel) {
      const bus = new THREE.Group();
      // Main Lower Body
      const bodyLow = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 11), colorBottom);
      bodyLow.position.set(0, 1.6, 0);
      bodyLow.castShadow = true;
      bus.add(bodyLow);

      // Upper Cabin
      const bodyHigh = new THREE.Mesh(new THREE.BoxGeometry(3.15, 1.6, 10.8), colorTop);
      bodyHigh.position.set(0, 3.1, 0);
      bodyHigh.castShadow = true;
      bus.add(bodyHigh);

      // Windows band
      const winGeo = new THREE.BoxGeometry(3.22, 1.1, 9.4);
      const wins = new THREE.Mesh(winGeo, matBusGlass);
      wins.position.set(0, 3.1, -0.2);
      bus.add(wins);

      // Front Windshield
      const windShield = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.4), matBusGlass);
      windShield.position.set(0, 3.1, 5.42);
      bus.add(windShield);

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.45, 16);
      wheelGeo.rotateZ(Math.PI / 2);
      [
        [-1.6, 0.65, 3.2], [1.6, 0.65, 3.2],
        [-1.6, 0.65, -3.2], [1.6, 0.65, -3.2]
      ].forEach(pos => {
        const wh = new THREE.Mesh(wheelGeo, matTire);
        wh.position.set(pos[0], pos[1], pos[2]);
        wh.castShadow = true;
        bus.add(wh);
      });

      // Destination Board Canvas
      const destCanvas = document.createElement('canvas');
      destCanvas.width = 256;
      destCanvas.height = 64;
      const dCtx = destCanvas.getContext('2d');
      dCtx.fillStyle = '#000';
      dCtx.fillRect(0, 0, 256, 64);
      dCtx.fillStyle = '#facc15';
      dCtx.font = 'bold 24px sans-serif';
      dCtx.textAlign = 'center';
      dCtx.fillText(busLabel, 128, 42);
      const destTex = new THREE.CanvasTexture(destCanvas);
      const destMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.55), new THREE.MeshStandardMaterial({ map: destTex }));
      destMesh.position.set(0, 4.0, 5.42);
      bus.add(destMesh);

      return bus;
    }

    const bus1 = createKsrtcBus(matKsrtcYellow, matKsrtcRed, 'KOCHI - MUNNAR');
    bus1.position.set(-11, 0.2, 2);
    busRoot.add(bus1);

    const bus2 = createKsrtcBus(matKsrtcYellow, matKsrtcRed, 'TRIVANDRUM EXP');
    bus2.position.set(0, 0.2, 2);
    busRoot.add(bus2);

    const bus3 = createKsrtcBus(new THREE.MeshStandardMaterial({ color: 0x10b981 }), new THREE.MeshStandardMaterial({ color: 0x064e3b }), 'MINNAL FAST');
    bus3.position.set(11, 0.2, 2);
    busRoot.add(bus3);

    // Auto-Rickshaw Stand
    for (let r = 0; r < 2; r++) {
      const autoRickshaw = new THREE.Group();
      autoRickshaw.position.set(16, 0.2, -18 + r * 5);
      const autoBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.4, 2.6), new THREE.MeshStandardMaterial({ color: 0xeab308 }));
      autoBody.position.set(0, 0.9, 0);
      autoRickshaw.add(autoBody);
      const autoRoof = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.4, 2.7), new THREE.MeshStandardMaterial({ color: 0x15803d }));
      autoRoof.position.set(0, 1.7, 0);
      autoRickshaw.add(autoRoof);
      busRoot.add(autoRickshaw);
    }

    group.add(busRoot);
    solidBoxes.push({ minX: -50, maxX: -6, minZ: -65, maxZ: -15, topY: 4.8 });

    // ------------------------------------------------------------------------
    // 3. HERITAGE HIGH SCHOOL & PLAYGROUND (Southwest: x = -55, z = -110)
    // ------------------------------------------------------------------------
    const schoolRoot = new THREE.Group();
    schoolRoot.position.set(-55, 0, -110);

    // Main Academic Building
    const schoolMain = new THREE.Mesh(new THREE.BoxGeometry(32, 10, 14), matSchoolBrick);
    schoolMain.position.set(0, 5, 0);
    schoolMain.castShadow = true;
    schoolRoot.add(schoolMain);

    // Roof
    const sRoofGeo = new THREE.ConeGeometry(8, 5, 4);
    sRoofGeo.rotateY(Math.PI / 4);
    const clockRoof = new THREE.Mesh(sRoofGeo, matSchoolRoof);
    clockRoof.position.set(0, 15.5, 0);
    schoolRoot.add(clockRoof);

    // Clock Tower
    const towerGeo = new THREE.BoxGeometry(6, 6, 6);
    const tower = new THREE.Mesh(towerGeo, matSchoolCream);
    tower.position.set(0, 12, 0);
    tower.castShadow = true;
    schoolRoot.add(tower);

    // Entrance Portico with pillars
    for (let col = -4; col <= 4; col += 2.6) {
      const colGeo = new THREE.CylinderGeometry(0.35, 0.35, 6, 12);
      const column = new THREE.Mesh(colGeo, matSchoolCream);
      column.position.set(col, 3, 8.2);
      column.castShadow = true;
      schoolRoot.add(column);
    }

    // Yellow School Bus
    const yellowSchoolBus = createKsrtcBus(new THREE.MeshStandardMaterial({ color: 0xfacc15 }), new THREE.MeshStandardMaterial({ color: 0xeab308 }), 'ST. XAVIERS BUS');
    yellowSchoolBus.position.set(-8, 0.2, 18);
    yellowSchoolBus.rotation.y = Math.PI / 2;
    schoolRoot.add(yellowSchoolBus);

    // Sports Field & Football Goalposts
    const fieldGeo = new THREE.PlaneGeometry(36, 24);
    const fieldMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });
    const field = new THREE.Mesh(fieldGeo, fieldMat);
    field.rotation.x = -Math.PI / 2;
    field.position.set(32, 0.05, 10);
    schoolRoot.add(field);

    // Goalposts
    const goalGeo = new THREE.BoxGeometry(0.15, 2.2, 4.5);
    const goalPost = new THREE.Mesh(goalGeo, new THREE.MeshStandardMaterial({ color: 0xffffff }));
    goalPost.position.set(16, 1.1, 10);
    schoolRoot.add(goalPost);

    // School Flagpole with Tricolor
    const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 12, 8), matChrome);
    poleMesh.position.set(0, 6, 12);
    schoolRoot.add(poleMesh);

    const flagGeo = new THREE.PlaneGeometry(2.4, 1.5);
    const flagCanvas = document.createElement('canvas');
    flagCanvas.width = 128;
    flagCanvas.height = 80;
    const flCtx = flagCanvas.getContext('2d');
    flCtx.fillStyle = '#ff9933'; flCtx.fillRect(0, 0, 128, 27);
    flCtx.fillStyle = '#ffffff'; flCtx.fillRect(0, 27, 128, 26);
    flCtx.fillStyle = '#128807'; flCtx.fillRect(0, 53, 128, 27);
    flCtx.fillStyle = '#000088'; flCtx.beginPath(); flCtx.arc(64, 40, 8, 0, Math.PI * 2); flCtx.stroke();
    const flagMat = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(flagCanvas), side: THREE.DoubleSide });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(1.2, 11, 12);
    schoolRoot.add(flag);

    group.add(schoolRoot);
    solidBoxes.push({ minX: -72, maxX: -38, minZ: -120, maxZ: -98, topY: 10.2 });

    // ------------------------------------------------------------------------
    // 4. CYBERPUNK NEON NIGHT CITY (East: x = 55, z = 20)
    // ------------------------------------------------------------------------
    const cityRoot = new THREE.Group();
    cityRoot.position.set(55, 0, 20);

    const towers = [
      { x: -14, z: -18, w: 14, d: 14, h: 58, neon: 0x00f0ff },
      { x: 14, z: -18, w: 16, d: 16, h: 75, neon: 0xec4899 },
      { x: -12, z: 18, w: 15, d: 15, h: 64, neon: 0x38bdf8 },
      { x: 16, z: 18, w: 18, d: 18, h: 86, neon: 0xa855f7 },
      { x: 0, z: 0, w: 12, d: 12, h: 96, neon: 0xfacc15 }
    ];

    towers.forEach(t => {
      const towerMesh = new THREE.Mesh(new THREE.BoxGeometry(t.w, t.h, t.d), matCyberDark);
      towerMesh.position.set(t.x, t.h / 2, t.z);
      towerMesh.castShadow = true;
      cityRoot.add(towerMesh);

      // Neon Crown Trim
      const trimGeo = new THREE.BoxGeometry(t.w + 0.6, 1.2, t.d + 0.6);
      const trimMat = new THREE.MeshStandardMaterial({ color: t.neon, emissive: t.neon, emissiveIntensity: 0.95 });
      const trim = new THREE.Mesh(trimGeo, trimMat);
      trim.position.set(t.x, t.h - 0.6, t.z);
      cityRoot.add(trim);

      // Antennas with blinking beacon
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 8, 6), matChrome);
      ant.position.set(t.x, t.h + 4, t.z);
      cityRoot.add(ant);

      const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.35, 6, 6), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
      beacon.position.set(t.x, t.h + 8, t.z);
      cityRoot.add(beacon);

      solidBoxes.push({
        minX: 55 + t.x - t.w / 2,
        maxX: 55 + t.x + t.w / 2,
        minZ: 20 + t.z - t.d / 2,
        maxZ: 20 + t.z + t.d / 2,
        topY: t.h
      });
    });

    group.add(cityRoot);

    // ------------------------------------------------------------------------
    // 5. TRAIN GARAGE / DEPOT WITH ROOF PARKOUR (North: x = 28, z = -140)
    // ------------------------------------------------------------------------
    const depotRoot = new THREE.Group();
    depotRoot.position.set(28, 0, -140);

    // Hangar Main Shed
    const hangarGeo = new THREE.BoxGeometry(42, 14, 60);
    const hangarMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, wireframe: false });
    const hangar = new THREE.Mesh(hangarGeo, hangarMat);
    hangar.position.set(0, 7, 0);
    hangar.castShadow = true;
    depotRoot.add(hangar);

    // Elevated Catwalks connecting roofs
    const catwalkGeo = new THREE.BoxGeometry(38, 0.4, 4);
    const catwalkMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4, metalness: 0.8 });
    const catwalk = new THREE.Mesh(catwalkGeo, catwalkMat);
    catwalk.position.set(0, 10.5, 0);
    catwalk.castShadow = true;
    depotRoot.add(catwalk);

    // Gantry Crane
    const gantry = new THREE.Mesh(new THREE.BoxGeometry(40, 2, 3), matHazardYellow);
    gantry.position.set(0, 13.5, -8);
    depotRoot.add(gantry);

    // Stacked shipping containers for parkour
    const containerColors = [0xb91c1c, 0x1d4ed8, 0x047857, 0xd97706];
    for (let c = 0; c < 8; c++) {
      const cMat = new THREE.MeshStandardMaterial({ color: containerColors[c % 4], roughness: 0.6, metalness: 0.3 });
      const cMesh = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.2, 8), cMat);
      const side = (c % 2 === 0) ? -16 : 16;
      const stack = Math.floor(c / 2);
      cMesh.position.set(side, stack * 3.3 + 1.6, -18 + (stack % 3) * 12);
      cMesh.castShadow = true;
      depotRoot.add(cMesh);

      solidBoxes.push({
        minX: 28 + side - 1.8,
        maxX: 28 + side + 1.8,
        minZ: -140 - 18 + (stack % 3) * 12 - 4.2,
        maxZ: -140 - 18 + (stack % 3) * 12 + 4.2,
        topY: stack * 3.3 + 3.2
      });
    }

    group.add(depotRoot);
    solidBoxes.push({ minX: 7, maxX: 49, minZ: -170, maxZ: -110, topY: 14.2 });

    // ------------------------------------------------------------------------
    // 6. VOLCANIC LAVA ZONE (Far North: x = 0, z = -250)
    // ------------------------------------------------------------------------
    const lavaRoot = new THREE.Group();
    lavaRoot.position.set(0, 0, -250);

    // Molten Lava Lake Floor
    const lavaFloorGeo = new THREE.PlaneGeometry(90, 80, 24, 24);
    const lavaMesh = new THREE.Mesh(lavaFloorGeo, matLavaMolten);
    lavaMesh.rotation.x = -Math.PI / 2;
    lavaMesh.position.set(0, -0.4, 0);
    lavaRoot.add(lavaMesh);

    // Stepping Stone Pillars across Lava
    for (let p = 0; p < 12; p++) {
      const px = ((p % 4) - 1.5) * 8.5;
      const pz = Math.floor(p / 4) * 14 - 18;
      const h = 1.8 + Math.sin(p) * 0.8;
      const pillarGeo = new THREE.CylinderGeometry(2.4, 2.8, h, 8);
      const pillar = new THREE.Mesh(pillarGeo, matLavaRock);
      pillar.position.set(px, h / 2 - 0.4, pz);
      pillar.castShadow = true;
      lavaRoot.add(pillar);

      solidBoxes.push({
        minX: px - 2.4,
        maxX: px + 2.4,
        minZ: -250 + pz - 2.4,
        maxZ: -250 + pz + 2.4,
        topY: h - 0.4
      });
    }

    group.add(lavaRoot);

        group.traverse(obj => {
      obj.frustumCulled = false;
      if (!obj.intersectsFrustum) obj.intersectsFrustum = function() { return true; };
      if (!obj.onBeforeShadow) obj.onBeforeShadow = function() {};
      if (!obj.onAfterShadow) obj.onAfterShadow = function() {};
      if (!obj.onBeforeRender) obj.onBeforeRender = function() {};
      if (!obj.onAfterRender) obj.onAfterRender = function() {};
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(m => {
          if (m) {
            if (!m.onBeforeRender) m.onBeforeRender = function() {};
            if (!m.onAfterRender) m.onAfterRender = function() {};
            if (!m.onBeforeShadow) m.onBeforeShadow = function() {};
            if (!m.onAfterShadow) m.onAfterShadow = function() {};
          }
        });
      }
      if (obj.matrixWorld && !obj.matrixWorld.determinantAffine) {
        obj.matrixWorld.determinantAffine = function() {
          var e = this.elements, t0 = e[0], n = e[4], i = e[8], r = e[1], o = e[5], a = e[9], l = e[2], c = e[6], h = e[10];
          return t0 * (o * h - a * c) - n * (r * h - a * l) + i * (r * c - o * l);
        };
      }
    });
    return { group, waterMesh, lavaMesh, lavaTex };
  }

  // ==========================================================================
  // MULTI-COACH DRIVABLE TRAIN BUILDER
  // ==========================================================================
  function createDrivableTrain(T, config) {
    const trainGroup = new THREE.Group();
    trainGroup.name = config.name || 'DrivableTrain';

    const numCars = config.cars || 3;
    const carLength = 16;
    const gap = 1.2;
    const cars = [];

    // Colors
    const matLoco = new THREE.MeshStandardMaterial({ color: config.locoColor || 0x1e3a8a, roughness: 0.4, metalness: 0.35 });
    const matCoach = new THREE.MeshStandardMaterial({ color: config.coachColor || 0xf8fafc, roughness: 0.45, metalness: 0.25 });
    const matRoof = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6, metalness: 0.3 });
    const matGlass = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.15, metalness: 0.9, transparent: true, opacity: 0.8 });
    const matBogie = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8, metalness: 0.7 });

    // 1. Locomotive (Engine)
    const locoGroup = new THREE.Group();
    locoGroup.name = 'Locomotive';

    // Aerodynamic Streamlined Nose / Body
    const bodyGeo = new THREE.BoxGeometry(3.3, 3.2, carLength);
    const body = new THREE.Mesh(bodyGeo, matLoco);
    body.position.set(0, 2.2, 0);
    body.castShadow = true;
    locoGroup.add(body);

    // Curved Nose
    const noseGeo = new THREE.ConeGeometry(2.2, 4.5, 4);
    noseGeo.rotateX(Math.PI / 2);
    const nose = new THREE.Mesh(noseGeo, matLoco);
    nose.position.set(0, 1.8, carLength / 2 + 1.2);
    locoGroup.add(nose);

    // Cab Windscreen
    const cabWinGeo = new THREE.PlaneGeometry(2.6, 1.2);
    const cabWin = new THREE.Mesh(cabWinGeo, matGlass);
    cabWin.position.set(0, 2.8, carLength / 2 + 0.1);
    cabWin.rotation.x = -0.3;
    locoGroup.add(cabWin);

    // Twin High-Intensity Headlights
    const lightGlowMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    [-0.9, 0.9].forEach(hx => {
      const hMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), lightGlowMat);
      hMesh.position.set(hx, 1.5, carLength / 2 + 1.8);
      locoGroup.add(hMesh);
    });

    const spotLight = new THREE.SpotLight(0xfff4b8, 3.5, 90, 0.45, 0.4);
    spotLight.position.set(0, 2.2, carLength / 2 + 2);
    spotLight.target.position.set(0, 0.5, carLength / 2 + 35);
    locoGroup.add(spotLight);
    locoGroup.add(spotLight.target);

    // Pantograph on Roof
    const pantoGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.8, 6);
    const panto = new THREE.Mesh(pantoGeo, matBogie);
    panto.position.set(0, 4.2, -2);
    panto.rotation.z = 0.5;
    locoGroup.add(panto);

    // Bogies / Wheels
    [-5.5, 5.5].forEach(bz => {
      const bogie = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.8, 4.2), matBogie);
      bogie.position.set(0, 0.6, bz);
      locoGroup.add(bogie);
    });

    locoGroup.position.set(0, 0, 0);
    trainGroup.add(locoGroup);
    cars.push(locoGroup);

    // 2. Trailing Coaches
    for (let c = 1; c < numCars; c++) {
      const coachGroup = new THREE.Group();
      coachGroup.name = 'Coach_' + c;

      const coachBody = new THREE.Mesh(new THREE.BoxGeometry(3.3, 3.2, carLength), matCoach);
      coachBody.position.set(0, 2.2, 0);
      coachBody.castShadow = true;
      coachGroup.add(coachBody);

      // Roof
      const cRoof = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.5, carLength + 0.2), matRoof);
      cRoof.position.set(0, 3.8, 0);
      coachGroup.add(cRoof);

      // Continuous Passenger Windows
      const winStrip = new THREE.Mesh(new THREE.BoxGeometry(3.35, 1.0, carLength - 2.5), matGlass);
      winStrip.position.set(0, 2.4, 0);
      coachGroup.add(winStrip);

      // Rubber Bellows / Gangway Connector
      const bellowGeo = new THREE.BoxGeometry(2.6, 2.8, gap + 0.2);
      const bellowMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 });
      const bellow = new THREE.Mesh(bellowGeo, bellowMat);
      bellow.position.set(0, 2.1, carLength / 2 + gap / 2);
      coachGroup.add(bellow);

      coachGroup.position.set(0, 0, -c * (carLength + gap));
      trainGroup.add(coachGroup);
      cars.push(coachGroup);
    }

    trainGroup.traverse(obj => {
      obj.frustumCulled = false;
      if (!obj.intersectsFrustum) obj.intersectsFrustum = function() { return true; };
      if (!obj.onBeforeShadow) obj.onBeforeShadow = function() {};
      if (!obj.onAfterShadow) obj.onAfterShadow = function() {};
      if (!obj.onBeforeRender) obj.onBeforeRender = function() {};
      if (!obj.onAfterRender) obj.onAfterRender = function() {};
      if (obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach(m => {
          if (m) {
            if (!m.onBeforeRender) m.onBeforeRender = function() {};
            if (!m.onAfterRender) m.onAfterRender = function() {};
            if (!m.onBeforeShadow) m.onBeforeShadow = function() {};
            if (!m.onAfterShadow) m.onAfterShadow = function() {};
          }
        });
      }
      if (obj.matrixWorld && !obj.matrixWorld.determinantAffine) {
        obj.matrixWorld.determinantAffine = function() {
          var e = this.elements, t0 = e[0], n = e[4], i = e[8], r = e[1], o = e[5], a = e[9], l = e[2], c = e[6], h = e[10];
          return t0 * (o * h - a * c) - n * (r * h - a * l) + i * (r * c - o * l);
        };
      }
    });

    return {
      group: trainGroup,
      cars: cars,
      carLength: carLength,
      gap: gap,
      speed: 0,
      targetSpeed: 0,
      maxSpeed: config.maxSpeed || 28, // meters per second
      trackProgress: config.initialProgress || 0,
      headlights: spotLight,
      name: config.name || 'Train'
    };
  }

  // ==========================================================================
  // OPEN WORLD DEVELOPER CONTROLLER & CAMERA
  // ==========================================================================
  function activateOpenWorldMode(activate) {
    const eng = window.__gameEngine;
    const T = window.THREE || (typeof THREE !== 'undefined' ? THREE : null);

    if (!eng || !T) {
      showToastDev('Engine booting, please press Ctrl+2 again in a moment...');
      setTimeout(() => activateOpenWorldMode(activate), 350);
      return;
    }

    if (window.__devOpenWorldActive === activate) return;
    window.__devOpenWorldActive = activate;

    const devBadge = document.getElementById('devModeBadge');
    const devHud = document.getElementById('devWorldHud');
    const trainHud = document.getElementById('trainDriverHud');

    if (activate) {
      playSoundChime('dev_warp');
      eng.setState('dev_open_world');

      scene = eng.scene;
      if (scene) {
        if (devSceneGroup && !devSceneGroup.parent) scene.add(devSceneGroup);
        worldTrains.forEach(t => {
          if (t && t.group && !t.group.parent) scene.add(t.group);
        });
      }

      if (devBadge) {
        devBadge.classList.add('active');
        devBadge.innerHTML = '⚡ OPEN WORLD ACTIVE (Ctrl+2 to Exit)';
      }
      if (devHud) devHud.classList.remove('hidden');

      // Setup Open-World orbital camera
      if (!openWorldCamera) {
        const T_cam = window.THREE || (typeof THREE !== "undefined" ? THREE : null); openWorldCamera = new T_cam.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.2, 550);
      }
      openWorldCamera.aspect = window.innerWidth / window.innerHeight;
      openWorldCamera.updateProjectionMatrix();

      // Position player at origin or current simulation position
      const pGroup = eng.player ? eng.player.root : null;
      if (pGroup) {
        playerState.x = pGroup.position.x || 0;
        playerState.y = Math.max(0.5, pGroup.position.y || 0.5);
        playerState.z = -10;
        playerState.grounded = true;
      }

      showToastDev('⚡ Developer Mode: Open World Sandbox Enabled! Use WASD to roam & E to drive trains.');
    } else {
      // Exit Open World mode back to standard game
      if (window.__isDrivingTrain) {
        exitTrainDriving();
      }

      // Detach Open World map and drivable trains completely from scene
      scene = eng.scene;
      if (scene) {
        if (devSceneGroup && devSceneGroup.parent) devSceneGroup.parent.remove(devSceneGroup);
        worldTrains.forEach(t => {
          if (t && t.group && t.group.parent) t.group.parent.remove(t.group);
        });
      }

      const drivePrompt = document.getElementById('trainDrivePrompt');
      if (drivePrompt) drivePrompt.classList.add('hidden');
      if (devBadge) {
        devBadge.classList.remove('active');
        devBadge.innerHTML = '⚡ DEV WORLD (Ctrl+2)';
      }
      if (devHud) devHud.classList.add('hidden');
      if (trainHud) trainHud.classList.add('hidden');

      eng.setState('start');
      if (eng.ui && eng.ui.show) eng.ui.show('start');
      showToastDev('Exited Open World. Returned to standard arcade runner.');
    }
  }

  function showToastDev(msg) {
    let t = document.getElementById('devWorldToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'devWorldToast';
      t.className = 'dev-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.classList.remove('show'); }, 3500);
  }

  // ==========================================================================
  // DRIVABLE TRAIN LOGIC
  // ==========================================================================
  function enterTrainDriving(train) {
    if (!train || window.__isDrivingTrain) return;
    initTrainAudio();
    window.__isDrivingTrain = true;
    window.__currentTrain = train;

    const trainHud = document.getElementById('trainDriverHud');
    if (trainHud) trainHud.classList.remove('hidden');

    showToastDev(`🚊 Boarded ${train.name}! Use W to accelerate, S to brake, H for horn, E to exit.`);
    playTrainHornSound(true);
    setTimeout(() => playTrainHornSound(false), 500);
  }

  function exitTrainDriving() {
    if (!window.__isDrivingTrain) return;
    window.__isDrivingTrain = false;
    const train = window.__currentTrain;
    window.__currentTrain = null;

    updateTrainEngineAudio(0);
    playTrainHornSound(false);

    const trainHud = document.getElementById('trainDriverHud');
    if (trainHud) trainHud.classList.add('hidden');

    // Spawn player safely beside the locomotive
    if (train && train.cars[0]) {
      const locoPos = train.cars[0].position;
      playerState.x = locoPos.x + 3.8;
      playerState.y = Math.max(0.5, locoPos.y + 0.5);
      playerState.z = locoPos.z;
      playerState.vx = 0;
      playerState.vy = 0;
      playerState.vz = 0;
    }
    showToastDev('Disembarked from train onto tracks.');
  }

  // ==========================================================================
  // OPEN WORLD PER-FRAME TICK LOOP
  // ==========================================================================
  window.__devOpenWorldTick = function (delta, runnerTick) {
    const eng = window.__gameEngine;
    const T = window.THREE || (typeof THREE !== 'undefined' ? THREE : null);
    if (!eng || !T) return;

    scene = eng.scene;
    renderer = eng.renderer;
    playerGroup = eng.player ? eng.player.root : null;

    // First frame initialization of procedural map and trains
    if (!devSceneGroup && scene) {
      const mapData = createOpenWorldMap(T);
      devSceneGroup = mapData.group;
      scene.add(devSceneGroup);

      // Create articulated trains with 2 and 3 coaches
      const t1 = createDrivableTrain(T, {
        name: 'Vande Bharat Express (3-Coach)',
        cars: 3,
        locoColor: 0xffffff,
        coachColor: 0x1e3a8a,
        maxSpeed: 32,
        initialProgress: 0
      });
      worldTrains.push(t1);
      scene.add(t1.group);

      const t2 = createDrivableTrain(T, {
        name: 'ICF Rajdhani Express (3-Coach)',
        cars: 3,
        locoColor: 0x991b1b,
        coachColor: 0xfee2e2,
        maxSpeed: 25,
        initialProgress: 180
      });
      worldTrains.push(t2);
      scene.add(t2.group);

      const t3 = createDrivableTrain(T, {
        name: 'Mumbai Western Local (3-Coach)',
        cars: 3,
        locoColor: 0xca8a04,
        coachColor: 0x78350f,
        maxSpeed: 22,
        initialProgress: 360
      });
      worldTrains.push(t3);
      scene.add(t3.group);

      const t4 = createDrivableTrain(T, {
        name: 'Depot Freight Train (2-Coach)',
        cars: 2,
        locoColor: 0xea580c,
        coachColor: 0x334155,
        maxSpeed: 18,
        initialProgress: 520
      });
      worldTrains.push(t4);
      scene.add(t4.group);
    }

    // Update Drivable Trains on tracks
    worldTrains.forEach(train => {
      if (window.__isDrivingTrain && window.__currentTrain === train) {
        // Player input controls throttle
        if (keys.forward) {
          train.targetSpeed = train.maxSpeed;
        } else if (keys.backward) {
          train.targetSpeed = -train.maxSpeed * 0.4;
        } else {
          train.targetSpeed = 0;
        }

        // Smooth acceleration / inertia
        const accel = (train.targetSpeed !== 0) ? 6.5 : 4.0;
        train.speed += (train.targetSpeed - train.speed) * Math.min(1, delta * accel);

        // Update speedometer UI
        const spdKmH = Math.round(Math.abs(train.speed) * 3.6);
        const speedEl = document.getElementById('trainSpeedGauge');
        if (speedEl) speedEl.textContent = spdKmH + ' km/h';

        updateTrainEngineAudio(Math.abs(train.speed) / train.maxSpeed);
      } else {
        // AI background train patrolling
        if (Math.abs(train.speed) < 8) {
          train.speed += (10 - train.speed) * delta * 0.5;
        }
      }

      // Advance train along railway circuit
      train.trackProgress += train.speed * delta;
      const circuitLen = 950;
      if (train.trackProgress > circuitLen) train.trackProgress -= circuitLen;
      if (train.trackProgress < 0) train.trackProgress += circuitLen;

      // Position locomotive and articulated coaches along track curve
      train.cars.forEach((car, idx) => {
        const carOffset = train.trackProgress - idx * (train.carLength + train.gap);
        const pt = getRailwayTrackPoint(carOffset);
        car.position.set(pt.x, pt.y, pt.z);
        car.rotation.y = pt.yaw;
      });

      // Keep solid collision box updated for rooftop parkour
      if (train.cars[0]) {
        const lp = train.cars[0].position;
        solidBoxes.push({
          minX: lp.x - 2.0,
          maxX: lp.x + 2.0,
          minZ: lp.z - 8.0,
          maxZ: lp.z + 8.0,
          topY: 3.8
        });
      }
    });

    // Check interaction with trains (Drive Prompt)
    let nearestTrain = null;
    let minDist = 7.0;
    worldTrains.forEach(tr => {
      if (tr.cars[0]) {
        const d = Math.hypot(playerState.x - tr.cars[0].position.x, playerState.z - tr.cars[0].position.z);
        if (d < minDist) {
          minDist = d;
          nearestTrain = tr;
        }
      }
    });

    const drivePrompt = document.getElementById('driveTrainPrompt');
    if (drivePrompt) {
      if (nearestTrain && !window.__isDrivingTrain) {
        drivePrompt.classList.remove('hidden');
        drivePrompt.textContent = `[E] DRIVE ${nearestTrain.name}`;
        if (keys.drive) {
          keys.drive = false;
          enterTrainDriving(nearestTrain);
        }
      } else {
        drivePrompt.classList.add('hidden');
      }
    }

    // ------------------------------------------------------------------------
    // PLAYER CONTROLLER UPDATE
    // ------------------------------------------------------------------------
    if (window.__isDrivingTrain && window.__currentTrain && window.__currentTrain.cars[0]) {
      // Player is riding in the locomotive
      const loco = window.__currentTrain.cars[0];
      playerState.x = loco.position.x;
      playerState.y = loco.position.y + 2.4;
      playerState.z = loco.position.z;
      playerState.yaw = loco.rotation.y;

      if (keys.drive) {
        keys.drive = false;
        exitTrainDriving();
      }
    } else {
      // Free Open-World Movement
      let moveX = 0;
      let moveZ = 0;
      if (keys.forward) moveZ += 1;
      if (keys.backward) moveZ -= 1;
      if (keys.left) moveX -= 1;
      if (keys.right) moveX += 1;

      // Camera-relative direction
      const curSpeed = (keys.sprint ? playerState.speed * 2.3 : playerState.speed) * (window.__flyMode ? 2.5 : 1.0);
      if (moveX !== 0 || moveZ !== 0) {
        const moveAng = Math.atan2(moveX, moveZ) + camTheta;
        playerState.vx = Math.sin(moveAng) * curSpeed;
        playerState.vz = Math.cos(moveAng) * curSpeed;
        playerState.yaw = moveAng;
      } else {
        playerState.vx *= 0.8;
        playerState.vz *= 0.8;
      }

      // Fly Mode or Gravity
      if (window.__flyMode) {
        if (keys.jump) playerState.vy = 12;
        else if (keys.crouch) playerState.vy = -12;
        else playerState.vy = 0;
      } else {
        // Gravity
        playerState.vy -= 28 * delta;
        if (keys.jump && playerState.grounded) {
          playerState.vy = playerState.jumpPower;
          playerState.grounded = false;
        }
      }

      playerState.x += playerState.vx * delta;
      playerState.y += playerState.vy * delta;
      playerState.z += playerState.vz * delta;

      // Ground & Rooftop Collision
      let groundY = 0.2;
      for (const box of solidBoxes) {
        if (playerState.x >= box.minX && playerState.x <= box.maxX &&
            playerState.z >= box.minZ && playerState.z <= box.maxZ) {
          if (box.topY > groundY && playerState.y >= box.topY - 1.2) {
            groundY = box.topY;
          }
        }
      }

      // Check Lava hazard
      const inLavaZone = (playerState.z < -210 && playerState.z > -290 && Math.abs(playerState.x) < 45);
      if ((inLavaZone || window.__floorIsLava) && playerState.y <= 0.4 && groundY < 0.8) {
        playSoundChime('lava_sizzle');
        showToastDev('🔥 Lava Hazard! Bounced to safety!');
        playerState.vy = 14; // fiery launch
      }

      // Check Lake water splash
      const inLake = (playerState.x < -15 && playerState.x > -115 && playerState.z > 0 && playerState.z < 85);
      if (inLake && playerState.y <= 0.1) {
        groundY = -0.15; // wading in water
      }

      if (playerState.y <= groundY && !window.__flyMode) {
        playerState.y = groundY;
        playerState.vy = 0;
        playerState.grounded = true;
      }
    }

    // Update Player Model
    if (playerGroup) {
      playerGroup.position.set(playerState.x, playerState.y, playerState.z);
      playerGroup.rotation.y = playerState.yaw;
    }

    // Update Camera
    if (openWorldCamera) {
      if (window.__isDrivingTrain && window.__currentTrain && window.__currentTrain.cars[0]) {
        // Train Chase / Cab View
        const loco = window.__currentTrain.cars[0];
        const camOffsetZ = -14;
        const camOffsetY = 6.5;
        openWorldCamera.position.set(
          loco.position.x - Math.sin(loco.rotation.y) * camOffsetZ,
          loco.position.y + camOffsetY,
          loco.position.z - Math.cos(loco.rotation.y) * camOffsetZ
        );
        openWorldCamera.lookAt(loco.position.x, loco.position.y + 2.5, loco.position.z + 10);
      } else {
        // Orbital Follow Camera
        const cx = playerState.x + camDist * Math.sin(camTheta) * Math.cos(camPhi);
        const cy = playerState.y + camDist * Math.sin(camPhi) + 1.2;
        const cz = playerState.z + camDist * Math.cos(camTheta) * Math.cos(camPhi);
        openWorldCamera.position.set(cx, Math.max(0.6, cy), cz);
        openWorldCamera.lookAt(playerState.x, playerState.y + 1.6, playerState.z);
      }

      renderer.render(scene, openWorldCamera);
    }
  };

  // Parametric railway circuit curve
  function getRailwayTrackPoint(progress) {
    const p = ((progress % 950) + 950) % 950;
    let x = 0;
    let z = 0;
    let yaw = 0;

    if (p < 300) {
      // Main trunk line forward
      x = 0;
      z = -p;
      yaw = 0;
    } else if (p < 450) {
      // Curve into train garage depot
      const t = (p - 300) / 150;
      x = Math.sin(t * Math.PI) * 28;
      z = -300 + t * 160;
      yaw = Math.cos(t * Math.PI) * 0.45;
    } else if (p < 750) {
      // Loop around city & lake
      const t = (p - 450) / 300;
      const rad = t * Math.PI * 2;
      x = Math.sin(rad) * 45;
      z = -140 + Math.cos(rad) * 110;
      yaw = rad + Math.PI / 2;
    } else {
      // Return to main station
      const t = (p - 750) / 200;
      x = (1 - t) * 45;
      z = -30 + t * 30;
      yaw = 0;
    }
    return { x, y: 0.15, z, yaw };
  }

  // ==========================================================================
  // INPUT LISTENERS & UI SETUP
  // ==========================================================================
  function setupInputAndUI() {
    // Keyboard Hotkey: Ctrl + 2 (Toggle Dev World)
    window.addEventListener('keydown', e => {
      if (e.ctrlKey && (e.key === '2' || e.code === 'Digit2')) {
        e.preventDefault();
        activateOpenWorldMode(!window.__devOpenWorldActive);
        return;
      }
      if (e.ctrlKey && (e.key === '1' || e.code === 'Digit1')) {
        e.preventDefault();
        activateOpenWorldMode(false);
        return;
      }

      if (!window.__devOpenWorldActive) return;

      const k = e.key.toLowerCase();
      if (k === 'w' || e.key === 'ArrowUp') keys.forward = true;
      if (k === 's' || e.key === 'ArrowDown') keys.backward = true;
      if (k === 'a' || e.key === 'ArrowLeft') keys.left = true;
      if (k === 'd' || e.key === 'ArrowRight') keys.right = true;
      if (e.code === 'Space') { keys.jump = true; e.preventDefault(); }
      if (e.shiftKey) keys.sprint = true;
      if (k === 'e') keys.drive = true;
      if (k === 'h') { keys.horn = true; playTrainHornSound(true); }
      if (k === 'f') {
        window.__flyMode = !window.__flyMode;
        showToastDev(window.__flyMode ? '🕊️ Fly Mode Enabled' : '🚶 Ground Physics Restored');
      }
    });

    window.addEventListener('keyup', e => {
      if (!window.__devOpenWorldActive) return;
      const k = e.key.toLowerCase();
      if (k === 'w' || e.key === 'ArrowUp') keys.forward = false;
      if (k === 's' || e.key === 'ArrowDown') keys.backward = false;
      if (k === 'a' || e.key === 'ArrowLeft') keys.left = false;
      if (k === 'd' || e.key === 'ArrowRight') keys.right = false;
      if (e.code === 'Space') keys.jump = false;
      if (!e.shiftKey) keys.sprint = false;
      if (k === 'e') keys.drive = false;
      if (k === 'h') { keys.horn = false; playTrainHornSound(false); }
    });

    // Mouse / Touch Look Controls
    const canvas = document.getElementById('game');
    if (canvas) {
      canvas.addEventListener('pointerdown', e => {
        if (!window.__devOpenWorldActive) return;
        isPointerDown = true;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;
      });

      window.addEventListener('pointermove', e => {
        if (!window.__devOpenWorldActive || !isPointerDown) return;
        const dx = e.clientX - lastPointerX;
        const dy = e.clientY - lastPointerY;
        lastPointerX = e.clientX;
        lastPointerY = e.clientY;

        camTheta -= dx * 0.005;
        camPhi = Math.max(0.08, Math.min(1.35, camPhi + dy * 0.005));
      });

      window.addEventListener('pointerup', () => { isPointerDown = false; });

      // Zoom wheel
      canvas.addEventListener('wheel', e => {
        if (!window.__devOpenWorldActive) return;
        camDist = Math.max(3.0, Math.min(24.0, camDist + e.deltaY * 0.015));
      }, { passive: true });
    }

    createDevWorldUI();
  }

  // ==========================================================================
  // DEV WORLD HTML HUD INJECTION
  // ==========================================================================
  function createDevWorldUI() {
    const style = document.createElement('style');
    style.textContent = `
      /* Developer Open World HUD Styles */
      .dev-badge-btn {
        position: fixed;
        top: 14px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 350;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(6, 182, 212, 0.9));
        border: 1px solid rgba(255, 255, 255, 0.35);
        color: #fff;
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(0, 240, 255, 0.35);
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
        touch-action: manipulation;
        pointer-events: auto !important;
      }
      .dev-badge-btn.active {
        background: linear-gradient(135deg, #f59e0b, #ef4444);
        box-shadow: 0 4px 20px rgba(239, 68, 68, 0.5);
      }
      .dev-badge-btn:hover {
        transform: translateX(-50%) scale(1.05);
      }

      .dev-hud-dock {
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 340;
        width: min(840px, 94vw);
        background: rgba(11, 17, 32, 0.92);
        border: 1px solid rgba(0, 240, 255, 0.3);
        border-radius: 20px;
        padding: 10px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7);
        pointer-events: auto !important;
      }
      .dev-hud-dock.hidden { display: none !important; }

      .teleport-bar {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 2px;
        scrollbar-width: none;
      }
      .tele-btn {
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 6px 12px;
        color: #e2e8f0;
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: all 0.15s ease;
      }
      .tele-btn:hover {
        background: rgba(0, 240, 255, 0.2);
        border-color: #00f0ff;
        color: #fff;
        transform: translateY(-1px);
      }

      .train-drive-hud {
        position: fixed;
        bottom: 84px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 345;
        background: rgba(15, 23, 42, 0.95);
        border: 2px solid #f59e0b;
        border-radius: 18px;
        padding: 12px 20px;
        display: flex;
        align-items: center;
        gap: 16px;
        box-shadow: 0 0 30px rgba(245, 158, 11, 0.4);
        pointer-events: auto !important;
      }
      .train-drive-hud.hidden { display: none !important; }
      .gauge-val {
        font-size: 20px;
        font-weight: 900;
        color: #fbbf24;
        font-variant-numeric: tabular-nums;
      }

      .drive-prompt-toast {
        position: fixed;
        top: 24%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 340;
        background: linear-gradient(135deg, #10b981, #06b6d4);
        color: #fff;
        padding: 10px 22px;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 0.05em;
        box-shadow: 0 0 25px rgba(16, 185, 129, 0.6);
        cursor: pointer;
        pointer-events: auto !important;
        animation: pulse 1s infinite alternate;
      }
      .drive-prompt-toast.hidden { display: none !important; }

      .dev-toast {
        position: fixed;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: rgba(15, 23, 42, 0.95);
        border: 1px solid #00f0ff;
        color: #f8fafc;
        padding: 10px 20px;
        border-radius: 14px;
        font-size: 13px;
        font-weight: 800;
        opacity: 0;
        transition: all 0.25s ease;
        z-index: 360;
        pointer-events: none;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      }
      .dev-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(style);

    // Dev Mode Activation Button (Top Header)
    const devBtn = document.createElement('button');
    devBtn.id = 'devModeBadge';
    devBtn.className = 'dev-badge-btn';
    devBtn.innerHTML = '⚡ DEV WORLD (Ctrl+2)';
    devBtn.title = 'Toggle Developer Open World Mode (Ctrl + 2)';
    devBtn.addEventListener('click', () => {
      activateOpenWorldMode(!window.__devOpenWorldActive);
    });
    document.body.appendChild(devBtn);

    // Drive Train Prompt Overlay
    const prompt = document.createElement('div');
    prompt.id = 'driveTrainPrompt';
    prompt.className = 'drive-prompt-toast hidden';
    prompt.innerHTML = '🚊 [E] DRIVE TRAIN';
    prompt.addEventListener('click', () => {
      keys.drive = true;
    });
    document.body.appendChild(prompt);

    // Train Driving Dashboard
    const tHud = document.createElement('div');
    tHud.id = 'trainDriverHud';
    tHud.className = 'train-drive-hud hidden';
    tHud.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center;">
        <span style="font-size:10px; color:#94a3b8; font-weight:700;">SPEED</span>
        <span class="gauge-val" id="trainSpeedGauge">0 km/h</span>
      </div>
      <button class="tele-btn" id="btnTrainAccel" style="background:#16a34a; color:#fff;">▲ ACCEL (W)</button>
      <button class="tele-btn" id="btnTrainBrake" style="background:#dc2626; color:#fff;">▼ BRAKE (S)</button>
      <button class="tele-btn" id="btnTrainHorn" style="background:#d97706; color:#fff;">📢 HORN (H)</button>
      <button class="tele-btn" id="btnTrainExit" style="background:#475569; color:#fff;">🚪 EXIT (E)</button>
    `;
    document.body.appendChild(tHud);

    // Train HUD buttons
    const bAccel = document.getElementById('btnTrainAccel');
    const bBrake = document.getElementById('btnTrainBrake');
    const bHorn = document.getElementById('btnTrainHorn');
    const bExit = document.getElementById('btnTrainExit');

    if (bAccel) {
      bAccel.addEventListener('pointerdown', () => { keys.forward = true; });
      bAccel.addEventListener('pointerup', () => { keys.forward = false; });
    }
    if (bBrake) {
      bBrake.addEventListener('pointerdown', () => { keys.backward = true; });
      bBrake.addEventListener('pointerup', () => { keys.backward = false; });
    }
    if (bHorn) {
      bHorn.addEventListener('pointerdown', () => { playTrainHornSound(true); });
      bHorn.addEventListener('pointerup', () => { playTrainHornSound(false); });
    }
    if (bExit) {
      bExit.addEventListener('click', exitTrainDriving);
    }

    // Open World Bottom Dock
    const dock = document.createElement('div');
    dock.id = 'devWorldHud';
    dock.className = 'dev-hud-dock hidden';

    let teleHtml = '';
    LANDMARKS.forEach(lm => {
      teleHtml += `<button class="tele-btn" data-tid="${lm.id}">${lm.icon} ${lm.name}</button>`;
    });

    dock.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
        <span style="font-size:11px; font-weight:800; color:#38bdf8; letter-spacing:0.06em;">⚡ OPEN WORLD TELEPORT &amp; LANDMARKS</span>
        <div style="display:flex; gap:6px;">
          <button class="tele-btn" id="btnToggleFly" style="padding:4px 8px; font-size:10px;">🕊️ Fly Mode</button>
          <button class="tele-btn" id="btnToggleLava" style="padding:4px 8px; font-size:10px;">🌋 Lava Mode</button>
        </div>
      </div>
      <div class="teleport-bar">${teleHtml}</div>
    `;
    document.body.appendChild(dock);

    // Teleport click handlers
    dock.querySelectorAll('.tele-btn[data-tid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tid = btn.getAttribute('data-tid');
        const target = LANDMARKS.find(l => l.id === tid);
        if (target) {
          if (window.__isDrivingTrain) exitTrainDriving();
          playerState.x = target.x;
          playerState.y = target.y + 1.0;
          playerState.z = target.z;
          playerState.vx = 0;
          playerState.vy = 0;
          playerState.vz = 0;
          playSoundChime('dev_warp');
          showToastDev(`Warped to ${target.name}!`);
        }
      });
    });

    const bFly = document.getElementById('btnToggleFly');
    if (bFly) {
      bFly.addEventListener('click', () => {
        window.__flyMode = !window.__flyMode;
        showToastDev(window.__flyMode ? '🕊️ Fly Mode Enabled' : '🚶 Ground Physics Restored');
      });
    }

    const bLava = document.getElementById('btnToggleLava');
    if (bLava) {
      bLava.addEventListener('click', () => {
        window.__floorIsLava = !window.__floorIsLava;
        showToastDev(window.__floorIsLava ? '🌋 LAVA APOCALYPSE: The floor is lava!' : '🛡️ Normal Ground Restored');
      });
    }

    // Auto-mount landmarks into game scene once engine boots
    function checkEngineReady() {
      const eng = window.__gameEngine;
      const T = window.THREE || (typeof THREE !== 'undefined' ? THREE : null);
      if (eng && eng.scene && T && !devSceneGroup) {
        scene = eng.scene;
        renderer = eng.renderer;
        playerGroup = eng.player ? eng.player.root : null;
        try {
          const mapData = createOpenWorldMap(T);
          devSceneGroup = mapData.group;
          // Keep devSceneGroup completely detached from standard runner scene!

          const t1 = createDrivableTrain(T, {
            name: 'Vande Bharat Express (3-Coach)',
            cars: 3,
            locoColor: 0xffffff,
            coachColor: 0x1e3a8a,
            maxSpeed: 32,
            initialProgress: 60
          });
          worldTrains.push(t1);

          const t2 = createDrivableTrain(T, {
            name: 'ICF Rajdhani Express (3-Coach)',
            cars: 3,
            locoColor: 0x991b1b,
            coachColor: 0xfee2e2,
            maxSpeed: 25,
            initialProgress: 180
          });
          worldTrains.push(t2);

          const t3 = createDrivableTrain(T, {
            name: 'Mumbai Western Local (3-Coach)',
            cars: 3,
            locoColor: 0xca8a04,
            coachColor: 0x78350f,
            maxSpeed: 22,
            initialProgress: 360
          });
          worldTrains.push(t3);

          const t4 = createDrivableTrain(T, {
            name: 'Depot Freight Train (2-Coach)',
            cars: 2,
            locoColor: 0xea580c,
            coachColor: 0x334155,
            maxSpeed: 18,
            initialProgress: 520
          });
          worldTrains.push(t4);
          console.log('[DevWorld] Open World map and drivable trains prepared in standby mode.');
        } catch (e) {
          console.warn('[DevWorld] Standby build deferred:', e);
        }
        return;
      }
      setTimeout(checkEngineReady, 250);
    }
    checkEngineReady();
  }

  // Self-boot on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupInputAndUI);
  } else {
    setupInputAndUI();
  }

})();
