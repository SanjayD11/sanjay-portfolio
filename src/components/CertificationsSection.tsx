import SectionReveal from "./SectionReveal";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";

const certs = [
  { title: "Joy of Computing using Python", org: "NPTEL", badge: "Elite", tags: ["Python", "Problem Solving"], link: "https://drive.google.com/file/d/1zj1VYgL0aPff7k78cWB6ha1hNckHnC0U/view", linkLabel: "View Certificate" },
  { title: "Python for Data Science", org: "NPTEL", badge: "Elite", tags: ["Python", "Data Science"], link: "https://drive.google.com/file/d/1WQ_OmbBvRALA7t1nCLfmdnMsXBAMOBpM/view", linkLabel: "View Certificate" },
  { title: "Machine Learning Foundation Certification", org: "Infosys", badge: "", tags: ["Machine Learning", "AI"], link: "https://drive.google.com/file/d/1HbJQ-ouqfcahr3oBLlBdj5IMkJRSRjQ9/view", linkLabel: "View Certificate" },
  { title: "MySQL Bootcamp", org: "Udemy", badge: "", tags: ["MySQL", "Database"], link: "https://www.udemy.com/certificate/UC-62fc0443-8f1a-4dcd-8ecd-55b84cebad32/", linkLabel: "View Certificate" },
  { title: "Build a Free Website with WordPress", org: "Coursera", badge: "", tags: ["WordPress", "Web Development"], link: "https://www.coursera.org/account/accomplishments/verify/X8YTXCGBELEQ", linkLabel: "View Certificate" },
  { title: "AWS Academy Graduate – Cloud Foundations", org: "AWS Academy", badge: "", tags: ["AWS", "Cloud"], link: "https://www.credly.com/badges/a8080ee5-de87-4c53-b04e-174bf00b6aaa/public_url", linkLabel: "Verify Badge" },
  { title: "AWS Academy Graduate – Cloud Architecting", org: "AWS Academy", badge: "", tags: ["AWS", "Cloud Architecture"], link: "https://www.credly.com/badges/5c7710ea-fe28-4f03-b979-a32760531885/public_url", linkLabel: "Verify Badge" },
  { title: "CCNA – Switching & Routing", org: "Cisco", badge: "", tags: ["Networking", "CCNA"], link: "https://www.credly.com/badges/d3f1ffaa-fc4f-4083-a8d4-7a7242e80903/public_url", linkLabel: "Verify Badge" },
  { title: "C Advanced", org: "Cisco Networking Academy", badge: "", tags: ["C", "Programming"], link: "https://www.credly.com/badges/c3581ee4-e51b-4c31-8a89-24ffe1566be7/public_url", linkLabel: "Verify Badge" },
];

const CertificationsSection = () => {
  return (
    <section id="certifications" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Certifications</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-14">
            <span className="text-gradient-animated">Achievements</span>
          </h2>
        </SectionReveal>

        <div className="relative">
          {/* Timeline line — animated gradient pulse */}
          <div className="absolute left-5 top-0 bottom-0 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-accent/40 to-primary/10" />
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent"
              style={{
                backgroundSize: "100% 200%",
                animation: "timeline-pulse 4s ease-in-out infinite",
              }}
            />
          </div>

          <div className="space-y-4">
            {certs.map((cert, i) => (
              <SectionReveal key={cert.title} delay={i * 0.06}>
                <div className="cert-card flex items-start gap-5 pl-14 relative group cursor-default">
                  {/* Timeline dot — pure CSS animated */}
                  <div
                    className="cert-dot absolute left-[10px] top-3 w-[18px] h-[18px] rounded-full border-2 border-primary/60 bg-background transition-all duration-400 ease-out group-hover:border-primary group-hover:bg-primary/15 group-hover:shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {/* Inner pulse dot */}
                    <div className="absolute inset-[4px] rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors duration-300" />
                  </div>

                  {/* Card */}
                  <div className="cert-card-inner glass rounded-xl p-5 flex-1 border border-border/40 transition-all duration-300 ease-out group-hover:border-primary/25 group-hover:shadow-[0_4px_24px_-4px_hsl(var(--primary)/0.12)] group-hover:-translate-y-[2px]">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors duration-300">
                          <Award size={14} className="text-primary" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground tracking-wide">{cert.org}</span>
                      </div>
                      {cert.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/12 text-primary text-[10px] font-bold tracking-wider uppercase border border-primary/15">
                          {cert.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground text-[15px] leading-snug mb-2.5 group-hover:text-primary/90 transition-colors duration-300">
                      {cert.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3.5">
                      {cert.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-secondary/80 text-[10px] font-medium text-muted-foreground tracking-wide border border-border/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Link button */}
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/10 hover:bg-primary/15 hover:border-primary/25 hover:shadow-[0_0_16px_-4px_hsl(var(--primary)/0.2)] active:scale-[0.97] transition-all duration-250"
                    >
                      {cert.linkLabel === "Verify Badge" ? <ShieldCheck size={12} /> : <ExternalLink size={12} />}
                      {cert.linkLabel}
                    </a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
