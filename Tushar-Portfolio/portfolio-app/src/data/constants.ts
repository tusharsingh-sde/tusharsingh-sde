// Tushar Singh — Skills for 3D Keyboard
// Order = keycap layout, 6 per row

export enum SkillNames {
  // AI/ML & Computer Vision (Row 1-2)
  PYTORCH = "pytorch",
  TENSORFLOW = "tensorflow",
  YOLO = "yolo",
  LANGCHAIN = "langchain",
  FAISS = "faiss",
  GEMINI = "gemini",
  OPENCV = "opencv",
  MEDIAPIPE = "mediapipe",
  HUGGINGFACE = "huggingface",
  REMOTECLIP = "remoteclip",

  // Backend & Systems (Row 3-4)
  FASTAPI = "fastapi",
  PYTHON = "python",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  REDIS = "redis",
  DOCKER = "docker",
  GIT = "git",
  LINUX = "linux",
  NODEJS = "nodejs",
  EXPRESS = "express",

  // Frontend & Tools (Row 5-6)
  REACT = "react",
  NEXTJS = "nextjs",
  TYPESCRIPT = "typescript",
  TAILWIND = "tailwind",
  THREEJS = "threejs",
  AZURE = "azure",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  /** Optional local artwork for the 3D key; falls back to icon. */
  keyboardIcon?: string;
  /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
  keyboardColor?: string;
  /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
  shortcut?: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  // AI/ML & Computer Vision
  [SkillNames.PYTORCH]: {
    id: 1,
    name: "pytorch",
    label: "PyTorch",
    shortDescription: "Deep learning framework for research and production",
    color: "#ee4c2c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
    keyboardIcon: "/assets/keyboard/logos/pytorch.svg",
    keyboardColor: "#ee4c2c",
  },
  [SkillNames.TENSORFLOW]: {
    id: 2,
    name: "tensorflow",
    label: "TensorFlow",
    shortDescription: "End-to-end ML platform for training and deployment",
    color: "#ff6f00",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
    keyboardIcon: "/assets/keyboard/logos/tensorflow.svg",
    keyboardColor: "#ff6f00",
  },
  [SkillNames.YOLO]: {
    id: 3,
    name: "yolo",
    label: "YOLO",
    shortDescription: "Real-time object detection (v8, v11) for edge and cloud",
    color: "#00ffff",
    icon: "https://img.shields.io/badge/YOLO-00FFFF?style=flat&logo=yolo&logoColor=black",
    keyboardIcon: "/assets/keyboard/logos/yolo.svg",
    keyboardColor: "#00ffff",
  },
  [SkillNames.LANGCHAIN]: {
    id: 4,
    name: "langchain",
    label: "LangChain",
    shortDescription: "LLM application framework for RAG and agents",
    color: "#1c3c3c",
    icon: "https://img.shields.io/badge/LangChain-1C3C3C?style=flat&logo=langchain&logoColor=white",
    keyboardIcon: "/assets/keyboard/logos/langchain.svg",
    keyboardColor: "#1c3c3c",
  },
  [SkillNames.FAISS]: {
    id: 5,
    name: "faiss",
    label: "FAISS",
    shortDescription: "Efficient similarity search for dense vectors at scale",
    color: "#0467df",
    icon: "https://img.shields.io/badge/FAISS-0467DF?style=flat&logoColor=white",
    keyboardIcon: "/assets/keyboard/logos/faiss.svg",
    keyboardColor: "#0467df",
  },
  [SkillNames.GEMINI]: {
    id: 6,
    name: "gemini",
    label: "Gemini",
    shortDescription: "Google's multimodal LLM for reasoning and code",
    color: "#8e75b2",
    icon: "https://img.shields.io/badge/Gemini-8E75B2?style=flat&logo=googlegemini&logoColor=white",
    keyboardIcon: "/assets/keyboard/logos/gemini.svg",
    keyboardColor: "#8e75b2",
  },
  [SkillNames.OPENCV]: {
    id: 7,
    name: "opencv",
    label: "OpenCV",
    shortDescription: "Computer vision library for image and video processing",
    color: "#5c3ee8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
    keyboardIcon: "/assets/keyboard/logos/opencv.svg",
    keyboardColor: "#5c3ee8",
  },
  [SkillNames.MEDIAPIPE]: {
    id: 8,
    name: "mediapipe",
    label: "MediaPipe",
    shortDescription: "Cross-platform ML solutions for hands, face, pose",
    color: "#0f9d58",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mediapipe/mediapipe-original.svg",
    keyboardIcon: "/assets/keyboard/logos/mediapipe.svg",
    keyboardColor: "#0f9d58",
  },
  [SkillNames.HUGGINGFACE]: {
    id: 9,
    name: "huggingface",
    label: "Hugging Face",
    shortDescription: "Model hub, transformers, and datasets ecosystem",
    color: "#ffd21e",
    icon: "https://img.shields.io/badge/HuggingFace-FFD21E?style=flat&logo=huggingface&logoColor=black",
    keyboardIcon: "/assets/keyboard/logos/huggingface.svg",
    keyboardColor: "#ffd21e",
  },
  [SkillNames.REMOTECLIP]: {
    id: 10,
    name: "remoteclip",
    label: "RemoteCLIP",
    shortDescription: "Vision-language model for remote sensing imagery",
    color: "#14b8a6",
    icon: "https://img.shields.io/badge/RemoteCLIP-14B8A6?style=flat&logoColor=white",
    keyboardIcon: "/assets/keyboard/logos/remoteclip.svg",
    keyboardColor: "#14b8a6",
  },

  // Backend & Systems
  [SkillNames.FASTAPI]: {
    id: 11,
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "High-performance Python API framework with async support",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    keyboardIcon: "/assets/keyboard/logos/fastapi.svg",
    keyboardColor: "#009688",
  },
  [SkillNames.PYTHON]: {
    id: 12,
    name: "python",
    label: "Python",
    shortDescription: "Primary language for AI/ML, backends, and scripting",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    keyboardIcon: "/assets/keyboard/logos/python.svg",
    keyboardColor: "#3776ab",
  },
  [SkillNames.POSTGRES]: {
    id: 13,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription: "Advanced open-source relational database",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    keyboardIcon: "/assets/keyboard/logos/postgres.svg",
    keyboardColor: "#146888",
  },
  [SkillNames.MONGODB]: {
    id: 14,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Flexible document database for modern applications",
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    keyboardIcon: "/assets/keyboard/logos/mongodb.svg",
    keyboardColor: "#00c51b",
  },
  [SkillNames.REDIS]: {
    id: 15,
    name: "redis",
    label: "Redis",
    shortDescription: "In-memory data store for caching, queues, pub/sub",
    color: "#dc382d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    keyboardIcon: "/assets/keyboard/logos/redis.svg",
    keyboardColor: "#dc382d",
  },
  [SkillNames.DOCKER]: {
    id: 16,
    name: "docker",
    label: "Docker",
    shortDescription: "Containerization for consistent deployments",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    keyboardIcon: "/assets/keyboard/logos/docker.svg",
    keyboardColor: "#009fe8",
  },
  [SkillNames.GIT]: {
    id: 17,
    name: "git",
    label: "Git",
    shortDescription: "Distributed version control for collaborative development",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
  [SkillNames.LINUX]: {
    id: 18,
    name: "linux",
    label: "Linux",
    shortDescription: "Server OS, shell scripting, and systems administration",
    color: "#fcc624",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    keyboardIcon: "/assets/keyboard/logos/linux.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.NODEJS]: {
    id: 19,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "JavaScript runtime for scalable backend services",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
    keyboardColor: "#00952c",
  },
  [SkillNames.EXPRESS]: {
    id: 20,
    name: "express",
    label: "Express",
    shortDescription: "Minimal Node.js web framework for APIs",
    color: "#fff",
    icon: "https://cdn.simpleicons.org/express/9CA3AF",
    keyboardIcon: "/assets/keyboard/logos/express.svg",
    keyboardColor: "#343638",
  },

  // Frontend & Tools
  [SkillNames.REACT]: {
    id: 21,
    name: "react",
    label: "React",
    shortDescription: "Component-based UI library with hooks and concurrent features",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    keyboardIcon: "/assets/keyboard/logos/react.svg",
    keyboardColor: "#00cce8",
  },
  [SkillNames.NEXTJS]: {
    id: 22,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "React framework with SSR, RSC, and app router",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nextjs.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.TYPESCRIPT]: {
    id: 23,
    name: "typescript",
    label: "TypeScript",
    shortDescription: "Typed JavaScript for scalable, maintainable code",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/typescript.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.TAILWIND]: {
    id: 24,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription: "Utility-first CSS for rapid, responsive styling",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    keyboardIcon: "/assets/keyboard/logos/tailwind.svg",
    keyboardColor: "#00bfd8",
  },
  [SkillNames.THREEJS]: {
    id: 25,
    name: "threejs",
    label: "Three.js",
    shortDescription: "WebGL 3D graphics for immersive web experiences",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/threejs.svg",
    keyboardColor: "#14b8a6",
  },
  [SkillNames.AZURE]: {
    id: 26,
    name: "azure",
    label: "Azure",
    shortDescription: "Cloud platform for compute, AI, and DevOps",
    color: "#0078d4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    keyboardIcon: "/assets/keyboard/logos/azure.svg",
    keyboardColor: "#0078d4",
  },
};

export type Experience = {
  id: number;
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "2024", end: "Present" }],
    title: "AI/ML & Backend Engineering Student",
    company: "MIET, AKTU (B.Tech CSE, Class of 2028)",
    description: [
      "Specializing in computer vision, LLMs, and scalable backend architectures",
      "10+ national hackathon finalist: ISRO BAH 2026 Grand Finale, SIH 2025/2026, Microsoft BWB 1.0",
      "Building production-grade systems: satellite imagery retrieval, edge AI hazard detection, legal RAG assistants",
    ],
    skills: [
      SkillNames.PYTORCH,
      SkillNames.YOLO,
      SkillNames.FAISS,
      SkillNames.LANGCHAIN,
      SkillNames.FASTAPI,
      SkillNames.DOCKER,
      SkillNames.POSTGRES,
      SkillNames.AZURE,
    ],
  },
];

export const themeDisclaimers = {
  light: [
    "Light mode activated. Your retinas have been notified.",
    "Brightness: maximum. Contrast: aggressive. Proceed with caution.",
    "Welcome to the light side. We have high contrast ratios.",
  ],
  dark: [
    "Dark mode engaged. Your eyes thank you.",
    "Back to the shadows. Much better.",
    "Dark mode: because syntax highlighting deserves a dark canvas.",
  ],
};