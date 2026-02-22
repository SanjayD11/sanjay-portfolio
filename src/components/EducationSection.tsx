import SectionReveal from "./SectionReveal";
import { GraduationCap } from "lucide-react";
import { useCountUp, useInView } from "@/hooks/useCountUp";

const education = [
  {
    title: "B.Tech CSE",
    institution: "Sri Manakula Vinayagar Engineering College",
    period: "2024–2028",
    prefix: "CGPA: ",
    numeric: 9.04,
    decimals: 2,
  },
  {
    title: "12th Standard",
    institution: "Higher Secondary",
    period: "",
    prefix: "",
    numeric: 95,
    decimals: 0,
    suffix: "%",
  },
  {
    title: "10th Standard",
    institution: "Secondary School",
    period: "",
    prefix: "",
    numeric: 93.2,
    decimals: 1,
    suffix: "%",
  },
];

function AnimatedScore({
  prefix,
  numeric,
  decimals,
  suffix,
  inView,
}: {
  prefix?: string;
  numeric: number;
  decimals: number;
  suffix?: string;
  inView: boolean;
}) {
  const count = useCountUp(numeric, decimals, inView, 1600);
  return (
    <>
      {prefix}
      {(count ?? 0).toFixed(decimals)}
      {suffix || ""}
    </>
  );
}

const EducationSection = () => {
  const [sectionRef, sectionInView] = useInView(0.15);

  return (
    <section className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Education</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Academic <span className="text-gradient-animated">Journey</span>
          </h2>
        </SectionReveal>

        <div ref={sectionRef} className="space-y-4">
          {education.map((edu, i) => (
            <SectionReveal key={edu.title} delay={i * 0.1}>
              <div className="glass rounded-2xl p-6 border border-border/50 group hover:border-primary/20 hover:-translate-y-0.5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:shadow-lg hover:shadow-primary/5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{edu.title}</h3>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    {edu.period && <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>}
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gradient tabular-nums">
                      <AnimatedScore
                        prefix={edu.prefix}
                        numeric={edu.numeric}
                        decimals={edu.decimals}
                        suffix={edu.suffix}
                        inView={sectionInView}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
