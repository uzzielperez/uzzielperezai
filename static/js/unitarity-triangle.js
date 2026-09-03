/**
 * Schematic Unitarity Triangle evolution, 2006 to Upgrade II.
 * Not a UTfit likelihood. Band widths are pedagogical, keyed to the
 * real experimental eras in Vagnoni's 2024 LHCb Starterkit talk.
 */
(function (global) {
  "use strict";

  var EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  var YEARS = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2016, 2018, 2023, 2035];
  var APEX = { rho: 0.159, eta: 0.353 };
  var NP_LOOP = { rho: 0.31, eta: 0.46 };

  var RHO_MIN = -0.18;
  var RHO_MAX = 1.18;
  var ETA_MIN = -0.14;
  var ETA_MAX = 0.74;
  var PL = 68;
  var PT = 22;
  var PR = 18;
  var PB = 52;
  var VW = 720;
  var VH = 488;
  var PW = VW - PL - PR;
  var PH = VH - PT - PB;

  var BANDS = [
    { id: "gamma", label: "γ", swatch: "var(--ut-gamma)" },
    { id: "sin2b", label: "sin 2β", swatch: "var(--ut-sin2b)" },
    { id: "alpha", label: "α", swatch: "var(--ut-alpha)" },
    { id: "vub", label: "|Vub / Vcb|", swatch: "var(--ut-vub)" },
    { id: "dmd", label: "Δmd / Δms", swatch: "var(--ut-dmd)" },
    { id: "epsk", label: "εK", swatch: "var(--ut-epsk)" },
    { id: "btaunu", label: "B → τν", swatch: "var(--ut-tau)" },
  ];

  var YEAR_COPY = {
    2006: {
      kicker: "B factories · Tevatron",
      title: "The apex is still a neighbourhood",
      body: "BaBar and Belle already own sin 2β, the green wedge from (1,0). CDF has just seen Bs oscillations, so the mixing ring around (1,0) exists at all. γ is a purple shrug from the origin. The black overlap is an oval you can see without squinting.",
    },
    2007: {
      kicker: "B factories",
      title: "Same lighthouses, slightly sharper bearings",
      body: "The green sin 2β wedge is already the most precise thing on the plot. Everything else is still a weather front. The triangle is implied more than drawn. Nobody is surprised that the bands overlap; they are still wide enough that they almost have to.",
    },
    2008: {
      kicker: "B factories",
      title: "Kobayashi and Maskawa get the Nobel",
      body: "The 2001 golden-mode measurements are now textbook. The plot is the CKM picture working at B-factory precision. γ is still the missing angle: tree-level, theoretically clean, and experimentally a fan.",
    },
    2009: {
      kicker: "LHC startup",
      title: "LHCb exists. The bands do not know yet.",
      body: "The detector that was approved in 1998 starts taking data with the LHC. On this plane, 2009 still looks like a B-factory plot. The forward spectrometer has not yet spent its b and c samples on γ and mixing.",
    },
    2010: {
      kicker: "Last pre-LHCb year",
      title: "The oval is smaller. The fan is not.",
      body: "Lattice QCD and more B-factory luminosity have pinched |Vub / Vcb| and the mixing rings a little. γ has not had its experiment yet. The next millimetre on this plot will not come from another year of BaBar.",
    },
    2011: {
      kicker: "LHCb is on",
      title: "A new colour, and a new owner",
      body: "B → τν enters as an orange ring around the origin: a B-factory leptonic mode, a bit high at first. LHCb starts to pinch Δms. On Vincenzo's slide this is the first panel with a drawn triangle. The apex is no longer only a B-factory object.",
    },
    2012: {
      kicker: "LHCb Run 1",
      title: "γ starts to mean something",
      body: "GLW, ADS, and GGSZ analyses of B → DK are no longer a method paper. They are a wedge. Still broad, but pointing. Mixing frequencies keep tightening because the forward detector sees Bs that e+e− machines barely make.",
    },
    2013: {
      kicker: "winter 13",
      title: "Conference heartbeat",
      body: "UTfit updates at the major meetings now move millimetres, not centimetres. The yellow |Vub / Vcb| ring stays thicker than the angles: inclusive and exclusive semileptonic determinations still disagree. Geometry is clean. QCD is not.",
    },
    2014: {
      kicker: "summer 14",
      title: "The sides pin, the angles close in",
      body: "Δmd / Δms, with lattice ξ, is becoming a thin ring around (1,0). α is still a pale neighbourhood at the apex: penguins in B → ππ, ρρ, ρπ are hard bookkeeping. γ is LHCb's to finish.",
    },
    2016: {
      kicker: "summer 16 · Run 1 harvest",
      title: "The overlap is an oval, not a district",
      body: "Run 1 papers are in. The purple fan is a band. sin 2β is a line from (1,0). If you only looked at 2006, you would not recognise how little room is left. They still meet. That is the test, not the logo.",
    },
    2018: {
      kicker: "Run 2 in the mix",
      title: "Bands that look like lines",
      body: "The global-fit contour is a small black oval. Tree-level γ and loop-sensitive mixing agree at the precision the plot can show. The ten-percent room Vincenzo mentioned is still there. You just cannot see it as a cartoon miss anymore.",
    },
    2023: {
      kicker: "summer 23 · Vincenzo's slide",
      title: "Tremendous success of the CKM paradigm",
      body: "γ and sin 2β are lines. The apex is a dot: ρ̄ = 0.159 ± 0.009, η̄ = 0.353 ± 0.008 in the later UTfit update. A ~2σ pull in sin 2β is visible because the green wedge is that sharp. Room for new physics at the ten-percent level has not closed. It has just run out of hiding places that look like 2006.",
    },
    2035: {
      kicker: "LHCb Upgrade II · schematic",
      title: "Tree versus loop, at a fraction of a degree",
      body: "Vincenzo's Upgrade II targets: σ(γ) = 0.4°, σ(sin 2β) = 0.003, σ(φs) = 4 mrad. This last tick is not data. It is the reason the detector is being rebuilt. Tree-level γ is the Standard Model benchmark. Loop observables are where a heavy particle could shove a band. At this width, a ten-percent shift has nowhere to sit. Run 3 is already feeding the same plot; Upgrade II is when the comparison becomes a search.",
    },
  };

  var BAND_COPY = {
    gamma: {
      title: "γ, the wedge from the origin",
      body: "Stand at (0,0). The opening angle of the side up to the apex is γ, measured in tree-level B → DK (and cousins). No heavy virtual particle has to run in a loop for this number to exist. In 2006 the fan is a shrug. LHCb turned it into a line. Upgrade II asks for 0.4°. That is the Standard Model ruler the loops will be measured against.",
    },
    sin2b: {
      title: "sin 2β, the wedge from (1,0)",
      body: "Stand at the other end of the base. BaBar and Belle saw this in 2001 in B0 → J/ψ KS. LHCb now owns the single most precise determination. UTfit sees a roughly 2σ pull against the rest of the triangle. Not a discovery. Not nothing. The green band is so sharp that a small disagreement becomes a visible gap.",
    },
    alpha: {
      title: "α, the palaver at the apex",
      body: "α sits at the third vertex. You get it from B → ππ, ρρ, and ρπ plus isospin to subtract penguins. BaBar and Belle built it; Belle II is tightening it. It stays broader than β or γ because the hadronic bookkeeping is harder. It is a consistency check, not the sharpest lighthouse.",
    },
    vub: {
      title: "|Vub / Vcb|, the ring around the origin",
      body: "The length of the side from (0,0) to the apex. Semileptonic B decays, plus LHCb's Λb → p μ ν. Inclusive and exclusive determinations have not fully agreed for a long time, which is why this ring stays thicker than the angles. Lattice form factors are part of the width. Upgrade II does not magically erase QCD.",
    },
    dmd: {
      title: "Δmd / Δms, the ring around (1,0)",
      body: "Neutral B mesons oscillate. The frequency is a mass difference, mostly |Vtd|² and |Vts|². CDF saw Bs mixing in 2006; LHCb made Δms a precision constant of nature. The ratio cancels a lot of lattice uncertainty. These are loop amplitudes: a new particle in the box diagram would shove this ring off the tree-level apex.",
    },
    epsk: {
      title: "εK, the kaon hyperbola",
      body: "Indirect CP violation in K0–K̄0 mixing. The experimental number is old (NA48, KTeV). The width is now mostly the lattice bag parameter BK. Another loop. If the hyperbola missed the B-physics apex, that would be new physics in ΔF = 2, or a mistake in the kaon theory. So far it does not miss.",
    },
    btaunu: {
      title: "B → τν, the orange ring that arrives in 2011",
      body: "A leptonic tree, proportional to |Vub|² fB², and sensitive to a charged Higgs. Belle, BaBar, Belle II. It showed up a little high, then relaxed. LHCb does not own this band: too many neutrinos. On the slider it appears in 2011 and stays a supporting ring, not the plot's edge.",
    },
  };

  var NP_COPY = {
    kicker: "Illustration only · Vincenzo's 'dream' slide",
    title: "If loops were shoved, the bearings would miss",
    body: "Tree-level γ and |Vub / Vcb| still point at the Standard Model apex. The loop-sensitive bands (εK, mixing, and a displaced sin 2β) have been moved by hand. This is not a fit. It is the cartoon of why Upgrade II exists: make the tree ruler and the loop bearings so sharp that a miss cannot hide in the width of a 2006 oval.",
  };

  function el(tag, attrs) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]);
    });
    return n;
  }

  function X(rho) {
    return PL + ((rho - RHO_MIN) / (RHO_MAX - RHO_MIN)) * PW;
  }
  function Y(eta) {
    return PT + ((ETA_MAX - eta) / (ETA_MAX - ETA_MIN)) * PH;
  }

  function lerpKeys(year, keys) {
    if (year <= keys[0].y) return keys[0].v;
    if (year >= keys[keys.length - 1].y) return keys[keys.length - 1].v;
    for (var i = 1; i < keys.length; i++) {
      if (year <= keys[i].y) {
        var t = (year - keys[i - 1].y) / (keys[i].y - keys[i - 1].y);
        return keys[i - 1].v + t * (keys[i].v - keys[i - 1].v);
      }
    }
    return keys[keys.length - 1].v;
  }

  function yearLabel(year) {
    return year >= 2030 ? "Upgrade II" : String(year);
  }

  function widths(year) {
    return {
      gamma: lerpKeys(year, [
        { y: 2006, v: 0.38 },
        { y: 2010, v: 0.3 },
        { y: 2012, v: 0.2 },
        { y: 2016, v: 0.11 },
        { y: 2018, v: 0.07 },
        { y: 2023, v: 0.042 },
        { y: 2035, v: 0.007 },
      ]),
      sin2b: lerpKeys(year, [
        { y: 2006, v: 0.11 },
        { y: 2011, v: 0.08 },
        { y: 2016, v: 0.05 },
        { y: 2023, v: 0.022 },
        { y: 2035, v: 0.006 },
      ]),
      vub: lerpKeys(year, [
        { y: 2006, v: 0.11 },
        { y: 2014, v: 0.09 },
        { y: 2023, v: 0.07 },
        { y: 2035, v: 0.055 },
      ]),
      dmd: lerpKeys(year, [
        { y: 2006, v: 0.13 },
        { y: 2011, v: 0.08 },
        { y: 2016, v: 0.045 },
        { y: 2023, v: 0.028 },
        { y: 2035, v: 0.014 },
      ]),
      epsk: lerpKeys(year, [
        { y: 2006, v: 0.085 },
        { y: 2014, v: 0.06 },
        { y: 2023, v: 0.038 },
        { y: 2035, v: 0.022 },
      ]),
      alpha: lerpKeys(year, [
        { y: 2006, v: 0.22 },
        { y: 2014, v: 0.16 },
        { y: 2023, v: 0.11 },
        { y: 2035, v: 0.07 },
      ]),
      tau: lerpKeys(year, [
        { y: 2011, v: 0.1 },
        { y: 2016, v: 0.08 },
        { y: 2023, v: 0.065 },
        { y: 2035, v: 0.05 },
      ]),
      fitR: lerpKeys(year, [
        { y: 2006, v: 0.095 },
        { y: 2011, v: 0.06 },
        { y: 2016, v: 0.035 },
        { y: 2023, v: 0.016 },
        { y: 2035, v: 0.007 },
      ]),
    };
  }

  function ptsToPath(pts, closed) {
    var d = "";
    for (var i = 0; i < pts.length; i++) {
      var cmd = i === 0 ? "M" : "L";
      d += cmd + X(pts[i].rho).toFixed(1) + " " + Y(pts[i].eta).toFixed(1) + " ";
    }
    if (closed) d += "Z";
    return d;
  }

  function arcPts(cx, cy, r, a0, a1, n) {
    var pts = [];
    for (var i = 0; i <= n; i++) {
      var a = a0 + ((a1 - a0) * i) / n;
      pts.push({ rho: cx + r * Math.cos(a), eta: cy + r * Math.sin(a) });
    }
    return pts;
  }

  function wedgePath(cx, cy, ang, half, rMax) {
    var n = 28;
    var pts = [{ rho: cx, eta: cy }];
    for (var i = 0; i <= n; i++) {
      var a = ang - half + (2 * half * i) / n;
      pts.push({ rho: cx + rMax * Math.cos(a), eta: cy + rMax * Math.sin(a) });
    }
    return ptsToPath(pts, true);
  }

  function annulusPath(cx, cy, rIn, rOut, a0, a1) {
    var outer = arcPts(cx, cy, rOut, a0, a1, 56);
    var inner = arcPts(cx, cy, Math.max(rIn, 0.02), a1, a0, 56);
    return ptsToPath(outer.concat(inner), true);
  }

  function epsKPath(apex, width) {
    var A = 1.3;
    var C = apex.eta * (A - apex.rho);
    var rhos = [];
    for (var rho = -0.14; rho <= 0.58; rho += 0.018) rhos.push(rho);
    var up = rhos.map(function (rho) {
      return { rho: rho, eta: C / (A - rho) + width };
    });
    var dn = rhos
      .slice()
      .reverse()
      .map(function (rho) {
        return { rho: rho, eta: C / (A - rho) - width };
      });
    return ptsToPath(up.concat(dn), true);
  }

  function injectStyle() {
    if (document.getElementById("ut-evol-style")) return;
    var s = document.createElement("style");
    s.id = "ut-evol-style";
    s.textContent = [
      ".ut-wrap{--ut-gamma:oklch(0.52 0.16 325);--ut-sin2b:oklch(0.55 0.12 155);--ut-alpha:oklch(0.62 0.08 230);--ut-vub:oklch(0.72 0.13 85);--ut-dmd:oklch(0.62 0.13 40);--ut-epsk:oklch(0.62 0.09 330);--ut-tau:oklch(0.58 0.14 55);--ut-line:oklch(0.88 0.008 85);--ut-muted:oklch(0.48 0.02 85);--ut-ink:oklch(0.28 0.02 85);--ut-paper:oklch(0.97 0.01 85);--ut-plot:oklch(0.94 0.012 85);--ut-fit:oklch(0.22 0.01 85);}",
      ".dark .ut-wrap{--ut-gamma:oklch(0.72 0.14 325);--ut-sin2b:oklch(0.74 0.11 155);--ut-alpha:oklch(0.72 0.07 230);--ut-vub:oklch(0.8 0.12 85);--ut-dmd:oklch(0.74 0.12 45);--ut-epsk:oklch(0.74 0.08 330);--ut-tau:oklch(0.72 0.13 55);--ut-line:oklch(0.32 0.01 250);--ut-muted:oklch(0.68 0.01 250);--ut-ink:oklch(0.93 0.005 250);--ut-paper:oklch(0.22 0.012 250);--ut-plot:oklch(0.18 0.012 250);--ut-fit:oklch(0.92 0.01 250);}",
      ".ut-wrap{margin:1.6rem 0 1.8rem;color:var(--ut-ink);}",
      ".ut-toolbar{display:flex;flex-wrap:wrap;gap:0.75rem 1.2rem;align-items:center;margin-bottom:0.7rem;font-size:0.92rem;}",
      ".ut-toolbar label{display:flex;align-items:center;gap:0.55rem;flex:1 1 14rem;}",
      ".ut-toolbar input[type=range]{flex:1;accent-color:oklch(0.55 0.11 155);min-width:8rem;}",
      ".ut-year{font-variant-numeric:tabular-nums;font-weight:650;min-width:6.6rem;}",
      ".ut-play,.ut-seg button{border:1px solid var(--ut-line);background:transparent;color:var(--ut-ink);border-radius:9999px;padding:0.28rem 0.9rem;cursor:pointer;font:inherit;}",
      ".ut-play:hover,.ut-seg button:hover{opacity:0.85;}",
      ".ut-play:focus-visible,.ut-seg button:focus-visible,.ut-chip:focus-visible{outline:2px solid var(--ut-sin2b);outline-offset:3px;}",
      ".ut-seg{display:flex;border:1px solid var(--ut-line);border-radius:9999px;overflow:hidden;}",
      ".ut-seg button{border:0;border-radius:0;}",
      ".ut-seg button[aria-pressed=true]{background:var(--ut-sin2b);color:oklch(0.98 0.01 155);}",
      ".ut-legend{display:flex;flex-wrap:wrap;gap:0.35rem;margin:0 0 0.7rem;}",
      ".ut-chip{border:1px solid var(--ut-line);background:var(--ut-paper);color:var(--ut-ink);border-radius:9999px;padding:0.18rem 0.7rem;cursor:pointer;font:inherit;font-size:0.8rem;}",
      ".ut-chip i{display:inline-block;width:0.5rem;height:0.5rem;border-radius:9999px;margin-right:0.35rem;vertical-align:middle;}",
      ".ut-chip[aria-pressed=true]{border-color:var(--ut-ink);}",
      ".ut-chip[data-off=true]{opacity:0.38;}",
      ".ut-stage{background:var(--ut-paper);border:1px solid var(--ut-line);border-radius:12px;overflow:hidden;}",
      ".ut-svg{display:block;width:100%;height:auto;overflow:hidden;}",
      ".ut-band{fill-opacity:0.34;stroke-opacity:0.85;stroke-width:1.1;cursor:pointer;transition:fill-opacity 0.25s " +
        EASE +
        ", opacity 0.25s " +
        EASE +
        ";}",
      ".ut-wrap[data-focus] .ut-band{fill-opacity:0.12;stroke-opacity:0.35;}",
      ".ut-wrap[data-focus=gamma] .ut-band[data-id=gamma],.ut-wrap[data-focus=sin2b] .ut-band[data-id=sin2b],.ut-wrap[data-focus=alpha] .ut-band[data-id=alpha],.ut-wrap[data-focus=vub] .ut-band[data-id=vub],.ut-wrap[data-focus=dmd] .ut-band[data-id=dmd],.ut-wrap[data-focus=epsk] .ut-band[data-id=epsk],.ut-wrap[data-focus=btaunu] .ut-band[data-id=btaunu]{fill-opacity:0.5;stroke-opacity:1;}",
      ".ut-inspect{margin-top:0.95rem;padding:1rem 1.1rem;border:1px solid var(--ut-line);border-radius:12px;background:var(--ut-paper);max-width:70ch;}",
      ".ut-inspect h3{margin:0 0 0.15rem;font-size:1.08rem;letter-spacing:-0.01em;}",
      ".ut-kicker{color:var(--ut-muted);font-size:0.8rem;margin-bottom:0.4rem;}",
      ".ut-inspect p{margin:0;line-height:1.55;}",
      ".ut-caption{margin:0.65rem 0 0;font-size:0.8rem;color:var(--ut-muted);max-width:70ch;}",
      ".ut-era{display:flex;flex-wrap:wrap;gap:0.4rem 0.85rem;margin:0.45rem 0 0.15rem;font-size:0.75rem;color:var(--ut-muted);}",
      ".ut-era span[data-on=true]{color:var(--ut-ink);font-weight:600;}",
      "@media (prefers-reduced-motion: reduce){.ut-band{transition:none;}}",
    ].join("");
    document.head.appendChild(s);
  }

  function initUnitarityTriangle(container) {
    if (!container) return;
    injectStyle();

    var wrap = document.createElement("div");
    wrap.className = "ut-wrap";

    var toolbar = document.createElement("div");
    toolbar.className = "ut-toolbar";

    var play = document.createElement("button");
    play.type = "button";
    play.className = "ut-play";
    play.textContent = "Play the years";

    var yearLab = document.createElement("label");
    yearLab.innerHTML =
      '<span class="ut-year" data-year>2006</span><input type="range" min="0" max="' +
      (YEARS.length - 1) +
      '" value="0" step="1" aria-label="Year of the Unitarity Triangle fit">';
    var slider = yearLab.querySelector("input");
    var yearRead = yearLab.querySelector("[data-year]");

    var seg = document.createElement("div");
    seg.className = "ut-seg";
    seg.setAttribute("role", "group");
    seg.setAttribute("aria-label", "Overlap scenario");
    [
      ["ckm", "They meet"],
      ["np", "Loops shoved"],
    ].forEach(function (pair, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.mode = pair[0];
      b.textContent = pair[1];
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      seg.appendChild(b);
    });

    toolbar.appendChild(play);
    toolbar.appendChild(yearLab);
    toolbar.appendChild(seg);

    var eras = document.createElement("div");
    eras.className = "ut-era";
    eras.innerHTML =
      '<span data-era="bf">B factories</span>' +
      '<span data-era="on">LHCb arrives</span>' +
      '<span data-era="prec">Precision</span>' +
      '<span data-era="uii">Upgrade II</span>';

    var legend = document.createElement("div");
    legend.className = "ut-legend";
    legend.setAttribute("role", "group");
    legend.setAttribute("aria-label", "Constraint bands");
    BANDS.forEach(function (band) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "ut-chip";
      chip.dataset.id = band.id;
      chip.setAttribute("aria-pressed", "false");
      chip.innerHTML = "<i style='background:" + band.swatch + "'></i>" + band.label;
      legend.appendChild(chip);
    });

    var stage = document.createElement("div");
    stage.className = "ut-stage";
    var svg = el("svg", {
      class: "ut-svg",
      viewBox: "0 0 " + VW + " " + VH,
      role: "img",
      "aria-label":
        "Schematic Unitarity Triangle in the rho-bar eta-bar plane. Coloured bands are constraints that shrink with year.",
    });
    stage.appendChild(svg);

    var inspect = document.createElement("div");
    inspect.className = "ut-inspect";
    inspect.setAttribute("aria-live", "polite");

    var caption = document.createElement("p");
    caption.className = "ut-caption";
    caption.textContent =
      "Schematic, not a UTfit likelihood. Band widths follow the experimental eras on Vincenzo Vagnoni's 2024 LHCb Starterkit slide. The last tick is an Upgrade II sketch (σ(γ) = 0.4°), not a published fit. Loops shoved is illustration only.";

    wrap.appendChild(toolbar);
    wrap.appendChild(eras);
    wrap.appendChild(legend);
    wrap.appendChild(stage);
    wrap.appendChild(inspect);
    wrap.appendChild(caption);
    container.appendChild(wrap);

    var state = { i: 0, mode: "ckm", focus: null, timer: null };

    function year() {
      return YEARS[state.i];
    }

    function apexFor(kind) {
      if (state.mode !== "np") return APEX;
      if (kind === "loop") return NP_LOOP;
      return APEX;
    }

    function paintInspector() {
      var copy;
      if (state.focus && BAND_COPY[state.focus]) {
        copy = BAND_COPY[state.focus];
        inspect.innerHTML =
          "<div class='ut-kicker'>" +
          yearLabel(year()) +
          " · selected band</div><h3>" +
          copy.title +
          "</h3><p>" +
          copy.body +
          "</p>";
        return;
      }
      copy = state.mode === "np" ? NP_COPY : YEAR_COPY[year()];
      inspect.innerHTML =
        "<div class='ut-kicker'>" + copy.kicker + "</div><h3>" + copy.title + "</h3><p>" + copy.body + "</p>";
    }

    function markEras() {
      var y = year();
      wrap.querySelector('[data-era="bf"]').dataset.on = y < 2011 ? "true" : "false";
      wrap.querySelector('[data-era="on"]').dataset.on = y >= 2011 && y < 2018 ? "true" : "false";
      wrap.querySelector('[data-era="prec"]').dataset.on = y >= 2018 && y < 2030 ? "true" : "false";
      wrap.querySelector('[data-era="uii"]').dataset.on = y >= 2030 ? "true" : "false";
    }

    function bandEl(id, d, color) {
      return el("path", {
        class: "ut-band",
        "data-id": id,
        d: d,
        fill: color,
        stroke: color,
      });
    }

    function draw() {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var y = year();
      var w = widths(y);
      var tree = apexFor("tree");
      var loop = apexFor("loop");
      var showTau = y >= 2011;

      var clipId = "ut-clip-" + Math.random().toString(36).slice(2, 9);
      var defs = el("defs");
      var clip = el("clipPath", { id: clipId });
      clip.appendChild(el("rect", { x: PL, y: PT, width: PW, height: PH }));
      defs.appendChild(clip);
      svg.appendChild(defs);
      svg.appendChild(el("rect", { x: 0, y: 0, width: VW, height: VH, fill: "var(--ut-plot)" }));

      var grid = el("g", { "aria-hidden": "true" });
      [0, 0.5, 1].forEach(function (rho) {
        grid.appendChild(
          el("line", {
            x1: X(rho),
            y1: Y(ETA_MIN),
            x2: X(rho),
            y2: Y(ETA_MAX),
            stroke: "var(--ut-line)",
            "stroke-width": rho === 0 || rho === 1 ? 1.2 : 0.6,
          })
        );
      });
      [0, 0.5].forEach(function (eta) {
        grid.appendChild(
          el("line", {
            x1: X(RHO_MIN),
            y1: Y(eta),
            x2: X(RHO_MAX),
            y2: Y(eta),
            stroke: "var(--ut-line)",
            "stroke-width": eta === 0 ? 1.2 : 0.6,
          })
        );
      });
      svg.appendChild(grid);

      function tick(rho, eta, label, anchor) {
        var t = el("text", {
          x: X(rho),
          y: Y(eta),
          fill: "var(--ut-muted)",
          "font-size": "11",
          "text-anchor": anchor || "middle",
        });
        t.textContent = label;
        svg.appendChild(t);
      }
      tick(0, ETA_MIN - 0.04, "0");
      tick(1, ETA_MIN - 0.04, "1");
      tick((RHO_MIN + RHO_MAX) / 2, ETA_MIN - 0.09, "ρ̄");
      tick(RHO_MIN - 0.02, 0, "0", "end");
      tick(RHO_MIN - 0.02, 0.5, "0.5", "end");
      var ylab = el("text", {
        x: X(RHO_MIN) - 44,
        y: Y((ETA_MIN + ETA_MAX) / 2),
        fill: "var(--ut-muted)",
        "font-size": "11",
        transform: "rotate(-90 " + (X(RHO_MIN) - 44) + " " + Y((ETA_MIN + ETA_MAX) / 2) + ")",
        "text-anchor": "middle",
      });
      ylab.textContent = "η̄";
      svg.appendChild(ylab);

      var bands = el("g", { "clip-path": "url(#" + clipId + ")" });
      var angTree = Math.atan2(tree.eta, tree.rho);
      var angLoopB = Math.atan2(loop.eta, loop.rho - 1);
      var rTree = Math.hypot(tree.rho, tree.eta);
      var rLoop = Math.hypot(loop.rho - 1, loop.eta);

      bands.appendChild(bandEl("gamma", wedgePath(0, 0, angTree, w.gamma, 1.08), "var(--ut-gamma)"));
      bands.appendChild(
        bandEl("sin2b", wedgePath(1, 0, angLoopB, w.sin2b, 1.2), "var(--ut-sin2b)")
      );
      bands.appendChild(
        bandEl(
          "vub",
          annulusPath(0, 0, rTree - w.vub, rTree + w.vub, -0.15, Math.PI + 0.15),
          "var(--ut-vub)"
        )
      );
      bands.appendChild(
        bandEl(
          "dmd",
          annulusPath(1, 0, rLoop - w.dmd, rLoop + w.dmd, Math.PI * 0.15, Math.PI * 0.95),
          "var(--ut-dmd)"
        )
      );
      bands.appendChild(bandEl("epsk", epsKPath(loop, w.epsk), "var(--ut-epsk)"));
      bands.appendChild(
        bandEl(
          "alpha",
          annulusPath(tree.rho, tree.eta, 0.02, w.alpha + 0.04, -2.5, 0.9),
          "var(--ut-alpha)"
        )
      );
      if (showTau) {
        bands.appendChild(
          bandEl(
            "btaunu",
            annulusPath(0, 0, rTree - w.tau * 0.7, rTree + w.tau * 0.55, 0.05, Math.PI - 0.05),
            "var(--ut-tau)"
          )
        );
      }
      svg.appendChild(bands);

      var overlay = el("g", { "clip-path": "url(#" + clipId + ")" });
      overlay.appendChild(
        el("polyline", {
          points: [X(0), Y(0), X(1), Y(0), X(tree.rho), Y(tree.eta), X(0), Y(0)].join(" "),
          fill: "none",
          stroke: "var(--ut-fit)",
          "stroke-width": y >= 2011 ? 1.6 : 0.7,
          "stroke-opacity": y >= 2011 ? 0.9 : 0.35,
        })
      );

      function fitDot(apex, opacity) {
        var rx = Math.abs(X(apex.rho + w.fitR) - X(apex.rho));
        var ry = Math.abs(Y(apex.eta + w.fitR * 0.85) - Y(apex.eta));
        overlay.appendChild(
          el("ellipse", {
            cx: X(apex.rho),
            cy: Y(apex.eta),
            rx: Math.max(rx, 2.2),
            ry: Math.max(ry, 1.8),
            fill: "var(--ut-fit)",
            opacity: opacity,
          })
        );
      }
      if (state.mode === "np") {
        fitDot(tree, 0.45);
        fitDot(loop, 0.45);
      } else {
        fitDot(tree, 0.92);
      }
      overlay.appendChild(el("circle", { cx: X(0), cy: Y(0), r: 2.4, fill: "var(--ut-fit)" }));
      overlay.appendChild(el("circle", { cx: X(1), cy: Y(0), r: 2.4, fill: "var(--ut-fit)" }));
      svg.appendChild(overlay);

      Array.prototype.forEach.call(legend.querySelectorAll(".ut-chip"), function (chip) {
        var off = chip.dataset.id === "btaunu" && !showTau;
        chip.dataset.off = off ? "true" : "false";
        chip.disabled = off;
      });

      if (state.focus) wrap.dataset.focus = state.focus;
      else wrap.removeAttribute("data-focus");
      yearRead.textContent = yearLabel(y);
      slider.value = String(state.i);
      markEras();
      paintInspector();
    }

    function setIndex(i) {
      state.i = Math.max(0, Math.min(YEARS.length - 1, i));
      draw();
    }

    function stopPlay() {
      if (state.timer) {
        clearInterval(state.timer);
        state.timer = null;
      }
      play.textContent = "Play the years";
    }

    play.addEventListener("click", function () {
      if (state.timer) {
        stopPlay();
        return;
      }
      var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setIndex(YEARS.length - 1);
        return;
      }
      if (state.i >= YEARS.length - 1) setIndex(0);
      play.textContent = "Pause";
      state.timer = setInterval(function () {
        if (state.i >= YEARS.length - 1) {
          stopPlay();
          return;
        }
        setIndex(state.i + 1);
      }, 1100);
    });

    slider.addEventListener("input", function () {
      stopPlay();
      setIndex(Number(slider.value));
    });

    seg.addEventListener("click", function (ev) {
      var b = ev.target.closest("button");
      if (!b) return;
      state.mode = b.dataset.mode;
      Array.prototype.forEach.call(seg.querySelectorAll("button"), function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      state.focus = null;
      Array.prototype.forEach.call(legend.querySelectorAll(".ut-chip"), function (x) {
        x.setAttribute("aria-pressed", "false");
      });
      draw();
    });

    legend.addEventListener("click", function (ev) {
      var b = ev.target.closest(".ut-chip");
      if (!b || b.disabled) return;
      var id = b.dataset.id;
      state.focus = state.focus === id ? null : id;
      Array.prototype.forEach.call(legend.querySelectorAll(".ut-chip"), function (x) {
        x.setAttribute("aria-pressed", x.dataset.id === state.focus ? "true" : "false");
      });
      draw();
    });

    svg.addEventListener("click", function (ev) {
      var p = ev.target.closest("[data-id]");
      if (!p) {
        state.focus = null;
        Array.prototype.forEach.call(legend.querySelectorAll(".ut-chip"), function (x) {
          x.setAttribute("aria-pressed", "false");
        });
        draw();
        return;
      }
      state.focus = p.getAttribute("data-id");
      Array.prototype.forEach.call(legend.querySelectorAll(".ut-chip"), function (x) {
        x.setAttribute("aria-pressed", x.dataset.id === state.focus ? "true" : "false");
      });
      draw();
    });

    draw();
  }

  global.initUnitarityTriangle = initUnitarityTriangle;
})(typeof window !== "undefined" ? window : this);
