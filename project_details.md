# 🚀 Tushar Singh — Project Portfolio & Technical Details

This document provides an exhaustive, engineering-level breakdown of all major projects architected and shipped by Tushar Singh. Each section captures the problem statement, technical architecture, innovations, tech stack, and real-world deployment details.

---

## 🛰️ 1. Antriksha Search Engine (ASE)
> **Tagline:** Cross-Modal Satellite Image Retrieval Engine bridging SAR & Optical Imagery  
> **Event / Context:** ISRO Bharatiya Antariksh Hackathon 2026 (Lead ML Architect, Team *Syntax Squad*)  
> **Repository:** [github.com/tusharsingh-sde/ASE-Antrikhsa-Search-Engine](https://github.com/tusharsingh-sde/ASE-Antrikhsa-Search-Engine)

### 📌 Problem Statement
Satellite imagery comes from heterogeneous sensor modalities: **Optical** (visible wavelengths, sensitive to cloud cover and daylight) and **SAR (Synthetic Aperture Radar)** (penetrates clouds, weather, and darkness). Analysts typically struggle to correlate or search across these two completely disparate visual representations using standard text or cross-sensor queries.

### 🏗️ Architecture & Technical Workflow
1. **Vision-Language Foundation Model:** Integrated **RemoteCLIP (ViT-B/32)**, a domain-specialized vision-language transformer fine-tuned specifically for remote sensing semantics.
2. **512-Dimensional Shared Vector Space:** Queries (natural language strings or uploaded images) and gallery images are projected into a unified 512-D embedding space.
3. **Bifurcated Routing Layer:** Designed an intelligent routing mechanism that prevents *modality collapse*. When a user queries with a SAR image, the system automatically redirects the vector lookup to retrieve matching Optical frames (and vice versa).
4. **Vector Indexing & Latency:** Indexed **16,000+ to 32,000+** satellite scene embeddings using **FAISS IndexFlatL2**, achieving exact sub-millisecond nearest neighbor search (`~0.04s` retrieval latency).
5. **Mission Reporting & UI:** Built a Linear/Vercel-inspired tactical dark dashboard in **Streamlit** featuring instant visual results, similarity distance scores, and automated structured CSV mission report generation.

### 🛠️ Tech Stack
- **Deep Learning / Models:** RemoteCLIP (ViT-B/32), PyTorch, Torchvision, OpenAI CLIP
- **Vector Search:** FAISS (IndexFlatL2, sub-0.04s lookup)
- **Image Processing:** OpenCV, PIL, NumPy, Pandas
- **Frontend / Serving:** Streamlit (dark-themed UI, mission export)

---

## 🛣️ 2. RoadGuard AI
> **Tagline:** AI-Powered Smart Pothole Detection, Dimensional Analysis & Maintenance Cost Estimation System  
> **Event / Context:** Smart India Hackathon (SIH) 2026  
> **Repository:** [github.com/tusharsingh-sde/RoadGuardAI](https://github.com/tusharsingh-sde/RoadGuardAI)

### 📌 Problem Statement
Road deterioration and potholes cause major vehicular accidents and economic damage. Municipal road inspection is predominantly manual, slow, subjective, and lacks geotagged accountability and automated repair cost budgeting.

### 🏗️ Architecture & Technical Workflow
1. **Real-Time Video Ingestion:** Streams video frames from IP cameras, USB devices, drone cameras, or device cameras over **WebSockets** directly to the backend. Also supports batch uploads of large 100MB+ survey videos.
2. **Custom-Trained YOLOv11 & Tracking:** Utilizes a custom-trained **YOLOv11** object detection model combined with **ByteTrack** multi-object tracking to prevent duplicate counts of the same pothole across sequential frames.
3. **Physical Dimension & Cost Estimation:** Calculates estimated width, breadth, depth, and asphalt volume requirements in real time, translating physical dimensions into estimated maintenance expenditure in **INR (₹)** based on material volume and standardized labor metrics.
4. **Severity Classification:** Three-tier priority tagging:
   - **Critical:** Confidence $\ge 85\%$
   - **High:** Confidence $\ge 75\%$
   - **Medium:** Confidence $< 75\%$
5. **Interactive Geospatial Mapping:** Displays geotagged incidents on a live **Leaflet** satellite map with color-coded markers and reverse geocoding.
6. **Automated PDF & Email Dispatch:** Generates branded, per-pothole PDF inspection reports containing cropped detection images, coordinates, severity tags, and repair cost summaries using **ReportLab**. The PDF is uploaded to **Supabase Storage** and dispatched via SMTP email directly to administrative authorities.
7. **Cloud Infrastructure:** Entire stack is containerized using **Docker Compose**, with an **Nginx** reverse proxy and **Caddy** managing automated SSL/TLS certificates on an **Azure Virtual Machine**.

### 🛠️ Tech Stack
- **Backend:** FastAPI, Python 3.12, Gunicorn + Uvicorn, WebSockets
- **Computer Vision:** Ultralytics YOLOv11, OpenCV, ByteTrack, ReportLab
- **Frontend:** Next.js 16 (Static Export), TypeScript, Tailwind CSS 4, Leaflet / React-Leaflet
- **Auth & Storage:** Supabase Auth (domain-restricted `@miet.ac.in`, Google OAuth & Email), Supabase Storage
- **Infrastructure & DevOps:** Docker Compose, Caddy (auto-HTTPS), Nginx, Microsoft Azure VM

---

## ⚖️ 3. JurixAI
> **Tagline:** High-Fidelity RAG-Based Indian Legal Assistant & Empathetic "Legal Saathi"  
> **Repository:** [github.com/tusharsingh-sde/JurixAI](https://github.com/tusharsingh-sde/JurixAI)

### 📌 Problem Statement
The Indian legal framework (comprising the IPC/BNS, CrPC, IT Act, etc.) is dense, opaque, and intimidating for ordinary citizens. When dealing with harassment, consumer fraud, police FIRs, or eviction notices, individuals struggle to understand their legal protections without paying exorbitant consultation fees.

### 🏗️ Architecture & Technical Workflow
1. **Authoritative Legal Knowledge Base:** Ingests official statutes spanning 8 foundational legal domains:
   - Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS)
   - Information Technology (Cyber Law) Act
   - Prevention of Sexual Harassment (POSH) Act
   - Right to Information (RTI) Act
   - Consumer Protection Act & Handbook
   - Model Tenancy Act (rental laws, tenant rights, eviction rules)
   - First Information Report (FIR) procedures & police complaint guidelines
   - Protection of Women from Domestic Violence Act
2. **Chunking & Vectorization:** Text is chunked with `RecursiveCharacterTextSplitter` (1000 characters, 200 overlap), embedded using HuggingFace's **`all-MiniLM-L6-v2`**, and stored in a persistent **ChromaDB** vector database (`Jurixai_db`).
3. **Retrieval & Context Augmentation:** Executes a top-k ($k=5\text{ to }8$) semantic similarity retrieval pipeline. Retrieved statute passages are paired with conversational history from **Supabase**.
4. **Empathetic & Multilingual LLM Orchestration:** Powered by **Llama 3.3-70B** (via Groq Cloud) and **Google Gemini** (Gemini 2.5/3.5/3.7 Flash with automated multi-tier fallback). Employs a custom *empathy-first prompt strategy* that detects user distress, providing calm, human-centric guidance alongside exact statute citations in **English, Hindi, or Hinglish**.
5. **Scanned Legal Document Analysis (OCR):** Users can upload FIRs, summons, agreements, or legal notices; parsed via **pdfplumber** and **Tesseract OCR** for automated clause risk assessment.

### 🛠️ Tech Stack
- **Backend:** FastAPI, Python 3.10+, LangChain, Pydantic
- **Vector DB & Embeddings:** ChromaDB, HuggingFace `all-MiniLM-L6-v2`
- **LLM Runtimes:** Groq Cloud (Llama-3.3-70B-Versatile), Google Gemini API (Flash multi-tier fallback)
- **Document Processing:** Tesseract OCR, pdfplumber, pypdf
- **Frontend:** React 19, Vite, Lucide React, Custom CSS
- **Database / Auth:** Supabase (JWT authentication & persistent chat history)

---

## 🛡️ 4. HazardLens
> **Tagline:** Real-Time Tactical Edge AI Hazard Detection Platform with Neural Voice Alerts  
> **Event / Context:** Build With Bharat 1.0 (Microsoft)  
> **Repository:** [github.com/tusharsingh-sde/HazardLens](https://github.com/tusharsingh-sde/HazardLens)

### 📌 Problem Statement
Traditional CCTV monitoring relies on human operators looking at multiple screens. In fast-moving emergencies such as industrial fire, smoke outbreak, or stampede conditions, critical response minutes are lost before alarms are raised.

### 🏗️ Architecture & Technical Workflow
1. **Edge-Optimized Dual Inference Pipeline:** Runs concurrent object detection models without cloud dependency:
   - **Model 1 (Fire & Smoke):** Fine-tuned YOLOv8 model (`best.pt`, ~6MB) with multilingual class mapping and a confidence threshold tuned to $\ge 0.68$ to eliminate false positives from lighting and skin tones.
   - **Model 2 (Overcrowding):** Pre-trained YOLOv8n detecting person density to flag crowd surges and bottlenecks.
2. **Stream Ingestion & 4-Frame Skip:** Ingests live RTSP/HTTP streams from IP cameras and mobile webcams via OpenCV with an optimized frame-skip pipeline ensuring real-time 30+ FPS edge throughput.
3. **"Latest Hazard Wins" State Machine:** Implemented an asynchronous finite state machine that prevents audio looping, UI freezing, and alert queue stacking when simultaneous hazard triggers fire.
4. **Offline Hindi Neural Voice Alerts:** Integrates **Microsoft Edge-TTS** (`hi-IN-SwaraNeural`) to broadcast instant, audible spoken warnings in Hindi directly over edge speakers.
5. **Background Email Dispatch:** Dispatches non-blocking, multi-part HTML emergency emails with timestamped context to building security administrators via threaded SMTP.
6. **Command Center UI:** Developed a military-grade tactical command center interface in **Streamlit** supporting multi-camera switching, live hazard metrics, and animated tactical banners.

### 🛠️ Tech Stack
- **AI / Computer Vision:** Ultralytics YOLOv8 (dual inference), OpenCV (`opencv-python-headless`)
- **Speech Engine:** Microsoft Edge-TTS (`hi-IN-SwaraNeural`), Sarvam AI TTS
- **Backend & State:** Python 3.10+, asyncio, FSM state management, `smtplib` (threaded email dispatch)
- **Frontend / Dashboard:** Streamlit with customized dark-mode tactical CSS

---

## ☁️ 5. CloudMask AI
> **Tagline:** Automated Pixel-Level Cloud Segmentation for Satellite Imagery using Deep Learning & 3D WebGL  
> **Repository:** [github.com/tusharsingh-sde/CloudMask-AI](https://github.com/tusharsingh-sde/CloudMask-AI)

### 📌 Problem Statement
Clouds obscure the Earth's surface in optical satellite data, severely distorting downstream analyses such as crop yield monitoring, disaster damage assessment, and land-cover classification. Automated, high-resolution cloud masking at the pixel level is an indispensable prerequisite for all earth observation pipelines.

### 🏗️ Architecture & Technical Workflow
1. **PyTorch U-Net Segmentation:** Designed and trained a custom encoder-decoder **U-Net** architecture with skip connections on the **38-Cloud** dataset (Landsat 8 multispectral imagery).
2. **4-Band Multispectral Processing:** Ingests 4 distinct spectral bands: Red, Green, Blue, and **Near-Infrared (NIR)**, allowing the model to distinguish between reflective clouds and high-albedo terrestrial features (snow, sand, urban concrete).
3. **High-Performance Training Infrastructure:** Built with **Mixed Precision (`torch.amp`)** for 2x training acceleration and lower GPU memory footprints, alongside multi-GPU `DataParallel` scalability and epoch checkpoint resumption.
4. **Hardened FastAPI REST API:** Serves low-latency predictions via `/predict` and `/process` endpoints with in-memory multi-depth TIFF/RGB decoding and payload validation.
5. **Interactive 3D WebGL Frontend:** Features a cutting-edge **React 19 + Three.js** interactive 3D Earth orbital simulation rendering live satellite orbits, multispectral True-Color RGB composites, binary cloud masks, neon magenta overlays, and continuous Magma heatmap telemetry.

### 🛠️ Tech Stack
- **Deep Learning:** PyTorch 2.x, Torchvision, CUDA, AMP (Mixed Precision FP16)
- **Computer Vision:** OpenCV, PIL, tifffile, NumPy
- **Backend:** FastAPI, Uvicorn, python-multipart
- **Frontend:** React 19, Three.js (WebGL 3D Earth simulation), Vite, Lucide Icons, Vanilla CSS
- **Dataset:** 38-Cloud (Landsat 8 Multispectral Satellite Imagery)

---

## 📦 6. Amazon ML Challenge 2026: Business Entity Resolution
> **Tagline:** Scalable Graph-Aware Multi-Lingual Entity Resolution across Heterogeneous Registries  
> **Role / Context:** Team Leader (The Syntax Squad)  
> **Artifact:** [github.com/tusharsingh-sde/Amazon-ML-Challenge-2026](https://github.com/tusharsingh-sde/Amazon-ML-Challenge-2026)

### 📌 Problem Statement
Resolving ambiguous, noisy business entities across 3 massive international datasources (Source 1: 1.73M records, Source 2: 4.88M records, Source 3: 5.08M records) across the United States, India, and France. Challenges included spelling variations, missing postal codes, legal suffix discrepancies (*Corp*, *Pvt Ltd*, *Inc.*), and cross-lingual shifts.

### 🏗️ Architecture & Technical Workflow
1. **Canonical Text Normalization:** Comprehensive regex-based canonicalization of legal acronyms, street designations, Unicode diacritics, and geographic codes.
2. **Country-Partitioned Dense Vector Indexing (FAISS):** Hard-partitioned entities by country to eliminate cross-border false positives, using inner-product/cosine FAISS indexing to shrink an $O(N \times M)$ search space into high-recall candidate buckets ($K=50$).
   - **Candidate Recall@50:** **$> 96.4\%$** across validation sets.
3. **Multi-Feature Hybrid Scoring & Re-Ranking:** Synthesized multidimensional feature vectors per candidate pair:
   - Dense semantic sentence cosine similarity
   - Jaro-Winkler similarity & Levenshtein edit distance on business names
   - Token-set ratio & partial string overlap on addresses
   - Jaccard similarity of extracted alphanumeric tokens
4. **Graph-Aware Entity Clustering:** Linked candidate pairs into coherent multi-source clusters, optimizing specifically for the competition's $F_{0.5}$ metric with sub-60 minute GPU execution times.

### 🛠️ Tech Stack
- **Vector Search & ML:** FAISS, Sentence-Transformers, PyTorch, Scikit-learn
- **Data Engineering:** Pandas, NumPy, RapidFuzz, Regex text pipelines
- **Hardware:** GPU-accelerated execution

---

## 🤟 7. SignBridge AI *(In Progress)*
> **Tagline:** Real-Time Sign Language Translation & Accessible Communication Platform  
> **Repository / Project State:** Active Development

### 📌 Problem Statement
Over 70 million deaf and hard-of-hearing individuals worldwide face profound communication barriers when interacting with public services, healthcare professionals, or non-signing individuals.

### 🏗️ Architecture & Technical Workflow
1. **21-Point Spatial Hand Tracking:** Uses **Google MediaPipe** to extract 21 three-dimensional coordinate landmarks per hand in real time from webcam video frames.
2. **Gesture Recognition Engine:** Trained on a 64,000-image sign language dataset to classify discrete signs and fingerspelling.
3. **Sentence Synthesis via Gemini Flash:** Feeds detected sign sequences to **Google Gemini Flash** via FastAPI to synthesize natural, grammatically correct full sentences (converting raw sign tokens into fluent English/Hindi speech).
4. **WebRTC Video Calling:** Integrates **ZegoCloud WebRTC** to provide two-way peer-to-peer video communication with live translated subtitle overlays.
5. **Interactive Learning Module:** Includes a gamified sign-language practice environment allowing non-signers to learn and verify hand poses with real-time AI feedback.

### 🛠️ Tech Stack
- **Computer Vision:** Google MediaPipe (21-point hand tracking), OpenCV
- **Backend & Streaming:** FastAPI, WebSockets, Python 3.11+
- **LLM:** Google Gemini Flash API (Natural language sentence reconstruction)
- **Real-Time Video:** ZegoCloud WebRTC SDK

---

## ♻️ 8. WasteVisor & Foundational Repositories

### **WasteVisor — AI Smart Waste Classification**
- **Repository:** [github.com/tusharsingh-sde/WasteVisor](https://github.com/tusharsingh-sde/WasteVisor)
- **Concept:** Intelligent waste segregation and classification using **AWS Bedrock Runtime**, Express/Node.js backend, Multer for image uploads, and a modern **React + Vite** frontend.

### **DSA Practice & Algorithmic Foundations**
- **Repository:** [github.com/tusharsingh-sde/DSA-practice-questions](https://github.com/tusharsingh-sde/DSA-practice-questions)
- **Coverage:** 40+ structured LeetCode implementations in **Java**, systematically organized by problem difficulty (Basic, Easy, Medium) and algorithmic pattern (Two Pointers, Matrices, Dynamic Programming, Arrays, String Parsing).

### **FastAPI & Pydantic Production Patterns**
- **Repositories:** `FastAPI-Tutorials`, `Pydantic-Tutorials`
- **Focus:** Reference implementations for high-throughput async endpoints, dependency injection, schema validation, middleware, error handling, and security practices in Python.
