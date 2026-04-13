import Navbar               from '@/components/portfolio/Navbar'
import HeroSection          from '@/components/portfolio/HeroSection'
import AboutSection         from '@/components/portfolio/AboutSection'
import ProjectsSection      from '@/components/portfolio/ProjectsSection'
import SkillsSection        from '@/components/portfolio/SkillsSection'
import PricingSection       from '@/components/portfolio/PricingSection'
import TestimonialsSection  from '@/components/portfolio/TestimonialsSection'
import ContactSection       from '@/components/portfolio/ContatoSection'
import Footer               from '@/components/portfolio/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <PricingSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}