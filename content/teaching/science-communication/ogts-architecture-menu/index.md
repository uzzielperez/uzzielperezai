---
title: "The reconstruction menu, and the gates that prune it"
date: 2026-08-31
draft: false
tags: [physics, visualization, OGTS, reconstruction, LHCb, science-communication]
summary: The inner OGTS loop. A named family tree of calorimeter architectures, pruned by throughput and resolution, not by a flat NAS scan.
---

Reconstruction is detector-wide. Every event that enters LHCb must be clustered and written under a latency and throughput budget that tightens at Upgrade II. The architecture that meets those constraints is a searchable object, not a per-analysis add-on.

This is the **inner loop**. It does not live on the [hypothesis-space diagram](/teaching/science-communication/ogts-sm-bsm-space/). That page ranks what is still worth measuring. This page ranks how to extract the object, under gates.

{{< ogts-reco >}}

## How to read the family tree

The menu is short and named. We do not enumerate every network.

**Left: classical replacement.** The cellular automaton is on the tree because Graph Clustering replaced it. The dashed edge is that replacement. Graph Clustering is the published Run 3 gold standard (Valls Canudas et al., Eur. Phys. J. C 83, 169 (2023)). At high occupancy it needs offline calibration and does not learn overlapping showers. Upgrade II can *condition* it. Conditioned is not dead.

**Right: learned families.** Graph nets (GarNet), transformer-style calorimeter reconstruction (UzzieNet), deep sets, and state-space models. UzzieNet is a refinement of GarNet: node-centric linear-cost attention. Distillation varies only *inside* a family, under an explicit HLT1 latency cut. A student can pass a throughput gate the teacher fails. Deep sets and state-space models are siblings on the menu, not children of GarNet. An unscored family stays amber. The gate does not invent a prune.

Edges are replacement, refinement, or inside-family compression. They are never "also a calorimeter network."

## The two gates

**Throughput.** Offline is loose. Run 3 HLT1 is the Allen path we actually have to live with. Upgrade II is tighter still: occupancy, PicoCal geometry, timing layers. A family that cannot meet the budget is conditioned or gone, even if its resolution is beautiful overnight on a GPU.

**Resolution.** Inclusive energy is one demand. Overlapping showers are another. A vertex-less radiative photon, the \(\Lambda_b\to\Lambda\gamma\) object, is harder than an inclusive cluster. Flip that topology and the same menu is re-coloured. The architecture that wins on a given topology is a diagnostic of problem structure, not a trophy.

Gate colours on this page are **schematic**. CHEP 2026 numbers that are real stay in the inspector: UzzieNet up to 8× faster than message-passing; Graph(GarNet)→MLP about 95% smaller and beating the teacher on energy resolution; GarNet ONNX up to 5× CPU and about 2× GPU at FP32 parity near \(10^{-7}\). Those are measurements against teachers and runtimes, not a published claim that the search already beats Graph Clustering at Upgrade II.

## Two oracles, one human gate

The cheap oracle is a surrogate under FLOP and wall-time constraints. It is a filter, not calorimeter truth. The expensive oracle is Allen-scale PicoCal reconstruction. If they disagree, the lie is published; the ranking that counts is Allen's.

The human gate keeps what counts as an acceptable model of systematic uncertainty. The \(\Lambda_b\to\Lambda\gamma\) revival found an efficiency-ratio discrepancy from two compensating errors whose branching ratio still looked fine. A beautiful excess that is two mistakes does not pass.

This page is an AI-assisted first version of the post.
