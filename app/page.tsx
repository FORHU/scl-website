import HeroHome from "@/components/hero-home"
import PhilosophySection from "@/components/philosophy-section"
import SCLBrainVisualization from "@/components/scl-brain-visualization"
import SCLComparisonSection from "@/components/scl-comparison-section"
import ResearchSection from "@/components/research-section"
import AboutSection from "@/components/about-section"
import CTAFinal from "@/components/cta-final"
import ContactSection from "@/components/contact-section"
import ProjectsSection from "@/components/projects-section"
import PressSection from "@/components/press-section"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroHome />
      <PhilosophySection />
      <SCLBrainVisualization />
      <SCLComparisonSection />
      <ResearchSection />
      <ProjectsSection />
      <PressSection />
      <AboutSection />
      <ContactSection />
      <CTAFinal />
    </main>
  )
}
