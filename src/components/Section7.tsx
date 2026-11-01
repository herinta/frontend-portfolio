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

      {/* Leaf / Foliage Transition Seam between Note Section and Green Meadow Footer */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none transform -translate-y-[45%]">
        <img 
          src="/images/daun.png" 
          alt="Daun Transition to Footer" 
          className="relative w-full h-auto min-h-[160px] sm:min-h-[240px] md:min-h-[300px] object-cover drop-shadow-md select-none"
          loading="lazy"
        />
      </div>

      <section
        ref={sectionRef}
        id="contact"
        className="relative w-full min-h-screen pt-32 sm:pt-36 md:pt-40 pb-20 flex flex-col items-center justify-between text-slate-800 overflow-hidden bg-[#7aa331]"
      >
        {/* Full Width Image Background - bg-daun.jpg (no crop/zoom, full left-to-right) */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <img 
            src="/images/bg-daun.jpg" 
            alt="Background Daun Footer" 
            className="w-full h-full object-fill sm:object-cover sm:object-top"
          />
          {/* Subtle soft dark overlay to ensure readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Main Content Area - Raised higher */}
        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center justify-center text-center my-auto px-6 pt-2">
          
          {/* Text */}
          <p className="text-[#14532d] font-extrabold tracking-[0.4em] uppercase mb-4 drop-shadow-sm">
            Ready for the Next Chapter?
          </p>

          <h2 
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic text-[#052e16] drop-shadow-[0_2px_15px_rgba(255,255,255,0.95)] leading-none mb-6 select-none font-script"
            style={{ transform: 'rotate(-2deg)' }}
          >
            Let's Create Something Great
          </h2>

          <p 
            ref={subtitleRef}
            className="text-[#064e3b] font-medium text-sm md:text-base max-w-lg leading-relaxed mb-10 drop-shadow-sm"
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
              bg-gradient-to-r from-[#16a34a] via-[#15803d] to-[#14532d]
              text-white hover:text-white transition-all duration-300
              shadow-[0_0_30px_rgba(22,163,74,0.5)]
              hover:shadow-[0_0_45px_rgba(34,197,94,0.7)]
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
            <a href="https://github.com/herinta" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/herinta-armantya" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:herintya@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>

          <p>© {new Date().getFullYear()} — Built with Passion</p>
        </div>
      </section>
    </div>
  );
};
