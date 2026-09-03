---
title: 'The Unitarity Triangle, 2006–2023'
summary: 'Vincenzo Vagnoni’s 2024 LHCb Starterkit talk walked through two decades of CKM fits. Play the years: the bands shrink, they still meet, and LHCb Upgrade II is the next millimetre.'
date: 2026-09-03
authors:
  - admin
tags:
  - LHCb
  - CKM
  - Flavour physics
  - UTfit
math: true
image:
  caption: 'UTfit Standard Model fits of the Unitarity Triangle from 2006 to 2023, shown by Vincenzo Vagnoni at the 2024 LHCb Starterkit. Image: UTfit Collaboration.'
  focal_point: Center
  preview_only: true
---

Vincenzo Vagnoni opened the [November 2024 LHCb Starterkit](https://indico.cern.ch/event/1460840/contributions/6184691/) with a plot I have stared at for years and still had to re-learn. Twelve panels. 2006 to 2023. Each year the coloured bands get thinner. By 2023 they look like lines, and they still cross at the same point.

That point is the question. Why do kaon mixing, $B$ oscillations, a rare decay to a tau, and a tree-level angle measured in $B \to DK$ all care about the same spot on a plane?

{{< figure src="featured.png" alt="A 3-by-4 grid of UTfit Unitarity Triangle plots from 2006 to 2023. Coloured constraint bands shrink over time and keep overlapping at one apex." caption="The long journey Vincenzo put on one slide: UTfit Standard Model fits in the $(\bar{\rho},\bar{\eta})$ plane from 2006 to summer 2023. Plots from the [UTfit Collaboration](http://www.utfit.org), shown in [Vagnoni, LHCb Starterkit, 25 November 2024](https://indico.cern.ch/event/1460840/contributions/6184691/)." >}}

## A mixing table, then a triangle

In [the Standard Model fridge-magnet post](https://uzzielperez.github.io/posts/2019/10/20/The-Standard-Model-of-Particle-Physics/) the quarks sit in three generations: $(u,d)$, $(c,s)$, $(t,b)$. The weak force does not respect that seating chart. A $b$ quark can turn into a $c$, and more rarely into a $u$. The probabilities for those hops are the entries of a $3 \times 3$ table called the **CKM matrix** (Cabibbo–Kobayashi–Maskawa).

The table has to be unitary: $V V^\dagger = 1$. In ordinary language, the rows are orthonormal. One of those orthonormality conditions is three complex numbers that add to zero:

{{< math >}}
$$
V_{ud}V_{ub}^* + V_{cd}V_{cb}^* + V_{td}V_{tb}^* = 0.
$$
{{< /math >}}

Three arrows that sum to zero close. That closed shape is the **Unitarity Triangle**. Divide through by the middle term so the base sits on the real axis between $(0,0)$ and $(1,0)$. The third vertex, the apex, lives at a point $(\bar{\rho}, \bar{\eta})$ in the complex plane.

$\bar{\eta}$ is the height. If it were zero, these decays would treat matter and antimatter the same. The latest [UTfit](http://www.utfit.org) Standard Model fit puts the apex at about $\bar{\rho} = 0.159 \pm 0.009$, $\bar{\eta} = 0.353 \pm 0.008$: a few-percent measurement of a number that decides how much CP violation the quark sector is allowed.

Sorry, that was a lot of particle-physics lingo at once. The picture above is doing the work. Each coloured band is one measurement's allowed region for that apex. Independent processes. Different experiments. They are only allowed to miss each other if the map is wrong.

Vincenzo's line in the Starterkit talk is the one I want my college self to keep: *each coloured band is the allowed region of the apex according to one process. If new physics were feeding those measurements, the contours would not cross in a single point.*

They do. That is a tremendous success of the CKM picture. It is not the end of the story. There is still room for new physics at the ten-percent level, which is why LHCb exists.

## How to read the plot

The axes are always the same:

- **Horizontal, $\bar{\rho}$:** the real part of the apex. Roughly, how much the $b \to u$ side of the triangle leans.
- **Vertical, $\bar{\eta}$:** the imaginary part. This is the CP-violating height.

The black triangle drawn in later years has vertices at $(0,0)$, $(1,0)$, and the global-fit apex. The small black oval (then a dot) is the **global fit**: the region left when you take every constraint at once.

The bands have different *shapes* because they constrain different *geometric facts* about the same triangle. A radius from the origin. An angle at $(1,0)$. A hyperbola from kaons. Once you see that, the rainbow stops being decoration.

{{< figure src="utfit-constraints.png" alt="Zoomed Unitarity Triangle fit in the rho-bar eta-bar plane, with labelled coloured bands for gamma, beta, alpha, epsilon_K, Delta m_d, Delta m_d over Delta m_s, Vub over Vcb, B to tau nu, and 2 beta plus gamma." caption="A zoomed global fit in the $(\bar{\rho},\bar{\eta})$ plane. Each coloured region is one class of measurement. The overlap is the test. Plots of this kind are maintained by [UTfit](http://www.utfit.org) and [CKMfitter](https://ckmfitter.in2p3.fr); Vincenzo showed both in the [Starterkit talk](https://indico.cern.ch/event/1460840/contributions/6184691/)." >}}

## Play the years

The twelve-panel slide is the data. Below is a schematic you can drive: the same plane, the same kinds of band, shrinking from 2006 to 2023, then one tick past the present into Upgrade II.

Hit **Play the years**. Watch γ go from a shrug to a line. Watch $B \to \tau\nu$ appear in 2011. Watch the black overlap collapse to a dot. The last tick is not a measurement. It is the reason LHCb is being rebuilt.

The other button, **Loops shoved**, is Vincenzo's illustration-only cartoon. Tree-level γ stays put. The loop-sensitive bands are moved by hand. If the world looked like that, the bearings would miss. Upgrade II is how you would notice.

Click a coloured chip (or a band) if you want that constraint's story instead of the year.

{{< unitarity-triangle >}}

## What each band is measuring

I will go around the plot the way I wish someone had, process first, then the name.

### $\gamma$ (purple wedge from the origin)

Stand at $(0,0)$. The angle between the base and the side that runs up to the apex is $\gamma$. You measure it in tree-level decays $B \to DK$ (and $B \to D\pi$, $B_s \to D_s K$, …). Two amplitudes can take you to the same final state, one of them carrying $V_{ub}$ and the other $V_{cb}$, and they interfere. The interference phase *is* $\gamma$.

This is the clean Standard Model benchmark. No heavy virtual particles have to run in a loop for the measurement to exist. In 2006 the purple fan was a shrug. LHCb turned it into a line.

The methods have names (GLW, ADS, GGSZ) that you can ignore on a first pass. What matters is the combination. LHCb's published simultaneous fit of $\gamma$ with charm-mixing parameters is [JHEP 12 (2021) 141](https://arxiv.org/abs/2110.02350). The latest combination of Run 1 and Run 2 beauty and charm inputs gives $\gamma = (62.8 \pm 2.6)^\circ$ ([LHCb-CONF-2025-003](https://cds.cern.ch/record/2948394)). Run 3 has already started to join: a first upgraded-detector GGSZ measurement on 2024 data finds $\gamma = (68.1 \pm 6.7)^\circ$ ([arXiv:2605.03501](https://arxiv.org/abs/2605.03501)), still statistically hungry, and pointing at the same place.

### $\sin 2\beta$ (green band from $(1,0)$)

Stand at the other end of the base, $(1,0)$. The angle there is $\beta$. The golden mode is $B^0 \to J/\psi K_S^0$: you watch a $B^0$ oscillate and then decay to charmonium, and the time-dependent CP asymmetry is $\sin 2\beta$ to a very good approximation.

BaBar and Belle saw this in 2001 ([PRL 87, 091801](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.87.091801), [PRL 87, 091802](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.87.091802)). That is the measurement that locked Kobayashi and Maskawa into the Standard Model (and into a Nobel Prize). LHCb now owns the single most precise determination: $S_{\psi K_S} = 0.717 \pm 0.013 \pm 0.008$ with 6 fb$^{-1}$ of Run 2 data ([PRL 132, 021801 (2024)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.132.021801), [arXiv:2309.09728](https://arxiv.org/abs/2309.09728)). World averages live at [HFLAV](https://hflav.web.cern.ch).

UTfit currently feeds $\sin 2\beta = 0.700 \pm 0.015$ into the global fit, after a small theory correction for penguin pollution, and finds a roughly $2\sigma$ pull against the rest of the triangle. Not a discovery. Not nothing. The green band is so sharp that a small disagreement becomes visible.

### $\alpha$ (light-blue region)

$\alpha$ sits at the apex. You get at it with $B \to \pi\pi$, $\rho\rho$, and $\rho\pi$, plus isospin to subtract penguin pollution. BaBar and Belle built this constraint; Belle II is tightening it. The region is broader than $\beta$ or $\gamma$ because the hadronic bookkeeping is harder. UTfit's 2025 input is $\alpha = (95.0 \pm 8.0)^\circ$, consistent with the fit prediction.

### $|V_{ub}/V_{cb}|$ (yellow circular band around the origin)

The length of the side from $(0,0)$ to the apex is set by $|V_{ub}/V_{cb}|$. Semileptonic decays measure those magnitudes: $B \to \pi \ell \nu$ and $B \to \rho \ell \nu$ on the exclusive side, $B \to X_u \ell \nu$ on the inclusive side, plus LHCb's baryonic mode $\Lambda_b^0 \to p \mu^- \bar{\nu}_\mu$ ([Nature Physics 11, 743 (2015)](https://www.nature.com/articles/nphys3415), [arXiv:1504.01568](https://arxiv.org/abs/1504.01568)).

Inclusive and exclusive $|V_{ub}|$ (and $|V_{cb}|$) have not fully agreed for a long time. That is why the yellow ring is thicker than the green wedge. The geometry is clean. The QCD is not. Lattice calculations of the form factors, averaged by [FLAG](https://flag.unibe.ch), are part of the band.

### $\Delta m_d$ and $\Delta m_d/\Delta m_s$ (salmon / orange rings around $(1,0)$)

Neutral $B$ mesons oscillate. The frequency is a mass difference. $\Delta m_d$ for $B^0$ is mostly $|V_{td}|^2$; $\Delta m_s$ for $B_s^0$ is mostly $|V_{ts}|^2$. On the plot that becomes a circle centred at $(1,0)$, because that vertex is the $V_{td}$ corner of the triangle.

CDF first saw $B_s$ oscillations at $5\sigma$ in 2006 ([PRL 97, 242003](https://arxiv.org/abs/hep-ex/0606027)). LHCb then made $\Delta m_s$ a precision constant of nature: $\Delta m_s = 17.7683 \pm 0.0051 \pm 0.0032\,\mathrm{ps}^{-1}$ in $B_s^0 \to D_s^- \pi^+$ ([Nature Physics 18, 1 (2022)](https://arxiv.org/abs/2104.04421)). Taking the ratio $\Delta m_d/\Delta m_s$ cancels a lot of lattice uncertainty (the famous $\xi$ factor), which is why that band is tighter than $\Delta m_d$ alone.

### $\varepsilon_K$ (lavender hyperbola)

Long before $B$ factories, kaons already knew about CP violation. $\varepsilon_K$ is the parameter that quantifies indirect CP violation in $K^0$–$\bar{K}^0$ mixing. On this plane it is a hyperbola, because the box diagram that generates $\varepsilon_K$ depends on both the height $\bar{\eta}$ and a combination of $\bar{\rho}$ with top and charm loops. The experimental number is old and precise (NA48, KTeV, and the PDG average). The width of the band is now mostly theory: the kaon bag parameter $B_K$ from lattice QCD.

### $BR(B \to \tau \nu)$ (dark-orange arc)

A $B^+$ decaying to $\tau^+ \nu$ is a purely leptonic tree, proportional to $|V_{ub}|^2 f_B^2$. It shows up as another ring around the origin, and it is sensitive to a charged Higgs in a way the semileptonic modes are not. This is a $B$-factory measurement (Belle, BaBar, now Belle II). It entered the UTfit plots around 2011, a little high compared with the rest of the triangle, and later relaxed. LHCb does not own this one: too many neutrinos, not enough photons to reconstruct against.

### $2\beta + \gamma$ (magenta band)

Time-dependent CP violation in $B \to D^{(*)}\pi$ and related modes measures the combination $2\beta+\gamma$. It is a useful cross-check, not the sharpest band on the plot. BaBar, Belle, and LHCb all contribute.

## Two decades of getting thinner

The slider is doing the chronology. Three eras, if you want them as sentences:

**2006–2010.** BaBar and Belle have $\sin 2\beta$. $\Delta m_s$ has just arrived from the Tevatron. $\gamma$ is a wide purple fan. The overlap is an oval you can see without squinting.

**2011–2016.** LHCb is on. $B \to \tau\nu$ appears. Mixing frequencies and $|V_{ub}|$ pin the sides. Conference labels under the UTfit logo (post-LP11, winter 13, summer 14, summer 16) are the field's heartbeat: every major meeting, the bands move a millimetre.

**2018–2023.** $\gamma$ and $\sin 2\beta$ become lines. The global-fit contour collapses to a dot. Summer 2023 is the panel Vincenzo left on the screen: *tremendous success of the CKM paradigm*.

The shrinking is not just "more data." It is a change in which experiment owns which side. The $B$ factories still dominate leptonic and some hadronic $\alpha$ modes. Lattice QCD shrank the theory error on the mixing rings. LHCb, sitting in the forward region of $pp$ collisions, owns the huge $b$ and $c$ samples that $\gamma$ and $\Delta m_s$ were waiting for.

Vincenzo is not only the person who showed the slide. He is an author on the UTfit papers that produce it, including the [2023 analysis](https://arxiv.org/abs/2212.03894) and the [Summer 2025 update](https://cds.cern.ch/record/2964575) ($\bar{\rho}$ and $\bar{\eta}$ at 5.6% and 2.2%). The live numbers live at [utfit.org](http://www.utfit.org) and, in a frequentist twin, at [ckmfitter.in2p3.fr](https://ckmfitter.in2p3.fr).

## Trees, loops, and the next millimetre

Not every band is the same kind of test.

Tree-level quantities ($\gamma$, $|V_{ub}/V_{cb}|$) are Standard Model benchmarks. Loop quantities ($\varepsilon_K$, $\Delta m_d$, $\Delta m_s$, and $\sin 2\beta$ with a small penguin caveat) are where a heavy new particle could slip into a virtual loop and shove a band off the apex. Vincenzo put it as a "dream new physics scenario" on the next slide: for illustration only, the contours miss. We do not live in that plot. We live in the one where they meet, with about ten percent still to play with.

That is the Upgrade II physics case in one sentence. Tree versus loop, at a precision where a ten-percent effect has nowhere to hide. Drag the slider to the last tick if you want the cartoon of that sentence. The numbers from the same Starterkit talk:

| Observable | Upgrade II target |
| --- | --- |
| $\sigma(\gamma)$ | $0.4^\circ$ |
| $\sigma(\sin 2\beta)$ | $0.003$ |
| $\sigma(\phi_s)$ | $4\,\mathrm{mrad}$ |

$\phi_s$ is the $B_s$ analogue of $2\beta$: the CP-violating phase in $B_s^0 \to J/\psi \phi$. It lives on a different triangle, but it is the same idea.

The next millimetre is already being collected. Run 3 removed the hardware trigger that was throwing away low-$p_T$ hadronic tracks, so 2024 alone matched the integrated luminosity of Run 1 and Run 2 combined, with roughly twice the efficiency in the $B \to DK$ modes that own $\gamma$. The first upgraded-detector GGSZ measurement is on the plot. Upgrade II is the step after that: same footprint, pile-up times seven, timing of a few tens of picoseconds, and a design point of $50\,\mathrm{fb}^{-1}$ per year toward at least $300\,\mathrm{fb}^{-1}$. That sample is what turns $\gamma$ into a $0.4^\circ$ ruler and asks the loops whether they still agree.

I do not have a better explanation for my college self yet than this: the plot is a map, the bands are bearings from different lighthouses, and the ship is still where CKM said it would be. The next decade is about whether the bearings still cross when each one is a fraction of a degree.

## References and places to click

- Vincenzo Vagnoni, *Welcome from the Spokesperson*, [LHCb Starterkit 2024 (II)](https://indico.cern.ch/event/1460840/contributions/6184691/), CERN, 25 November 2024. [Slides (PDF)](https://indico.cern.ch/event/1460840/contributions/6184691/attachments/2973439/5233983/LHCb%20Starterkit%20November%202024.pdf).
- [UTfit Collaboration](http://www.utfit.org), including [arXiv:2212.03894](https://arxiv.org/abs/2212.03894) and the [Summer 2025 EPS-HEP update](https://cds.cern.ch/record/2964575).
- [CKMfitter](https://ckmfitter.in2p3.fr).
- [HFLAV](https://hflav.web.cern.ch) averages; [FLAG](https://flag.unibe.ch) lattice inputs.
- $\gamma$: [LHCb, JHEP 12 (2021) 141](https://arxiv.org/abs/2110.02350); [LHCb-CONF-2025-003](https://cds.cern.ch/record/2948394); [Run 3 GGSZ, arXiv:2605.03501](https://arxiv.org/abs/2605.03501).
- $\sin 2\beta$: [BaBar, PRL 87, 091801 (2001)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.87.091801); [Belle, PRL 87, 091802 (2001)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.87.091802); [LHCb, PRL 132, 021801 (2024)](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.132.021801).
- $\Delta m_s$: [CDF, PRL 97, 242003 (2006)](https://arxiv.org/abs/hep-ex/0606027); [LHCb, Nature Physics 18, 1 (2022)](https://arxiv.org/abs/2104.04421).
- $|V_{ub}|$ from $\Lambda_b$: [LHCb, Nature Physics 11, 743 (2015)](https://www.nature.com/articles/nphys3415).
