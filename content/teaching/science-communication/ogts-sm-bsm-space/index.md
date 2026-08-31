---
title: "The space of the Standard Model, and the space still open"
date: 2026-08-31
draft: false
tags: [physics, visualization, BSM, OGTS, ontology, science-communication]
summary: An event-display of hypothesis space. The Standard Model is a historically constrained graph. Beyond-Standard-Model futures use the same grammar, still open. A demonstrator for OGTS computational allotment.
---

A particle theory is not a list of Lagrangians. It is a tree of decisions: what is allowed now, what the data kill, and when a failure is not a death but a reason to grow a new degree of freedom.

The Standard Model is what that tree looks like after the decisions have already been made. Beyond-Standard-Model (BSM) physics is the same kind of tree, still growing. Oracle-Guided Triage and architecture Search (OGTS) is a proposal to write that tree as a searchable object, then spend computing time along it instead of scanning every leaf.

{{< ogts-space >}}

## How to read the two chambers

**Left: Standard Model.** Constraint availability by era, not a history lecture. In 1933 Fermi's four-fermion contact is admitted because it fits beta decay. The 1950s rank five Dirac bilinears; angular data mildly prefer scalar and tensor couplings. Wu's parity-violation experiment flips that ranking: S, T, and P are hard-pruned, V−A is admitted. When the contact term violates unitarity at high energy, the branch does not die. It expands: a massive vector W. The 1970s admit SU(2)L × U(1)Y with spontaneous symmetry breaking, prune a pure SU(2) without hypercharge, and keep colour as a separate sector. Minimal SU(5) still looks healthy at triage and dies at verify (proton lifetime).

**Right: BSM futures.** Same schema, experimental grain. The root is the radiative family b → sγ. An EFT child is the Wilson coefficient C7 (operator O7). Its exclusive children, Bs → φγ (active) and Λb → Λγ (conditioned), are siblings: same grain, not parent and child of each other. A Type-II two-Higgs-doublet model with a light charged scalar is a UV child of the family, not of either exclusive mode. Inclusive B → Xsγ verify-kills it. A photon in some other radiative decay does not make that decay an O7 child.

Edges are refinement or UV completion. They are never "similar final state."

## What "computational allotment" means here

OGTS is two loops with a human gate.

The **outer loop** ranks hypothesis nodes. Cheap triage asks whether a term is even admissible (Lorentz, anomalies, parent still alive). Expensive verify asks whether it matches this era's data. Expand happens on a structural FAIL such as unitarity: spawn a child with a new field, do not empty the branch. Status is part of spend: *active* nodes can take compute; *conditioned* nodes wait on a reconstruction or systematic gate; *pruned* nodes get zero. If O7 is excluded, exclusive children leave the ranked list. That is the graph doing work a flat scan cannot.

The **inner loop** is a different object: reconstruction architectures under an HLT1 latency budget (cellular automaton, Graph Clustering, GarNet, UzzieNet, deep sets). That menu does not live on this diagram. This page is only the outer loop, hypothesis space and allotment. A vertex-less radiative photon is a harder calorimeter object than an inclusive cluster; that fact conditions Λb → Λγ here, and it is why architecture search gets its own figure.

Track thickness on the BSM side is a **schematic** share for this demonstrator. It is not a published OGTS ranking, and it is not a claim that the search already beats legacy allocation. Stage 0 on the left is the calibration problem whose answer is already known. The open question is whether the same grammar transfers to LHCb channels and to SMEFT.

The human gate keeps two decisions: what counts as a legitimate node, and what counts as an acceptable model of systematic uncertainty. The Λb → Λγ revival found an efficiency-ratio discrepancy from two compensating errors whose branching ratio still looked fine. A beautiful excess that is two mistakes does not pass.
