import { ArrowDown, Download, Mail, Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import heroCoderImg from "@/assets/hero-coder.gif";

const roles = ["Logic-Driven Coder", "Java Developer", "Automation Builder", "AI Enthusiast"];
const techBadges = ["Java", "Python", "React", "SQL", "n8n", "AI"];

const HeroSection = ({ ready = true }: { ready?: boolean }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Only start entrance animations when parent signals ready
  useEffect(() => {
    if (ready && !visible) {
      requestAnimationFrame(() => setVisible(true));
    }
  }, [ready, visible]);

  useEffect(() => {
    const current = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayed(current.slice(0, displayed.length + 1));
          if (displayed.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayed(current.slice(0, displayed.length - 1));
          if (displayed.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] lg:min-h-screen flex items-center justify-center section-padding overflow-hidden"
    >
      <div
        className="max-w-5xl mx-auto z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) translateZ(0)" : "translateY(16px) translateZ(0)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Greeting */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) translateZ(0)" : "translateY(12px) translateZ(0)",
              transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s",
            }}
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs md:text-sm tracking-widest uppercase text-muted-foreground">
              Hello, I'm
            </span>
          </div>

          {/* Name with hover glow */}
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) translateZ(0)" : "translateY(20px) translateZ(0)",
              transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s, transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s",
            }}
          >
            <span className="text-gradient-animated hero-name-glow">Sanjay</span>{" "}
            <span className="text-foreground hero-name-glow">Dharmarajou</span>
          </h1>

          {/* Typing role */}
          <div
            className="h-8 md:h-10 mb-8 flex items-center justify-center lg:justify-start"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s",
            }}
          >
            <span className="text-lg md:text-xl text-muted-foreground font-mono">
              {"< "}
              {displayed}
              <span className="text-primary animate-pulse">|</span>
              {" />"}
            </span>
          </div>

          {/* Tech badges */}
          <div
            className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1) 0.65s",
            }}
          >
            {techBadges.map((badge) => (
              <span
                key={badge}
                className="px-4 py-1.5 rounded-full glass text-xs font-mono text-primary border border-primary/20 cursor-default tech-badge-hover"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap justify-center lg:justify-start gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) translateZ(0)" : "translateY(12px) translateZ(0)",
              transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1) 0.8s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.8s",
            }}
          >
            <a
              href="#projects"
              className="btn-shine px-8 py-3 rounded-full font-semibold text-sm text-primary-foreground hover:-translate-y-0.5 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                boxShadow: "0 4px 20px hsl(var(--primary) / 0.25)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects <ArrowDown size={14} />
              </span>
            </a>
            <a
              href="/Sanjay_D_Resume.pdf"
              download="Sanjay_D_Resume.pdf"
              className="btn-shine px-8 py-3 rounded-full glass text-foreground font-semibold text-sm border border-border/50 hover:border-primary/40 hover:-translate-y-0.5 transition-[transform,border-color] duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download size={14} /> Download Resume
              </span>
            </a>
            <a
              href="#contact"
              className="btn-shine px-8 py-3 rounded-full glass text-foreground font-semibold text-sm border border-border/50 hover:border-primary/40 hover:-translate-y-0.5 transition-[transform,border-color] duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Mail size={14} /> Contact Me
              </span>
            </a>
          </div>
        </div>

        {/* Hero illustration */}
        <div
          className="flex-shrink-0 hidden lg:block"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0) scale(1) translateZ(0)" : "translateX(30px) scale(0.98) translateZ(0)",
            transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        >
          <img
            src={heroCoderImg}
            alt="Developer coding illustration"
            className="w-[340px] xl:w-[400px] drop-shadow-2xl"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
            style={{ animation: "hero-float 5s ease-in-out infinite", containIntrinsicSize: "400px 400px", contentVisibility: "auto" }}
          />
        </div>
      </div>

      {/* Scroll indicator — perfectly centered */}
      <div
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1) 1s",
        }}
      >
        <div
          className="flex flex-col items-center gap-2"
          style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
        >
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground/50">Scroll</span>
          <ArrowDown size={16} className="text-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
