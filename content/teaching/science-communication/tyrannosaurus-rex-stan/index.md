```markdown
---
title: "T-rex — Stan (3D Skeleton)"
date: 2026-01-11
draft: false
tags: [paleontology, visualization, 3d-model]
---

## Tyrannosaurus rex — "Stan"

Below is an interactive 3D model of the T‑rex specimen commonly called "Stan." Use your mouse or touch to rotate, zoom, and inspect the skeleton.

<!-- Model Viewer (loads the GLB from static/uploads) -->

<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

<model-viewer src="/uploads/tyrannosaurus_rex_stan_skeleton.glb"
  alt="T-rex Stan skeleton"
  ar
  auto-rotate
  camera-controls
  exposure="1"
  style="width:100%; height:600px; background-color: #f6f6f6;">
  <div slot="poster">3D model loading...</div>
</model-viewer>

### About Stan

"Stan" is one of the most complete and well-preserved Tyrannosaurus rex specimens known. It has been used extensively in research and public displays to teach anatomy, biomechanics, and comparative paleontology.

Key points:
- **Specimen:** Informally called *Stan* (catalog numbers vary by collection).
- **Completeness:** Among the more complete T. rex skeletons, which makes it valuable for reconstruction and study.
- **Educational value:** Stan illustrates skull morphology, robust hindlimbs, and the large tail counterbalance used for locomotion.

### Notes for site maintainers

- Place the `.glb` file at `static/uploads/tyrannosaurus_rex_stan_skeleton.glb` so the model loads.
- If you prefer a different viewer or additional annotations, I can add captions, cross-section views, or hotspot callouts.

```