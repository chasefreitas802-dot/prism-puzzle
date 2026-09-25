(() => {
  const REFLECT = {
    "/": { N: "E", E: "N", S: "W", W: "S" },
    "\\": { N: "W", E: "S", S: "E", W: "N" },
  };
  const DELTA = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
  const STORAGE = "prism-v1";

  const LEVELS = [
    {
      id: 1,
      name: "First Light",
      hint: "Tap the glass. One flip aims the beam.",
      width: 5,
      height: 3,
      source: { x: 0, y: 0, dir: "E" },
      goal: { x: 4, y: 2 },
      walls: [],
      mirrors: [{ x: 4, y: 0, type: "/", rotatable: true }],
      par: 1,
    },
    {
      id: 2,
      name: "Twin Glass",
      hint: "Two corners make a U-turn.",
      width: 6,
      height: 4,
      source: { x: 0, y: 0, dir: "E" },
      goal: { x: 0, y: 2 },
      walls: [],
      mirrors: [
        { x: 5, y: 0, type: "/", rotatable: true },
        { x: 5, y: 2, type: "\\", rotatable: true },
      ],
      par: 2,
    },
    {
      id: 3,
      name: "Stone Vein",
      hint: "The wall kills the straight shot.",
      width: 6,
      height: 5,
      source: { x: 0, y: 0, dir: "E" },
      goal: { x: 5, y: 4 },
      walls: [
        [3, 0],
        [3, 1],
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      mirrors: [
        { x: 2, y: 0, type: "/", rotatable: true },
        { x: 2, y: 2, type: "\\", rotatable: true },
        { x: 5, y: 2, type: "/", rotatable: true },
      ],
      par: 3,
    },
    {
      id: 4,
      name: "Switchback",
      hint: "Climb over the pillar, then drop under it.",
      width: 7,
      height: 5,
      source: { x: 0, y: 2, dir: "E" },
      goal: { x: 6, y: 2 },
      walls: [
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      mirrors: [
        { x: 2, y: 2, type: "/", rotatable: true },
        { x: 2, y: 0, type: "\\", rotatable: true },
        { x: 4, y: 0, type: "/", rotatable: true },
        { x: 4, y: 4, type: "\\", rotatable: true },
        { x: 2, y: 4, type: "/", rotatable: true },
        { x: 6, y: 4, type: "/", rotatable: true },
      ],
      par: 4,
    },
    {
      id: 5,
      name: "Anchored",
      hint: "The pinned mirror already knows its job.",
      width: 6,
      height: 5,
      source: { x: 0, y: 0, dir: "S" },
      goal: { x: 5, y: 0 },
      walls: [
        [1, 1],
        [2, 1],
        [3, 1],
        [1, 3],
        [2, 3],
        [3, 3],
      ],
      mirrors: [
        { x: 0, y: 4, type: "\\", rotatable: false },
        { x: 5, y: 4, type: "\\", rotatable: true },
        { x: 2, y: 2, type: "/", rotatable: true },
        { x: 4, y: 0, type: "/", rotatable: true },
      ],
      par: 1,
    },
    {
      id: 6,
      name: "Foxfire",
      hint: "Pretty glass is not always useful glass.",
      width: 7,
      height: 5,
      source: { x: 0, y: 1, dir: "E" },
      goal: { x: 6, y: 3 },
      walls: [
        [3, 1],
        [3, 2],
        [3, 3],
      ],
      mirrors: [
        { x: 2, y: 1, type: "/", rotatable: true },
        { x: 2, y: 4, type: "\\", rotatable: true },
        { x: 6, y: 4, type: "\\", rotatable: true },
        { x: 6, y: 1, type: "/", rotatable: true },
        { x: 4, y: 0, type: "\\", rotatable: true },
        { x: 0, y: 3, type: "/", rotatable: true },
      ],
      par: 3,
    },
    {
      id: 7,
      name: "Lattice",
      hint: "Thread the long way around both pillars.",
      width: 7,
      height: 7,
      source: { x: 0, y: 3, dir: "E" },
      goal: { x: 6, y: 3 },
      walls: [
        [2, 2],
        [2, 3],
        [2, 4],
        [4, 2],
        [4, 3],
        [4, 4],
      ],
      mirrors: [
        { x: 1, y: 3, type: "\\", rotatable: true },
        { x: 1, y: 1, type: "\\", rotatable: true },
        { x: 5, y: 1, type: "/", rotatable: true },
        { x: 5, y: 5, type: "/", rotatable: true },
        { x: 6, y: 5, type: "\\", rotatable: true },
        { x: 3, y: 5, type: "/", rotatable: true },
        { x: 1, y: 5, type: "\\", rotatable: true },
      ],
      par: 5,
    },
    {
      id: 8,
      name: "Crosscut",
      hint: "The corridors only connect at the right corners.",
      width: 7,
      height: 6,
      source: { x: 0, y: 0, dir: "S" },
      goal: { x: 6, y: 5 },
      walls: [
        [1, 1],
        [1, 2],
        [1, 3],
        [3, 2],
        [3, 3],
        [3, 4],
        [5, 1],
        [5, 2],
        [5, 3],
      ],
      mirrors: [
        { x: 0, y: 5, type: "/", rotatable: true },
        { x: 2, y: 5, type: "\\", rotatable: true },
        { x: 2, y: 0, type: "/", rotatable: true },
        { x: 4, y: 0, type: "\\", rotatable: true },
        { x: 4, y: 5, type: "/", rotatable: true },
        { x: 6, y: 0, type: "/", rotatable: true },
      ],
      par: 4,
    },
    {
      id: 9,
      name: "Halo",
      hint: "Ride the rim. The locked corner is already true.",
      width: 8,
      height: 6,
      source: { x: 3, y: 0, dir: "E" },
      goal: { x: 0, y: 2 },
      walls: [
        [3, 2],
        [4, 2],
        [3, 3],
        [4, 3],
      ],
      mirrors: [
        { x: 7, y: 0, type: "\\", rotatable: false },
        { x: 7, y: 5, type: "\\", rotatable: true },
        { x: 0, y: 5, type: "/", rotatable: true },
        { x: 2, y: 1, type: "/", rotatable: true },
        { x: 5, y: 1, type: "\\", rotatable: true },
        { x: 1, y: 4, type: "/", rotatable: true },
      ],
      par: 2,
    },
    {
      id: 10,
      name: "Aurora",
      hint: "A long circuit. Ignore the pretty dead ends.",
      width: 8,
      height: 7,
      source: { x: 0, y: 3, dir: "E" },
      goal: { x: 7, y: 3 },
      walls: [
        [3, 2],
        [3, 3],
        [3, 4],
        [5, 1],
        [5, 5],
      ],
      mirrors: [
        { x: 2, y: 3, type: "/", rotatable: true },
        { x: 2, y: 0, type: "\\", rotatable: true },
        { x: 7, y: 0, type: "/", rotatable: false },
        { x: 7, y: 6, type: "\\", rotatable: true },
        { x: 0, y: 6, type: "/", rotatable: true },
        { x: 0, y: 0, type: "\\", rotatable: true },
        { x: 4, y: 6, type: "/", rotatable: true },
        { x: 4, y: 0, type: "/", rotatable: true },
      ],
      par: 5,
    },
  ];

  const canvas = document.getElementById("board");
  const ctx = canvas.getContext("2d");
  const roomLabel = document.getElementById("roomLabel");
  const hintEl = document.getElementById("hint");
  const moveCount = document.getElementById("moveCount");
  const parCount = document.getElementById("parCount");
  const live = document.getElementById("live");
  const levelOverlay = document.getElementById("levelOverlay");
  const winOverlay = document.getElementById("winOverlay");
  const levelGrid = document.getElementById("levelGrid");
  const winSub = document.getElementById("winSub");
  const starsEl = document.getElementById("stars");

  const progress = loadProgress();
  const stars = makeStars(80);

  const state = {
    index: clamp(progress.last || 0, 0, LEVELS.length - 1),
    mirrors: [],
    history: [],
    moves: 0,
    won: false,
    selected: { x: 0, y: 0 },
    hover: null,
    particles: [],
    flashes: [],
    t: 0,
    beamPulse: 0,
    lastTrace: { path: [], hit: false },
  };

  let audioCtx = null;

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress() {
    const done = new Set(progress.done || []);
    if (state.won) done.add(state.index);
    progress.done = [...done];
    progress.unlocked = Math.max(progress.unlocked || 1, state.index + 1 + (state.won ? 1 : 0));
    progress.last = state.index;
    localStorage.setItem(STORAGE, JSON.stringify(progress));
  }

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function cloneMirrors(level) {
    return level.mirrors.map((m) => ({ ...m }));
  }

  function wallSet(level) {
    return new Set(level.walls.map(([x, y]) => `${x},${y}`));
  }

  function mirrorAt(x, y) {
    return state.mirrors.find((m) => m.x === x && m.y === y);
  }

  function trace(level, mirrors) {
    const walls = wallSet(level);
    const map = new Map(mirrors.map((m) => [`${m.x},${m.y}`, m.type]));
    let x = level.source.x;
    let y = level.source.y;
    let dir = level.source.dir;
    const path = [{ x, y }];
    const seen = new Set();
    while (true) {
      const key = `${x},${y},${dir}`;
      if (seen.has(key)) return { path, hit: false };
      seen.add(key);
      const [dx, dy] = DELTA[dir];
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= level.width || ny >= level.height) {
        path.push({ x: x + dx * 0.42, y: y + dy * 0.42, fade: true });
        return { path, hit: false };
      }
      if (walls.has(`${nx},${ny}`)) {
        path.push({ x: x + dx * 0.38, y: y + dy * 0.38, fade: true });
        return { path, hit: false };
      }
      path.push({ x: nx, y: ny });
      if (nx === level.goal.x && ny === level.goal.y) return { path, hit: true };
      const type = map.get(`${nx},${ny}`);
      if (type) dir = REFLECT[type][dir];
      x = nx;
      y = ny;
    }
  }

  function loadLevel(index, keepOverlay) {
    state.index = index;
    const level = LEVELS[index];
    state.mirrors = cloneMirrors(level);
    state.history = [];
    state.moves = 0;
    state.won = false;
    state.particles = [];
    const first = state.mirrors.find((m) => m.rotatable) || state.mirrors[0] || { x: 0, y: 0 };
    state.selected = { x: first.x, y: first.y };
    state.lastTrace = trace(level, state.mirrors);
    roomLabel.textContent = `${String(level.id).padStart(2, "0")} · ${level.name}`;
    hintEl.textContent = level.hint;
    parCount.textContent = String(level.par);
    moveCount.textContent = "0";
    live.textContent = `${level.name} loaded.`;
    if (!keepOverlay) hideOverlays();
    progress.last = index;
    progress.unlocked = Math.max(progress.unlocked || 1, index + 1);
    localStorage.setItem(STORAGE, JSON.stringify(progress));
    renderLevelSelect();
  }

  function rotateAt(x, y) {
    if (state.won) return;
    const m = mirrorAt(x, y);
    if (!m || !m.rotatable) return;
    state.history.push(state.mirrors.map((item) => item.type));
    m.type = m.type === "/" ? "\\" : "/";
    state.moves += 1;
    moveCount.textContent = String(state.moves);
    state.flashes.push({ x, y, life: 1 });
    ping(220 + state.moves * 8, 0.05);
    afterEdit();
  }

  function undo() {
    if (state.won || !state.history.length) return;
    const prev = state.history.pop();
    state.mirrors.forEach((m, i) => {
      m.type = prev[i];
    });
    state.moves = Math.max(0, state.moves - 1);
    moveCount.textContent = String(state.moves);
    afterEdit();
  }

  function reset() {
    loadLevel(state.index);
    ping(160, 0.04);
  }

  function afterEdit() {
    const level = LEVELS[state.index];
    state.lastTrace = trace(level, state.mirrors);
    if (state.lastTrace.hit) win();
    else live.textContent = `Moves ${state.moves}.`;
  }

  function starScore(moves, par) {
    if (moves <= par) return 3;
    if (moves <= par + 2) return 2;
    return 1;
  }

  function win() {
    if (state.won) return;
    state.won = true;
    const level = LEVELS[state.index];
    const starsWon = starScore(state.moves, level.par);
    burst(level.goal.x, level.goal.y);
    fanfare();
    saveProgress();
    winSub.textContent = `${level.name} in ${state.moves} move${state.moves === 1 ? "" : "s"} · par ${level.par}`;
    starsEl.textContent = "✦".repeat(starsWon) + "✧".repeat(3 - starsWon);
    live.textContent = `Crystal lit. ${starsWon} stars.`;
    renderLevelSelect();
    setTimeout(() => {
      if (state.won) winOverlay.classList.remove("hidden");
    }, 700);
  }

  function hideOverlays() {
    levelOverlay.classList.add("hidden");
    winOverlay.classList.add("hidden");
  }

  function unlockedCount() {
    return Math.max(1, progress.unlocked || 1);
  }

  function renderLevelSelect() {
    const done = new Set(progress.done || []);
    const unlocked = unlockedCount();
    levelGrid.innerHTML = "";
    LEVELS.forEach((level, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "level-btn";
      const locked = i >= unlocked;
      if (locked) btn.classList.add("locked");
      if (done.has(i)) btn.classList.add("done");
      if (i === state.index) btn.classList.add("current");
      btn.innerHTML = locked
        ? `<span>${String(level.id).padStart(2, "0")}</span><small>locked</small>`
        : `<span>${String(level.id).padStart(2, "0")}</span><small>${level.name}</small>`;
      btn.disabled = locked;
      btn.addEventListener("click", () => loadLevel(i));
      levelGrid.appendChild(btn);
    });
  }

  function cellFromEvent(event) {
    const level = LEVELS[state.index];
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    const x = ((point.clientX - rect.left) / rect.width) * level.width;
    const y = ((point.clientY - rect.top) / rect.height) * level.height;
    const cx = Math.floor(x);
    const cy = Math.floor(y);
    if (cx < 0 || cy < 0 || cx >= level.width || cy >= level.height) return null;
    return { x: cx, y: cy };
  }

  function ensureAudio() {
    if (!audioCtx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  }

  function ping(freq, dur) {
    if (!audioCtx) return;
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.1);
  }

  function fanfare() {
    ensureAudio();
    [523, 659, 784, 1046].forEach((f, i) => {
      setTimeout(() => ping(f, 0.12), i * 90);
    });
  }

  function burst(gx, gy) {
    for (let i = 0; i < 42; i += 1) {
      const a = Math.random() * Math.PI * 2;
      const s = 0.4 + Math.random() * 2.2;
      state.particles.push({
        x: gx,
        y: gy,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 1,
        hue: 180 + Math.random() * 140,
      });
    }
  }

  function makeStars(n) {
    return Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      p: Math.random() * Math.PI * 2,
    }));
  }

  let layoutCache = null;

  function layout() {
    const level = LEVELS[state.index];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.clientWidth || 720;
    const key = `${size}:${dpr}:${level.width}:${level.height}`;
    if (layoutCache && layoutCache.key === key) return layoutCache;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const pad = 18;
    const inner = size - pad * 2;
    const cell = inner / Math.max(level.width, level.height);
    const ox = (size - cell * level.width) / 2;
    const oy = (size - cell * level.height) / 2;
    layoutCache = { key, size, cell, ox, oy, pad };
    return layoutCache;
  }

  function cellCenter(layoutInfo, x, y) {
    return {
      x: layoutInfo.ox + (x + 0.5) * layoutInfo.cell,
      y: layoutInfo.oy + (y + 0.5) * layoutInfo.cell,
    };
  }

  function draw() {
    const level = LEVELS[state.index];
    const L = layout();
    const { size, cell, ox, oy } = L;
    state.t += 0.016;

    ctx.clearRect(0, 0, size, size);
    const night = ctx.createRadialGradient(size * 0.5, size * 0.4, 20, size * 0.5, size * 0.5, size * 0.75);
    night.addColorStop(0, "#1b0d38");
    night.addColorStop(0.55, "#110820");
    night.addColorStop(1, "#080410");
    ctx.fillStyle = night;
    ctx.fillRect(0, 0, size, size);

    stars.forEach((s) => {
      const tw = 0.35 + Math.sin(state.t * 2 + s.p) * 0.25;
      ctx.fillStyle = `rgba(255,240,220,${tw})`;
      ctx.beginPath();
      ctx.arc(s.x * size, s.y * size, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let y = 0; y < level.height; y += 1) {
      for (let x = 0; x < level.width; x += 1) {
        const px = ox + x * cell;
        const py = oy + y * cell;
        ctx.fillStyle = (x + y) % 2 === 0 ? "rgba(92, 225, 255, 0.045)" : "rgba(255, 79, 216, 0.035)";
        ctx.fillRect(px, py, cell, cell);
        ctx.strokeStyle = "rgba(214,196,255,0.08)";
        ctx.strokeRect(px + 0.5, py + 0.5, cell - 1, cell - 1);
      }
    }

    const walls = wallSet(level);
    walls.forEach((key) => {
      const [x, y] = key.split(",").map(Number);
      const px = ox + x * cell;
      const py = oy + y * cell;
      const g = ctx.createLinearGradient(px, py, px + cell, py + cell);
      g.addColorStop(0, "#2a1848");
      g.addColorStop(1, "#12081f");
      ctx.fillStyle = g;
      roundRect(ctx, px + cell * 0.08, py + cell * 0.08, cell * 0.84, cell * 0.84, 8);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 79, 216, 0.35)";
      ctx.stroke();
    });

    if (state.hover && !state.won) {
      const h = cellCenter(L, state.hover.x, state.hover.y);
      ctx.strokeStyle = "rgba(92,225,255,0.55)";
      ctx.lineWidth = 2;
      ctx.strokeRect(h.x - cell * 0.46, h.y - cell * 0.46, cell * 0.92, cell * 0.92);
    }

    const sel = cellCenter(L, state.selected.x, state.selected.y);
    ctx.strokeStyle = "rgba(255,213,106,0.7)";
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(sel.x - cell * 0.46, sel.y - cell * 0.46, cell * 0.92, cell * 0.92);
    ctx.setLineDash([]);

    drawBeam(L, state.lastTrace);
    drawSource(L, level);
    drawGoal(L, level, state.lastTrace.hit);
    state.mirrors.forEach((m) => drawMirror(L, m));

    state.flashes = state.flashes.filter((f) => f.life > 0);
    state.flashes.forEach((f) => {
      const c = cellCenter(L, f.x, f.y);
      ctx.beginPath();
      ctx.arc(c.x, c.y, cell * 0.3 * (1.2 - f.life), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,213,106,${f.life})`;
      ctx.lineWidth = 3;
      ctx.stroke();
      f.life -= 0.06;
    });

    state.particles = state.particles.filter((p) => p.life > 0);
    state.particles.forEach((p) => {
      const c = cellCenter(L, p.x, p.y);
      ctx.fillStyle = `hsla(${p.hue},100%,68%,${p.life})`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.vx * 0.016;
      p.y += p.vy * 0.016;
      p.life -= 0.016;
    });

    requestAnimationFrame(draw);
  }

  function drawBeam(L, traced) {
    if (traced.path.length < 2) return;
    const pts = traced.path.map((p) => cellCenter(L, p.x, p.y));
    const glow = traced.hit ? 1 : 0.72;
    const layers = [
      { w: 18, color: `rgba(255,79,216,${0.12 * glow})` },
      { w: 10, color: `rgba(92,225,255,${0.28 * glow})` },
      { w: 4, color: `rgba(255,250,240,${0.9 * glow})` },
    ];
    layers.forEach((layer) => {
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = layer.w;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    });

    const dash = (state.t * 80) % 40;
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.setLineDash([10, 18]);
    ctx.lineDashOffset = -dash;
    ctx.strokeStyle = traced.hit ? "rgba(255,213,106,0.85)" : "rgba(255,255,255,0.55)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawSource(L, level) {
    const c = cellCenter(L, level.source.x, level.source.y);
    const r = L.cell * 0.28;
    const pulse = 0.65 + Math.sin(state.t * 3) * 0.2;
    ctx.fillStyle = `rgba(92,225,255,${0.16 * pulse})`;
    ctx.beginPath();
    ctx.arc(c.x, c.y, r * 1.8, 0, Math.PI * 2);
    ctx.fill();
    const g = ctx.createRadialGradient(c.x - 4, c.y - 4, 2, c.x, c.y, r);
    g.addColorStop(0, "#fff7e8");
    g.addColorStop(0.45, "#5ce1ff");
    g.addColorStop(1, "#3a1d88");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
    ctx.fill();
    const [dx, dy] = DELTA[level.source.dir];
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(c.x + dx * r * 0.1, c.y + dy * r * 0.1);
    ctx.lineTo(c.x + dx * r * 1.15, c.y + dy * r * 1.15);
    ctx.stroke();
  }

  function drawGoal(L, level, lit) {
    const c = cellCenter(L, level.goal.x, level.goal.y);
    const r = L.cell * 0.3;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(state.t * (lit ? 0.8 : 0.15));
    ctx.fillStyle = lit ? "rgba(255,213,106,0.25)" : "rgba(180,120,255,0.14)";
    ctx.beginPath();
    ctx.arc(0, 0, r * 1.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = lit ? "rgba(255, 196, 86, 0.92)" : "rgba(92, 52, 160, 0.88)";
    hex(ctx, 0, 0, r, lit ? "#ffd56a" : "#c9a6ff");
    ctx.fillStyle = lit ? "rgba(255,247,220,0.9)" : "rgba(255,255,255,0.35)";
    hex(ctx, 0, 0, r * 0.45, "rgba(255,255,255,0.2)");
    ctx.restore();
  }

  function hex(ctx, x, y, r, stroke) {
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + Math.cos(a) * r;
      const py = y + Math.sin(a) * r;
      if (i) ctx.lineTo(px, py);
      else ctx.moveTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function drawMirror(L, m) {
    const c = cellCenter(L, m.x, m.y);
    const len = L.cell * 0.34;
    const slash = m.type === "/";
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(slash ? -Math.PI / 4 : Math.PI / 4);
    const grd = ctx.createLinearGradient(-len, 0, len, 0);
    grd.addColorStop(0, "rgba(92,225,255,0.15)");
    grd.addColorStop(0.5, "rgba(255,255,255,0.92)");
    grd.addColorStop(1, "rgba(255,79,216,0.2)");
    ctx.strokeStyle = grd;
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-len, 0);
    ctx.lineTo(len, 0);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.stroke();
    if (!m.rotatable) {
      ctx.fillStyle = "#ffd56a";
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function roundRect(context, x, y, w, h, r) {
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + h, r);
    context.arcTo(x + w, y + h, x, y + h, r);
    context.arcTo(x, y + h, x, y, r);
    context.arcTo(x, y, x + w, y, r);
    context.closePath();
  }

  function moveSelect(dx, dy) {
    const level = LEVELS[state.index];
    state.selected.x = clamp(state.selected.x + dx, 0, level.width - 1);
    state.selected.y = clamp(state.selected.y + dy, 0, level.height - 1);
  }

  function nextLevel() {
    if (state.index < LEVELS.length - 1) loadLevel(state.index + 1);
    else {
      hideOverlays();
      levelOverlay.classList.remove("hidden");
    }
  }

  canvas.addEventListener("pointerdown", (event) => {
    ensureAudio();
    const cell = cellFromEvent(event);
    if (!cell) return;
    state.selected = cell;
    rotateAt(cell.x, cell.y);
  });

  canvas.addEventListener("pointermove", (event) => {
    state.hover = cellFromEvent(event);
    const m = state.hover && mirrorAt(state.hover.x, state.hover.y);
    canvas.style.cursor = m && m.rotatable && !state.won ? "pointer" : "default";
  });

  canvas.addEventListener("pointerleave", () => {
    state.hover = null;
  });

  document.getElementById("btnUndo").addEventListener("click", () => {
    ensureAudio();
    undo();
  });
  document.getElementById("btnReset").addEventListener("click", () => {
    ensureAudio();
    reset();
  });
  document.getElementById("btnLevels").addEventListener("click", () => {
    hideOverlays();
    renderLevelSelect();
    levelOverlay.classList.remove("hidden");
  });
  document.getElementById("btnCloseLevels").addEventListener("click", hideOverlays);
  document.getElementById("btnReplay").addEventListener("click", reset);
  document.getElementById("btnGallery").addEventListener("click", () => {
    winOverlay.classList.add("hidden");
    renderLevelSelect();
    levelOverlay.classList.remove("hidden");
  });
  document.getElementById("btnNext").addEventListener("click", nextLevel);

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Escape") {
      if (!levelOverlay.classList.contains("hidden")) hideOverlays();
      else {
        hideOverlays();
        renderLevelSelect();
        levelOverlay.classList.remove("hidden");
      }
      return;
    }
    if (!winOverlay.classList.contains("hidden") && (key === "n" || key === "N")) {
      nextLevel();
      return;
    }
    if (!levelOverlay.classList.contains("hidden") || !winOverlay.classList.contains("hidden")) return;
    if (key === "ArrowLeft") moveSelect(-1, 0);
    else if (key === "ArrowRight") moveSelect(1, 0);
    else if (key === "ArrowUp") moveSelect(0, -1);
    else if (key === "ArrowDown") moveSelect(0, 1);
    else if (key === " " || key === "Enter") {
      event.preventDefault();
      rotateAt(state.selected.x, state.selected.y);
    } else if (key === "z" || key === "Z") undo();
    else if (key === "r" || key === "R") reset();
  });

  window.addEventListener("resize", () => layout());

  progress.unlocked = Math.max(progress.unlocked || 1, 1);
  loadLevel(state.index, true);
  renderLevelSelect();
  draw();
})();
