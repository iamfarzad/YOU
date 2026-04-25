/**
 * YOU Landing Page — Particle Morphing Canvas
 * Ported from AntigravityCanvas (React/TS) to vanilla JS.
 * 4 shapes auto-cycle: orb → brain → constellation → "YOU" text
 * Spring physics, mouse repulsion, semi-transparent trail, CSS bloom.
 * Zero dependencies. ~350 lines.
 */

(function () {
  const canvas = document.getElementById('you-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // ── Config ──
  const PARTICLE_COUNT = 900;
  const CYCLE_DURATION = 8000;   // ms per shape
  const TRANSITION_DURATION = 2000; // morph overlap
  const MOUSE_RADIUS = 120;
  const MOUSE_FORCE = 8;
  const CONNECTION_DISTANCE = 60;
  const CONNECTION_ALPHA = 0.06;
  const GOLD = { r: 184, g: 134, b: 11 };

  // ── State ──
  let W, H, dpr;
  let mouse = { x: -9999, y: -9999 };
  let particles = [];
  let startTime = performance.now();
  let shapes = ['orb', 'brain', 'constellation', 'text'];

  // ── Seeded random (deterministic, LCG) ──
  function seededRandom(seed) {
    const a = 1664525, c = 1013904223, m = 4294967296;
    return ((a * seed + c) >>> 0) / m;
  }

  // ── Bitmap font for "YOU" text ──
  const GLYPH = {
    Y: [[1,0,1],[1,0,1],[0,1,0],[0,1,0],[0,1,0]],
    O: [[0,1,0],[1,0,1],[1,0,1],[1,0,1],[0,1,0]],
    U: [[1,0,1],[1,0,1],[1,0,1],[1,0,1],[0,1,1]],
  };

  // ── Particle class ──
  class Particle {
    constructor(i) {
      this.i = i;
      this.x = W / 2 + (seededRandom(i * 3 + 7) - 0.5) * 200;
      this.y = H / 2 + (seededRandom(i * 5 + 11) - 0.5) * 200;
      this.vx = 0;
      this.vy = 0;
      this.tx = this.x;
      this.ty = this.y;
      this.spring = 0.08;
      this.friction = 0.85;
      this.noise = 0.01;
      this.alpha = 0;
      this.targetAlpha = 0.5;
      this.scale = 1;
    }
  }

  // ── Resize ──
  function resize() {
    dpr = window.devicePixelRatio || 1;
    // Read from parent wrapper, not canvas itself (canvas may report 0×0 if no intrinsic size)
    const parent = canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : canvas.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // ── Shape: Orb (breathing torus) ──
  function shapeOrb(i, total, time) {
    const cx = W / 2, cy = H / 2;
    const t = i / Math.max(total, 1);
    const majorR = Math.min(W, H) * 0.18;
    const minorR = majorR * 0.28;
    const spin = time * 0.00028;
    const golden = Math.PI * (3 - Math.sqrt(5));

    const theta = t * Math.PI * 2 + spin;
    const phi = ((i * golden) % (Math.PI * 2)) + Math.sin(time * 0.0008 + t * 6) * 0.12;
    const ringBias = Math.pow(Math.abs(Math.sin(phi)), 1.9);
    const shellR = minorR * (0.42 + ringBias * 0.78);

    const x3 = (majorR + Math.cos(phi) * shellR) * Math.cos(theta);
    const y3 = (majorR + Math.cos(phi) * shellR) * Math.sin(theta);
    const z3 = Math.sin(phi) * shellR;

    const tiltX = 0.92 + Math.sin(time * 0.00018) * 0.08;
    const tiltZ = 0.48 + Math.cos(time * 0.00016) * 0.06;
    const yTilt = y3 * Math.cos(tiltX) - z3 * Math.sin(tiltX);
    const zTiltA = y3 * Math.sin(tiltX) + z3 * Math.cos(tiltX);
    const xTilt = x3 * Math.cos(tiltZ) + zTiltA * Math.sin(tiltZ);
    const zTilt = -x3 * Math.sin(tiltZ) + zTiltA * Math.cos(tiltZ);

    const perspective = 1 + zTilt / (majorR * 4.2);
    const frontness = Math.max(0, Math.min(1, (zTilt / (minorR * 1.6) + 1) * 0.5));

    return {
      tx: cx + xTilt * perspective,
      ty: cy + yTilt * perspective * 0.84,
      spring: 0.085,
      friction: 0.9,
      noise: 0.008,
      alpha: 0.14 + frontness * 0.72 + ringBias * 0.18,
      scale: 0.55 + frontness * 1.45 + ringBias * 0.28,
    };
  }

  // ── Shape: Brain (bilateral lobes with folds) ──
  function shapeBrain(i, total, time) {
    const cx = W / 2, cy = H / 2;
    const lobeOffset = 50;
    const isLeft = i % 2 === 0;
    const lobeCX = isLeft ? cx - lobeOffset : cx + lobeOffset;

    const idx = Math.floor(i / 2);
    const lobeTotal = Math.floor(total / 2);
    const golden = (1 + Math.sqrt(5)) / 2;

    const theta = ((idx / golden) % 1) * Math.PI * 2;
    const phi = Math.acos(1 - (2 * (idx + 0.5)) / lobeTotal);

    const baseR = 60;
    const fold = Math.sin(theta * 7) * Math.cos(phi * 6) * 6;
    const r = baseR + fold;

    let tx = lobeCX + r * Math.sin(phi) * Math.cos(theta);
    let ty = cy + r * Math.sin(phi) * Math.sin(theta) * 1.15;

    const sep = 8;
    if (isLeft && tx > cx - sep) tx = cx - sep;
    if (!isLeft && tx < cx + sep) tx = cx + sep;

    const pulse = Math.sin(time * 0.0015) * 1.5;
    tx += (tx - cx) * 0.01 * pulse;
    ty += (ty - cy) * 0.01 * pulse;

    return {
      tx, ty,
      spring: 0.08,
      friction: 0.85,
      noise: 0.015,
      alpha: 0.65 + Math.sin(time * 0.003 + i * 0.01) * 0.1,
      scale: 1,
    };
  }

  // ── Shape: Constellation (nodes + connections) ──
  function shapeConstellation(i, total, time) {
    const cx = W / 2, cy = H / 2;
    const numNodes = 7;
    const speed = time * 0.0002;
    const nodeIdx = i % numNodes;

    const nx = cx + Math.cos(nodeIdx * 1.5 + speed) * (140 + Math.sin(time * 0.001 + nodeIdx) * 40);
    const ny = cy + Math.sin(nodeIdx * 2.1 + speed * 0.8) * (100 + Math.cos(time * 0.0015 + nodeIdx) * 30);

    const cloud = 40;
    return {
      tx: nx + (seededRandom(i + 400) - 0.5) * cloud,
      ty: ny + (seededRandom(i + 401) - 0.5) * cloud,
      spring: 0.08,
      friction: 0.88,
      noise: 0.03,
      alpha: 0.6,
      scale: 1,
    };
  }

  // ── Shape: Text "YOU" ──
  function shapeText(i, total, time) {
    const cx = W / 2, cy = H / 2;
    const text = 'YOU';
    const scale = 16;
    const ppc = Math.floor(total / text.length); // particles per char
    const jitter = 0.4;

    const charIdx = Math.floor(i / ppc);
    if (charIdx >= text.length) return { tx: cx, ty: cy, spring: 0.01, friction: 0.99, noise: 0, alpha: 0, scale: 0.5 };

    const char = text[charIdx];
    const pattern = GLYPH[char];
    if (!pattern) return { tx: cx, ty: cy, spring: 0.01, friction: 0.99, noise: 0, alpha: 0, scale: 0.5 };

    // Char widths for centering
    const charWidths = text.split('').map(c => (GLYPH[c] ? GLYPH[c][0].length : 0) * scale);
    const spacing = 1.5 * scale;
    const totalW = charWidths.reduce((s, w) => s + w, 0) + (text.length - 1) * spacing;
    let xOffset = 0;
    for (let c = 0; c < charIdx; c++) xOffset += charWidths[c] + spacing;

    const pIdx = i % ppc;
    const activePoints = [];
    pattern.forEach((row, r) => row.forEach((val, c) => { if (val === 1) activePoints.push({ c, r }); }));
    if (activePoints.length === 0) return { tx: cx, ty: cy, spring: 0, friction: 0, noise: 0, alpha: 0, scale: 0.5 };

    const pt = activePoints[pIdx % activePoints.length];
    const jx = (seededRandom(i + 1) - 0.5) * scale * jitter;
    const jy = (seededRandom(i + 2) - 0.5) * scale * jitter;
    const breathe = Math.sin(time * 0.002) * 2;

    return {
      tx: cx - totalW / 2 + xOffset + pt.c * scale + jx,
      ty: cy - 2.5 * scale + pt.r * scale + jy + breathe,
      spring: 0.15,
      friction: 0.85,
      noise: 0.02,
      alpha: 0.9,
      scale: 1,
    };
  }

  // ── Shape dispatcher ──
  const shapeFns = { orb: shapeOrb, brain: shapeBrain, constellation: shapeConstellation, text: shapeText };

  function getShapeTarget(shapeName, i, total, time) {
    return (shapeFns[shapeName] || shapeOrb)(i, total, time);
  }

  // ── Current shape + blend ──
  function getCurrentShape(elapsed) {
    const total = CYCLE_DURATION + TRANSITION_DURATION;
    const cyclePos = elapsed % (total * shapes.length);
    const shapeIdx = Math.floor(cyclePos / total);
    const posInCycle = cyclePos - shapeIdx * total;

    const fromName = shapes[shapeIdx % shapes.length];
    const toName = shapes[(shapeIdx + 1) % shapes.length];

    // During TRANSITION_DURATION at end of each cycle, blend
    const inTransition = posInCycle > CYCLE_DURATION;
    const blend = inTransition ? (posInCycle - CYCLE_DURATION) / TRANSITION_DURATION : 0;

    return { fromName, toName, blend };
  }

  // ── Mouse repulsion ──
  function applyMouse(p) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_RADIUS && dist > 0.1) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
    }
  }

  // ── Init particles ──
  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle(i));
    }
    startTime = performance.now();
  }

  // ── Update ──
  function update(time) {
    const elapsed = time - startTime;
    const { fromName, toName, blend } = getCurrentShape(elapsed);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const from = getShapeTarget(fromName, i, PARTICLE_COUNT, time);
      const to = getShapeTarget(toName, i, PARTICLE_COUNT, time);

      // Blend targets
      const tx = from.tx + (to.tx - from.tx) * blend;
      const ty = from.ty + (to.ty - from.ty) * blend;
      const targetAlpha = from.alpha + (to.alpha - from.alpha) * blend;
      const spring = from.spring + (to.spring - from.spring) * blend;
      const friction = from.friction + (to.friction - from.friction) * blend;
      const noise = from.noise + (to.noise - from.noise) * blend;

      // Spring physics
      const dx = tx - p.x;
      const dy = ty - p.y;
      p.vx += dx * spring;
      p.vy += dy * spring;
      p.vx *= friction;
      p.vy *= friction;

      // Noise (organic jitter)
      p.vx += (seededRandom(i * 3 + Math.floor(time * 0.01)) - 0.5) * noise * 2;
      p.vy += (seededRandom(i * 7 + Math.floor(time * 0.01)) - 0.5) * noise * 2;

      p.x += p.vx;
      p.y += p.vy;

      // Mouse repulsion
      applyMouse(p);

      // Alpha easing
      p.alpha += (targetAlpha - p.alpha) * 0.08;
    }
  }

  // ── Draw connections (constellation only, subtle) ──
  function drawConnections() {
    const elapsed = performance.now() - startTime;
    const { fromName, toName, blend } = getCurrentShape(elapsed);
    // Only draw connections when constellation is dominant
    const isConst = fromName === 'constellation' && blend < 0.3;
    const isConstTo = toName === 'constellation' && blend > 0.7;
    if (!isConst && !isConstTo) return;

    const connAlpha = isConst ? 1 - blend : blend;
    ctx.strokeStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${CONNECTION_ALPHA * connAlpha})`;
    ctx.lineWidth = 0.5;

    // Node positions for connections (only check subset for perf)
    const nodes = {};
    for (let i = 0; i < PARTICLE_COUNT; i += 12) {
      const nodeIdx = i % 7;
      if (!nodes[nodeIdx]) nodes[nodeIdx] = { x: 0, y: 0, count: 0 };
      nodes[nodeIdx].x += particles[i].x;
      nodes[nodeIdx].y += particles[i].y;
      nodes[nodeIdx].count++;
    }

    const nodePositions = Object.values(nodes).map(n => ({
      x: n.x / n.count,
      y: n.y / n.count,
    }));

    ctx.beginPath();
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dx = nodePositions[i].x - nodePositions[j].x;
        const dy = nodePositions[i].y - nodePositions[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
          ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
        }
      }
    }
    ctx.stroke();
  }

  // ── Draw particles ──
  function draw() {
    // Semi-transparent clear for trail effect
    ctx.fillStyle = 'rgba(250, 250, 247, 0.15)';
    ctx.fillRect(0, 0, W, H);

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.alpha < 0.02) continue;
      const r = Math.max(0.5, 1.5 * (p.scale || 1));
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${p.alpha})`;
      ctx.fill();
    }
  }

  // ── Loop ──
  function loop(time) {
    update(time);
    draw();
    requestAnimationFrame(loop);
  }

  // ── Events ──
  window.addEventListener('resize', () => {
    resize();
    // Reposition particles to new center
    for (const p of particles) {
      p.x = W / 2 + (seededRandom(p.i * 3 + 7) - 0.5) * 200;
      p.y = H / 2 + (seededRandom(p.i * 5 + 11) - 0.5) * 200;
    }
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Touch support
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.touches[0].clientX - rect.left;
    mouse.y = e.touches[0].clientY - rect.top;
  }, { passive: false });
  canvas.addEventListener('touchend', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // ── Boot ──
  init();
  // Initial full clear
  ctx.fillStyle = 'rgba(250, 250, 247, 1)';
  ctx.fillRect(0, 0, W, H);
  requestAnimationFrame(loop);
})();
