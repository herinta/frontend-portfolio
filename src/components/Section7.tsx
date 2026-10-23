import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Section7: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Reveal portal and text when scrolled into view
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(portalRef.current,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    gsap.fromTo(buttonRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    // Continuous breathing animation for the cosmic portal
    gsap.to(portalRef.current, {
      scale: 1.05,
      opacity: 0.9,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, { scope: sectionRef });

  // Interactive hover animations
  const handleMouseEnter = () => {
    // When hovering button, make portal pulse brighter
    gsap.to(portalRef.current, {
      scale: 1.15,
      boxShadow: '0 0 80px rgba(16, 185, 129, 0.5), inset 0 0 40px rgba(52, 211, 153, 0.4)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(portalRef.current, {
      scale: 1,
      boxShadow: '0 0 50px rgba(16, 185, 129, 0.25), inset 0 0 20px rgba(52, 211, 153, 0.15)',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <div className="relative w-full z-20">
      {/* High-performance scoped animations for fireflies */}
      <style>{`
        @keyframes float-glow {
          0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.35; }
          50% { transform: translateY(-22px) scale(1.25); opacity: 0.95; }
        }
        .firefly {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #86efac;
          box-shadow: 0 0 8px #4ade80, 0 0 16px #22c55e;
          animation: float-glow 4s infinite ease-in-out;
        }
        .firefly-1 { top: 62%; left: 16%; animation-delay: 0s; animation-duration: 4.2s; }
        .firefly-2 { top: 70%; left: 32%; animation-delay: 1.5s; animation-duration: 3.8s; }
        .firefly-3 { top: 56%; left: 52%; animation-delay: 0.7s; animation-duration: 4.8s; }
        .firefly-4 { top: 78%; left: 70%; animation-delay: 2.2s; animation-duration: 3.5s; }
        .firefly-5 { top: 66%; left: 86%; animation-delay: 1.1s; animation-duration: 4.5s; }
        .firefly-6 { top: 82%; left: 42%; animation-delay: 2.8s; animation-duration: 3.9s; }
      `}</style>

      {/* Cloud Transition Seam between Note Section and Green Meadow Footer */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none transform -translate-y-[48%]">
        <img 
          src="/images/clouds.png" 
          alt="Clouds Transition to Footer" 
          className="relative w-full h-auto min-h-[180px] sm:min-h-[260px] object-cover opacity-95"
          loading="lazy"
        />
      </div>

      <section
        ref={sectionRef}
        id="contact"
        className="relative w-full min-h-screen pt-48 sm:pt-56 md:pt-64 pb-20 flex flex-col items-center justify-between bg-gradient-to-b from-white via-[#dcfce7] via-30% to-[#15803d] text-slate-800 overflow-hidden"
      >
        {/* Soft sunny emerald ambient light glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-300/20 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-green-400/15 rounded-full blur-[140px] pointer-events-none z-0" />

        {/* ── Full Green Grass & Rolling Hills SVG Landscape Illustration ── */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full object-cover"
          >
            <defs>
              {/* Distant Hills Gradient */}
              <linearGradient id="hillFar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#86efac" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0.95" />
              </linearGradient>

              {/* Mid Hills Gradient */}
              <linearGradient id="hillMid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>

              {/* Near Grass Gradient */}
              <linearGradient id="hillNear" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="60%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>

              {/* Foreground Turf Gradient */}
              <linearGradient id="turfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#16a34a" />
                <stop offset="40%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#14532d" />
              </linearGradient>
            </defs>

            {/* Far soft rolling hill */}
            <path
              d="M-50,480 Q320,340 720,420 T1490,370 L1490,900 L-50,900 Z"
              fill="url(#hillFar)"
            />

            {/* Mid rolling hill with crest curve */}
            <path
              d="M-50,560 Q260,450 680,520 T1490,470 L1490,900 L-50,900 Z"
              fill="url(#hillMid)"
            />

            {/* Near lush green hill */}
            <path
              d="M-50,640 Q420,530 920,600 T1490,570 L1490,900 L-50,900 Z"
              fill="url(#hillNear)"
            />

            {/* Foreground rich green grass turf */}
            <path
              d="M-50,710 Q250,630 620,690 T1180,660 Q1340,680 1490,650 L1490,900 L-50,900 Z"
              fill="url(#turfGradient)"
            />

            {/* Detailed Grass Blade Tufts along the ridge */}
            <g fill="#86efac" opacity="0.8">
              {/* Clump 1 */}
              <path d="M140,650 Q145,610 142,580 Q148,615 152,650 Z" />
              <path d="M148,650 Q155,605 158,575 Q160,612 163,650 Z" />
              <path d="M156,650 Q168,612 174,585 Q171,618 168,650 Z" />
              {/* Clump 2 */}
              <path d="M380,655 Q385,615 382,585 Q388,620 392,655 Z" />
              <path d="M388,655 Q395,610 400,580 Q402,617 403,655 Z" />
              <path d="M396,655 Q408,618 414,590 Q411,623 408,655 Z" />
              {/* Clump 3 */}
              <path d="M680,690 Q685,645 683,615 Q690,650 694,690 Z" />
              <path d="M690,690 Q700,640 706,610 Q706,648 706,690 Z" />
              <path d="M700,690 Q712,650 720,620 Q715,655 712,690 Z" />
              {/* Clump 4 */}
              <path d="M960,660 Q965,620 962,590 Q968,625 972,660 Z" />
              <path d="M968,660 Q976,615 982,585 Q983,622 984,660 Z" />
              <path d="M978,660 Q990,622 998,595 Q993,628 989,660 Z" />
              {/* Clump 5 */}
              <path d="M1240,665 Q1245,625 1242,595 Q1248,630 1252,665 Z" />
              <path d="M1248,665 Q1256,620 1262,590 Q1263,627 1264,665 Z" />
              <path d="M1258,665 Q1270,628 1278,600 Q1273,633 1269,665 Z" />
            </g>
          </svg>

          {/* Ambient Glowing Fireflies */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="firefly firefly-1" />
            <div className="firefly firefly-2" />
            <div className="firefly firefly-3" />
            <div className="firefly firefly-4" />
            <div className="firefly firefly-5" />
            <div className="firefly firefly-6" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center my-auto px-6">
          
          {/* Abstract Glowing Emerald Meadow Portal */}
          <div 
            ref={portalRef}
            className="
              relative w-56 h-56 md:w-64 md:h-64 rounded-full mb-12
              bg-white/40 border border-emerald-400/50
              shadow-[0_0_50px_rgba(34,197,94,0.35),_inset_0_0_20px_rgba(255,255,255,0.6)]
              flex items-center justify-center backdrop-blur-md
            "
          >
            {/* Inner concentric ring */}
            <div className="w-[80%] h-[80%] rounded-full border border-emerald-500/30 bg-emerald-100/30 flex items-center justify-center animate-spin duration-[20s]">
              <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_14px_#22c55e] transform translate-x-20" />
            </div>

            {/* Keyhole light core */}
            <div className="absolute w-[40%] h-[40%] rounded-full bg-white/70 border border-emerald-300/40 shadow-[0_0_20px_rgba(34,197,94,0.25)] flex flex-col items-center justify-center animate-pulse duration-[4s]">
              {/* Keyhole shape */}
              <div className="w-4 h-4 rounded-full bg-gradient-to-b from-emerald-600 to-teal-800 shadow-sm" />
              <div className="w-2.5 h-6 bg-gradient-to-b from-emerald-600 to-teal-800 -mt-1 rounded-b" />
            </div>

            {/* Sparkling motes inside portal */}
            <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden opacity-50 pointer-events-none">
              <div className="absolute top-[20%] left-[10%] w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping duration-[3s]" />
              <div className="absolute bottom-[25%] right-[15%] w-1 h-1 bg-teal-400 rounded-full animate-ping duration-[4s]" />
            </div>
          </div>

          {/* Text */}
          <p className="text-emerald-800 font-extrabold tracking-[0.4em] uppercase mb-4 drop-shadow-sm">
            Ready for the Next Chapter?
          </p>

          <h2 
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic text-emerald-950 drop-shadow-[0_2px_15px_rgba(255,255,255,0.9)] leading-none mb-8 select-none font-script"
            style={{ transform: 'rotate(-2deg)' }}
          >
            Let's Create Something Great
          </h2>

          <p 
            ref={subtitleRef}
            className="text-emerald-900 font-medium text-sm md:text-base max-w-lg leading-relaxed mb-12 drop-shadow-sm"
          >
            I am currently open to full-time opportunities, freelance projects, and exciting collaborations. 
            Tap below to send a direct email and let's explore how we can work together.
          </p>

          {/* Direct Email Action Button */}
          <a
            ref={buttonRef}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=herintya@gmail.com&su=Let's%20Unlock%20Your%20Potential&body=Hi%20Herin,%0A%0AI%20saw%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20regarding..."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="
              relative px-8 py-4 rounded-full font-bold tracking-wider text-xs md:text-sm uppercase
              bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600
              text-white hover:text-white transition-all duration-300
              shadow-[0_0_30px_rgba(16,185,129,0.4)]
              hover:shadow-[0_0_45px_rgba(16,185,129,0.7)]
              hover:scale-[1.04] active:scale-[0.98]
              flex items-center gap-3 group cursor-pointer
            "
          >
            <span className="relative z-10">Hire Me to Unlock My Potential</span>
            
            {/* Key icon */}
            <svg 
              className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300 relative z-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2.5" 
                d="M15 7a2 2 0 012 2m-2 4a5 5 0 110-10 5 5 0 010 10zM19 9h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H19M10 14l-6 6m0 0h3v-3M4 20v-3h3" 
              />
            </svg>

            {/* Button inner glow border */}
            <div className="absolute inset-[1.5px] bg-[#0c2e1c] rounded-full group-hover:opacity-0 transition-opacity duration-300 z-0 pointer-events-none" />
            <span className="absolute inset-0 flex items-center justify-center gap-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-white pointer-events-none">
              <span>Hire Me to Unlock My Potential</span>
              <svg className="w-4 h-4 rotate-45 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 7a2 2 0 012 2m-2 4a5 5 0 110-10 5 5 0 010 10zM19 9h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H19M10 14l-6 6m0 0h3v-3M4 20v-3h3" />
              </svg>
            </span>
          </a>

        </div>

        {/* Footer Branding & Social Links */}
        <div className="relative z-10 w-full text-center px-6 mt-16 border-t border-emerald-500/20 pt-12 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-6 text-xs md:text-sm text-emerald-200/80">
          <div>
            <span className="font-semibold text-white">Herin Tya</span> — Web Portfolio
          </div>
          
          {/* Social Links */}
          <div className="flex items-center gap-6 font-semibold text-emerald-300">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:herintya@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>

          <p>© {new Date().getFullYear()} — Built with Passion</p>
        </div>
      </section>
    </div>
  );
};
