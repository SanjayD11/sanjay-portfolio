import SectionReveal from "./SectionReveal";
import Keyword from "./Keyword";
import { Code2, Database, Globe, Cpu, Layers } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Programming & Problem Solving",
    body: (
      <>
        Strong foundation in <Keyword>Java</Keyword> (primary language), with solid <Keyword>Python</Keyword> and <Keyword>C</Keyword> experience.
        Skilled in writing clean, efficient code with <Keyword>OOP</Keyword> and <Keyword>DSA</Keyword> principles.
      </>
    ),
  },
  {
    icon: Database,
    title: "Database Expertise",
    body: (
      <>
        Proficient in <Keyword>MySQL</Keyword> and <Keyword>Oracle SQL</Keyword>.
        Skilled in relational design, query optimization, and <Keyword>Supabase</Keyword> integration.
      </>
    ),
  },
  {
    icon: Globe,
    title: "Web Development",
    body: (
      <>
        Frontend skills in <Keyword>HTML</Keyword>, <Keyword>CSS</Keyword>, <Keyword>JavaScript</Keyword>, <Keyword>React</Keyword>, <Keyword>TypeScript</Keyword>, <Keyword>Bootstrap</Keyword>, <Keyword>Tailwind CSS</Keyword>, <Keyword>shadcn-ui</Keyword>.
        Focus on responsive, user-centric design and clean architecture.
      </>
    ),
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    body: (
      <>
        Practical experience with <Keyword>n8n</Keyword> workflow automation for building complex automated pipelines.
        Skilled in <Keyword>API integrations</Keyword>, intelligent data processing, and experimenting with <Keyword>NLP/ML</Keyword> models.
        Built projects like <Keyword>ResumeLens-AI</Keyword> and <Keyword>IntelliVox</Keyword> showcasing intelligent automation.
      </>
    ),
  },
  {
    icon: Layers,
    title: "Software Engineering Concepts",
    body: (
      <>
        Deep understanding of <Keyword>SDLC</Keyword>, <Keyword>Operating Systems</Keyword>, and modular design principles.
        Applying <Keyword>SOLID</Keyword> principles for maintainable and scalable codebases.
      </>
    ),
  },
];

const TechnicalExcellenceSection = () => (
  <section className="section-padding">
    <div className="max-w-5xl mx-auto">
      <SectionReveal>
        <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Expertise</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Technical <span className="text-gradient-animated">Excellence</span> at a Glance
        </h2>
      </SectionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <SectionReveal key={item.title} delay={i * 0.08}>
            <div
              className="glass rounded-2xl p-6 h-full border border-border/50 group relative"
              style={{
                transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px hsl(var(--primary) / 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Hover overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  transition: "opacity 0.2s ease",
                  background: "linear-gradient(135deg, hsl(var(--primary) / 0.05), hsl(var(--accent) / 0.03), transparent 60%)",
                }}
              />

              <div className="flex items-center gap-3 mb-3 relative">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <item.icon size={20} />
                </div>
                <h3
                  className="text-base font-semibold text-foreground group-hover:text-primary"
                  style={{ transition: "color 0.2s ease" }}
                >
                  {item.title}
                </h3>
              </div>

              <div className="h-px w-full bg-accent/15 mb-3 relative" />

              <p className="text-sm text-muted-foreground leading-relaxed relative">
                {item.body}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default TechnicalExcellenceSection;
