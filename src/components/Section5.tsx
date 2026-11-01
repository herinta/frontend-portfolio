import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectDetailModal } from './ProjectDetailModal';
import { getProjectDetail, type ProjectDetail } from '../data/projectDetailsData';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

const PROJECTS: Project[] = [
  {
    title: 'JobHunt',
    category: 'Job Portal & Employer CMS',
    description: 'A dual-app recruitment ecosystem combining an Employer ATS/CMS Dashboard and a Public Job Seeker Portal powered by Next.js App Router, Prisma ORM, PostgreSQL, and Supabase Storage.',
    image: '/images/project/jobhunt.png',
    tags: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Supabase Storage'],
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    title: 'Digisell',
    category: 'E-Commerce & Creator Economy',
    description: 'A private link-in-bio digital product storefront and automated delivery platform powered by Java 17, Spring Boot 3.3, React 19, Midtrans Snap, and high-concurrency pessimistic locking.',
    image: '/images/p2.svg',
    tags: ['Java 17', 'Spring Boot 3', 'React 19', 'Midtrans', 'MySQL'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Multichat AI',
    category: 'Conversational AI & Multi-Agent System',
    description: 'A multi-agent conversational AI platform featuring 1-on-1 & group voice calls, cross-room long-term memory, proactive "AI Chat Duluan" messaging, and dual-layer anti-prompt injection.',
    image: '/images/p3.svg',
    tags: ['Next.js 16', 'Gemini 3.5', 'Supabase Realtime', 'Web Speech API', 'PWA'],
    color: 'from-purple-500/20 to-fuchsia-500/20',
  },
  {
    title: 'Codevas Learning',
    category: 'EdTech & Interactive Coding Platform',
    description: 'An interactive frontend learning platform featuring a 60FPS real-time HTML/CSS/Tailwind evaluation engine, Monaco Editor with Smart Syntax Helpers, gamified XP ledger, and self-hosted NAS Docker infrastructure.',
    image: '/images/project/codevas.png',
    tags: ['Next.js 16', 'TypeScript', 'Monaco Editor', 'PostgreSQL 16', 'Docker'],
    color: 'from-amber-500/20 to-orange-500/20',
  },
];

export const Section5: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCaseStudy = (title: string) => {
    const detail = getProjectDetail(title);
    setSelectedProject(detail);
    setIsModalOpen(true);
  };

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    // Stacking/shuffling card effect (wipe vertical transitions)
    const panels = gsap.utils.toArray('.portfolio-panel');
    
    // Set all panels except the first (title) to start below the viewport with a slight rotation (no rotation on mobile)
    gsap.set(panels.slice(1), { 
      y: '100vh', 
      rotation: isMobile ? 0 : 4, 
      transformOrigin: 'center center' 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${window.innerHeight * 5}`, // 5 units long to allow exit animation after all 4 cards
        anticipatePin: 1,
      }
    });

    // Panel 1 (Project 0) slides up to cover Title panel (index 0)
    tl.to(panels[1] as HTMLElement, {
      y: 0,
      rotation: 0,
      ease: 'none',
    }, 0)
    .to(panels[0] as HTMLElement, {
      opacity: 0,
      y: -50,
      scale: 0.95,
      ease: 'none',
    }, 0);

    // Panel 2 (Project 1) slides up to cover Panel 1
    tl.to(panels[2] as HTMLElement, {
      y: 0,
      rotation: 0,
      ease: 'none',
    }, 1);

    // Panel 3 (Project 2) slides up to cover Panel 2
    tl.to(panels[3] as HTMLElement, {
      y: 0,
      rotation: 0,
      ease: 'none',
    }, 2);

    // Panel 4 (Project 3) slides up to cover Panel 3
    tl.to(panels[4] as HTMLElement, {
      y: 0,
      rotation: 0,
      ease: 'none',
    }, 3);

    // Sun parallax animation - Step 1: Descend and enlarge to bottom-left
    tl.to('.sun-parallax', {
      top: '90%',
      left: '5%',
      scale: isMobile ? 4.5 : 18,
      opacity: isMobile ? 0 : 0.6,
      duration: 4, // Span across panels 1, 2, 3, and 4
      ease: 'power1.inOut',
    }, 0);

    // Step 2: Slide quickly off-screen to the left and fade out AFTER the last card is fully displayed
    tl.to('.sun-parallax', {
      left: '-100vw',
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
    }, 4);

    // Cleanup
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, { scope: containerRef });

  return (
    <div className="relative w-full z-30">

      {/* Transition Overlay (Clouds) covering the top edge, placed outside the overflow-hidden container */}
      <div 
        ref={cloudsRef}
        className="absolute top-0 left-0 w-full z-50 pointer-events-none transform -translate-y-[50%] scale-y-[-1]"
      >
        <img 
          src="/images/clouds.png"
          alt="Transition clouds top"
          className="w-full h-auto object-cover opacity-100"
          loading="lazy"
        />
      </div>

      {/* The main horizontal scroll section containing overflow-hidden */}
      <section 
        ref={containerRef}
        id="portfolio"
        className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#38a8ed] via-[#65bef5] to-[#9ad9ff] text-slate-800"
      >
        {/* SUN CONTINUATION */}
        <div 
          className="sun-parallax absolute z-[5] pointer-events-none flex items-center justify-center"
          style={{ top: '0%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 shadow-[0_0_16px_rgba(245,158,11,0.8),_0_0_32px_rgba(251,191,36,0.6)] relative flex items-center justify-center">
            <svg className="absolute w-10 h-10 text-amber-300/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
            </svg>
          </div>
        </div>

        {/* FIXED BACKGROUND ELEMENTS (They stay stationary while cards move) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Soft glowing ambient clouds/fogs */}
          <div className="absolute top-[10%] left-[15%] w-[450px] h-[450px] bg-white/70 rounded-full blur-[120px]" />
          <div className="absolute bottom-[15%] right-[20%] w-[550px] h-[550px] bg-white/80 rounded-full blur-[140px]" />
          <div className="absolute bottom-[5%] left-[30%] w-[350px] h-[350px] bg-sky-200/50 rounded-full blur-[90px]" />
          
          {/* Low-opacity repeating clouds layer for realistic fog texture */}
          <div 
            className="absolute inset-x-0 top-[20%] bottom-0 opacity-15 mix-blend-overlay bg-repeat-x bg-top" 
            style={{ backgroundImage: 'url(/images/clouds.png)', backgroundSize: '1000px auto' }} 
          />
          <div 
            className="absolute inset-x-0 top-[40%] bottom-0 opacity-10 mix-blend-screen bg-repeat-x bg-bottom scale-y-[-1]" 
            style={{ backgroundImage: 'url(/images/clouds.png)', backgroundSize: '1400px auto' }} 
          />
        </div>

        {/* CARD STACK CONTAINER */}
        <div 
          ref={scrollWrapperRef}
          className="relative z-10 w-full h-full"
        >
          
          {/* PANEL 0: SECTION TITLE */}
          <div className="portfolio-panel absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 z-10 will-change-transform">
            <p className="text-indigo-900 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Showcase
            </p>
            <h2 
              className="text-6xl md:text-9xl font-bold italic text-indigo-950 drop-shadow-[0_0_30px_rgba(255,255,255,0.7)] leading-none mb-6 font-script"
            >
              My Top Project
            </h2>
           
            <div className="flex items-center gap-3 text-indigo-900 animate-bounce mt-4">
              <span className="text-sm font-semibold tracking-wider">SCROLL DOWN</span>
              <span>↓</span>
            </div>
          </div>

          {/* PANELS 1, 2, 3: THE PROJECT CARDS */}
          {PROJECTS.map((project, index) => (
            <div 
              key={project.title} 
              className="portfolio-panel absolute inset-0 w-full h-full flex items-center justify-center px-6 md:px-16 will-change-transform"
              style={{ zIndex: 11 + index }}
            >
{/* The project card wrapper wrapper (to mount Figma edit outline) */}
              <div className="relative w-full max-w-5xl">
                
                {/* Figma Selection Bounding Box */}
                <div className="absolute inset-[-8px] md:inset-[-16px] border-2 border-dashed border-indigo-400/50 rounded-[2.5rem] pointer-events-none origin-center">
                  {/* Corner Handles (Resize Dots) */}
                  <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                  <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />

                  {/* Top Rotation Handle */}
                  <div className="absolute left-1/2 -top-6 w-[2px] h-6 bg-indigo-500/40 -translate-x-1/2" />
                  <div className="absolute left-1/2 -top-[30px] w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-full -translate-x-1/2" />
                </div>

                {/* The actual project card (clean light theme optimized for performance) */}
                <div className="
                  w-full min-h-[380px] md:min-h-[460px] rounded-[2rem] border border-white/80 
                  bg-white p-5 sm:p-8 md:p-12 shadow-2xl 
                  grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center
                  relative overflow-hidden
                ">
                  {/* Corner ambient card gradient */}
                  <div className={`absolute -right-20 -bottom-20 w-96 h-96 bg-gradient-to-br ${project.color} rounded-full blur-3xl pointer-events-none opacity-40`} />

                  {/* Left side: Card Image mockup */}
                  <div className="w-full min-w-0 rounded-2xl overflow-hidden border border-slate-200/60 shadow-md group aspect-video relative z-10 flex items-center justify-center bg-slate-50 max-h-[180px] sm:max-h-[240px] md:max-h-none">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Right side: Card Content */}
                  <div className="flex flex-col items-start text-left relative z-10 min-w-0">
                    <span className="text-sky-600 text-xs sm:text-sm font-bold tracking-wider uppercase mb-1.5 md:mb-2.5">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-indigo-950 mb-3 md:mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-5 md:mb-6">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-5 md:mb-8">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-white/70 border border-slate-200 text-slate-700 font-medium shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Detail Project Action button */}
                    <button 
                      type="button"
                      onClick={() => handleOpenCaseStudy(project.title)}
                      className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-indigo-950 text-white font-bold hover:bg-indigo-900 animate-pulse-scale hover:[animation-play-state:paused] hover:scale-105 active:scale-95 transition-all shadow-md text-xs sm:text-sm md:text-base inline-flex items-center gap-2 cursor-pointer group"
                    >
                      <span>View Detail Project</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* Fullscreen Project Detail Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
