---
# Display name
title: Uzziel Perez

# Full name (for SEO)
first_name: Cilicia Uzziel
last_name: Perez

# Status emoji
status:
  icon: ☕️

# Is this the primary user of the site?
superuser: true

# Highlight the author in author lists? (true/false)
highlight_name: true

# Role/position/tagline
role: Postdoctoral Researcher · AI for High Energy Physics

# Organizations/Affiliations to display in Biography blox
organizations:
  - name: DS4DS, La Salle Campus Barcelona
    url: https://www.salleurl.edu/es

# Social network links
# Need to use another icon? Simply download the SVG icon to your `assets/media/icons/` folder.
profiles:
  - icon: at-symbol
    url: 'mailto:uzzie.perez@cern.ch'
    label: E-mail Me
  - icon: brands/x
    url: https://twitter.com/GetResearchDev
  - icon: brands/github
    url: https://github.com/uzzielperez
  - icon: academicons/orcid
    url: https://orcid.org/0000-0002-6861-2674
  - icon: academicons/google-scholar
    url: https://scholar.google.com/citations?user=eKulhj8AAAAJ
  - icon: academicons/inspire
    url: https://inspirehep.net/authors/1614907

interests:
  - Real-time machine learning for particle physics
  - LLM agents and retrieval for scientific analysis
  - Fast inference and model compression
  - Science communication and digital health

education:
  - area: PhD Physics (High Energy Physics)
    institution: University of Alabama
    date_start: 2016-08-01
    date_end: 2024-05-31
    summary: |
      Thesis: *Search for Non-Resonant New Physics in High-Mass Diphoton Events from pp Collisions at √s = 13 TeV with the CMS Detector and Highlights from HCAL Upgrades* (CERN-THESIS-2024-052). Advisors: Prof. Conor Henderson and Prof. Sergei Gleyzer. GPA 3.87/4.0.
  - area: BSc Physics
    institution: Ateneo de Manila University
    date_start: 2007-06-01
    date_end: 2012-03-31
    summary: |
      100% OAA Scholar, Loyola School of Science and Engineering.

work:
  - position: Postdoctoral Researcher, Data Science for Digital Society (DS4DS)
    company_name: La Salle Campus Barcelona — Ramon Llull University
    company_url: 'https://www.salleurl.edu/es'
    company_logo: ''
    date_start: 2024-01-01
    date_end: ''
    summary: |2-
      - Lightweight Graph Neural Networks for real-time particle reconstruction in LHCb's next-generation PicoCal calorimeter: attention-enhanced GarNet models with 8× faster inference than message-passing baselines.
      - Knowledge distillation for trigger-ready models: GarNet students with ~40% fewer parameters and Graph-to-MLP distillation giving 2–6× additional speedup at ~95% smaller size, surpassing the teacher on energy resolution.
      - PyTorch-to-ONNX inference optimization on multi-core CPUs and NVIDIA A100 GPUs (up to 5× CPU and ~2× GPU speedup at 10⁻⁷ FP32 parity), targeting the LHCb GPU trigger (HLT1/Allen).
      - RAG and agentic LLM tooling to revive and accelerate a legacy Run-2 LHCb analysis (Λb → Λγ), presented at CHEP 2026 alongside two other talks.
  - position: CMS HCAL Operations — Research Assistant
    company_name: CERN / University of Alabama
    company_url: 'https://home.cern'
    company_logo: ''
    date_start: 2020-01-01
    date_end: 2022-07-31
    summary: |2-
      - Software developer for HCAL Online Software (cmshcos); coordinated daily data acquisition and oversaw Detector Control Systems for subdetector upgrades.
      - Built configurable Look-Up-Table support for HCAL FPGA fast electronics enabling exotic long-lived-particle selection: loads a LUT in ~7 s versus hours-to-days of per-channel FPGA reprogramming.
      - Led "Closure Test Studies" pipeline reducing time-to-physics across the 2016–2018 datasets; refurbished and tested on-detector and back-end electronics (ngCCMs).
  - position: Instructor & Teaching Assistant
    company_name: University of Alabama
    company_url: ''
    company_logo: ''
    date_start: 2016-08-01
    date_end: 2024-05-31
    summary: |2-
      - Led lab and problem-solving classes for honors and regular calculus-based Electromagnetism and "Physics for Physics Teachers", ~100 students per semester.
      - Summer lecturer for calculus-based Electromagnetism (2019).
  - position: Science Education Officer & Consultant
    company_name: The Mind Museum
    company_url: 'https://www.themindmuseum.org'
    company_logo: ''
    date_start: 2012-03-01
    date_end: 2015-09-01
    summary: |2-
      - Created and co-led "Soccer Science" and "MakerSpacePH" programs (sports-science data analysis, instrumentation, Arduino); forged sponsor partnerships (Mitre, 3M).
      - Co-designed exhibits and performed science shows for ~1M visitors.

# Skills
# Add your own SVG icons to `assets/media/icons/`
skills:
  - name: Machine Learning
    items:
      - name: PyTorch · TensorFlow/Keras · scikit-learn
        description: 'GNNs, knowledge distillation, model compression'
        percent: 90
        icon: sparkles
      - name: ONNX Runtime · inference optimization
        description: 'CPU/GPU benchmarking, numerical-parity validation'
        percent: 85
        icon: bolt
      - name: RAG · LLM agents · MCP tooling
        description: 'Vector databases, agentic pipelines for physics analysis'
        percent: 80
        icon: chat-bubble-left-right
  - name: Scientific Computing
    color: '#eeac02'
    color_border: '#f0bf23'
    items:
      - name: Python
        description: '~11 years, analysis to production'
        percent: 95
        icon: code-bracket
      - name: C/C++ · ROOT
        description: '~8 years, detector software and analysis'
        percent: 80
        icon: cpu-chip
      - name: Git · Shell · distributed computing
        description: 'Worldwide LHC Computing Grid workflows'
        percent: 85
        icon: circle-stack

languages:
  - name: English
    percent: 100
  - name: Filipino (Tagalog)
    percent: 100
  - name: Spanish
    percent: 35
  - name: French
    percent: 35
  - name: German
    percent: 20

# Awards.
#   Add/remove as many awards below as you like.
#   Only `title`, `awarder`, and `date` are required.
#   Begin multi-line `summary` with YAML's `|` or `|2-` multi-line prefix and indent 2 spaces below.
awards:
  - title: CERN ScicommHack Incubation Grant
    date: '2020-01-01'
    awarder: CERN
    summary: |
      Seed funding and computational resources for the **Particle Silo** open science infrastructure project. Role: Technical Co-Investigator.
  - title: GENEUS Best Life Science Project
    date: '2021-12-01'
    awarder: The PORT Hackathon / Innosuisse Business Concept
    summary: |
      Awarded for **Apprie**, an open-source augmented healthcare intelligence application.
  - title: 2nd Place, CERN Summer Webfest
    date: '2015-08-01'
    awarder: CERN
    summary: |
      For **Everware**: reproducible and reusable science powered by JupyterHub and Docker.
  - title: Deep Learning Specialization courses
    url: https://www.coursera.org/specializations/deep-learning
    date: '2018-03-01'
    awarder: Coursera
    icon: coursera
    summary: |
      Neural Networks & Deep Learning; Hyperparameter Tuning & Optimization (2017); Convolutional Neural Networks (2018).
---

## About Me

I'm a postdoctoral researcher at Data Science for Digital Society (DS4DS), La Salle Campus Barcelona, working on AI for high-energy physics. I build lightweight graph neural networks for real-time particle reconstruction at the LHCb experiment and LLM/RAG systems that help physicists revive and accelerate their analyses. Before this, I spent 2.5 years at CERN operating and programming the CMS hadronic calorimeter, and earned my PhD at the University of Alabama searching for new physics in high-mass diphoton events. I care deeply about science communication: I've built museum exhibits, interactive physics visualizations, and open-source tools for healthcare and education.
