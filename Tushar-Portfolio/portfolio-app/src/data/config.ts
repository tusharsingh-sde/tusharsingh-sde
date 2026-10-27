const config = {
  title: "Tushar Singh | AI/ML & Backend Engineer",
  description: {
    long: "Portfolio of Tushar Singh — AI/ML and Backend Engineer building production-grade intelligent systems. 3rd-year B.Tech CSE at MIET. 10+ national hackathon finalist including ISRO BAH 2026 Grand Finale, SIH 2025/2026, Microsoft BWB 1.0.",
    short: "AI/ML & Backend Engineer building production-grade intelligent systems.",
  },
  keywords: [
    "Tushar Singh",
    "portfolio",
    "AI/ML engineer",
    "backend engineer",
    "computer vision",
    "YOLO",
    "PyTorch",
    "FastAPI",
    "LangChain",
    "FAISS",
    "satellite imagery",
    "edge AI",
    "hackathon finalist",
  ],
  author: "Tushar Singh",
  email: "tusharsingh.sde@gmail.com",
  site: "https://tusharsingh.dev",

  githubUsername: "tusharsingh-sde",
  githubRepo: "3d-portfolio",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  social: {
    twitter: "https://x.com/tusharsingh_sde",
    linkedin: "https://www.linkedin.com/in/tushar-singh-5037273b4",
    github: "https://github.com/tusharsingh-sde",
  },
};
export { config };