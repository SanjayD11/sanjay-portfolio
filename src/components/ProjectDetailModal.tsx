import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Maximize2 } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [isFullscreenDiagram, setIsFullscreenDiagram] = useState(false);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsFullscreenDiagram(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

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
                    onClick={() => setIsFullscreenDiagram(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Maximize2 size={12} /> View Full
                  </button>
                </div>
                <div className="overflow-x-auto overflow-y-hidden">{project.diagram}</div>
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

    {/* Fullscreen Diagram Overlay */}
    <AnimatePresence>
      {isFullscreenDiagram && project && (
        <motion.div
          key="fullscreen-diagram"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-6"
          style={{ background: "hsl(var(--background) / 0.95)", backdropFilter: "blur(24px)", willChange: "opacity, transform" }}
        >
          <div 
            className="relative w-full h-full max-w-[95vw] sm:max-w-7xl max-h-screen flex flex-col glass-strong shadow-2xl border border-border/40 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-border/20 bg-background/80 z-10 backdrop-blur-md">
              <div>
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Maximize2 size={16} className="text-primary" /> {project.title} Architecture
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">Scroll to explore details</p>
              </div>
              <button
                onClick={() => setIsFullscreenDiagram(false)}
                className="p-2 sm:px-4 sm:py-2 flex items-center gap-2 rounded-full bg-secondary/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <span className="hidden sm:inline font-medium text-sm">Close Viewer</span>
                <X size={20} />
              </button>
            </div>
            
            {/* Scrollable Diagram Canvas */}
            <div 
              className="flex-1 overflow-auto bg-background/50 relative" 
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <div className="w-max h-max min-w-[1200px] lg:min-w-[1400px] min-h-[700px] flex items-center justify-center mx-auto p-8 sm:p-16 relative">
                {project.diagram}
              </div>
            </div>
          </div>
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
