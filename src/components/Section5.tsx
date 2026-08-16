import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    title: 'Nutrisi AI',
    category: 'AI & Health',
    description: 'A smart web application that analyzes dietary intake and provides personalized nutritional recommendations using AI to help you achieve your health goals.',
    image: '/images/p1.svg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI API'],
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Focus App',
    category: 'Productivity',
    description: 'A beautifully designed productivity companion that helps users manage their time, track tasks, and stay focused with customizable timers and insightful analytics.',
    image: '/images/p2.svg',
    tags: ['Next.js', 'React', 'Zustand', 'Framer Motion'],
    color: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Multichat AI',
    category: 'Conversational AI',
    description: 'A versatile multi-channel chat platform enabling seamless integration with multiple AI models, featuring real-time messaging and context-aware responses.',
    image: '/images/p3.svg',
    tags: ['Next.js', 'WebSockets', 'Prisma', 'LangChain'],
    color: 'from-purple-500/20 to-fuchsia-500/20',
  },
];

export const Section5: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

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
        end: () => `+=${window.innerHeight * 4}`, // Scroll distance for 3 cards transition + 1 exit animation
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

    // Parallax Exit Effect: cards shrink and move up
    tl.to(scrollWrapperRef.current, {
      scale: isMobile ? 1 : 0.6,
      y: isMobile ? -100 : -300,
      opacity: 0,
      ease: 'power2.inOut',
    }, 3);

    // Sun parallax animation - Step 1: Move to bottom left and enlarge (scale down/go offscreen on mobile)
    tl.to('.sun-parallax', {
      top: '90%',
      left: '15%',
      scale: isMobile ? 4.5 : 25,
      opacity: isMobile ? 0 : 0.6,
      duration: isMobile ? 1 : 3,
      ease: isMobile ? 'power2.inOut' : 'power1.inOut',
    }, 0);

    // Sun parallax animation - Step 2: Exit to the left (desktop only)
    if (!isMobile) {
      tl.to('.sun-parallax', {
        left: '-20%',
        opacity: 0,
        duration: 1,
        ease: 'power2.in',
      }, 3);
    }

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
        className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-transparent via-[#dbeafe] to-white text-slate-800"
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
              className="text-6xl md:text-8xl font-medium italic text-indigo-950 drop-shadow-[0_0_30px_rgba(255,255,255,0.7)] leading-none mb-6"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              My Portfolio
            </h2>
            <p className="text-slate-700 text-sm md:text-base max-w-md leading-relaxed mb-8">
              Scroll down to explore my featured projects. Cards will stack and overlay one another from the bottom, just like a deck of cards.
            </p>
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
              <div className="relative w-full max-w-4xl">
                
                {/* Figma Selection Bounding Box */}
                <div className="absolute inset-[-8px] md:inset-[-14px] border-2 border-dashed border-indigo-400/50 rounded-[2.2rem] pointer-events-none origin-center">
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
                  w-full rounded-3xl border border-white/80 
                  bg-white p-4 sm:p-6 md:p-10 shadow-2xl 
                  grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center
                  relative overflow-hidden
                ">
                  {/* Corner ambient card gradient */}
                  <div className={`absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br ${project.color} rounded-full blur-3xl pointer-events-none opacity-40`} />

                  {/* Left side: Card Image mockup */}
                  <div className="rounded-2xl overflow-hidden border border-white/40 shadow-md group aspect-video relative z-10 flex items-center justify-center bg-white/50 max-h-[140px] sm:max-h-[220px] md:max-h-none">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Right side: Card Content */}
                  <div className="flex flex-col items-start text-left relative z-10">
                    <span className="text-sky-600 text-xs font-bold tracking-wider uppercase mb-1 md:mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-indigo-950 mb-2 md:mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-8">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/70 border border-slate-200 text-slate-700 font-medium shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dummy Action button */}
                    <a 
                      href="#view-details" 
                      onClick={(e) => e.preventDefault()}
                      className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-indigo-950 text-white font-bold hover:bg-indigo-900 transition-colors shadow text-xs sm:text-sm"
                    >
                      View Case Study
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

      </section>
    </div>
  );
};
