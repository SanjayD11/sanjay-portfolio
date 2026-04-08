import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Maximize2, ExternalLinkIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export interface ProjectDetail {
  title: string;
  subtitle: string;
  tech: string[];
  link: string;
  overview: string;
  problem: string;
  features: string[];
  challenges: string[];
  performance: string[];
  diagram: React.ReactNode;
}

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, onClose }: Props) => {
  const diagramContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const openDiagramInNewTab = () => {
    if (!diagramContainerRef.current) return;
    const svgEl = diagramContainerRef.current.querySelector("svg");
    if (!svgEl) return;
    
    // Ensure xmlns is present for standalone rendering
    if (!svgEl.getAttribute("xmlns")) {
      svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    
    let svgData = new XMLSerializer().serializeToString(svgEl);
    
    // The SVGs use CSS variables (hsl(var(--primary))). A standalone blob viewer drops inheritance.
    // We dynamically grab the exact current mode colors and embed them as a raw style element.
    const rootStyles = getComputedStyle(document.documentElement);
    const cssVars = ['--card', '--border', '--accent', '--foreground', '--muted-foreground', '--primary', '--background']
      .map(v => `${v}: ${rootStyles.getPropertyValue(v).trim()};`)
      .join(' ');
      
    const styleInjection = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600');
        :root { ${cssVars} }
        svg { 
          background-color: hsl(var(--card) / 0.1); 
          font-family: 'Space Grotesk', sans-serif;
        }
      </style>
    `;
    
    // Safely inject right after the opening <svg> tag
    svgData = svgData.replace(/(<svg[^>]*>)/i, `$1${styleInjection}`);

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    
    // Open in a new tab
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.document.title = `${project?.title || 'Architecture'} Diagram`;
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      <AnimatePresence>
        {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto py-8 px-4"
          style={{ background: "hsl(var(--background) / 0.8)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-3xl glass-strong rounded-2xl p-6 sm:p-8 my-auto"
            style={{ willChange: "transform, opacity" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{project.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{project.subtitle}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-secondary/80 text-xs text-muted-foreground border border-border/30">
                  {t}
                </span>
              ))}
            </div>

            {/* Sections */}
            <div className="space-y-6 text-sm">
              <Section title="Overview" content={project.overview} />
              <Section title="Problem Statement" content={project.problem} />

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Key Features</h3>
                <ul className="space-y-1.5">
                  {project.features.map((f, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5 shrink-0">▹</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Diagram */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-foreground">Architecture</h3>
                  <button 
                    onClick={openDiagramInNewTab}
                    title="Open diagram as image in a new tab"
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <ExternalLinkIcon size={12} /> Open Image
                  </button>
                </div>
                <div ref={diagramContainerRef} className="overflow-x-auto overflow-y-hidden">
                  {project.diagram}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Challenges</h3>
                <ul className="space-y-1.5">
                  {project.challenges.map((c, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5 shrink-0">•</span> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Performance Highlights</h3>
                <ul className="space-y-1.5">
                  {project.performance.map((p, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5 shrink-0">⚡</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex gap-3 flex-wrap">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Github size={14} /> View on GitHub <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

const Section = ({ title, content }: { title: string; content: string }) => (
  <div>
    <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{content}</p>
  </div>
);

export default ProjectDetailModal;
