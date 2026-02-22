import { useEffect, useRef, useState } from "react";

/**
 * Shared hook: smoothly counts from 0 → target using easeOutExpo.
 * Fires only when `start` becomes true (driven by IntersectionObserver).
 * Uses requestAnimationFrame for buttery 60fps rendering.
 */
export function useCountUp(
    target: number | null,
    decimals: number,
    start: boolean,
    duration = 1400
) {
    const [value, setValue] = useState<number | null>(target === null ? null : 0);
    const rafRef = useRef(0);

    useEffect(() => {
        if (!start || target === null) return;

        const t0 = performance.now();
        const tick = (now: number) => {
            const elapsed = now - t0;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutExpo — fast start, smooth deceleration
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setValue(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [start, target, decimals, duration]);

    return value;
}

/**
 * Shared hook: fires once when element scrolls into view.
 * Returns [ref callback, inView boolean].
 * 
 * Uses a ref callback that triggers observation when the DOM node is attached.
 */
export function useInView(threshold = 0.2) {
    const [inView, setInView] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);

    // Create observer once
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observerRef.current?.disconnect();
                }
            },
            { threshold }
        );

        // If node was already set before this effect ran, observe it
        if (nodeRef.current) {
            observerRef.current.observe(nodeRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [threshold]);

    // Callback ref — called when React attaches/detaches the DOM node
    const setRef = (node: HTMLDivElement | null) => {
        // Stop observing old node
        if (nodeRef.current && observerRef.current) {
            observerRef.current.unobserve(nodeRef.current);
        }
        nodeRef.current = node;
        // Start observing new node
        if (node && observerRef.current) {
            observerRef.current.observe(node);
        }
    };

    return [setRef, inView] as const;
}
