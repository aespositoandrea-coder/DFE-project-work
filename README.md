# Pick and place factory simulation (Digital Factory Project Work)

Material handling system that moves the ten parts from the source conveyor **B1** into the destination **Box** in the Virtual Learning Factory Toolkit (VEB.js), routing them around the obstacle **Grid**. These are fixed elements of the factory layout: their position and model cannot be changed.

Course: Digital Factory  Prof. M. Urgo and W. Terkaj – Politecnico di Milano, A.Y. 2026/27
Author: Andrea Esposito

## Quick start (1 minute)

1. Open this link in a desktop browser:

   **[▶ Open DFE_03 in VEB.js](https://digital-factory.io/vebjs/?inputscene=https://aespositoandrea-coder.github.io/DFE-project-work/DFE_03&inputanim=https://aespositoandrea-coder.github.io/DFE-project-work/DFE_03_anim&inputenv=https://aespositoandrea-coder.github.io/DFE-project-work/DFE_03_env&repoMod3d=https://aespositoandrea-coder.github.io/DFE-project-work/models/)**

2. Wait until the scene is fully loaded (about 20–30 s).
3. Press **Start**.
4. Keep the browser tab **in the foreground** for the whole lot (about 90 s): the physics advances with the rendered frames, so a hidden or background tab slows the parts down.

<details><summary>Full link (if needed copy and paste)</summary>

```
https://digital-factory.io/vebjs/?inputscene=https://aespositoandrea-coder.github.io/DFE-project-work/DFE_03&inputanim=https://aespositoandrea-coder.github.io/DFE-project-work/DFE_03_anim&inputenv=https://aespositoandrea-coder.github.io/DFE-project-work/DFE_03_env&repoMod3d=https://aespositoandrea-coder.github.io/DFE-project-work/models/
```
</details>

## What you will see

Conveyor B1 → **Cartesian robot PP** → **Conveyor B2** → **Conveyor B2E** → **Cartesian robot PP2** → **Conveyor B3** → **Conveyor B3E** → **Robotic arm UR1** → Pallet Box (2 rows × 5 cells)

- Belts run at 200 mm/s (B1), 150 mm/s (B2, B2E) and 160 mm/s (B3, B3E).
- **B2E** and **B3E** are short accumulation zones in front of the robots: the main belts run continuously and stop only when the zone in front of the robot is occupied.
- **UR1** (6-axis robot on a 200 mm pedestal) places the parts in the Box, about one part every 5.2 s.
- **End of lot by counting sensors:** SensorPick stops B1 after the 10th part, SensorZ2 stops B2 when the 10th part has passed onto B2E, SensorEnd stops B3, B3E and B2E after UR1 has picked the 10th part.

Expected result: 10/10 parts in the Box, lot completed in about 88 s.

## Contents

| File / folder | Content |
|---|---|
| `DFE_03_BasicModule_Report.pdf` / `.docx` | Technical report: design process, solution, validation, replication. |
| `DFE_03.xlsm` | Modelling spreadsheet (sheet *Assets*): layout, physics properties and all StateCharts. Source of the JSON files. |
| `DFE_03.json` | Scene, exported with *Export Scene JSON*. |
| `DFE_03_anim.json` | Animation (only the two start events), exported with *Export Animation JSON*. |
| `DFE_03_env.json` | Environment (cameras, lights, Havok physics). |
| `models/` | All 3D models used by the scene. New assets: `ConveyorB2z.glb`, `ConveyorB3m.glb`, `ConveyorZone.glb`, `ConveyorB3zone.glb`, `URPedestal200.glb`. |
| `validation/` | `validate_console.js` (validation script) and results of the validation runs. |
| Demonstration video | *[add link or file name]* |

## Reproduce the validation

1. Open the link above and wait for the scene to load (do **not** press Start yet).
2. Open the browser console (**F12 → Console**), paste the content of [`validation/validate_console.js`](validation/validate_console.js) and press Enter.
3. Press **Start**. About 8 s after the last pick the console prints a summary (parts in the Box, placement error, lot time, belt stop times, frame rate) and the browser downloads `DFE_03_validation_events.csv` and `DFE_03_validation_summary.json`.

If the summary warns that the frame rate dropped below 30 fps, repeat the run with the tab in the foreground and fewer programs open.

## Modify the model

Edit `DFE_03.xlsm`, regenerate the JSON files with **Export Scene JSON** and **Export Animation JSON**, and upload the updated files to this repository.

## Run offline (optional)

```
python serve.py
```

Then use the link above, replacing `https://aespositoandrea-coder.github.io/DFE-project-work/` with `http://localhost:8000/`.
