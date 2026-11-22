// DFE_03 – validation script for VEB.js
// Usage: load the scene in VEB.js, open the browser console (F12 → Console),
// paste this whole file and press Enter, THEN press Start in VEB.js.
// At the end of the lot (SensorEnd → done) the script prints a summary and
// downloads two files: DFE_03_validation_events.csv and DFE_03_validation_summary.json.
(() => {
  const scene = BABYLON.EngineStore.LastCreatedScene;
  const engine = scene.getEngine();
  const BOX = { xmin: 2050, xmax: 2350, zmin: 837.5, zmax: 1362.5, ymax: 150 };
  const CELLS = [];
  for (const x of [2131, 2269]) for (let i = 0; i < 5; i++) CELLS.push([x, 910 + 95 * i]);

  const events = [];           // [time_s, asset, state]
  const fps = [];
  let t0 = null, finished = false, lastFrame = engine.frameId;
  const now = () => (t0 === null ? 0 : (performance.now() - t0) / 1000);

  const fpsTimer = setInterval(() => { fps.push(engine.frameId - lastFrame); lastFrame = engine.frameId; }, 1000);

  const origLog = console.log;
  console.log = function (...args) {
    const s = args.map(a => (typeof a === 'string' ? a : '')).join(' ');
    if (t0 === null && s.includes('START animation')) t0 = performance.now();
    const m = s.match(/\*\s*(\S+)\s+hasChangedState:\s*(\S+)/);
    if (m && t0 !== null) {
      events.push([now().toFixed(2), m[1], m[2]]);
      if (m[1] === 'SensorEnd' && m[2] === 'Done' && !finished) { finished = true; setTimeout(report, 8000); }
    }
    return origLog.apply(console, args);
  };

  function report() {
    clearInterval(fpsTimer);
    const t = (asset, state) => { const e = events.find(e => e[1] === asset && e[2] === state); return e ? +e[0] : null; };
    // parts
    const parts = scene.meshes.filter(m => /^part_\d+$/.test(m.id)).map(m => {
      m.computeWorldMatrix(true); const p = m.getAbsolutePosition();
      const inBox = p.x > BOX.xmin && p.x < BOX.xmax && p.z > BOX.zmin && p.z < BOX.zmax && p.y < BOX.ymax && p.y > -10;
      const err = Math.min(...CELLS.map(([x, z]) => Math.hypot(p.x - x, p.z - z)));
      return { part: m.id, x: +p.x.toFixed(1), y: +p.y.toFixed(1), z: +p.z.toFixed(1), inBox, error_mm: +err.toFixed(1) };
    });
    // B3 stops caused by the zone (B3 wait periods)
    const waits = [];
    events.forEach((e, i) => {
      if (e[1] === 'B3' && e[2] === 'wait') {
        const r = events.slice(i + 1).find(f => f[1] === 'B3' && f[2] !== 'wait');
        waits.push(+((r ? +r[0] : now()) - +e[0]).toFixed(2));
      }
    });
    const summary = {
      date: new Date().toISOString(),
      parts_in_box: parts.filter(p => p.inBox).length + '/10',
      max_placement_error_mm: Math.max(...parts.map(p => p.error_mm)),
      first_UR1_pick_s: t('UR1', 'a1'),
      UR1_done_s: t('UR1', 'done'),
      B1_off_s: t('B1', 'off'), B2_off_s: t('B2', 'off'),
      B3_off_s: t('B3', 'off'), B2E_off_s: t('B2E', 'off'), B3E_off_s: t('B3E', 'off'),
      B3_stops: waits.length, B3_stop_durations_s: waits,
      fps_min: Math.min(...fps.slice(1)), fps_mean: +(fps.slice(1).reduce((a, b) => a + b, 0) / Math.max(1, fps.length - 1)).toFixed(1),
      parts,
    };
    origLog('==== DFE_03 validation summary ====');
    console.table(parts);
    origLog(JSON.stringify({ ...summary, parts: undefined }, null, 2));
    if (summary.fps_min < 30) origLog('WARNING: frame rate dropped below 30 fps – repeat the run with the tab in the foreground.');
    const dl = (name, text, type) => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); };
    dl('DFE_03_validation_events.csv', 'time_s,asset,state\n' + events.map(e => e.join(',')).join('\n'), 'text/csv');
    dl('DFE_03_validation_summary.json', JSON.stringify(summary, null, 2), 'application/json');
  }
  window.DFE_validation = { events, report };   // DFE_validation.report() forces the summary
  origLog('DFE_03 validation script ready: now press Start.');
})();
