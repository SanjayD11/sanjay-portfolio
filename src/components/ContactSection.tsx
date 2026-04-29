import SectionReveal from "./SectionReveal";
import { Github, Linkedin, Mail, Send, Loader2, Phone } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_l7jr9q4";
const TEMPLATE_ID = "template_o7b9vu7";
const PUBLIC_KEY = "fHveuQYI0JLBzpeYl";

const socialLinks = [
  { icon: Github, href: "https://github.com/SanjayD11", label: "GitHub", color: "265 65% 58%" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sanjay-d-354776353", label: "LinkedIn", color: "210 80% 55%" },
  { icon: Mail, href: "mailto:sanjayraju5164@gmail.com", label: "Email", color: "340 70% 55%" },
  { icon: Phone, href: "tel:+918668192874", label: "+91 8668192874", color: "145 60% 45%" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const lastSent = useRef(0);
  const [honey, setHoney] = useState("");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }

    const now = Date.now();
    if (now - lastSent.current < 30000) {
      toast({ title: "Please wait before sending another message", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        message: form.message.trim(),
      }, PUBLIC_KEY);
      lastSent.current = Date.now();
      toast({ title: "Message sent! 🎉", description: "Thanks for reaching out. I'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({ title: "Failed to send message", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <SectionReveal>
          <p className="text-sm tracking-[0.3em] uppercase text-primary mb-4">Contact</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-gradient-animated">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-12">Have a project idea or want to collaborate? Reach out!</p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="flex justify-center gap-6 sm:gap-8 mb-12 flex-wrap">
            {socialLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("tel:") ? undefined : "_blank"}
                rel={link.href.startsWith("tel:") ? undefined : "noopener noreferrer"}
                className="social-icon-btn group"
                style={{
                  "--icon-hue": link.color,
                  animationDelay: `${i * 0.08}s`,
                } as React.CSSProperties}
                aria-label={link.label}
              >
                <span className="social-icon-circle">
                  <link.icon size={22} strokeWidth={1.8} />
                </span>
                <span className="social-icon-label">{link.label}</span>
              </a>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5 border border-border/50">
            <input
              type="text"
              name="website"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
              className="absolute opacity-0 pointer-events-none h-0 w-0"
              tabIndex={-1}
              autoComplete="off"
            />
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-[border-color,box-shadow] duration-200"
                placeholder="Your name"
                maxLength={100}
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-[border-color,box-shadow] duration-200"
                placeholder="your@email.com"
                maxLength={255}
                required
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/30 transition-[border-color,box-shadow] duration-200 resize-none"
                placeholder="Your message..."
                maxLength={1000}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="group/btn w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-all duration-300 ease-out"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                color: "hsl(var(--primary-foreground))",
                boxShadow: "0 4px 20px -4px hsl(var(--primary) / 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) translateZ(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px -4px hsl(var(--primary) / 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) translateZ(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px -4px hsl(var(--primary) / 0.3)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(0.98) translateZ(0)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) translateZ(0)";
              }}
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={16} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" /> Send Message</>
              )}
            </button>
          </form>
        </SectionReveal>
      </div>
    </section>
  );
};

export default ContactSection;
