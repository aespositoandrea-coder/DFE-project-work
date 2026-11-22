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
| `DFE_03_BasicModule_Report.pdf` | Technical report: design process, solution, validation, replication. |
| `DFE_03.xlsm` | Modelling spreadsheet for animation, environment and assets. Source of all the JSON files. |
| `DFE_03.json` | Models description, layout, physics properties and all StateCharts used in the simulation. |
| `DFE_03_anim.json` | Animation (only the start events). |
| `DFE_03_env.json` | Environment (cameras, lights, Havok physics). |
| `models/` | All 3D models used by the scene. |
| Demonstration video | *[add link or file name]* |
