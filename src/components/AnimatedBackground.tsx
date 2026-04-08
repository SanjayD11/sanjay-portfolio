import { memo } from "react";

const codeSnippets = [
  { code: "public class Portfolio {}", x: "4%", y: "8%", dur: "22s", delay: "0s" },
  { code: 'System.out.println("Build > Talk");', x: "70%", y: "14%", dur: "25s", delay: "3s" },
  { code: "@RestController", x: "5%", y: "44%", dur: "18s", delay: "6s" },
  { code: "SELECT * FROM projects;", x: "7%", y: "70%", dur: "23s", delay: "1.5s" },
  { code: "const ai = new Model();", x: "67%", y: "54%", dur: "20s", delay: "4.5s" },
  { code: "import React from 'react';", x: "60%", y: "83%", dur: "24s", delay: "0.5s" },
];

const AnimatedBackground = memo(() => {
  return (
    <div
      className="fixed -inset-[50vh] pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    >
      {/* ── Animated diagonal background gradient ─────────────────────────── */}
      <div className="absolute inset-0 page-bg-gradient" />

      {/* ── Soft light bloom 1 — primary (top-left) ─────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "120vw", height: "120vw", maxWidth: 600, maxHeight: 600,
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 60%)",
          opacity: 0.12,
          top: "-10%", left: "-10%",
          animation: "bloom-drift-1 22s ease-in-out infinite",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
      />
      {/* ── Soft light bloom 2 — accent (bottom-right) ──────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "100vw", height: "100vw", maxWidth: 500, maxHeight: 500,
          background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 60%)",
          opacity: 0.1,
          bottom: "-10%", right: "-10%",
          animation: "bloom-drift-2 28s ease-in-out infinite",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
      />
      {/* ── Soft light bloom 3 — mixed (center) ─────────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: "80vw", height: "80vw", maxWidth: 400, maxHeight: 400,
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--accent)) 40%, transparent 70%)",
          opacity: 0.08,
          top: "40%", left: "45%",
          animation: "bloom-drift-3 35s ease-in-out infinite",
          transform: "translateZ(0)",
          willChange: "transform, opacity",
        }}
      />

      {/* ── Subtle grid pattern ──────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.035) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary) / 0.035) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating code snippets ────────────────────────────────────────── */}
      {codeSnippets.map((s, i) => (
        <span
          key={i}
          className="absolute font-mono text-[10px] select-none pointer-events-none hidden md:inline"
          style={{
            left: s.x,
            top: s.y,
            color: "hsl(var(--primary))",
            opacity: 0,
            animation: `bg-snippet-anim ${s.dur} ease-in-out ${s.delay} infinite`,
            transform: "translateZ(0)",
          }}
        >
          {s.code}
        </span>
      ))}
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";
export default AnimatedBackground;
