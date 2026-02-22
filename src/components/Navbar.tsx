import { Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState, useCallback, useRef, useLayoutEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navLinksRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // IntersectionObserver for scrollspy
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActive(best.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Pill position calculation
  const updatePill = useCallback(() => {
    const target = hovered ?? active;
    if (!target || !navLinksRef.current) {
      if (!active) setPillStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const containerRect = navLinksRef.current.getBoundingClientRect();
    const el = linkRefs.current.get(target);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPillStyle({
      left: rect.left - containerRect.left,
      width: rect.width,
      opacity: 1,
    });
  }, [hovered, active]);

  useLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    const handler = () => updatePill();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [updatePill]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 z-50 nav-glass rounded-full flex items-center gap-1 nav-capsule-shadow"
        style={{
          transform: `translateX(-50%) translateY(${mounted ? "0" : "-80px"})`,
          opacity: mounted ? 1 : 0,
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
          width: "auto",
          maxWidth: "min(92vw, 720px)",
          boxSizing: "border-box",
          padding: "0.25rem 0.5rem",
        }}
      >
        {/* Logo */}
        <a href="#" className="font-bold text-gradient text-sm md:text-lg px-1 shrink-0">SD</a>

        {/* GitHub & LinkedIn — always in capsule, right after SD */}
        <a
          href="https://github.com/SanjayD11"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="GitHub"
        >
          <Github size={15} />
        </a>
        <a
          href="https://www.linkedin.com/in/sanjay-d-354776353"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          aria-label="LinkedIn"
        >
          <Linkedin size={15} />
        </a>

        {/* Desktop links with sliding pill */}
        <div
          ref={navLinksRef}
          className="hidden md:flex items-center gap-1 relative ml-2"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Sliding pill background */}
          <span
            className="absolute inset-y-0 rounded-full pointer-events-none nav-pill-glow"
            style={{
              width: pillStyle.width,
              opacity: pillStyle.opacity,
              transform: `translateX(${pillStyle.left}px) translateZ(0)`,
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), width 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease",
              willChange: "transform",
            }}
            aria-hidden="true"
          />

          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            const isHovered = hovered === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  if (el) linkRefs.current.set(link.href.slice(1), el);
                }}
                onMouseEnter={() => setHovered(link.href.slice(1))}
                className="relative px-3 py-1.5 text-sm rounded-full z-10 select-none nav-link-hover"
                style={{
                  color:
                    isActive || isHovered
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground))",
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 0.25s ease, font-weight 0.2s ease",
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right side: theme toggle + hamburger */}
        <div className="flex items-center gap-0.5 ml-auto md:ml-2 shrink-0">
          <ThemeToggle />

          {/* Mobile hamburger — animated icon */}
          <button
            className="md:hidden flex items-center justify-center w-8 h-8 min-w-[32px] min-h-[32px] rounded-full text-foreground bg-primary/10 hover:bg-primary/20 active:scale-95 transition-[transform,background-color] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={{ zIndex: 60 }}
          >
            <span
              className="inline-flex transition-transform duration-300 ease-out"
              style={{
                transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </span>
          </button>
        </div>
      </nav>

      {/* ─── Mobile menu (always mounted, animated via CSS) ─── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 md:hidden"
        style={{
          zIndex: 45,
          background: "hsl(var(--background) / 0.5)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={closeMobile}
        aria-hidden="true"
      />

      {/* Dropdown panel */}
      <div
        className="fixed top-14 left-1/2 md:hidden mobile-menu-glass rounded-2xl p-3 flex flex-col gap-0.5"
        style={{
          zIndex: 55,
          width: "min(88vw, 300px)",
          transform: `translateX(-50%) translateY(${mobileOpen ? "0" : "-16px"})`,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
        }}
      >
        {links.map((link, i) => {
          const isActive = active === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className={`mobile-menu-link px-4 py-2.5 rounded-xl text-sm font-medium active:scale-[0.98] ${isActive
                ? "text-primary bg-primary/8 border-l-2 border-primary/60"
                : "text-foreground border-l-2 border-transparent hover:bg-secondary/40 hover:text-primary"
                }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 30}ms` : "0ms",
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
