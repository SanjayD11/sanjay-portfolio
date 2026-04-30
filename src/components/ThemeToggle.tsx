import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "light" | "dark" | "system";

const icons = { light: Sun, dark: Moon, system: Monitor };
const order: Theme[] = ["light", "dark", "system"];

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as Theme) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
      localStorage.setItem("theme", "system");
      (window as any).__setFavicon?.(prefersDark);

      const handler = (e: MediaQueryListEvent) => {
        root.classList.toggle("dark", e.matches);
        (window as any).__setFavicon?.(e.matches);
      };
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      root.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
      (window as any).__setFavicon?.(theme === "dark");
    }
  }, [theme]);

  const cycle = () => {
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const Icon = icons[theme];

  return (
    <button
      onClick={cycle}
      title={`Theme: ${theme}`}
      style={{
        /*
         * FIX: Replaced Framer Motion whileHover (scale+rotate) with CSS-only
         * transitions. The rotate: 5 on a fixed element inside the navbar was
         * causing sub-pixel GPU layer conflicts, producing left-to-right stutter.
         * Pure CSS transitions run on the compositor thread with zero jank.
         */
        padding: "0.5rem",
        borderRadius: "9999px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "hsl(var(--muted-foreground))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        // Stable resting layer — prevents position shift when hover promotes it
        transform: "translateZ(0)",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "hsl(var(--secondary) / 0.5)";
        (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--foreground))";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateZ(0)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
        (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--muted-foreground))";
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateZ(0)";
      }}
      onMouseDown={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.92) translateZ(0)";
      }}
      onMouseUp={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08) translateZ(0)";
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Icon size={16} />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
