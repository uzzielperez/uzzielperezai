---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: coffeeandlight.jpg
          filters:
            brightness: 0.55
          size: cover
          position: center
          parallax: false
  - block: markdown
    content:
      title: '📚 Research'
      subtitle: ''
      text: |-
        I work on making machine learning fast enough for physics that cannot wait. At the LHCb experiment, collisions happen 40 million times per second, so I design **lightweight graph neural networks** and **knowledge-distilled models** that reconstruct particles in real time within the trigger's strict latency budget, targeting the next-generation PicoCal calorimeter for LHCb Upgrade II.

        In parallel, I build **LLM, RAG, and agentic systems for scientific analysis**: retrieval over analysis code, notes, and documentation that lets physicists revive legacy measurements and accelerate new ones. I presented three talks on this research programme at [CHEP 2026](https://indico.cern.ch/) in Bangkok.

        Beyond the lab, I care about science communication and open-source tools for health and education, from museum exhibits to interactive physics visualizations you can explore on this site.
    design:
      columns: '1'
  - block: skills-tracks
    id: skills
    content:
      title: 'A year of new skills, reconstructed'
      subtitle: 'Twelve months of my postdoc, drawn as an event display: each track is a skill area, each hit a milestone, each measurement a real outcome.'
      vertex_label: 'mid-2025'
      caption: 'All three tracks were presented as talks at CHEP 2026 (Computing in High Energy and Nuclear Physics), Bangkok, May 2026.'
      tracks:
        - name: Real-time ML & model compression
          outcome: 8× faster inference
          milestones:
            - Attention-enhanced GarNet GNNs
            - Node-centric architectures for calorimetry
            - Knowledge distillation (~40% fewer parameters)
            - Graph→MLP distillation, ~95% smaller
            - Student beats teacher on energy resolution
          evidence:
            text: 'Talk: When Less is More — lightweight GNNs for LHCb''s PicoCal'
            url: 'event/chep2026-lightweight-gnns/'
        - name: Inference engineering
          outcome: 5× CPU · 2× GPU speedup
          milestones:
            - PyTorch → ONNX export pipelines
            - Multi-core CPU benchmarking
            - NVIDIA A100 GPU benchmarking
            - FP32 numerical parity at 10⁻⁷
            - Targeting the LHCb GPU trigger (HLT1/Allen)
          evidence:
            text: 'Talk: Optimizing GNNs for the Wild — PyTorch-to-ONNX acceleration'
            url: 'event/chep2026-onnx-optimization/'
        - name: LLM systems & agents
          outcome: Legacy Λb→Λγ analysis revived
          milestones:
            - RAG over analysis scripts, notes & docs
            - Vector databases for physics knowledge
            - Agentic LLM workflows (Claude, GPT)
            - MCP servers for research tooling
            - Benchmarking vs non-RAG baselines
          evidence:
            text: 'Talk: Future-Ready Restoration — AI RAG-enhanced analysis revival'
            url: 'event/chep2026-rag-analysis-revival/'
  - block: collection
    id: papers
    content:
      title: Selected Publications
      subtitle: ''
      text: 'Full record on [INSPIRE-HEP](https://inspirehep.net/authors/1614907), [ORCID](https://orcid.org/0000-0002-6861-2674), and [GitHub](https://github.com/uzzielperez).'
      filters:
        folders:
          - publication
        featured_only: false
    design:
      view: citation
  - block: collection
    id: talks
    content:
      title: Recent Talks
      subtitle: ''
      text: ''
      filters:
        folders:
          - event
    design:
      view: article-grid
      columns: 3
  - block: collection
    id: projects
    content:
      title: Featured Projects
      subtitle: ''
      text: ''
      filters:
        folders:
          - project
        featured_only: false
    design:
      view: article-grid
      columns: 3
  - block: collection
    id: news
    content:
      title: Recent News
      subtitle: ''
      text: ''
      # Page type to display. E.g. post, talk, publication...
      page_type: post
      # Choose how many pages you would like to display (0 = all pages)
      count: 5
      # Filter on criteria
      filters:
        author: ""
        category: ""
        tag: ""
        exclude_featured: false
        exclude_future: false
        exclude_past: false
        publication_type: ""
      # Choose how many pages you would like to offset by
      offset: 0
      # Page order: descending (desc) or ascending (asc) date.
      order: desc
    design:
      # Choose a layout view
      view: date-title-summary
      # Reduce spacing
      spacing:
        padding: [0, 0, 0, 0]
---
