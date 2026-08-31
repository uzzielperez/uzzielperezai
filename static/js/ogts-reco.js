/**
 * OGTS inner loop: named reconstruction menu under throughput and resolution gates.
 * Separate object from the SM/BSM hypothesis-space demonstrator.
 * Gate colours are schematic. Graph Clustering remains the published Run 3 gold standard.
 */
(function (global) {
  "use strict";

  var EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  var PRESETS = {
    offline: { tp: 12, res: 18, topo: "inclusive" },
    run3: { tp: 42, res: 48, topo: "inclusive" },
    upgrade2: { tp: 82, res: 78, topo: "inclusive" },
    vertexless: { tp: 82, res: 78, topo: "vertexless" },
  };

  var WALK = ["offline", "run3", "upgrade2", "vertexless"];

  var NODES = [
    {
      id: "root",
      x: 550,
      y: 64,
      label: "PicoCal reconstruction",
      sub: "detector-wide · menu root",
      grain: "menu",
      notes:
        "Every LHCb event must be clustered and written. The architecture is a searchable object, not a per-analysis add-on. The menu is short and named. We do not enumerate every network.",
    },
    {
      id: "ca",
      x: 176,
      y: 248,
      label: "cellular automaton",
      sub: "classical · replaced",
      grain: "classical",
      notes:
        "The family Graph Clustering replaced. It is on the menu so the replacement is visible. A historical prune: occupancy and overlapping showers, not a new ranking.",
    },
    {
      id: "gc",
      x: 368,
      y: 248,
      label: "Graph Clustering",
      sub: "classical · Run 3 gold standard",
      grain: "classical",
      notes:
        "Published Run 3 baseline (Valls Canudas et al., Eur. Phys. J. C 83, 169 (2023)). Distance-threshold clustering. At high occupancy it needs offline calibration and does not learn overlapping showers. Upgrade II can condition it. That is not the same as a published kill.",
    },
    {
      id: "garnet",
      x: 648,
      y: 248,
      label: "GarNet",
      sub: "graph net · named family",
      grain: "graph",
      notes:
        "Graph-net family on the menu. CHEP 2026: PyTorch to ONNX, up to 5× CPU and about 2× GPU at FP32 parity near 10⁻⁷, aimed at Allen HLT1. One family, not the ranking.",
    },
    {
      id: "deepsets",
      x: 848,
      y: 248,
      label: "deep sets",
      sub: "set · named family",
      grain: "set",
      notes:
        "Unordered RecHits as a set. Sibling of the graph family, not a child of GarNet. Named so the menu is complete. Not yet scored at Allen scale on this page.",
    },
    {
      id: "ssm",
      x: 968,
      y: 248,
      label: "state-space models",
      sub: "sequence · named, unscored",
      grain: "sequence",
      notes:
        "On the written menu. No HLT1 score is claimed here. An unscored family stays amber. The gate does not invent a prune.",
    },
    {
      id: "uzzienet",
      x: 648,
      y: 378,
      label: "UzzieNet",
      sub: "graph · attention child of GarNet",
      grain: "graph",
      notes:
        "Node-centric linear-cost attention extending GarNet. CHEP 2026: up to 8× faster than message-passing baselines. A vertex-less radiative photon is a harder calorimeter object than an inclusive cluster. That conditions this family. It does not crown it.",
    },
    {
      id: "distill",
      x: 648,
      y: 500,
      label: "distilled student",
      sub: "inside family · under the latency cut",
      grain: "graph",
      notes:
        "Depth, width, and distillation vary only inside a family. CHEP 2026: Graph(GarNet) to MLP about 95% smaller, beating the teacher on energy resolution. A student can pass a throughput gate the teacher fails. That is still not a published win against Graph Clustering.",
    },
  ];

  var EDGES = [
    { from: "root", to: "ca", kind: "menu" },
    { from: "root", to: "gc", kind: "menu" },
    { from: "root", to: "garnet", kind: "menu" },
    { from: "root", to: "deepsets", kind: "menu" },
    { from: "root", to: "ssm", kind: "menu" },
    { from: "ca", to: "gc", kind: "replaced" },
    { from: "garnet", to: "uzzienet", kind: "refine" },
    { from: "uzzienet", to: "distill", kind: "inside" },
  ];

  var BY_ID = {};
  NODES.forEach(function (n) {
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
    if (status === "conditioned" || status === "ranked" || status === "unscored")
      return "var(--og-amber)";
    return "var(--og-cyan)";
  }

  function statusLabel(status) {
    if (status === "unscored") return "named, not scored";
    return status;
  }

  function bandLabel(kind, v) {
    if (kind === "tp") {
      if (v < 28) return "offline";
      if (v < 62) return "Run 3 HLT1";
      return "Upgrade II";
    }
    if (v < 30) return "inclusive";
    if (v < 65) return "shower overlap";
    return "high occupancy";
  }

  function effectiveRes(res, topo) {
    return Math.min(100, res + (topo === "vertexless" ? 16 : 0));
  }

  function nodeStatus(n, tp, res) {
    if (n.id === "root") return "admitted";
    if (n.id === "ssm") return "unscored";
    if (n.id === "deepsets") return res > 68 ? "conditioned" : "unscored";
    if (n.id === "ca") return tp > 22 || res > 22 ? "pruned" : "ranked";
    if (n.id === "gc") return tp > 72 || res > 72 ? "conditioned" : "active";
    if (n.id === "garnet") {
      if (tp > 78) return "conditioned";
      if (tp > 52) return "active";
      return "ranked";
    }
    if (n.id === "uzzienet") {
      if (tp > 88) return "conditioned";
      if (res < 32) return "ranked";
      return "active";
    }
    if (n.id === "distill") {
      if (tp < 36) return "ranked";
      return "active";
    }
    return "ranked";
  }

  function injectStyle() {
    if (document.getElementById("ogts-reco-style")) return;
    var s = document.createElement("style");
    s.id = "ogts-reco-style";
    s.textContent = [
      ".or-wrap{--og-cyan:oklch(0.55 0.11 220);--og-amber:oklch(0.62 0.13 75);--og-pruned:oklch(0.52 0.16 350);--og-line:oklch(0.88 0.008 250);--og-muted:oklch(0.48 0.01 250);--og-ink:oklch(0.28 0.01 250);--og-paper:oklch(0.97 0.008 85);--og-chamber:oklch(0.94 0.01 85);}",
      ".dark .or-wrap{--og-cyan:oklch(0.78 0.11 220);--og-amber:oklch(0.8 0.12 80);--og-pruned:oklch(0.72 0.15 350);--og-line:oklch(0.32 0.01 250);--og-muted:oklch(0.68 0.01 250);--og-ink:oklch(0.93 0.005 250);--og-paper:oklch(0.22 0.012 250);--og-chamber:oklch(0.18 0.012 250);}",
      ".or-wrap{margin:1.5rem 0 0;}",
      ".or-toolbar{display:flex;flex-wrap:wrap;gap:0.85rem 1.4rem;align-items:center;margin-bottom:0.85rem;font-size:0.92rem;color:var(--og-ink);}",
      ".or-toolbar label{display:flex;align-items:center;gap:0.55rem;}",
      ".or-toolbar input[type=range]{width:min(14rem,42vw);accent-color:oklch(0.55 0.11 220);}",
      ".or-seg{display:flex;border:1px solid var(--og-line);border-radius:9999px;overflow:hidden;}",
      ".or-seg button{background:transparent;border:0;color:var(--og-ink);padding:0.28rem 0.85rem;cursor:pointer;font:inherit;}",
      ".or-seg button[aria-pressed=true]{background:var(--og-cyan);color:oklch(0.98 0.01 220);}",
      ".or-play{border:1px solid var(--og-line);background:transparent;color:var(--og-ink);border-radius:9999px;padding:0.28rem 0.9rem;cursor:pointer;font:inherit;}",
      ".or-play:hover,.or-seg button:hover{opacity:0.85;}",
      ".or-stage{background:var(--og-paper);border:1px solid var(--og-line);border-radius:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;}",
      ".or-svg{display:block;width:100%;min-width:46rem;height:auto;}",
      ".or-legend{display:flex;flex-wrap:wrap;gap:0.7rem 1.1rem;margin:0.15rem 0 0.7rem;font-size:0.8rem;color:var(--og-muted);}",
      ".or-legend i{display:inline-block;width:0.55rem;height:0.55rem;border-radius:9999px;margin-right:0.35rem;vertical-align:middle;}",
      ".or-hit{cursor:pointer;}",
      ".or-hit:focus{outline:2px solid var(--og-cyan);outline-offset:3px;}",
      ".or-edge{fill:none;stroke-linecap:round;}",
      ".or-inspector{margin-top:1rem;padding:1rem 1.1rem;border:1px solid var(--og-line);border-radius:12px;background:var(--og-paper);color:var(--og-ink);max-width:70ch;}",
      ".or-inspector h3{margin:0 0 0.2rem;font-size:1.05rem;}",
      ".or-inspector .or-kicker{color:var(--og-muted);font-size:0.82rem;margin-bottom:0.45rem;}",
      ".or-inspector p{margin:0;line-height:1.55;}",
      ".or-caption{margin:0.7rem 0 0;font-size:0.82rem;color:var(--og-muted);max-width:70ch;}",
      "@media (prefers-reduced-motion: no-preference){",
      "  .or-edge.or-anim{stroke-dasharray:var(--or-len,400);stroke-dashoffset:var(--or-len,400);transition:stroke-dashoffset 1.1s " +
        EASE +
        ";}",
      "  .or-wrap.or-in .or-edge.or-anim{stroke-dashoffset:0;}",
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
    return "M " + a.x + " " + a.y + " Q " + (mx - dy * k) + " " + (my + dx * k) + " " + b.x + " " + b.y;
  }

  function initOgtsReco(container) {
    if (!container) return;
    injectStyle();

    var wrap = document.createElement("div");
    wrap.className = "or-wrap";

    var toolbar = document.createElement("div");
    toolbar.className = "or-toolbar";

    function slider(label, key, min, max) {
      var elab = document.createElement("label");
      elab.innerHTML =
        "<span>" +
        label +
        '</span><input type="range" min="' +
        min +
        '" max="' +
        max +
        '" value="42" step="1"><span data-readout></span>';
      elab.dataset.key = key;
      return elab;
    }

    var tpLab = slider("Throughput gate", "tp", 0, 100);
    var resLab = slider("Resolution demand", "res", 0, 100);
    var tpInput = tpLab.querySelector("input");
    var resInput = resLab.querySelector("input");
    var tpRead = tpLab.querySelector("[data-readout]");
    var resRead = resLab.querySelector("[data-readout]");

    var topo = document.createElement("div");
    topo.className = "or-seg";
    topo.setAttribute("role", "group");
    topo.setAttribute("aria-label", "Calorimeter topology");
    [
      ["inclusive", "Inclusive cluster"],
      ["vertexless", "Vertex-less photon"],
    ].forEach(function (pair, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.topo = pair[0];
      b.textContent = pair[1];
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      topo.appendChild(b);
    });

    var preset = document.createElement("div");
    preset.className = "or-seg";
    preset.setAttribute("role", "group");
    preset.setAttribute("aria-label", "Era preset");
    [
      ["offline", "Offline"],
      ["run3", "Run 3"],
      ["upgrade2", "Upgrade II"],
    ].forEach(function (pair, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.preset = pair[0];
      b.textContent = pair[1];
      b.setAttribute("aria-pressed", i === 1 ? "true" : "false");
      preset.appendChild(b);
    });

    var play = document.createElement("button");
    play.type = "button";
    play.className = "or-play";
    play.textContent = "Play gate walk";

    toolbar.appendChild(tpLab);
    toolbar.appendChild(resLab);
    toolbar.appendChild(topo);
    toolbar.appendChild(preset);
    toolbar.appendChild(play);

    var legend = document.createElement("div");
    legend.className = "or-legend";
    legend.innerHTML =
      "<span><i style='background:var(--og-cyan)'></i>active / admitted</span>" +
      "<span><i style='background:var(--og-amber)'></i>conditioned / unscored</span>" +
      "<span><i style='background:var(--og-pruned)'></i>pruned by a gate</span>" +
      "<span>dashed = replaced, or inside-family distillation</span>";

    var stage = document.createElement("div");
    stage.className = "or-stage";
    var svg = el("svg", {
      class: "or-svg",
      viewBox: "0 0 1100 560",
      role: "img",
      "aria-label":
        "Family tree of LHCb calorimeter reconstruction architectures, coloured by schematic throughput and resolution gates.",
    });
    stage.appendChild(svg);

    var inspector = document.createElement("div");
    inspector.className = "or-inspector";
    inspector.setAttribute("aria-live", "polite");

    var caption = document.createElement("p");
    caption.className = "or-caption";
    caption.textContent =
      "On a narrow screen, pan sideways. Gate colours are schematic for this demonstrator. Graph Clustering is the published Run 3 gold standard. This page does not claim a published OGTS ranking that any learned family beats it at Upgrade II.";

    wrap.appendChild(toolbar);
    wrap.appendChild(legend);
    wrap.appendChild(stage);
    wrap.appendChild(inspector);
    wrap.appendChild(caption);
    container.appendChild(wrap);

    var state = {
      tp: 42,
      res: 48,
      topo: "inclusive",
      selected: "gc",
      walk: -1,
      timer: null,
    };

    function syncInputs() {
      tpInput.value = String(state.tp);
      resInput.value = String(state.res);
      tpRead.textContent = bandLabel("tp", state.tp);
      resRead.textContent = bandLabel("res", effectiveRes(state.res, state.topo));
      Array.prototype.forEach.call(topo.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", x.dataset.topo === state.topo ? "true" : "false");
      });
    }

    function markPreset() {
      var hit = null;
      Object.keys(PRESETS).forEach(function (k) {
        if (k === "vertexless") return;
        var p = PRESETS[k];
        if (p.tp === state.tp && p.res === state.res) hit = k;
      });
      Array.prototype.forEach.call(preset.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", x.dataset.preset === hit ? "true" : "false");
      });
    }

    function applyPreset(name) {
      var p = PRESETS[name];
      if (!p) return;
      state.tp = p.tp;
      state.res = p.res;
      state.topo = p.topo;
      syncInputs();
      markPreset();
      draw();
    }

    function paintInspector(id) {
      var n = BY_ID[id];
      if (!n) return;
      var res = effectiveRes(state.res, state.topo);
      var st = nodeStatus(n, state.tp, res);
      inspector.innerHTML =
        "<h3>" +
        n.label +
        "</h3><div class='or-kicker'>" +
        n.sub +
        " · " +
        statusLabel(st) +
        " · throughput " +
        bandLabel("tp", state.tp) +
        " · resolution " +
        bandLabel("res", res) +
        (state.topo === "vertexless" ? " · vertex-less topology" : "") +
        "</div><p>" +
        n.notes +
        "</p>";
    }

    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var res = effectiveRes(state.res, state.topo);
      var gBg = el("g");
      svg.appendChild(gBg);

      gBg.appendChild(
        el("rect", { x: 36, y: 108, width: 500, height: 428, rx: 14, fill: "var(--og-chamber)" })
      );
      gBg.appendChild(
        el("rect", { x: 564, y: 108, width: 500, height: 428, rx: 14, fill: "var(--og-chamber)" })
      );
      gBg.appendChild(
        el("text", {
          x: 52,
          y: 132,
          fill: "var(--og-muted)",
          "font-size": 13,
          "font-weight": 600,
          "letter-spacing": "0.04em",
        })
      ).textContent = "CLASSICAL  ·  replacement lineage";
      gBg.appendChild(
        el("text", {
          x: 580,
          y: 132,
          fill: "var(--og-muted)",
          "font-size": 13,
          "font-weight": 600,
          "letter-spacing": "0.04em",
        })
      ).textContent = "LEARNED  ·  named families";

      EDGES.forEach(function (e) {
        var a = BY_ID[e.from];
        var b = BY_ID[e.to];
        if (!a || !b) return;
        var bs = nodeStatus(b, state.tp, res);
        var dashed = e.kind === "replaced" || e.kind === "inside";
        var path = el("path", {
          class: dashed ? "or-edge" : "or-edge or-anim",
          d: curve(a, b, e.kind === "replaced" ? 0.28 : 0.1),
          stroke: statusColor(bs),
          "stroke-width": e.from === "root" ? 1.4 : 2,
          opacity: bs === "pruned" ? 0.35 : 0.85,
          "stroke-dasharray": dashed ? "5 5" : undefined,
        });
        svg.appendChild(path);
      });

      NODES.forEach(function (n) {
        var st = nodeStatus(n, state.tp, res);
        var r = n.id === "root" ? 11 : 9;
        var g = el("g", {
          class: "or-hit",
          tabindex: "0",
          role: "button",
          "data-id": n.id,
          "aria-label": n.label + ", " + statusLabel(st),
          opacity: st === "pruned" ? 0.55 : 1,
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
            })
          );
        }
        g.appendChild(el("circle", { cx: n.x, cy: n.y, r: r, fill: statusColor(st) }));
        var below = n.id === "root" || n.label.length > 16;
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

      svg.querySelectorAll(".or-edge.or-anim").forEach(function (p) {
        try {
          p.style.setProperty("--or-len", Math.ceil(p.getTotalLength()) + 1);
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

    tpInput.addEventListener("input", function () {
      state.tp = Number(tpInput.value);
      syncInputs();
      markPreset();
      draw();
    });
    resInput.addEventListener("input", function () {
      state.res = Number(resInput.value);
      syncInputs();
      markPreset();
      draw();
    });

    topo.addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b) return;
      state.topo = b.dataset.topo;
      syncInputs();
      draw();
    });

    preset.addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b) return;
      applyPreset(b.dataset.preset);
    });

    play.addEventListener("click", function () {
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        applyPreset("vertexless");
        select("uzzienet");
        return;
      }
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
        play.textContent = "Play gate walk";
        return;
      }
      var FOCUS = ["ca", "gc", "garnet", "uzzienet"];
      state.walk = 0;
      play.textContent = "Stop walk";
      applyPreset(WALK[0]);
      select(FOCUS[0]);
      state.timer = setInterval(function () {
        state.walk += 1;
        if (state.walk >= WALK.length) {
          clearInterval(state.timer);
          state.timer = null;
          play.textContent = "Play gate walk";
          return;
        }
        applyPreset(WALK[state.walk]);
        select(FOCUS[state.walk]);
      }, 1500);
    });

    syncInputs();
    markPreset();
    draw();
    function reveal() {
      wrap.classList.add("or-in");
    }
    requestAnimationFrame(reveal);
    if ("IntersectionObserver" in window) {
      wrap.classList.remove("or-in");
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

  global.initOgtsReco = initOgtsReco;
})(typeof window !== "undefined" ? window : this);
