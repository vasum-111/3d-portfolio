import React from "react";
import {
  Sun,
  Moon,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Play,
  MousePointerClick,
  ChevronRight,
  X,
  Brain,
  ScanEye,
  Bot,
  Cog,
} from "lucide-react";
import {
  profile,
  specializations,
  projects,
  skills,
  tourSteps,
} from "../data/content.js";

const specIcons = {
  "deep-learning": Brain,
  "computer-vision": ScanEye,
  "llm-genai": Bot,
  mlops: Cog,
};

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
export function Header({ theme, onToggleTheme }) {
  return (
    <header className="content-layer sticky top-0 z-30 px-4 md:px-8 py-4">
      <div className="glass-card max-w-6xl mx-auto rounded-2xl px-5 py-3 flex items-center justify-between">
        <a href="#hero" className="font-bold text-lg tracking-tight">
          {profile.brand}
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#about" className="hover:text-accent-light dark:hover:text-accent-dark">About</a>
          <a href="#projects" className="hover:text-accent-light dark:hover:text-accent-dark">Projects</a>
          <a href="#skills" className="hover:text-accent-light dark:hover:text-accent-dark">Skills</a>
          <a href="#contact" className="hover:text-accent-light dark:hover:text-accent-dark">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle light and dark mode"
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-300/60 dark:border-slate-600/60 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={profile.resumeUrl}
            download
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-3.5 py-2 rounded-full bg-accent-light dark:bg-accent-dark text-white dark:text-slate-900 hover:opacity-90 transition"
          >
            <Download size={14} /> Resume
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero card with dual tour CTAs                                     */
/* ------------------------------------------------------------------ */
export function HeroCard({ onStartTour, onExploreIndependently }) {
  return (
    <section id="hero" className="content-layer min-h-[92vh] flex items-center px-4 md:px-8">
      <div className="glass-card max-w-xl rounded-3xl p-8 md:p-10 animate-fadeUp">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark mb-5">
          <Sparkles size={12} /> Available for AI/ML Engineer roles
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
          {profile.name}
        </h1>
        <p className="text-lg md:text-xl font-semibold text-accent-light dark:text-accent-dark mb-4">
          {profile.title}
        </p>
        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-7">
          {profile.bio}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onStartTour}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-light dark:bg-accent-dark text-white dark:text-slate-900 font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-accent-light/20"
          >
            <Play size={16} /> Start Guided 3D Tour
          </button>
          <button
            onClick={onExploreIndependently}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-400/50 dark:border-slate-500/50 font-semibold text-sm hover:bg-slate-200/40 dark:hover:bg-slate-700/40 transition"
          >
            <MousePointerClick size={16} /> Explore Independently
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-300/40 dark:border-slate-600/40">
          {profile.stats.map((s) => (
            <div key={s.label}>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About / Specialization cards                                      */
/* ------------------------------------------------------------------ */
export function AboutSection() {
  return (
    <section id="about" className="content-layer min-h-[85vh] flex items-center px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="glass-card inline-block rounded-2xl px-5 py-3 mb-6">
          <h2 className="text-2xl font-bold">Specialization</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {specializations.map((spec) => {
            const Icon = specIcons[spec.key] || Brain;
            return (
              <div
                key={spec.key}
                className="glass-card rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="w-11 h-11 rounded-xl bg-accent-light/10 dark:bg-accent-dark/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-accent-light dark:text-accent-dark" />
                </div>
                <h3 className="font-bold text-lg mb-1.5">{spec.title}</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
                  {spec.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {spec.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-500/10 text-slate-700 dark:text-slate-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured Projects — 3D tilt hover cards                           */
/* ------------------------------------------------------------------ */
function ProjectCard({ project }) {
  const cardRef = React.useRef(null);

  function handleMouseMove(e) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0px)";
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease-out" }}
      className="glass-card rounded-2xl p-6 will-change-transform"
    >
      <h3 className="font-bold text-lg mb-2">{project.title}</h3>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
        {project.description}
      </p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {project.metrics.map((m) => (
          <div key={m.label} className="text-center bg-slate-500/10 rounded-lg py-2">
            <div className="text-sm font-bold text-accent-light dark:text-accent-dark">
              {m.value}
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight mt-0.5">
              {m.label}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tool) => (
          <span
            key={tool}
            className="text-[11px] font-medium px-2 py-1 rounded-md bg-accent-light/10 dark:bg-accent-dark/10 text-accent-light dark:text-accent-dark"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="content-layer min-h-[85vh] flex items-center px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="glass-card inline-block rounded-2xl px-5 py-3 mb-6">
          <h2 className="text-2xl font-bold">Featured AI/ML Projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.key} project={p} />
          ))}
        </div>
        {projects[2] && (
          <div className="mt-6 grid sm:grid-cols-1">
            <ProjectCard project={projects[2]} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills                                                             */
/* ------------------------------------------------------------------ */
export function SkillsSection() {
  return (
    <section id="skills" className="content-layer min-h-[85vh] flex items-center px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto w-full">
        <div className="glass-card inline-block rounded-2xl px-5 py-3 mb-6">
          <h2 className="text-2xl font-bold">Skills</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold text-sm mb-3 text-accent-light dark:text-accent-dark">
                {category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] font-medium px-2 py-1 rounded-md bg-slate-500/10 text-slate-700 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact / Resume footer                                           */
/* ------------------------------------------------------------------ */
export function ContactSection() {
  return (
    <section id="contact" className="content-layer min-h-[70vh] flex items-center px-4 md:px-8 py-16">
      <div className="glass-card max-w-2xl mx-auto w-full rounded-3xl p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold mb-2">Let's build something intelligent</h2>
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-7">
          Open to AI/ML Engineer, LLM Engineer, MLOps Engineer, and Data Scientist roles.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-400/50 dark:border-slate-500/50 text-sm font-medium hover:bg-slate-200/40 dark:hover:bg-slate-700/40 transition"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-400/50 dark:border-slate-500/50 text-sm font-medium hover:bg-slate-200/40 dark:hover:bg-slate-700/40 transition"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-400/50 dark:border-slate-500/50 text-sm font-medium hover:bg-slate-200/40 dark:hover:bg-slate-700/40 transition"
          >
            <Mail size={16} /> Email
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-light dark:bg-accent-dark text-white dark:text-slate-900 text-sm font-semibold hover:opacity-90 transition"
          >
            <Download size={16} /> Resume PDF
          </a>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <MapPin size={12} /> {profile.location}
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-6">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating Tour HUD                                                 */
/* ------------------------------------------------------------------ */
export function TourHUD({ stepIndex, onNext, onExit }) {
  const step = tourSteps[stepIndex];
  const isLast = stepIndex >= tourSteps.length - 1;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 content-layer">
      <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-4 shadow-2xl">
        <div className="text-xs font-semibold whitespace-nowrap">
          Step {stepIndex + 1} / {tourSteps.length}
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-normal">
            {" "}
            — {step?.label}
          </span>
        </div>
        <button
          onClick={onNext}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-accent-light dark:bg-accent-dark text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition"
        >
          {isLast ? "Finish" : "Next"} <ChevronRight size={13} />
        </button>
        <button
          onClick={onExit}
          aria-label="Exit tour"
          className="w-7 h-7 rounded-full flex items-center justify-center border border-slate-400/50 dark:border-slate-500/50 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
