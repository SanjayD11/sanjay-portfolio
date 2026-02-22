import SectionReveal from "./SectionReveal";
import { Award, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import { useCountUp, useInView } from "@/hooks/useCountUp";

const stats = [
  { icon: GraduationCap, label: "CGPA", value: "9.04", numeric: 9.04, decimals: 2 },
  { icon: Briefcase, label: "Major Projects", value: "4+", numeric: 4, decimals: 0, suffix: "+" },
  { icon: Award, label: "Certifications", value: "9+", numeric: 9, decimals: 0, suffix: "+" },
  { icon: BookOpen, label: "Full Stack", value: "Trainee", numeric: null, decimals: 0 },
];

function AnimatedValue({
  numeric,
  decimals,
  suffix,
  fallback,
  inView,
}: {
  numeric: number | null;
  decimals: number;
  suffix?: string;
  fallback: string;
  inView: boolean;
}) {
  const count = useCountUp(numeric, decimals, inView);
  if (numeric === null) return <>{fallback}</>;
  return <>{(count ?? 0).toFixed(decimals)}{suffix || ""}</>;
}

const AboutSection = () => {
  const [gridRef, gridInView] = useInView(0.15);

  return (
    <section id="about" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">About Me</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Crafting <span className="text-gradient-animated">Digital Excellence</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12">
            Passionate B.Tech CSE student building scalable, automation-driven and AI-powered solutions.
            Strong foundation in Java, SQL and full-stack development with a deep focus on clean
            architecture and performance.
          </p>
        </SectionReveal>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={0.15 + i * 0.1}>
              <div
                className="glass glow-border rounded-2xl p-6 text-center border border-border/50 group hover:border-primary/20 hover:-translate-y-1 transition-[transform,border-color] duration-300 ease-out relative"
              >
                {/* Glass hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <stat.icon className="mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300 relative" size={24} />
                <div className="text-2xl md:text-3xl font-bold text-gradient-animated mb-1 relative tabular-nums">
                  <AnimatedValue
                    numeric={stat.numeric}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    fallback={stat.value}
                    inView={gridInView}
                  />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider relative">{stat.label}</div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
