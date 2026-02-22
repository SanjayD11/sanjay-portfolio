import { useState, useCallback } from "react";
import SectionReveal from "./SectionReveal";
import { ExternalLink, Github, Star, Chrome, Eye } from "lucide-react";
import ProjectDetailModal, { type ProjectDetail } from "./ProjectDetailModal";
import { ResumeLensDiagram, NourishNetDiagram, StudyPulseDiagram, IntelliVoxDiagram } from "./ArchitectureDiagrams";

/* ── Project data with detail info ──────────────────────────────────────── */

const featuredDetail: ProjectDetail = {
  title: "NourishNet",
  subtitle: "Free Food Sharing Platform",
  tech: ["React", "TypeScript", "Supabase"],
  link: "https://github.com/SanjayD11/NourishNet",
  overview: "A community-driven platform connecting food donors with those in need, enabling real-time food sharing with full authentication, request management, and user ratings.",
  problem: "Food waste remains a critical issue while many people lack access to meals. NourishNet bridges this gap by providing a seamless digital platform for food redistribution.",
  features: [
    "Full authentication system with role-based access (Donor/Requester)",
    "Real-time database for food listings & requests via Supabase",
    "Request management with status tracking and notifications",
    "User rating system for trust and accountability",
    "Responsive UI built with React and TypeScript",
  ],
  challenges: [
    "Implementing real-time subscriptions for live status updates",
    "Designing role-based access control with Row Level Security",
    "Optimizing query performance for large food listing datasets",
  ],
  performance: [
    "Sub-200ms database query response times",
    "Real-time updates with zero polling overhead",
    "Lighthouse performance score > 90",
  ],
  diagram: <NourishNetDiagram />,
};

const projectDetails: ProjectDetail[] = [
  {
    title: "ResumeLens-AI",
    subtitle: "AI-Powered Resume Analyzer",
    tech: ["Python", "Streamlit", "Groq API", "LLaMA 3.3 (70B)", "PyPDF2", "ReportLab", "NLP", "Machine Learning"],
    link: "https://github.com/SanjayD11/ResumeLens-AI",
    overview: "An intelligent resume analysis platform powered by LLaMA 3.3 (70B) via Groq API. The system extracts skills, evaluates ATS compatibility, computes readability scores, and generates actionable improvement suggestions through an interactive Streamlit interface.",
    problem: "Job seekers often struggle to optimize resumes for Applicant Tracking Systems (ATS). ResumeLens-AI automates resume evaluation using high-performance cloud-based LLM inference via Groq API, delivering accurate skill extraction, ATS scoring, and contextual feedback at scale.",
    features: [
      "PDF resume parsing using PyPDF2",
      "Skill extraction powered by LLaMA 3.3 (Groq API – llama-3.3-70b-versatile)",
      "Custom ATS compatibility scoring engine",
      "Readability and content quality analysis",
      "Context-aware improvement suggestions",
      "Professional PDF report generation using ReportLab",
    ],
    challenges: [
      "Leveraging Groq API for high-performance cloud LLM inference",
      "Accurate skill extraction across varied resume formats",
      "Generating meaningful ATS scores without proprietary ATS access",
    ],
    performance: [
      "High-performance cloud inference via Groq API",
      "Full analysis completed in under 10 seconds",
      "Supports multi-page resume parsing",
    ],
    diagram: <ResumeLensDiagram />,
  },
  {
    title: "StudyPulse",
    subtitle: "Online Learning Motivation Platform",
    tech: ["React", "TypeScript", "Supabase", "Chrome Extension"],
    link: "https://github.com/SanjayD11",
    overview: "A comprehensive learning platform with Pomodoro timers, focus tracking via Chrome extension, AI-generated quizzes, and role-based dashboards for students, teachers, and admins.",
    problem: "Online learners lack accountability and focus tools. StudyPulse combines browser-level focus tracking with a full learning management platform.",
    features: [
      "Pomodoro timer with real-time study tracking",
      "Chrome extension for tab-switch detection and website blocking",
      "AI-generated quizzes and assignments",
      "Student, Teacher, and Admin dashboards",
      "Real-time messaging and notifications",
    ],
    challenges: [
      "Chrome extension ↔ web app data synchronization",
      "Role-based access for three distinct user types",
      "Real-time classroom collaboration features",
    ],
    performance: [
      "Extension syncs focus data with minimal battery impact",
      "Real-time updates across all dashboards",
      "Optimized file storage for assignments",
    ],
    diagram: <StudyPulseDiagram />,
  },
  {
    title: "IntelliVox",
    subtitle: "Context-Aware Voice Intelligence",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "AI APIs"],
    link: "https://github.com/SanjayD11/IntelliVox-Context-Aware-Voice-intelligence",
    overview: "A real-time AI chat platform with streaming responses, automatic API failover between Groq and Pollinations, and full conversation history persistence.",
    problem: "Existing AI chat tools lack failover mechanisms and real-time streaming. IntelliVox provides resilient, fast AI conversations with usage analytics.",
    features: [
      "Real-time chat with streaming AI responses",
      "Dual API support: Groq (primary) + Pollinations (fallback)",
      "Automatic failover for high availability",
      "Conversation history with Supabase persistence",
      "Usage analytics dashboard",
    ],
    challenges: [
      "Implementing seamless failover between AI providers",
      "Streaming response rendering without UI jank",
      "Efficient conversation storage and retrieval",
    ],
    performance: [
      "First token in < 500ms via Groq API",
      "Zero-downtime failover to backup provider",
      "Accessibility-focused responsive design",
    ],
    diagram: <IntelliVoxDiagram />,
  },
];

/* ── Card data (minimal for listing) ────────────────────────────────────── */

const featured = {
  title: "NourishNet",
  subtitle: "Free Food Sharing Platform",
  tech: ["React", "TypeScript", "Supabase"],
  link: "https://github.com/SanjayD11/NourishNet",
  points: [
    "Full authentication system with role-based access",
    "Real-time database for food listings & requests",
    "Request management with status tracking",
    "Notification system & user ratings",
  ],
};

const projects = [
  {
    title: "ResumeLens-AI",
    subtitle: "AI-Powered Resume Analyzer",
    tech: ["Python", "Streamlit", "Groq API", "LLaMA 3.3 (70B)"],
    icon: null,
    link: "https://github.com/SanjayD11/ResumeLens-AI",
    points: [
      "Extracts skills & keywords using LLaMA 3.3 via Groq API",
      "Provides ATS compatibility score",
      "Context-aware improvement suggestions",
      "Professional PDF report generation",
    ],
  },
  {
    title: "StudyPulse",
    subtitle: "Online Learning Motivation Platform",
    tech: ["React", "TypeScript", "Supabase", "Chrome Extension"],
    icon: Chrome,
    link: "https://github.com/SanjayD11",
    points: [
      "Pomodoro timer & real-time study tracking",
      "Tab-switch detection & website blocking",
      "AI-generated quizzes & assignments",
      "Student, Teacher & Admin dashboards",
    ],
  },
  {
    title: "IntelliVox",
    subtitle: "Context-Aware Voice Intelligence",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase", "AI APIs"],
    icon: null,
    link: "https://github.com/SanjayD11/IntelliVox-Context-Aware-Voice-intelligence",
    points: [
      "Speech recognition & AI voice response",
      "Supabase PostgreSQL backend",
      "Accessibility-focused design",
    ],
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const openDetail = useCallback((title: string) => {
    if (title === "NourishNet") {
      setSelectedProject(featuredDetail);
    } else {
      const detail = projectDetails.find((d) => d.title === title);
      if (detail) setSelectedProject(detail);
    }
  }, []);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Projects</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Featured <span className="text-gradient-animated">Work</span>
          </h2>
        </SectionReveal>

        {/* Featured - NourishNet */}
        <SectionReveal delay={0.1}>
          <div
            className="glass rounded-2xl p-6 sm:p-8 mb-8 relative border border-primary/15 group hover:-translate-y-1.5 hover:shadow-[0_20px_50px_hsl(var(--primary)/0.1)] transition-[transform,box-shadow,border-color] duration-300 ease-out"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div
              className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary animate-pulse"
            >
              <Star size={12} /> Featured
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1 relative">{featured.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 relative">{featured.subtitle}</p>
            <div className="flex flex-wrap gap-2 mb-4 relative">
              {featured.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-secondary/80 text-xs text-muted-foreground border border-border/30">
                  {t}
                </span>
              ))}
            </div>
            <ul className="space-y-2 mb-6 relative">
              {featured.points.map((p) => (
                <li key={p} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span className="text-primary mt-0.5">▹</span> {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 relative">
              <button
                onClick={() => openDetail("NourishNet")}
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-[transform,background-color] duration-200"
              >
                <Eye size={14} /> Explore Project
              </button>
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-105 active:scale-95 transition-[transform,color,border-color] duration-200"
              >
                <Github size={14} /> GitHub <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </SectionReveal>

        {/* Other projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <SectionReveal key={project.title} delay={0.15 + i * 0.1}>
              <div
                className="glass rounded-2xl p-5 sm:p-6 h-full flex flex-col border border-border/50 group hover:border-primary/20 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_hsl(var(--primary)/0.08)] transition-[transform,box-shadow,border-color] duration-300 ease-out relative"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center gap-2 mb-1 relative">
                  {project.icon && <project.icon size={18} className="text-primary" />}
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 relative">{project.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-4 relative">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-full bg-secondary/80 text-[11px] text-muted-foreground border border-border/30">
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-1.5 mb-6 flex-1 relative">
                  {project.points.map((p) => (
                    <li key={p} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">▹</span> {p}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-3 relative">
                  <button
                    onClick={() => openDetail(project.title)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent hover:translate-x-1 transition-[transform,color] duration-200"
                  >
                    <Eye size={14} /> Explore
                  </button>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 transition-[transform,color] duration-200"
                  >
                    <Github size={14} /> GitHub <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default ProjectsSection;
