import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import SlideShow from "@/components/slide-show";

const BASE_PATH = "/assets/projects-screenshots";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor),
// so full-color marks like Mistral flatten to match the rest of the set.
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_blank"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_blank"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            GitHub
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};

// Brand chips sourced from thesvg CLI mono SVGs in /public/assets/logos,
// rendered via MaskIcon so each one inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});

const PROJECT_SKILLS = {
  // AI/ML
  pytorch: brand("PyTorch", "pytorch-mono.svg"),
  tensorflow: brand("TensorFlow", "tensorflow-mono.svg"),
  yolo: { title: "YOLO", bg: "black", fg: "white", icon: <span className="text-xs font-bold">YOLO</span> },
  langchain: { title: "LangChain", bg: "black", fg: "white", icon: <span className="text-xs font-bold">LC</span> },
  faiss: { title: "FAISS", bg: "black", fg: "white", icon: <span className="text-xs font-bold">FAISS</span> },
  gemini: { title: "Gemini", bg: "black", fg: "white", icon: <span className="text-xs font-bold">Gemini</span> },
  opencv: brand("OpenCV", "opencv-mono.svg"),
  mediapipe: brand("MediaPipe", "mediapipe-mono.svg"),
  huggingface: { title: "Hugging Face", bg: "black", fg: "white", icon: <span className="text-xs font-bold">🤗</span> },
  remoteclip: { title: "RemoteCLIP", bg: "black", fg: "white", icon: <span className="text-xs font-bold">RC</span> },

  // Backend
  fastapi: brand("FastAPI", "fastapi-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  mongodb: brand("MongoDB", "mongodb-mono.svg"),
  redis: brand("Redis", "redis-mono.svg"),
  docker: brand("Docker", "docker-mono.svg"),
  git: brand("Git", "git-mono.svg"),
  linux: brand("Linux", "linux-mono.svg"),
  nodejs: brand("Node.js", "nodedotjs-mono.svg"),
  express: brand("Express", "express-mono.svg"),

  // Frontend & Tools
  react: brand("React", "react-mono.svg"),
  next: brand("Next.js", "nextdotjs-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  tailwind: brand("Tailwind", "tailwind-css-mono.svg"),
  threejs: { title: "Three.js", bg: "black", fg: "white", icon: <span className="text-xs font-bold">Three</span> },
  azure: brand("Azure", "azure-mono.svg"),
  streamlit: { title: "Streamlit", bg: "black", fg: "white", icon: <span className="text-xs font-bold">ST</span> },
  reportlab: { title: "ReportLab", bg: "black", fg: "white", icon: <span className="text-xs font-bold">RL</span> },
  leaflet: { title: "Leaflet", bg: "black", fg: "white", icon: <span className="text-xs font-bold">Leaflet</span> },
  bytetrack: { title: "ByteTrack", bg: "black", fg: "white", icon: <span className="text-xs font-bold">BT</span> },
  edgeTTS: { title: "Edge-TTS", bg: "black", fg: "white", icon: <span className="text-xs font-bold">TTS</span> },
};

export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
  featured?: boolean;
};

const projects: Project[] = [
  // ==================== FEATURED PROJECTS ====================

  {
    id: "ase",
    category: "Cross-Modal Satellite Retrieval",
    title: "Antriksha Search Engine (ASE)",
    src: "/assets/projects-screenshots/ase.svg",
    screenshots: [],
    featured: true,
    skills: {
      frontend: [
        PROJECT_SKILLS.streamlit,
        PROJECT_SKILLS.python,
      ],
      backend: [
        PROJECT_SKILLS.pytorch,
        PROJECT_SKILLS.faiss,
        PROJECT_SKILLS.remoteclip,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/tusharsingh-sde/ASE-Antrikhsa-Search-Engine",
    github: "https://github.com/tusharsingh-sde/ASE-Antrikhsa-Search-Engine",
    get content() {
      return (
        <div className="space-y-6">
          <TypographyP className="font-mono text-xl text-center">
            Cross-modal satellite image retrieval bridging SAR and Optical imagery using RemoteCLIP ViT-B/32 and FAISS.
          </TypographyP>
          <TypographyP className="font-mono">
            A Streamlit-based search engine that encodes satellite imagery (both SAR and Optical modalities) into 512-dimensional embeddings using RemoteCLIP, then performs exact nearest-neighbor search via FAISS IndexFlatL2 across ~32K pre-computed vectors (15,999 per modality). The system routes queries cross-modally: SAR queries search the Optical index and vice versa, enabling analysts to find corresponding scenes across sensor types.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Architecture & Performance</TypographyH3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass p-4 rounded-lg">
              <p className="text-2xl font-display font-bold text-gradient">~32K</p>
              <p className="text-sm text-muted-foreground mt-1">Total embeddings (16K SAR + 16K Optical)</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="text-2xl font-display font-bold text-gradient">6.7 ms</p>
              <p className="text-sm text-muted-foreground mt-1">Average retrieval latency (CPU, k=5)</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="text-2xl font-display font-bold text-gradient">512-D</p>
              <p className="text-sm text-muted-foreground mt-1">RemoteCLIP ViT-B/32 embedding dimension</p>
            </div>
          </div>

          <TypographyH3 className="my-4 mt-8">Technical Highlights</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside">
            <li>Bifurcated routing layer: detects query modality from filename, routes SAR↔Optical cross-modally</li>
            <li>FAISS IndexFlatL2 for exact nearest-neighbor search (no approximation)</li>
            <li>RemoteCLIP ViT-B/32 weights injected into CLIP architecture for remote sensing domain</li>
            <li>Offline indexer (<code>build_db.py</code>) processes 32K images in ~2-3 minutes</li>
            <li>CSV export of mission reports with top-5 results and metadata</li>
            <li>Dark-theme Streamlit UI with custom CSS (Linear/Vercel-inspired)</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Known Limitations</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Requires manual 2GB+ dataset download from Google Drive (link rot risk)</li>
            <li>RemoteCLIP weights not versioned in repo; manual download required</li>
            <li>No CI/CD, tests, Dockerfile, or cloud deployment config</li>
            <li>UI confidence scores and coordinates are synthetic (randomized for demo)</li>
            <li>Hackathon-grade MVP — not production-hardened</li>
          </ul>

          <p className="font-mono text-sm text-muted-foreground text-center mt-8">
            ISRO Bharatiya Antariksh Hackathon 2026 — Grand Finale Qualified (per portfolio documentation)
          </p>
        </div>
      );
    },
  },

  {
    id: "roadguard",
    category: "Full-Stack AI Infrastructure",
    title: "RoadGuard AI",
    src: "/assets/projects-screenshots/roadguard.svg",
    screenshots: [],
    featured: true,
    skills: {
      frontend: [
        PROJECT_SKILLS.next,
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.leaflet,
      ],
      backend: [
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.yolo,
        PROJECT_SKILLS.bytetrack,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.docker,
        PROJECT_SKILLS.reportlab,
        PROJECT_SKILLS.postgres,
        PROJECT_SKILLS.azure,
      ],
    },
    live: "https://github.com/tusharsingh-sde/RoadGuardAI",
    github: "https://github.com/tusharsingh-sde/RoadGuardAI",
    get content() {
      return (
        <div className="space-y-6">
          <TypographyP className="font-mono text-xl text-center">
            Autonomous pothole detection and cost estimation platform with YOLOv11 + ByteTrack, geospatial mapping, and automated PDF reports.
          </TypographyP>
          <TypographyP className="font-mono">
            A production-ready full-stack application (FastAPI + Next.js 16) for municipal road infrastructure monitoring. The backend runs YOLOv11 with ByteTrack for persistent object tracking across video frames, estimates pothole dimensions and repair costs, and generates detailed PDF reports via ReportLab. The frontend provides real-time WebSocket streaming, interactive Leaflet maps with Esri satellite tiles, and a complete auth system (Supabase, domain-restricted).
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Detection Pipeline</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside">
            <li>YOLOv11 custom model (<code>pothole_best.pt</code>, 5.4MB) at 60% confidence threshold</li>
            <li>ByteTrack persistent ID assignment across frames (prevents double-counting)</li>
            <li>Dimension estimation: 0.4 cm/pixel ratio + heuristic depth from confidence × bbox area</li>
            <li>Cost model: Volume × ₹8,500/m³ + ₹150 labor per pothole</li>
            <li>Severity tiers: Critical (≥85%), High (≥75%), Medium (&lt;75%) confidence</li>
            <li>Two WebSocket modes: backend-pull (drone/IP cam) and browser-push (device camera)</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Deployment & Infrastructure</TypographyH3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass p-4 rounded-lg">
              <p className="font-semibold">Docker Compose</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">3 services: backend, frontend (Nginx), Caddy (auto-HTTPS via Let&apos;s Encrypt)</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="font-semibold">Azure VM</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">Configured for <code>172.198.75.119.nip.io</code> with Caddy reverse proxy</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="font-semibold">Supabase Auth</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">Google OAuth + email/password, domain-restricted to <code>@miet.ac.in</code></p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="font-semibold">PDF Reports</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">ReportLab generation with branded styling, Supabase Storage upload</p>
            </div>
          </div>

          <TypographyH3 className="my-4 mt-8">Smart India Hackathon 2026</TypographyH3>
          <p className="font-mono text-sm text-muted-foreground">
            Project developed for SIH 2026. Repository contains complete implementation with Docker deployment configs.
            No official SIH finalist evidence found in repository — claim presented per portfolio documentation only.
          </p>
        </div>
      );
    },
  },

  {
    id: "hazardlens",
    category: "Edge AI Hazard Detection",
    title: "HazardLens",
    src: "/assets/projects-screenshots/hazardlens.svg",
    screenshots: [],
    featured: true,
    skills: {
      frontend: [
        PROJECT_SKILLS.streamlit,
        PROJECT_SKILLS.python,
      ],
      backend: [
        PROJECT_SKILLS.yolo,
        PROJECT_SKILLS.opencv,
        PROJECT_SKILLS.edgeTTS,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/tusharsingh-sde/HazardLens",
    github: "https://github.com/tusharsingh-sde/HazardLens",
    get content() {
      return (
        <div className="space-y-6">
          <TypographyP className="font-mono text-xl text-center">
            Real-time dual YOLOv8 inference for fire/smoke and crowd detection on CCTV feeds with Hindi voice alerts via Edge-TTS.
          </TypographyP>
          <TypographyP className="font-mono">
            A Streamlit-based monitoring platform that ingests RTSP/HTTP video streams from IP cameras and runs two YOLOv8 models in parallel: a custom fine-tuned model (<code>best.pt</code>, 6.2MB) for fire/smoke detection at 68% confidence, and the standard <code>yolov8n.pt</code> for person counting. A &quot;Latest Hazard Wins&quot; finite state machine prioritizes fire alerts over crowd alerts. On trigger, the system generates Hindi neural voice alerts using Microsoft Edge-TTS (<code>hi-IN-SwaraNeural</code>) and dispatches email notifications via Gmail SMTP.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Dual-Inference Architecture</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside">
            <li>Engine 1: <code>fire_model(frame, conf=0.68)</code> — custom fire/smoke YOLOv8</li>
            <li>Engine 2: <code>base_model(frame)</code> — YOLOv8n for person detection (crowd counting)</li>
            <li>Frame skip: processes every 4th frame for performance</li>
            <li>FSM: &quot;Latest Hazard Wins&quot; — FIRE state overrides CROWD</li>
            <li>Alerts: Visual banner + Hindi TTS audio (<code>st.audio()</code>) + background email thread</li>
            <li>TTS caching: generated MP3s stored locally for replay</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Infrastructure Reality Check</TypographyH3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="glass p-4 rounded-lg border-l-4 border-l-teal-500">
              <p className="font-semibold text-teal-400">✓ Local Inference</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">YOLO models run entirely on-device (CPU/GPU)</p>
            </div>
            <div className="glass p-4 rounded-lg border-l-4 border-l-orange-500">
              <p className="font-semibold text-orange-400">⚠ Edge-TTS Requires Internet</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">Microsoft cloud API for initial synthesis; MP3s cached locally after</p>
            </div>
            <div className="glass p-4 rounded-lg border-l-4 border-l-orange-500">
              <p className="font-semibold text-orange-400">⚠ Email Alerts = Cloud</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">Gmail SMTP dependency for alert dispatch</p>
            </div>
            <div className="glass p-4 rounded-lg border-l-4 border-l-orange-500">
              <p className="font-semibold text-orange-400">⚠ Streamlit = Web Dependencies</p>
              <p className="font-mono text-sm text-muted-foreground mt-1">Google Fonts, external CSS loaded at runtime</p>
            </div>
          </div>

          <TypographyH3 className="my-4 mt-8">Current State</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside text-sm">
            <li>Single-camera operational (CAM 01); 3 additional cameras are placeholder &quot;STDBY&quot;</li>
            <li>Single-threaded blocking <code>while cap.isOpened()</code> loop — freezes Streamlit UI</li>
            <li>Hardcoded Gmail credentials in source (needs environment variables)</li>
            <li>No Docker, tests, persistence, or multi-camera concurrent processing</li>
            <li>Functional prototype/demo — not production-ready</li>
          </ul>

          <p className="font-mono text-sm text-muted-foreground text-center mt-8">
            Microsoft Build With Bharat 1.0 — Finalist (per portfolio documentation; no primary evidence in repo)
          </p>
        </div>
      );
    },
  },

  // ==================== OTHER PROJECTS ====================

  {
    id: "jurixai",
    category: "RAG Legal Assistant",
    title: "JurixAI",
    src: "/assets/projects-screenshots/jurixai.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.langchain,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.gemini,
        PROJECT_SKILLS.faiss,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/tusharsingh-sde/JurixAI",
    github: "https://github.com/tusharsingh-sde/JurixAI",
    get content() {
      return (
        <div className="space-y-6">
          <TypographyP className="font-mono text-xl text-center">
            Multilingual Indian legal assistant powered by Llama 3.3-70B and Gemini Flash with ChromaDB RAG across 8 legal domains.
          </TypographyP>
          <TypographyP className="font-mono">
            A RAG-based chatbot for Indian legal queries with OCR-enabled document analysis. The system uses ChromaDB for vector storage across 8 legal domains (constitutional, criminal, civil, family, corporate, tax, labor, IP), Llama 3.3-70B via Groq for primary reasoning, and Gemini Flash for multimodal document understanding. OCR extraction enables users to upload legal documents for analysis and question-answering.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Technical Approach</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside">
            <li>ChromaDB vector store with domain-separated collections (8 legal domains)</li>
            <li>LangChain orchestration for retrieval, prompt templating, and chain composition</li>
            <li>Google Gemini models (gemini-3.5-flash chain) for generation — <strong>no Llama/Groq in actual implementation</strong></li>
            <li>Gemini Flash for OCR + multimodal document understanding (pytesseract + pdfplumber)</li>
            <li>Empathetic response formatting: Empathy → Action → Legal Basis → Next Steps</li>
            <li>React 19 frontend with TypeScript and Tailwind CSS</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">README vs Implementation Note</TypographyH3>
          <p className="font-mono text-sm text-muted-foreground">
            The project README advertises &quot;Llama 3.3-70B&quot; and &quot;Groq&quot; but the codebase only implements Google Gemini models.
            This portfolio entry reflects the verified implementation, not the README claims.
          </p>
        </div>
      );
    },
  },

  {
    id: "cloudmask",
    category: "Satellite Cloud Segmentation",
    title: "CloudMask AI",
    src: "/assets/projects-screenshots/cloudmask.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.threejs,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
      ],
      backend: [
        PROJECT_SKILLS.pytorch,
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.docker,
      ],
    },
    live: "https://github.com/tusharsingh-sde/CloudMask-AI",
    github: "https://github.com/tusharsingh-sde/CloudMask-AI",
    get content() {
      return (
        <div className="space-y-6">
          <TypographyP className="font-mono text-xl text-center">
            Custom U-Net for pixel-level cloud masking on Landsat 8 multispectral imagery with a Three.js 3D Earth orbital viewer.
          </TypographyP>
          <TypographyP className="font-mono">
            End-to-end cloud detection pipeline: a custom U-Net architecture trained with mixed-precision on Landsat 8 multispectral bands for pixel-level cloud segmentation. The trained model is served via FastAPI, and a React + Three.js frontend provides an interactive 3D Earth orbital viewer for visualizing cloud masks overlaid on a globe. Mixed-precision training reduces memory footprint and accelerates convergence.
          </TypographyP>

          <ProjectsLinks live={this.live} repo={this.github} />

          <TypographyH3 className="my-4 mt-8">Pipeline</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside">
            <li>Data: Landsat 8 Collection 2 Level-2 surface reflectance (7 multispectral bands)</li>
            <li>Model: U-Net with ResNet encoder backbone, trained with mixed-precision (FP16)</li>
            <li>Loss: Combined BCE + Dice loss for class-imbalanced cloud/cloud-shadow</li>
            <li>Inference: FastAPI endpoint accepting GeoTIFF, returning cloud probability mask</li>
            <li>Visualization: Three.js globe with WebGL shaders for real-time mask overlay</li>
            <li>Orbital camera controls with zoom, rotation, and layer toggles</li>
          </ul>
        </div>
      );
    },
  },

  {
    id: "signbridge",
    category: "Real-Time Sign Language Translation (In Progress)",
    title: "SignBridge AI",
    src: "/assets/projects-screenshots/signbridge.svg",
    screenshots: [],
    skills: {
      frontend: [
        PROJECT_SKILLS.react,
        PROJECT_SKILLS.ts,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.threejs,
      ],
      backend: [
        PROJECT_SKILLS.mediapipe,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.gemini,
        PROJECT_SKILLS.python,
      ],
    },
    live: "#",
    github: "#",
    get content() {
      return (
        <div className="space-y-6">
          <div className="glass p-4 rounded-lg border border-orange-500/30 bg-orange-500/10">
            <p className="font-mono text-orange-400 text-sm">⚠ IN DEVELOPMENT — Features and timeline subject to change</p>
          </div>

          <TypographyP className="font-mono text-xl text-center">
            Real-time sign language translation using MediaPipe 21-point hand tracking, Gemini Flash sentence synthesis, and ZegoCloud WebRTC video calling.
          </TypographyP>
          <TypographyP className="font-mono">
            An in-progress system for bridging communication between deaf/hard-of-hearing and hearing individuals. MediaPipe Hands provides 21 3D landmarks per hand at 30fps in the browser. Landmark sequences are sent to a FastAPI backend where Gemini Flash synthesizes natural language sentences. ZegoCloud WebRTC enables video calling with real-time translation overlay. Gamified learning modules are planned for vocabulary building.
          </TypographyP>

          <TypographyH3 className="my-4 mt-8">Planned Architecture</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside">
            <li>MediaPipe Hands (WASM) — 21 landmarks × 2 hands, 30fps, client-side</li>
            <li>Sequence buffering & temporal smoothing for stable recognition</li>
            <li>FastAPI + Gemini Flash — landmark sequence → natural language sentence</li>
            <li>ZegoCloud WebRTC — low-latency video + translation overlay</li>
            <li>Gamified modules: vocabulary drills, fingerspelling practice, conversation simulation</li>
            <li>Offline-first design: core inference runs in browser where possible</li>
          </ul>

          <TypographyH3 className="my-4 mt-8">Current Focus</TypographyH3>
          <ul className="font-mono space-y-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Improving landmark sequence classification accuracy for complex sentences</li>
            <li>Reducing end-to-end latency (target: &lt;200ms landmark-to-text)</li>
            <li>Handling co-articulation and transition signs in continuous signing</li>
            <li>WebRTC integration with translation overlay synchronization</li>
          </ul>
        </div>
      );
    },
  },
];

export default projects;