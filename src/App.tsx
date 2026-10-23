import { useEffect, useRef, useState } from 'react'
import { HeroSection } from './components/HeroSection'
import { Section2 } from './components/Section2'
import { TechStackSection } from './components/TechStackSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Section5 } from './components/Section5'
import { FullProjectsSection } from './components/FullProjectsSection'
import { EducationSection } from './components/EducationSection'
import { CertificatesSection } from './components/CertificatesSection'
import { Section6 } from './components/Section6'
import { Section7 } from './components/Section7'
import { FloatingNav } from './components/FloatingNav'
import { LoadingScreen } from './components/LoadingScreen'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './App.css'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top on mount
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Sync Lenis rendering loop with GSAP ticker for maximum performance
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    // Update ScrollTrigger calculations when Lenis scrolls
    const lenisInstance = lenisRef.current?.lenis;
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
      lenisInstance.on('scroll', ScrollTrigger.update);
    }

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Explicitly guarantee user starts at the absolute top of the page
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });

    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    }, 50);
  };

  return (
    <ReactLenis ref={lenisRef} autoRaf={false} root>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className="relative bg-black w-full min-h-screen overflow-x-hidden">
        
        {/* Fixed Hero Section in the background */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <HeroSection />
        </div>

        {/* Hero Spacer in document flow: maintains 100vh scroll height and preserves navigation */}
        <div id="hero" className="relative w-full h-screen pointer-events-none" />

        {/* Content wrapper for Section 2 and onwards — rolls up and covers the fixed Hero with clouds */}
        <div className="relative z-20 w-full min-h-screen bg-[#070312]">
          
          {/* Scrollable Background Image — covers Section 2 and smoothly fades into Tech Stack */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div 
              className="absolute inset-0 w-full bg-top"
              style={{ 
                backgroundImage: 'url(/images/bg-web.jpg)',
                backgroundSize: '100% auto',
                backgroundRepeat: 'no-repeat',
                maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 95%)',
              }}
            />
          </div>

          {/* Sections Content */}
          <div className="relative z-10 w-full">
            <Section2 />
            <TechStackSection />
            <ExperienceSection />
            
            {/* Section 5 (Portfolio) moved inside to share the background image seamlessly */}
            <Section5 />

            {/* Full Projects Section with Web, ML, Mobile Dev tabs */}
            <FullProjectsSection />

            {/* Education Section */}
            <EducationSection />

            {/* Certificates Section */}
            <CertificatesSection />
          </div>
        </div>

        {/* Section 6 (Padlet Wall/Guestbook) */}
        <Section6 />

        {/* Section 7 (Hire Me Call to Action / Footer) */}
        <Section7 />

        {/* Floating fixed navigation bar */}
        <FloatingNav />
      </div>
    </ReactLenis>
  )
}

export default App
