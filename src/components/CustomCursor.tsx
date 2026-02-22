import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const pressed = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    ring.style.display = "block";
    dot.style.display = "block";

    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-hoverable]")) {
        hovering.current = true;
      }
    };

    const handleOut = () => {
      hovering.current = false;
    };

    const handleDown = () => { pressed.current = true; };
    const handleUp = () => { pressed.current = false; };

    const loop = () => {
      // Ring: fast lerp for snappy feel
      const ease = 0.22;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ease;

      // Dynamic ring size based on state
      const ringSize = pressed.current ? 28 : hovering.current ? 48 : 36;
      const ringOpacity = pressed.current ? 0.55 : hovering.current ? 0.4 : 0.25;
      const dotSize = pressed.current ? 5 : hovering.current ? 9 : 7;
      const rHalf = ringSize / 2;
      const dHalf = dotSize / 2;

      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.opacity = `${ringOpacity}`;
      ring.style.transform = `translate3d(${ringPos.current.x - rHalf}px, ${ringPos.current.y - rHalf}px, 0)`;

      // Dot: instant — zero lag
      dot.style.width = `${dotSize}px`;
      dot.style.height = `${dotSize}px`;
      dot.style.transform = `translate3d(${pos.current.x - dHalf}px, ${pos.current.y - dHalf}px, 0)`;

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
      {/* Ring — follows with smooth ease */}
      <div
        ref={ringRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          pointerEvents: "none",
          width: 36,
          height: 36,
          opacity: 0.25,
          borderRadius: "50%",
          border: "1.5px solid hsl(var(--primary) / 0.35)",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* Dot — instant, precise */}
      <div
        ref={dotRef}
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 10000,
          pointerEvents: "none",
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "hsl(var(--primary))",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.45)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
