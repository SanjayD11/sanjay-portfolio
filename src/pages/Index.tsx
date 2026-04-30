import { useState, useCallback, useEffect } from "react";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import TechnicalExcellenceSection from "@/components/TechnicalExcellenceSection";
import ProjectsSection from "@/components/ProjectsSection";
import AISection from "@/components/AISection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";

/**
 * Pre-mount strategy: Hero is ALWAYS mounted (behind loader at opacity 0).
 * When loader exits, hero crossfades in — zero mount delay, zero layout shift.
 */
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [loaderDone, setLoaderDone] = useState(false);

  // Force scroll to top on every page load/refresh
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
    // Remove loader from DOM after its exit transition completes
    setTimeout(() => setLoaderDone(true), 600);
  }, []);

  return (
    <>
      <CustomCursor />

      {/* Loader — stays mounted until exit transition completes */}
      {!loaderDone && (
        <LoadingScreen onComplete={handleLoadComplete} />
      )}

      {/* Navbar + ScrollProgress OUTSIDE transformed container — position:fixed needs viewport as containing block */}
      <Navbar />
      <ScrollProgress />

      {/* Hero + all sections — ALWAYS mounted, hidden behind loader initially */}
      <div
        className="min-h-screen bg-background text-foreground overflow-x-hidden"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <AnimatedBackground />
        <HeroSection ready={!loading} />
        <AboutSection />
        <SkillsSection />
        <TechnicalExcellenceSection />
        <ProjectsSection />
        <AISection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;
