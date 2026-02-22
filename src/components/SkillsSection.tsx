import { useRef, useEffect, useState } from "react";
import SectionReveal from "./SectionReveal";
import { Code2, Globe, Database, Wrench, BookOpen } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    skills: [
      { name: "Java", level: 85 },
      { name: "Python", level: 80 },
      { name: "C", level: 70 },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "Bootstrap", level: 75 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "MySQL", level: 80 },
      { name: "Oracle SQL", level: 70 },
      { name: "Supabase", level: 65 },
    ],
  },
  {
    title: "Tools & Frameworks",
    icon: Wrench,
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Eclipse", level: 70 },
      { name: "n8n", level: 60 },
      { name: "Tailwind CSS", level: 80 },
      { name: "shadcn-ui", level: 75 },
    ],
  },
  {
    title: "Concepts",
    icon: BookOpen,
    skills: [
      { name: "OOP", level: 85 },
      { name: "Data Structures", level: 80 },
      { name: "Algorithms", level: 75 },
      { name: "SDLC", level: 70 },
      { name: "Operating Systems", level: 70 },
    ],
  },
];

/* CSS-only skill bar — no framer-motion, no per-bar IntersectionObserver */
const SkillBar = ({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-foreground">{skill.name}</span>
      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-secondary/80 overflow-hidden">
      <div
        className="h-full rounded-full origin-left"
        style={{
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
          boxShadow: "0 0 8px hsl(var(--primary) / 0.2)",
          transform: inView ? `scaleX(${skill.level / 100})` : "scaleX(0)",
          opacity: inView ? 1 : 0.6,
          transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.08}s, opacity 0.5s ease ${index * 0.08}s`,
        }}
      />
    </div>
  </div>
);

const SkillCard = ({ group, gi }: { group: typeof skillGroups[0]; gi: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionReveal delay={gi * 0.08}>
      <div
        ref={ref}
        className="glass rounded-2xl p-6 h-full border border-border/50 group hover:border-primary/20 hover:-translate-y-1 transition-[transform,border-color] duration-300 ease-out relative"
      >
        {/* Subtle glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200"
          style={{
            background: "linear-gradient(135deg, hsl(var(--primary) / 0.06), hsl(var(--accent) / 0.04), transparent 60%)",
          }}
        />

        <div className="flex items-center gap-3 mb-1.5 relative">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <group.icon size={20} />
          </div>
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {group.title}
          </h3>
        </div>

        {/* Separator */}
        <div className="h-px w-full bg-accent/15 mb-4 relative" />

        <div className="space-y-3 relative">
          {group.skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </SectionReveal>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Skills</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            My <span className="text-gradient-animated">Tech Arsenal</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <SkillCard key={group.title} group={group} gi={gi} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
