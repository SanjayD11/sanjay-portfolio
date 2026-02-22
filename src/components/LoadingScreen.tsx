import { useState, useEffect, useRef } from "react";

/**
 * Premium loading screen — ZERO framer-motion.
 * All animations are pure CSS (GPU-only: transform + opacity).
 * Progress bar uses transform: scaleX() instead of width (no reflow).
 * Ambient glow uses 60px blur (not 120px).
 * Exit is a pure CSS opacity + scale transition.
 */
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 2200; // total loading time in ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      // Ease-out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased}) translateZ(0)`;
      }

      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Start exit transition
        setExiting(true);
        setTimeout(() => onCompleteRef.current(), 500);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.03) translateZ(0)" : "scale(1) translateZ(0)",
        transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Ambient glow — reduced blur for performance */}
      <div
        className="absolute rounded-full"
        style={{
          width: 350,
          height: 350,
          background: "hsl(var(--primary))",
          opacity: 0.15,
          filter: "blur(60px)",
          animation: "loading-glow 3s ease-in-out infinite",
          transform: "translateZ(0)",
        }}
      />

      {/* Name animation — staggered CSS entrance */}
      <div className="relative z-10 mb-12">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
          <span
            className="text-gradient-animated inline-block loading-name-enter"
            style={{ animationDelay: "0.15s" }}
          >
            Sanjay
          </span>{" "}
          <span
            className="text-gradient-animated inline-block loading-name-enter"
            style={{ animationDelay: "0.35s" }}
          >
            D
          </span>
        </h1>
        <p
          className="text-sm text-muted-foreground tracking-[0.3em] uppercase text-center mt-3 loading-name-enter"
          style={{ animationDelay: "0.55s" }}
        >
          Portfolio Loading
        </p>
      </div>

      {/* Progress bar — scaleX instead of width */}
      <div
        className="relative z-10 w-64 sm:w-80 loading-name-enter"
        style={{ animationDelay: "0.4s" }}
      >
        <div className="h-1 rounded-full bg-secondary overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full loading-bar-gradient"
            style={{
              transformOrigin: "left center",
              transform: "scaleX(0) translateZ(0)",
              transition: "none", // driven by rAF
            }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs text-muted-foreground font-mono">{progress}%</span>
          <span
            className="text-xs text-gradient-animated font-mono"
            style={{ animation: "loading-dots 1.5s ease-in-out infinite" }}
          >
            loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
