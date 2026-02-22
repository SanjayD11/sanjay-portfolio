import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const state = useRef<"idle" | "hover" | "press">("idle");

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    ring.style.display = "block";
    dot.style.display = "block";

    // State-driven class changes (CSS transitions handle size/opacity)
    const applyState = (s: "idle" | "hover" | "press") => {
      if (state.current === s) return;
      state.current = s;
      ring.dataset.state = s;
      dot.dataset.state = s;
    };

    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-hoverable]")) {
        if (state.current !== "press") applyState("hover");
      }
    };

    const handleOut = () => {
      if (state.current !== "press") applyState("idle");
    };

    const handleDown = () => applyState("press");
    const handleUp = () => applyState("idle");

    // rAF loop — ONLY updates transform (GPU-only, zero layout cost)
    const loop = () => {
      const ease = 0.22;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <>
      {/* Ring — follows with smooth ease, size/opacity via CSS transitions */}
      <div
        ref={ringRef}
        className="cursor-ring"
        data-state="idle"
      />
      {/* Dot — instant, precise */}
      <div
        ref={dotRef}
        className="cursor-dot"
        data-state="idle"
      />
    </>
  );
};

export default CustomCursor;
