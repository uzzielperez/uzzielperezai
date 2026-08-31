/**
 * OGTS theory-space demonstrator.
 * Event-display grammar: hits = hypotheses, tracks = admit/prune/expand,
 * dE/dx thickness = illustrative compute allotment (not a published ranking).
 */
(function (global) {
  "use strict";

  var EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  var SM_NODES = [
    {
      id: "fermi_1933",
      chamber: "sm",
      x: 210,
      y: 88,
      era: 1933,
      label: "four-fermion contact",
      sub: "1933 · admitted",
      status: "admitted",
      grain: "contact",
      notes:
        "Fermi's G_F is fit to the beta-decay rate, not searched. The neutrino is in the theory; it has not been seen yet. Lorentz invariance is already a hard prune. Renormalisability is only a flag.",
    },
    {
      id: "S",
      chamber: "sm",
      x: 92,
      y: 148,
      era: 1952,
      label: "S",
      sub: "1950s · ranked",
      status: "pruned",
      prunedAfter: 1957,
      grain: "bilinear",
      parent: "beta",
      notes:
        "Scalar bilinear. Angular correlations in the 1950s mildly favoured S and T. Wu's parity-violation result later hard-prunes S, T, and P.",
    },
    {
      id: "T",
      chamber: "sm",
      x: 148,
      y: 148,
      era: 1952,
      label: "T",
      sub: "1950s · ranked",
      status: "pruned",
      prunedAfter: 1957,
      grain: "bilinear",
      parent: "beta",
      notes:
        "Tensor bilinear. Rank-1 in the 1950s under assumed parity conservation. Not the winner after 1956–58.",
    },
    {
      id: "V",
      chamber: "sm",
      x: 210,
      y: 148,
      era: 1952,
      label: "V",
      sub: "1950s · deprioritized",
      status: "ranked",
      grain: "bilinear",
      parent: "beta",
      notes:
        "Vector bilinear. Deprioritized (not pruned) by 1950s angular data. Survives as part of V−A after Wu.",
    },
    {
      id: "A",
      chamber: "sm",
      x: 272,
      y: 148,
      era: 1952,
      label: "A",
      sub: "1950s · deprioritized",
      status: "ranked",
      grain: "bilinear",
      parent: "beta",
      notes:
        "Axial bilinear. Same fate as V: deprioritized, then admitted as V−A once parity is dropped.",
    },
    {
      id: "P",
      chamber: "sm",
      x: 328,
      y: 148,
      era: 1952,
      label: "P",
      sub: "1950s · ranked",
      status: "pruned",
      prunedAfter: 1957,
      grain: "bilinear",
      parent: "beta",
      notes: "Pseudoscalar bilinear. Hard-pruned with S and T after maximal parity violation.",
    },
    {
      id: "wu_1956",
      chamber: "sm",
      x: 210,
      y: 236,
      era: 1957,
      label: "V−A / parity violation",
      sub: "1956–58 · admitted",
      status: "admitted",
      grain: "structure",
      notes:
        "Wu's 60Co experiment: parity is not conserved. S, T, and P fail a hard prune. The 1950s rank-1 is not the winner. Hardness of the parity check flips.",
    },
    {
      id: "unitarity_1960s",
      chamber: "sm",
      x: 210,
      y: 324,
      era: 1965,
      label: "contact vs unitarity",
      sub: "1960s · expand",
      status: "expanded",
      grain: "uv",
      notes:
        "The four-fermion contact violates unitarity at high energy. That is not a verify-kill of the branch. The oracle expands: introduce a massive vector mediator W.",
    },
    {
      id: "electroweak_1970s",
      chamber: "sm",
      x: 168,
      y: 424,
      era: 1973,
      label: "SU(2)L × U(1)Y + SSB",
      sub: "1970s · admitted",
      status: "admitted",
      grain: "gauge",
      notes:
        "Gargamelle sees neutral currents. Mixing angle is constrained. A pure SU(2) without U(1)Y is pruned. Renormalisability is now a hard prune, not a flag. The SM terms are survivors of an operator search.",
    },
    {
      id: "colour",
      chamber: "sm",
      x: 292,
      y: 424,
      era: 1973,
      label: "colour SU(3)c",
      sub: "1970s · separate sector",
      status: "admitted",
      grain: "gauge",
      notes:
        "Colour is admitted as its own sector, not mixed into electroweak. The schema refuses to treat 'hadronic stuff' as an electroweak child.",
    },
    {
      id: "su5",
      chamber: "sm",
      x: 210,
      y: 524,
      era: 1980,
      label: "minimal SU(5)",
      sub: "UV · verify-killed",
      status: "pruned",
      grain: "uv",
      notes:
        "Triage passes (anomaly-free unification). Verify fails: Super-Kamiokande proton lifetime bound on p → e+ π0. Structurally alive, empirically dead.",
    },
  ];

  var BSM_NODES = [
    {
      id: "b_to_s_gamma",
      chamber: "bsm",
      x: 820,
      y: 88,
      era: 2026,
      label: "b → sγ",
      sub: "broad family · root",
      status: "root",
      grain: "broad",
      allot: 0.12,
      notes:
        "Hypothesis class, not a single decay. Edges from here are refinement or UV completion. A photon in some other radiative mode does not make that mode a child.",
    },
    {
      id: "O7",
      chamber: "bsm",
      x: 820,
      y: 188,
      era: 2026,
      label: "O7 / C7",
      sub: "EFT grain · active",
      status: "active",
      grain: "eft",
      allot: 0.22,
      notes:
        "Wilson-coefficient region. Prune rule: if O7 is excluded, exclusive children leave the ranked spend list. That is the point of parent structure.",
    },
    {
      id: "Bs_phi",
      chamber: "bsm",
      x: 712,
      y: 312,
      era: 2026,
      label: "Bs → φγ",
      sub: "exclusive · active",
      status: "active",
      grain: "exclusive",
      allot: 0.48,
      notes:
        "Same grain as Λb → Λγ, not its parent. Published LHCb polarisation and branching measurements exist. Illustrative allotment is high because reconstruction is cheaper and the channel is active.",
    },
    {
      id: "Lb_L",
      chamber: "bsm",
      x: 928,
      y: 312,
      era: 2026,
      label: "Λb → Λγ",
      sub: "exclusive · conditioned",
      status: "conditioned",
      grain: "exclusive",
      allot: 0.18,
      notes:
        "Sibling under O7, not a UV completion. Conditioned: vertex-less radiative photon is a harder calorimeter object. The CHEP 2026 revival is an analysis artefact, not a reason to treat this node as done or as parent of Bs → φγ.",
    },
    {
      id: "typeII",
      chamber: "bsm",
      x: 680,
      y: 430,
      era: 2026,
      label: "Type-II 2HDM, light H±",
      sub: "UV · pruned",
      status: "pruned",
      grain: "uv",
      allot: 0,
      notes:
        "UV child of the broad family, different grain from the exclusive modes. Triage passes. Verify fails on B → Xsγ. Type I is a different interference pattern; it is not this prune.",
    },
  ];

  var RECO = [
    { id: "ca", label: "cellular automaton", x: 118 },
    { id: "gc", label: "Graph Clustering", x: 330 },
    { id: "garnet", label: "GarNet", x: 530 },
    { id: "uzzienet", label: "UzzieNet", x: 730 },
    { id: "deepsets", label: "deep sets", x: 930 },
  ];

  var EDGES = [
    { from: "fermi_1933", to: "V", kind: "refine" },
    { from: "fermi_1933", to: "A", kind: "refine" },
    { from: "fermi_1933", to: "S", kind: "refine" },
    { from: "fermi_1933", to: "T", kind: "refine" },
    { from: "fermi_1933", to: "P", kind: "refine" },
    { from: "V", to: "wu_1956", kind: "admit" },
    { from: "A", to: "wu_1956", kind: "admit" },
    { from: "fermi_1933", to: "unitarity_1960s", kind: "expand" },
    { from: "unitarity_1960s", to: "electroweak_1970s", kind: "admit" },
    { from: "electroweak_1970s", to: "su5", kind: "uv" },
    { from: "b_to_s_gamma", to: "O7", kind: "refine" },
    { from: "O7", to: "Bs_phi", kind: "refine" },
    { from: "O7", to: "Lb_L", kind: "refine" },
    { from: "b_to_s_gamma", to: "typeII", kind: "uv" },
  ];

  var WALK = ["b_to_s_gamma", "O7", "Bs_phi", "Lb_L", "typeII"];

  var ALL_NODES = SM_NODES.concat(BSM_NODES);
  var BY_ID = {};
  ALL_NODES.forEach(function (n) {
    BY_ID[n.id] = n;
  });

  function el(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]);
    });
    return n;
  }

  function statusColor(status) {
    if (status === "pruned") return "var(--og-pruned)";
    if (status === "conditioned" || status === "expanded" || status === "ranked")
      return "var(--og-amber)";
    return "var(--og-cyan)";
  }

  function visibleAtEra(node, era) {
    return node.era <= era;
  }

  function injectStyle() {
    if (document.getElementById("ogts-space-style")) return;
    var s = document.createElement("style");
    s.id = "ogts-space-style";
    s.textContent = [
      ".og-wrap{--og-cyan:oklch(0.55 0.11 220);--og-amber:oklch(0.62 0.13 75);--og-pruned:oklch(0.52 0.16 350);--og-line:oklch(0.88 0.008 250);--og-muted:oklch(0.48 0.01 250);--og-ink:oklch(0.28 0.01 250);--og-paper:oklch(0.97 0.008 85);--og-chamber:oklch(0.94 0.01 85);}",
      ".dark .og-wrap{--og-cyan:oklch(0.78 0.11 220);--og-amber:oklch(0.8 0.12 80);--og-pruned:oklch(0.72 0.15 350);--og-line:oklch(0.32 0.01 250);--og-muted:oklch(0.68 0.01 250);--og-ink:oklch(0.93 0.005 250);--og-paper:oklch(0.22 0.012 250);--og-chamber:oklch(0.18 0.012 250);}",
      ".og-wrap{margin:1.5rem 0 0;}",
      ".og-toolbar{display:flex;flex-wrap:wrap;gap:0.85rem 1.4rem;align-items:center;margin-bottom:0.85rem;font-size:0.92rem;color:var(--og-ink);}",
      ".og-toolbar label{display:flex;align-items:center;gap:0.55rem;}",
      ".og-toolbar input[type=range]{width:min(16rem,46vw);accent-color:oklch(0.55 0.11 220);}",
      ".og-seg{display:flex;border:1px solid var(--og-line);border-radius:9999px;overflow:hidden;}",
      ".og-seg button{background:transparent;border:0;color:var(--og-ink);padding:0.28rem 0.85rem;cursor:pointer;font:inherit;}",
      ".og-seg button[aria-pressed=true]{background:var(--og-cyan);color:oklch(0.98 0.01 220);}",
      ".og-play{border:1px solid var(--og-line);background:transparent;color:var(--og-ink);border-radius:9999px;padding:0.28rem 0.9rem;cursor:pointer;font:inherit;}",
      ".og-play:hover,.og-seg button:hover{opacity:0.85;}",
      ".og-stage{background:var(--og-paper);border:1px solid var(--og-line);border-radius:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;}",
      ".og-svg{display:block;width:100%;min-width:46rem;height:auto;}",
      ".og-legend{display:flex;flex-wrap:wrap;gap:0.7rem 1.1rem;margin:0.15rem 0 0.7rem;font-size:0.8rem;color:var(--og-muted);}",
      ".og-legend i{display:inline-block;width:0.55rem;height:0.55rem;border-radius:9999px;margin-right:0.35rem;vertical-align:middle;}",
      ".og-hit{cursor:pointer;}",
      ".og-hit:focus{outline:2px solid var(--og-cyan);outline-offset:3px;}",
      ".og-edge{fill:none;stroke-linecap:round;}",
      ".og-inspector{margin-top:1rem;padding:1rem 1.1rem;border:1px solid var(--og-line);border-radius:12px;background:var(--og-paper);color:var(--og-ink);max-width:70ch;}",
      ".og-inspector h3{margin:0 0 0.2rem;font-size:1.05rem;}",
      ".og-inspector .og-kicker{color:var(--og-muted);font-size:0.82rem;margin-bottom:0.45rem;}",
      ".og-inspector p{margin:0;line-height:1.55;}",
      ".og-caption{margin:0.7rem 0 0;font-size:0.82rem;color:var(--og-muted);max-width:70ch;}",
      "@media (prefers-reduced-motion: no-preference){",
      "  .og-edge.og-anim{stroke-dasharray:var(--og-len,400);stroke-dashoffset:var(--og-len,400);transition:stroke-dashoffset 1.1s " + EASE + ";}",
      "  .og-wrap.og-in .og-edge.og-anim{stroke-dashoffset:0;}",
      "}",
    ].join("");
    document.head.appendChild(s);
  }

  function curve(a, b, bow) {
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2;
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var k = bow || 0.12;
    var nx = -dy * k;
    var ny = dx * k;
    return "M " + a.x + " " + a.y + " Q " + (mx + nx) + " " + (my + ny) + " " + b.x + " " + b.y;
  }

  function initOgtsSpace(container) {
    if (!container) return;
    injectStyle();

    var wrap = document.createElement("div");
    wrap.className = "og-wrap";

    var toolbar = document.createElement("div");
    toolbar.className = "og-toolbar";

    var eraLabel = document.createElement("label");
    eraLabel.innerHTML =
      '<span>Constraint era</span><input type="range" min="1933" max="2026" value="2026" step="1"><span data-era>2026</span>';
    var eraInput = eraLabel.querySelector("input");
    var eraReadout = eraLabel.querySelector("[data-era]");

    var seg = document.createElement("div");
    seg.className = "og-seg";
    seg.setAttribute("role", "group");
    seg.setAttribute("aria-label", "Chamber view");
    ["both", "sm", "bsm"].forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.view = v;
      b.textContent = v === "both" ? "Both chambers" : v === "sm" ? "Standard Model" : "BSM futures";
      b.setAttribute("aria-pressed", v === "both" ? "true" : "false");
      seg.appendChild(b);
    });

    var play = document.createElement("button");
    play.type = "button";
    play.className = "og-play";
    play.textContent = "Play allotment walk";

    toolbar.appendChild(eraLabel);
    toolbar.appendChild(seg);
    toolbar.appendChild(play);

    var stage = document.createElement("div");
    stage.className = "og-stage";
    var svg = el("svg", {
      class: "og-svg",
      viewBox: "0 0 1100 640",
      role: "img",
      "aria-label":
        "Two-chamber event display: Standard Model historical spine on the left, open BSM hypothesis space on the right, reconstruction menu along the bottom.",
    });
    stage.appendChild(svg);

    var inspector = document.createElement("div");
    inspector.className = "og-inspector";
    inspector.setAttribute("aria-live", "polite");

    var caption = document.createElement("p");
    caption.className = "og-caption";
    caption.textContent =
      "On a narrow screen, pan the chambers sideways. Track thickness on the BSM side is a schematic compute share for this demonstrator, not a published OGTS ranking. Pruned nodes get zero spend. Reconstruction families along the bottom are the inner loop under an HLT1 latency budget.";

    wrap.appendChild(toolbar);

    var legend = document.createElement("div");
    legend.className = "og-legend";
    legend.innerHTML =
      "<span><i style='background:var(--og-cyan)'></i>admitted / active</span>" +
      "<span><i style='background:var(--og-amber)'></i>ranked / conditioned / expand</span>" +
      "<span><i style='background:var(--og-pruned)'></i>pruned (zero spend)</span>" +
      "<span>thickness = schematic compute share</span>";
    wrap.appendChild(legend);

    wrap.appendChild(stage);
    wrap.appendChild(inspector);
    wrap.appendChild(caption);
    container.appendChild(wrap);

    var state = {
      era: 2026,
      view: "both",
      selected: "O7",
      walk: -1,
      timer: null,
    };

    function chamberOpacity(chamber) {
      if (state.view === "both") return 1;
      return state.view === chamber ? 1 : 0.14;
    }

    function paintInspector(id) {
      var n = BY_ID[id];
      if (!n) return;
      inspector.innerHTML =
        "<h3>" +
        n.label +
        "</h3><div class='og-kicker'>" +
        n.sub +
        (n.grain ? " · grain: " + n.grain : "") +
        (typeof n.allot === "number"
          ? " · illustrative spend " + Math.round(n.allot * 100) + "%"
          : " · Stage 0 calibration, not LHCb CPU") +
        "</div><p>" +
        n.notes +
        "</p>";
    }

    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var gBg = el("g");
      svg.appendChild(gBg);

      gBg.appendChild(
        el("rect", { x: 36, y: 28, width: 500, height: 500, rx: 14, fill: "var(--og-chamber)", opacity: chamberOpacity("sm") })
      );
      gBg.appendChild(
        el("rect", { x: 564, y: 28, width: 500, height: 500, rx: 14, fill: "var(--og-chamber)", opacity: chamberOpacity("bsm") })
      );
      gBg.appendChild(
        el("text", {
          x: 52,
          y: 52,
          fill: "var(--og-muted)",
          "font-size": 13,
          "font-weight": 600,
          "letter-spacing": "0.04em",
        })
      ).textContent = "STANDARD MODEL  ·  closed spine";
      gBg.appendChild(
        el("text", {
          x: 580,
          y: 52,
          fill: "var(--og-muted)",
          "font-size": 13,
          "font-weight": 600,
          "letter-spacing": "0.04em",
        })
      ).textContent = "BSM FUTURES  ·  open searchable space";

      gBg.appendChild(
        el("line", {
          x1: 36,
          y1: 568,
          x2: 1064,
          y2: 568,
          stroke: "var(--og-line)",
          "stroke-width": 1,
        })
      );
      gBg.appendChild(
        el("text", {
          x: 36,
          y: 558,
          fill: "var(--og-muted)",
          "font-size": 12,
          "font-weight": 600,
          "letter-spacing": "0.04em",
        })
      ).textContent = "INNER LOOP  ·  reconstruction menu under HLT1 latency";

      function nodeStatus(n) {
        if (n.prunedAfter && state.era < n.prunedAfter) return "ranked";
        return n.status;
      }

      RECO.forEach(function (r) {
        var on = state.selected === "Lb_L" ? r.id === "uzzienet" || r.id === "garnet" : r.id === "gc" || r.id === "garnet";
        var g = el("g");
        g.appendChild(
          el("rect", {
            x: r.x - 78,
            y: 580,
            width: 156,
            height: 36,
            rx: 18,
            fill: on ? "var(--og-cyan)" : "transparent",
            stroke: "var(--og-line)",
            "stroke-width": 1,
            opacity: on ? 0.9 : 1,
          })
        );
        var t = el("text", {
          x: r.x,
          y: 603,
          "text-anchor": "middle",
          fill: on ? "oklch(0.98 0.01 220)" : "var(--og-ink)",
          "font-size": 12,
        });
        t.textContent = r.label;
        g.appendChild(t);
        svg.appendChild(g);
      });

      EDGES.forEach(function (e) {
        var a = BY_ID[e.from];
        var b = BY_ID[e.to];
        if (!a || !b) return;
        var show =
          visibleAtEra(a, state.era) &&
          visibleAtEra(b, state.era) &&
          (state.view === "both" || a.chamber === state.view);
        var as = nodeStatus(a);
        var bs = nodeStatus(b);
        var pruned = as === "pruned" || bs === "pruned";
        var thick = 1.6;
        if (typeof b.allot === "number") thick = 1.2 + b.allot * 7;
        var path = el("path", {
          class: pruned || e.kind === "uv" ? "og-edge" : "og-edge og-anim",
          d: curve(a, b, e.kind === "uv" ? 0.34 : 0.12),
          stroke: pruned ? "var(--og-pruned)" : statusColor(bs),
          "stroke-width": thick,
          opacity: show ? (pruned ? 0.35 : 0.85) : 0.06,
          "stroke-dasharray": e.kind === "uv" || pruned ? "5 5" : undefined,
        });
        svg.appendChild(path);
      });

      ALL_NODES.forEach(function (n) {
        var show = visibleAtEra(n, state.era) && (state.view === "both" || n.chamber === state.view);
        var st = nodeStatus(n);
        var r = 9;
        if (typeof n.allot === "number") r = 7 + n.allot * 14;
        if (st === "pruned") r = 7;
        var g = el("g", {
          class: "og-hit og-anim",
          tabindex: "0",
          role: "button",
          "data-id": n.id,
          "aria-label": n.label + ", " + n.sub,
          opacity: show ? (st === "pruned" ? 0.55 : 1) : 0.08,
        });
        if (state.selected === n.id) {
          g.appendChild(
            el("circle", {
              cx: n.x,
              cy: n.y,
              r: r + 8,
              fill: "none",
              stroke: statusColor(st),
              "stroke-width": 1.5,
              opacity: 0.9,
            })
          );
        }
        g.appendChild(
          el("circle", {
            cx: n.x,
            cy: n.y,
            r: r,
            fill: statusColor(st),
          })
        );
        var below = n.label.length > 16 && n.y >= 110;
        var tx = el("text", {
          x: below ? n.x : n.x + r + 8,
          y: below ? n.y + r + 16 : n.y + 4,
          "text-anchor": below ? "middle" : "start",
          fill: "var(--og-ink)",
          "font-size": n.label.length > 18 ? 11 : 12.5,
          "font-weight": 600,
        });
        tx.textContent = n.label;
        g.appendChild(tx);
        svg.appendChild(g);
      });

      svg.querySelectorAll(".og-edge.og-anim").forEach(function (p) {
        try {
          p.style.setProperty("--og-len", Math.ceil(p.getTotalLength()) + 1);
        } catch (err) {}
      });

      paintInspector(state.selected);
    }

    function select(id) {
      state.selected = id;
      draw();
    }

    svg.addEventListener("click", function (ev) {
      var g = ev.target.closest("[data-id]");
      if (g) select(g.getAttribute("data-id"));
    });
    svg.addEventListener("keydown", function (ev) {
      if (ev.key !== "Enter" && ev.key !== " ") return;
      var g = ev.target.closest("[data-id]");
      if (!g) return;
      ev.preventDefault();
      select(g.getAttribute("data-id"));
    });

    eraInput.addEventListener("input", function () {
      state.era = Number(eraInput.value);
      eraReadout.textContent = String(state.era);
      draw();
    });

    seg.addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b) return;
      state.view = b.dataset.view;
      Array.prototype.forEach.call(seg.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      draw();
    });

    play.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        state.view = "bsm";
        state.era = 2026;
        eraInput.value = "2026";
        eraReadout.textContent = "2026";
        Array.prototype.forEach.call(seg.querySelectorAll("button"), function (x) {
          x.setAttribute("aria-pressed", x.dataset.view === "bsm" ? "true" : "false");
        });
        select("Bs_phi");
        return;
      }
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
        play.textContent = "Play allotment walk";
        return;
      }
      state.view = "bsm";
      state.era = 2026;
      eraInput.value = "2026";
      eraReadout.textContent = "2026";
      Array.prototype.forEach.call(seg.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", x.dataset.view === "bsm" ? "true" : "false");
      });
      state.walk = 0;
      play.textContent = "Stop walk";
      select(WALK[0]);
      state.timer = setInterval(function () {
        state.walk += 1;
        if (state.walk >= WALK.length) {
          clearInterval(state.timer);
          state.timer = null;
          play.textContent = "Play allotment walk";
          return;
        }
        select(WALK[state.walk]);
      }, 1400);
    });

    function reveal() {
      wrap.classList.add("og-in");
    }
    draw();
    requestAnimationFrame(reveal);
    if ("IntersectionObserver" in window) {
      wrap.classList.remove("og-in");
      new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              reveal();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      ).observe(wrap);
      setTimeout(reveal, 1200);
    }
  }

  global.initOgtsSpace = initOgtsSpace;
})(typeof window !== "undefined" ? window : this);
