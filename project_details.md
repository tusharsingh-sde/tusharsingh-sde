# Tushar Singh — In-Depth Project Catalog

*This document contains granular technical dossiers for projects engineered by Tushar Singh. All specifications, system architectures, mathematical formulas, and pipeline workflows have been directly extracted and synthesized from individual project repositories and source README files.*

---

## 1. Antriksha Search Engine (ASE) — Cross-Modal Satellite Image Retrieval

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Geospatial AI, Remote Sensing, Vector Search, Vision-Language Models |
| **Recognition** | **ISRO Bharatiya Antariksh Hackathon 2026** — Grand Finale Qualified (Cleared Round 1) |
| **Role** | Lead ML Architect (Syntax Squad — 4 members) |
| **Repository** | [github.com/tusharsingh-sde/ASE-Antrikhsa-Search-Engine](https://github.com/tusharsingh-sde/ASE-Antrikhsa-Search-Engine) |
| **Core Stack** | Python 3.10+, RemoteCLIP (ViT-B/32), FAISS (IndexFlatL2), PyTorch, Streamlit, NumPy, Pillow |

### Problem Statement & Concept
Earth observation satellites capture massive volumes of imagery across multiple complementary sensor modalities:
- **Synthetic Aperture Radar (SAR)**: Penetrates clouds, smoke, and nighttime conditions to capture surface roughness and structural topology.
- **Optical Imagery**: Captures human-interpretable RGB spectral reflections but is completely blinded by cloud cover and nightfall.

A major bottleneck in space intelligence is the inability to search across these disparate modalities without manual metadata tagging. Antriksha Search Engine (ASE) solves this by creating a **bifurcated cross-modal embedding space** allowing operators to search across **16,000+ SAR and Optical satellite images** using either natural-language text queries or by providing an image from one modality to retrieve matching scenes in the opposite modality.

### System Architecture & Workflow

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ANTRIKSHA SEARCH ENGINE                         │
│             Streamlit Command Center (Dark Tactical Theme)             │
└──────────────────┬──────────────────────────────────┬──────────────────┘
                   │                                  │
         [ Natural Language Text ]            [ Satellite Image Upload ]
         "dense urban area near coast"         (SAR / Optical .png)
                   │                                  │
                   ▼                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 RemoteCLIP ViT-B/32 Feature Extractor                  │
│       Shared 512-Dimensional Multi-Modal Latent Embedding Space        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                   ┌───────────────┴───────────────┐
                   ▼                               ▼
       [ Bifurcated Routing Layer ]   [ Modality Collapse Prevention ]
       Detects input modality         Routes to opposite sensor index
                   │                               │
        ┌──────────┴──────────┐         ┌──────────┴──────────┐
        ▼                     ▼         ▼                     ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│       FAISS SAR Index         │     │     FAISS Optical Index       │
│    Exact L2 Vector Search     │     │    Exact L2 Vector Search     │
│       (~0.04s Latency)        │     │       (~0.04s Latency)        │
└───────────────┬───────────────┘     └───────────────┬───────────────┘
                │                                     │
                └──────────────────┬──────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                Ranked Top-K Imagery + Distance Metrics                 │
│              Structured Mission Report CSV Export Engine               │
└────────────────────────────────────────────────────────────────────────┘
```

### Core Features & Technical Highlights
- **Sub-100ms Exact Vector Retrieval**: Uses `faiss.IndexFlatL2` to perform exact nearest-neighbor search across 32,000+ indexed 512-D vectors in ~0.04 seconds.
- **Bifurcated Routing Layer**: Automatically inspects image characteristics and filenames to prevent "modality collapse" (where SAR images match only with SAR images). Enforces SAR → Optical and Optical → SAR cross-modal alignment.
- **Offline Ingestion & Index Pipeline (`build_db.py`)**: Batched extraction script that generates serialized NumPy vector matrices (`database_vectors.npy`) and filename indexes (`database_names.npy`).
- **Data Preprocessing (`split.py`)**: Custom splitting utility for raw Kaggle Paired SAR-Optical datasets (where optical and SAR tiles are stitched side-by-side), outputting clean normalized pairs.
- **Mission Reporting**: Real-time CSV generation containing matched image IDs, similarity distance scores, and retrieval timestamps.

---

## 2. RoadGuard AI — Smart Pothole Detection & Road Maintenance Cost Estimation

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Autonomous Computer Vision, Civic Infrastructure, Smart Cities, Full-Stack Edge AI |
| **Recognition** | **Smart India Hackathon (SIH) 2026** — Grand Finalist |
| **Role** | Full-Stack & AI Integration Lead |
| **Repository** | [github.com/tusharsingh-sde/RoadGuardAI](https://github.com/tusharsingh-sde/RoadGuardAI) |
| **Backend Stack** | Python 3.12, FastAPI, Ultralytics YOLOv11, ByteTrack, OpenCV, ReportLab, Supabase Python SDK, smtplib |
| **Frontend Stack**| Next.js 16 (Static Export), React 19, TypeScript, Tailwind CSS 4, Leaflet / React-Leaflet, Supabase JS SDK |
| **DevOps Stack**  | Docker, Docker Compose, Caddy (Automatic HTTPS), Nginx, Azure VM |

### Problem Statement & Solution
Municipal road maintenance relies heavily on citizen complaints or sporadic manual visual surveys, leading to severe road deterioration, vehicle damage, and accidents. 

RoadGuard AI transforms road monitoring into an automated end-to-end pipeline. Mounted on municipal survey vehicles, drones, or smartphones, it detects potholes in real time, assigns persistent tracking IDs so potholes are never counted twice, calculates their physical dimensions and repair costs, visualizes them on a live satellite map, and automatically emails a branded PDF audit report to road authorities.

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                             Client Browser Interface                            │
│           Next.js 16 + React Leaflet Satellite Map + Supabase Auth              │
└────────────────────────┬────────────────────────────────┬───────────────────────┘
                         │ WebSocket (frames/telemetry)   │ REST API (video upload)
                         ▼                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     Reverse Proxy Layer (Nginx - Port 100)                      │
│                  Directs /ws/* and /api/* to Internal Backend                   │
└────────────────────────┬────────────────────────────────┬───────────────────────┘
                         │                                │
                         ▼                                ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FastAPI Backend (Port 8000)                           │
│                                                                                 │
│   ┌────────────────────┐     ┌──────────────────┐     ┌─────────────────────┐   │
│   │ YOLOv11 Detection  │ ──► │ ByteTrack (Multi-│ ──► │ Dimension & Cost    │   │
│   │ (pothole_best.pt)  │     │ Object Tracker)  │     │ Estimation Engine   │   │
│   └────────────────────┘     └──────────────────┘     └──────────┬──────────┘   │
│                                                                  │              │
│   ┌────────────────────┐     ┌──────────────────┐                ▼              │
│   │ Automated Email    │ ◄── │ Supabase Cloud   │ ◄── ┌─────────────────────┐   │
│   │ Dispatch (smtplib) │     │ Storage (PDFs)   │     │ ReportLab PDF Gen   │   │
│   └────────────────────┘     └──────────────────┘     └─────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Detection, Dimension & Cost Mathematical Model
1. **Detection & Tracking**:
   - Model: Custom-trained YOLOv11 (`pothole_best.pt`) operating at a confidence threshold of `0.60`.
   - Tracking: Integrated **ByteTrack** multi-object tracker that tracks bounding box trajectories across successive video frames, assigning a unique persistent `track_id` to eliminate duplicate counting.
2. **Dimension Heuristics**:
   - **Width & Breadth**: Derived using bounding box pixel width/height multiplied by a calibrated optical spatial ratio (`CM_PER_PIXEL = 0.4`):
     $$\text{Width (cm)} = \Delta X_{\text{pixels}} \times 0.4$$
     $$\text{Breadth (cm)} = \Delta Y_{\text{pixels}} \times 0.4$$
   - **Depth**: Heuristically estimated based on bounding box area and detection confidence:
     $$\text{Depth (cm)} \approx f(\text{Area}, \text{Confidence})$$
3. **Automated Cost Estimation Formula**:
   $$\text{Volume } (m^3) = \left(\frac{\text{Width}}{100}\right) \times \left(\frac{\text{Breadth}}{100}\right) \times \left(\frac{\text{Depth}}{100}\right)$$
   $$\text{Material Cost (INR)} = \text{Volume } (m^3) \times ₹8,500/\text{m}^3$$
   $$\text{Total Repair Cost} = ₹150 \text{ (Fixed Labor)} + \text{Material Cost}$$
4. **Three-Tier Severity Classification**:
   - **Critical**: Confidence $\ge 85\%$
   - **High**: Confidence $75\% - 84\%$
   - **Medium**: Confidence $< 75\%$

### Operational Modes
- **Live Stream Mode (Pull & Push)**: 
  - *Pull Model*: Backend connects to an external IP camera / drone RTSP stream.
  - *Push Model*: Client captures live webcam frames in the browser and streams them over WebSockets.
- **Batch Video Survey Mode**: Upload 100MB+ pre-recorded road survey videos for offline batch analysis with frame-by-frame progress tracking.
- **Cloud Infrastructure**: Packaged into multi-stage Docker containers, orchestrated with Docker Compose, and protected behind Caddy with automated HTTPS deployed on an Azure Virtual Machine.

---

## 3. JurixAI — RAG-Based Indian Legal Assistant ("Legal Saathi")

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Legal Tech, Generative AI, Retrieval-Augmented Generation (RAG), Document OCR |
| **Mission** | Demystifying the Indian legal system with empathetic, law-backed citizen guidance |
| **Repository** | [github.com/tusharsingh-sde/JurixAI](https://github.com/tusharsingh-sde/JurixAI) |
| **Backend Stack** | Python 3.10+, FastAPI, LangChain, ChromaDB, HuggingFace (`all-MiniLM-L6-v2`), Google Gemini (`gemini-3.5-flash` / `gemini-3.7-flash` with fallback), Groq Cloud (Llama-3.3-70B), Supabase (Auth + History), Tesseract OCR, pdfplumber |
| **Frontend Stack**| React 19, Vite 8, Lucide React, Custom Dark Vanilla CSS Design Tokens |

### Problem Statement & Human-Centric Philosophy
The Indian legal framework (comprising the Indian Penal Code, Bhartiya Nyaya Sanhita, POSH Act, RTI, Cyber Laws) is notoriously intimidating and verbose for the average citizen facing distress (e.g., cyber extortion, police refusal to register an FIR, workplace harassment, illegal landlord eviction). 

JurixAI functions as an **"AI Legal Saathi"** — it combines verified statutory knowledge with an empathy-first prompting layer that:
1. Validates the user's emotional distress.
2. Provides immediate actionable steps (e.g., dial 1930 for cyber fraud, helpline 1090).
3. Cites explicit legal sections and rights.
4. Auto-adapts between **English, Hindi (Devanagari), and Hinglish**.

### The RAG Pipeline Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          USER QUERY / DOCUMENT                         │
│           "Someone is blackmailing me on WhatsApp, what to do?"         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
[ Text Query Processing ]                      [ Scanned Document / FIR Upload ]
Language Detection (EN / HI / Hinglish)        pdfplumber + Tesseract OCR
           │                                                 │
           └────────────────────────┬────────────────────────┘
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       ChromaDB Vector Retrieval                        │
│   Query embedded using HuggingFace all-MiniLM-L6-v2 (384-D Vectors)   │
│   Top-5 Semantic Match retrieved from 8 Curated Legal Corpora:         │
│   • IPC.pdf                     • cyber_law.pdf                        │
│   • POSH_act.pdf                • RTI-Act_English.pdf                  │
│   • Consumer_Handbook.pdf       • Model-Tenancy-Act_2021.pdf           │
│   • First_Information_Report    • Domestic_Violence_Act.pdf            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        LangChain Orchestration                         │
│  Context Injection: Verified Legal Statutes + Supabase Session History │
│  Prompt Policy: Empathy → Immediate Action → Legal Basis → Next Steps  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Multi-Tier LLM Generation Engine                     │
│               Primary: Groq Cloud (Llama-3.3-70B)                      │
│               Automatic Fallback: Google Gemini 3.5/3.7-Flash          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                Structured, Law-Grounded Empathetic Reply               │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Technical Innovations
- **Resilient Multi-Model Fallback**: Configured to query Groq Llama-3.3-70B for sub-second streaming inference, with instant automated fallback to Google Gemini Flash API if rate limits or network issues occur.
- **Multimodal Document Risk Scanner (`/upload`)**: Allows users to upload photo or PDF copies of legal notices, FIR drafts, or contracts; extracts text via Tesseract OCR and generates an instant plain-language risk assessment.
- **Persistent Conversation Memory**: Backed by Supabase PostgreSQL to maintain multi-turn context across legal consultations while upholding user privacy.

---

## 4. HazardLens — Real-Time Edge AI Smart City Surveillance Command Center

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Edge Computer Vision, Public Safety, Smart Surveillance, Distributed Alerting |
| **Recognition** | **Build With Bharat 1.0 (Microsoft)** — Finalist |
| **Role** | Edge AI Lead |
| **Repository** | [github.com/tusharsingh-sde/HazardLens](https://github.com/tusharsingh-sde/HazardLens) |
| **Tech Stack** | Python 3.10+, Ultralytics YOLOv8 (Dual Models), OpenCV (`opencv-python-headless`), Microsoft Edge-TTS (`hi-IN-SwaraNeural`), Streamlit, smtplib |

### Problem Statement & Edge Concept
Traditional municipal CCTV operations are passive: human operators must spot a hazard on a wall of video monitors and manually raise alarms. In fire outbreaks or crowd crushes, minutes of delay cost lives. Cloud-based video processing is often unfeasible due to high bandwidth costs and latency.

HazardLens is an **autonomous, zero-cloud-dependency Edge AI command center** that transforms commodity CCTV and IP cameras into proactive emergency alerting nodes running entirely on local edge hardware.

### Dual-Inference Pipeline Architecture

```
                      ┌──────────────────────────┐
                      │  Live CCTV / IP Camera    │
                      │  (RTSP / HTTP Stream)     │
                      └────────────┬─────────────┘
                                   │
                                   ▼
                      ┌──────────────────────────┐
                      │  OpenCV Frame Pipeline   │
                      │  (4-Frame Skip Buffer)   │
                      └────────────┬─────────────┘
                                   │
                      ┌────────────┴────────────┐
                      ▼                         ▼
            ┌──────────────────┐      ┌──────────────────┐
            │  🔥 Engine 1     │      │  👥 Engine 2     │
            │  Fire & Smoke    │      │  Crowd Density   │
            │  (best.pt ~6MB)  │      │  (yolov8n.pt)    │
            │  conf ≥ 0.68     │      │  class: person   │
            └─────────┬────────┘      └─────────┬────────┘
                      │                         │
                      └────────────┬────────────┘
                                   │
                                   ▼
                      ┌──────────────────────────┐
                      │ Hazard Arbiter Engine    │
                      │ "Latest Hazard Wins" FSM │
                      └────────────┬─────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                ▼                  ▼                  ▼
      ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
      │ Tactical UI      │ │ Local Voice TTS  │ │ Automated SMTP   │
      │ Pulsing Banner   │ │ Edge-TTS Hindi   │ │ Non-blocking     │
      │ (Streamlit)      │ │ SwaraNeural      │ │ Admin Email      │
      └──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Key Engineering Innovations
- **Dual-Model Inference at Edge**: Concurrently executes a custom fine-tuned YOLOv8 fire/smoke detector (`best.pt`) alongside a pre-trained `yolov8n.pt` crowd counter on video frames.
- **4-Frame Skip Optimization**: Implements an intelligent frame skipping buffer to sustain 25+ FPS inference speeds on edge CPU/GPU environments without thermal throttling.
- **"Latest Hazard Wins" Finite State Machine (FSM)**: Prevents UI lockups, alert stacking, and chaotic overlapping audio streams when multiple hazards co-occur.
- **Offline Hindi Neural Voice Alerts**: Generates localized emergency speech broadcasts using Microsoft Edge-TTS (`hi-IN-SwaraNeural`) to warn on-site personnel immediately in vernacular Hindi.
- **False-Positive Mitigation Layer**: Confidence-tuned thresholds (`0.68` for fire/smoke, calibrated person counting) to eliminate false triggers from golden-hour sunlight, shadows, and amber lighting.

---

## 5. CloudMask AI — Deep Learning Satellite Cloud Segmentation & 3D WebGL

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Satellite Remote Sensing, Deep Semantic Segmentation, WebGL Data Visualization |
| **Repository** | [github.com/tusharsingh-sde/CloudMask-AI](https://github.com/tusharsingh-sde/CloudMask-AI) |
| **ML & Backend**| Python 3.10+, PyTorch 2.x, Custom U-Net, torchvision, CUDA Mixed Precision (AMP), OpenCV, tifffile, FastAPI, Uvicorn |
| **Frontend Stack**| React 19, Three.js (0.186), Vite 8, Lucide React, Deep-Space Neon Styling |
| **Dataset** | 38-Cloud Dataset (Landsat 8 Multispectral Satellite Imagery) |

### Problem Statement & Domain Relevance
In satellite remote sensing, clouds and cloud shadows obscure optical surface features, contaminating downstream tasks like crop yield prediction, flood mapping, deforestation monitoring, and urban expansion tracking. Accurately masking clouds at the pixel level from multispectral data is a crucial preprocessing requirement.

CloudMask AI implements an end-to-end pipeline: from training a custom 4-band U-Net segmentation network on Landsat 8 data to serving inferences via a high-performance REST API connected to an interactive 3D WebGL orbital command dashboard.

### Deep Learning Pipeline & U-Net Architecture
- **Model Topology**: Custom U-Net encoder-decoder featuring 4 downsampling convolutional stages with skip connections to restore fine spatial boundary details, outputting a single-channel binary cloud mask probability map.
- **Input Channels**: 4 multispectral Landsat 8 bands:
  - Band 4: Red ($0.64 - 0.67 \ \mu m$)
  - Band 3: Green ($0.53 - 0.59 \ \mu m$)
  - Band 2: Blue ($0.45 - 0.51 \ \mu m$)
  - Band 5: Near Infrared (NIR) ($0.85 - 0.88 \ \mu m$)
- **Optimization & Acceleration**: Trained with Automatic Mixed Precision (`torch.amp` FP16) achieving 2x throughput with lower VRAM overhead; scalable across multi-GPU nodes via `torch.nn.DataParallel`.
- **Metrics**: Achieved best validation loss of `0.0958` on 38-Cloud benchmark patches.

### Frontend 3D Earth Visualizer & Multi-View Display
- **WebGL Orbital Space Simulator**: Built with Three.js, rendering a real-time rotating 3D Earth model with satellite orbital trajectories and live telemetry data.
- **4-Channel Multispectral Switcher**:
  1. *True-Color RGB Composite*: Harmonized 3-band natural view.
  2. *Binary Segmentation Mask*: High-contrast thresholded mask.
  3. *Neon Magenta Alpha Overlay*: Semi-transparent overlay with tunable opacity.
  4. *Continuous Magma Heatmap*: Visualizes model probability distribution across cloud edges and thin cirrus clouds.

---

## 6. SignBridge AI — Real-Time Sign Language Translation & Video Calling Platform

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Assistive Technology, Real-Time Computer Vision, WebSockets, WebRTC, LLMs |
| **Status** | In Active Development |
| **Core Stack** | FastAPI, WebSockets, Google MediaPipe, Google Gemini Flash, ZegoCloud WebRTC, React |

### Problem Statement & Concept
Over 430 million individuals worldwide experience disabling hearing loss. While sign language is their primary mode of expression, very few hearing individuals understand it, creating a severe communication barrier in schools, hospitals, and workplaces.

SignBridge AI is an accessible, real-time video communication platform that translates Indian/American Sign Language into natural spoken text and synthesized sentences in real time during live two-way video calls.

### System Architecture & Pipeline
1. **21-Point Skeletal Hand Tracking**: Uses Google MediaPipe to track 21 3D hand landmarks per hand from live video frames at 30+ FPS, agnostic to skin color or background clutter.
2. **Gesture Classification**: Custom-trained feature classifier trained on a 64,000-image sign language dataset converting coordinate trajectories into character/word tokens.
3. **Gemini Flash Contextual Synthesis**: Token streams are processed by Google Gemini Flash to convert disjointed sign tokens into grammatically fluid, expressive full sentences.
4. **ZegoCloud WebRTC Video Calling**: High-definition peer-to-peer audio-video calling engine with live synchronized translation subtitles overlaid on video feeds.
5. **Interactive Learning Module**: Built-in gamified sign-language educational suite that tests user gestures against reference sign models with real-time feedback.

---

## 7. Amazon ML Challenge 2026 — Multilingual Business Entity Resolution Pipeline

| Attribute | Specification |
| :--- | :--- |
| **Domain** | NLP, Entity Resolution, High-Throughput Vector Search, Graph Algorithms |
| **Competition**| **Amazon ML Challenge 2026** (National Track) |
| **Role** | Team Leader & ML Pipeline Architect (The Syntax Squad) |
| **Core Stack** | Python, FAISS, PyTorch, HuggingFace, NetworkX, Pandas, Scikit-learn |

### Problem Statement
In enterprise commerce, business registries across different global jurisdictions represent the same real-world entity with differing names, abbreviated legal statuses, typo-ridden addresses, and localized formats. The objective was to deduplicate and resolve noisy business entities across three heterogeneous, multilingual datasources across the United States, India, and France, maximizing the competition $F_{0.5}$ metric.

### Multi-Stage Architecture
1. **Canonical Normalization**: Cleans unicode diacritics, expands country codes, and standardizes multi-lingual legal business entity suffixes (e.g., `GmbH`, `LLC`, `Pvt Ltd`, `SA`, `SAS`).
2. **Country-Partitioned Dense Vector Search (FAISS)**: Partitions the search space geographically and leverages dense sentence transformer embeddings to prune the $O(N \times M)$ search complexity down to top-$K$ ($K=50$) high-recall candidate matches.
3. **Hybrid Feature Re-Ranking**: Computes composite similarity scores blending cosine vector distance, character $n$-gram Jaccard overlap, Jaro-Winkler string similarity, and Levenshtein token edit distance.
4. **Graph-Aware Entity Clustering**: Treats high-confidence candidate matches as edges in a sparse graph and uses connected component algorithms to form clean, resolved business entity clusters.

---

## 8. WasteVisor — AI-Powered Smart Municipal Waste Monitoring Platform

| Attribute | Specification |
| :--- | :--- |
| **Domain** | Smart City Civic Tech, Computer Vision, Cloud AI |
| **Core Stack** | Node.js, Express, React 18, Vite 5, AWS Bedrock Runtime (`@aws-sdk/client-bedrock-runtime`), Multer, Jest |

### Summary & Architecture
An automated municipal waste classification and overflow monitoring system designed for urban civic authorities. Connects community reporting and municipal sanitation sensors to **AWS Bedrock** foundation models for automated waste segregation classification (biodegradable, recyclable, hazardous, electronic) and automated dispatch optimization for collection fleets. Built with an Express backend, multipart image upload streams, and a reactive Vite-powered user interface.

---

## Technical Summary Matrix of All Projects

| Project | Primary Focus | ML Model / Technique | Core Backend | Deployment / Infra |
| :--- | :--- | :--- | :--- | :--- |
| **Antriksha (ASE)** | Geospatial Vector Search | RemoteCLIP ViT-B/32 + FAISS | Python / Streamlit | Local / Cloud Engine |
| **RoadGuard AI** | Pothole Detection & Costing | YOLOv11 + ByteTrack | FastAPI (Async + WS) | Docker + Caddy + Azure VM |
| **JurixAI** | Indian Legal Assistance | RAG + Llama-3.3-70B + Gemini | FastAPI + LangChain | ChromaDB + Supabase |
| **HazardLens** | Surveillance Command Center | Dual YOLOv8 + Edge-TTS | Python / OpenCV / Streamlit | Local Edge Hardware |
| **CloudMask AI** | Satellite Cloud Masking | Custom U-Net (FP16 AMP) | FastAPI + PyTorch | React 19 + Three.js |
| **SignBridge AI** | Sign Language Translation | MediaPipe + Gemini Flash | FastAPI + WebSockets | ZegoCloud WebRTC |
| **Amazon ML '26** | Entity Resolution Pipeline | Dense FAISS + Graph Clustering | Python Data Pipeline | Scalable Batch Inference |
| **WasteVisor** | Municipal Waste Analysis | AWS Bedrock Vision Models | Express / Node.js | Vite / Node Runtime |
