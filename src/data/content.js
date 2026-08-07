// Central content store for Vasu Mekala's portfolio.
// Sourced from https://vasu-mekala-portfolio.vercel.app/

export const profile = {
  name: "Vasu Mekala",
  brand: "VM.ai",
  title: "AI / ML Engineer & Researcher",
  tagline:
    "AI/ML Engineer with 4+ years building production ML, Generative AI / RAG pipelines, and MLOps systems.",
  bio: "AI/ML Engineer with 4+ years building machine learning solutions across banking, telecom, healthcare insurance, and pharmacy analytics — credit risk, fraud detection, churn, patient risk, and forecasting. Focused on Deep Learning, Computer Vision, and LLMs, with a track record of measurable business outcomes.",
  location: "Stamford, CT — open to relocation, US-wide & remote",
  email: "vasusvs111@gmail.com",
  phone: "+1 (213) 876-9232",
  linkedin: "https://www.linkedin.com/in/vasu-mekala-data",
  github: "https://github.com/vasu-mekala",
  resumeUrl: "/resume.pdf",
  stats: [
    { label: "Years AI/ML experience", value: "4+" },
    { label: "Certifications", value: "6" },
    { label: "Forecast model lift", value: "16%" },
  ],
};

export const specializations = [
  {
    key: "deep-learning",
    title: "Deep Learning",
    description:
      "Neural network design, training, and optimization for production-scale ML systems.",
    tools: ["PyTorch", "TensorFlow", "CUDA", "Scikit-learn", "XGBoost", "BERT"],
  },
  {
    key: "computer-vision",
    title: "Computer Vision",
    description:
      "Real-time detection, tracking, and image pipelines optimized for inference speed.",
    tools: ["OpenCV", "YOLO", "TensorRT", "Image Pipelines", "Object Tracking"],
  },
  {
    key: "llm-genai",
    title: "LLM / GenAI",
    description:
      "Retrieval-augmented generation, semantic search, and evaluation for enterprise LLM apps.",
    tools: ["HuggingFace", "LangChain", "LlamaIndex", "RAG", "Vector Search", "Prompt Engineering"],
  },
  {
    key: "mlops",
    title: "MLOps & Governance",
    description:
      "Production deployment, monitoring, and explainability for regulated ML environments.",
    tools: ["MLflow", "AWS SageMaker", "FastAPI", "Docker", "Airflow", "SHAP / LIME"],
  },
];

export const experience = [
  {
    company: "Capital One",
    industry: "Banking · Credit Risk & Fraud AI",
    role: "AI/ML Engineer — Consumer Banking, Credit Risk & Fraud AI",
    period: "Jun 2025 – Present",
    location: "United States",
    highlights: [
      "Developed credit-loss forecasting models (Scikit-learn, XGBoost, econometric regression), raising forecast stability by 16%.",
      "Built PyTorch fraud-detection components with Hugging Face Transformers and behavioral embeddings.",
      "Configured AWS SageMaker Pipelines, MLflow, and drift detection across 6 production ML workflows.",
    ],
    stack: ["Python", "PyTorch", "XGBoost", "AWS SageMaker", "MLflow", "SHAP", "FastAPI", "Docker"],
  },
  {
    company: "Verizon",
    industry: "Telecom · Consumer Analytics & AI",
    role: "Machine Learning Analyst — Consumer Analytics & AI",
    period: "Nov 2024 – May 2025",
    location: "Contract",
    highlights: [
      "Built postpaid churn models lifting retention model accuracy by 15%.",
      "Unified 500K+ call-detail records into reliable ML training datasets with PySpark and Databricks.",
      "Validated retention experiments with A/B testing and Bayesian inference.",
    ],
    stack: ["Python", "XGBoost", "Databricks", "PySpark", "MLflow", "A/B Testing"],
  },
  {
    company: "HCL Technologies",
    industry: "Healthcare · Insurance Analytics",
    role: "Data Scientist — Healthcare Insurance Analytics",
    period: "Feb 2022 – Aug 2023",
    location: "India",
    highlights: [
      "Developed patient readmission-risk models across 6 patient-risk segments.",
      "Built ARIMA/Prophet forecasting models, lowering average ER wait time by 18%.",
      "Applied SHAP explainability for HIPAA-aligned governance reviews.",
    ],
    stack: ["Python", "PyTorch", "PySpark", "SHAP", "ARIMA", "Prophet"],
  },
  {
    company: "Cognizant",
    industry: "Healthcare · Analytics & ML Support",
    role: "Programmer Analyst Trainee — Healthcare Analytics & ML Support",
    period: "Oct 2020 – Jan 2022",
    location: "India",
    highlights: [
      "Built CLV segmentation models with K-Means, increasing targeted enrollment by 14%.",
      "Shortened pharmacy analytics report prep from 3 weeks to 2 days.",
      "Sustained 99.9% SLA compliance with Airflow/Docker orchestration.",
    ],
    stack: ["R", "Python", "SQL", "K-Means", "Apache Airflow", "Docker"],
  },
];

export const projects = [
  {
    key: "object-tracking",
    title: "Real-Time Object Tracking Pipeline",
    description:
      "Production computer-vision pipeline for real-time multi-object detection and tracking, optimized for low-latency GPU inference.",
    metrics: [
      { label: "Inference latency", value: "<15ms" },
      { label: "Tracking accuracy", value: "93%" },
      { label: "Throughput", value: "60 FPS" },
    ],
    stack: ["PyTorch", "CUDA", "TensorRT", "OpenCV", "YOLO"],
  },
  {
    key: "rag-assistant",
    title: "Enterprise RAG Knowledge Assistant",
    description:
      "LangChain & FAISS-powered retrieval-augmented generation assistant that grounds every answer in enterprise source documents, with full MLflow evaluation tracking.",
    metrics: [
      { label: "Retrieval accuracy", value: "96.4%" },
      { label: "Query speed", value: "Sub-sec" },
      { label: "Eval tracking", value: "100%" },
    ],
    stack: ["LangChain", "FAISS", "LLMs", "FastAPI", "MLflow"],
  },
  {
    key: "claims-nlp",
    title: "NLP Claim Review & Communication Intelligence",
    description:
      "Fine-tuned BERT models with NER pipelines to auto-classify unstructured healthcare claim notes into clinical, billing, and eligibility categories.",
    metrics: [
      { label: "Categorization accuracy", value: "94.2%" },
      { label: "Review efficiency", value: "+40%" },
      { label: "Entity extraction", value: "Automated" },
    ],
    stack: ["PyTorch", "Hugging Face", "BERT", "NER"],
  },
];

export const skills = {
  "Languages & Core": ["Python", "SQL", "R", "PySpark", "Pandas", "NumPy"],
  "Machine Learning": ["Scikit-learn", "XGBoost", "Predictive Modeling", "Classification & Regression"],
  "Deep Learning & NLP": ["PyTorch", "TensorFlow", "Hugging Face", "BERT & Transformers", "NER & Embeddings"],
  "Generative AI & LLM": ["LangChain", "LlamaIndex", "RAG Pipelines", "Vector Search", "Prompt Engineering"],
  "MLOps & Serving": ["MLflow", "AWS SageMaker", "FastAPI", "Docker", "Apache Airflow"],
  "Explainability & Governance": ["SHAP", "LIME", "SR 11-7", "HIPAA", "ROC-AUC & PSI"],
};

export const education = {
  degree: "M.S. in Data Science",
  school: "University of New Haven",
  location: "West Haven, Connecticut",
  period: "Dec 2024",
};

export const certifications = [
  "Machine Learning Specialization — Coursera / DeepLearning.AI & Stanford",
  "AI and LLM Engineering — Coursera",
  "IBM AI Engineering Professional Certificate — Coursera / IBM",
  "Deep Learning Specialization — Coursera / DeepLearning.AI",
  "Generative AI with Large Language Models — Coursera / DeepLearning.AI & AWS",
  "Machine Learning with Python Professional Certificate — LinkedIn Learning",
];

export const tourSteps = [
  {
    id: "hero",
    label: "Welcome",
    voice:
      "Welcome to Vasu Mekala's AI and ML Portfolio! I am your AI assistant. Let's start the tour.",
  },
  {
    id: "about",
    label: "About & Specialization",
    voice:
      "Here you can see Vasu's core specializations: Deep Learning, Computer Vision, and LLM engineering.",
  },
  {
    id: "projects",
    label: "Featured Projects",
    voice:
      "These are Vasu's flagship AI and ML projects, including a real-time object tracking pipeline and an enterprise RAG knowledge assistant.",
  },
  {
    id: "skills",
    label: "Skills",
    voice:
      "This section covers Vasu's full technical toolkit, from PyTorch and CUDA to LangChain and AWS SageMaker.",
  },
  {
    id: "contact",
    label: "Contact",
    voice:
      "You've reached the end of the tour. Feel free to reach out to Vasu through the contact section or download the resume. Thanks for visiting!",
  },
];
