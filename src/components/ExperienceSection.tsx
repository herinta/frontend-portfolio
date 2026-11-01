import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Stats ──────────────────────────────────────────────────────────────────
interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

const STATS: Stat[] = [
  { value: 20,  suffix: '+', label: 'Projects Completed', icon: '🚀' },
  { value: 1.5,   suffix: '+', label: 'Years Experience',    icon: '⚡' },
  { value: 3.84, suffix: '', label: 'Cumulative GPA',     icon: '🎓' },
];

// ── Experience entries ──────────────────────────────────────────────────────
interface Experience {
  period: string;
  role: string;
  company: string;
  type: string;         // "Full-time" | "Internship" | "Freelance" etc.
  description: string;
  tags: string[];
  accent: string;       // Tailwind color class for the timeline dot & border
}

const EXPERIENCES: Experience[] = [
  {
    period: 'Mar 2025 – Jul 2025',
    role: 'Web Development Mentor',
    company: 'Informatics Study Club, Unimus',
    type: 'Mentor',
    description:
      'Guided 20 students in understanding web development concepts and practices including HTML, CSS, JavaScript, and TailwindCSS. Developed structured learning materials, practical tutorials, and monitored project milestones.',
    tags: ['TailwindCSS', 'JavaScript', 'HTML5', 'CSS3', 'Mentoring'],
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    period: 'Sep 2024 – Feb 2025',
    role: 'Fullstack Developer Intern',
    company: 'Dedomena Digital Indonesia',
    type: 'Internship',
    description:
      'Engineered and maintained UI for company profiles, developed scalable microservices architectures, and built a full-stack debt collection application using React.js for the frontend and Java Spring Boot for the backend.',
    tags: ['React.js', 'Java Spring Boot', 'Microservices', 'RESTful API'],
    accent: 'from-pink-500 to-rose-500',
  },
  {
    period: 'Jul 2021 – Jun 2022',
    role: 'Front End Web Developer',
    company: 'PWK Consultant',
    type: 'Part Time Remote',
    description:
      'Built and maintained responsive user interfaces for corporate company profiles and delivered interactive, cross-device compatible UI components utilizing HTML, CSS, and modern JavaScript.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Responsive UI'],
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    period: 'Dec 2019 – Mar 2020',
    role: 'Web Developer Intern',
    company: 'Sebo Studio',
    type: 'Internship',
    description:
      'Transformed complex design mockups into high-fidelity functional websites. Collaborated closely with UI/UX designers to guarantee visual aesthetics, pixel-perfection, and cross-device performance optimization.',
    tags: ['UI Slicing', 'HTML/CSS', 'JavaScript', 'Design Systems'],
    accent: 'from-purple-500 to-indigo-500',
  },
];

// ── Component ───────────────────────────────────────────────────────────────
export const ExperienceSection: React.FC = () => {
  const sectionRef    = useRef<HTMLElement>(null);
  const statsRef      = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef       = useRef<HTMLDivElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const leftCloudRef  = useRef<HTMLDivElement>(null);
  const rightCloudRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── Stat cards slide-in ─────────────────────────────────────────────
    gsap.fromTo(
      statsRef.current,
      { y: 60, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    // ── Count-up numbers ────────────────────────────────────────────────
    STATS.forEach((stat, i) => {
      const el = counterRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: 'power2.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        onUpdate: () => {
          el.textContent = Number.isInteger(stat.value)
            ? Math.round(obj.val).toString()
            : obj.val.toFixed(2);
        },
      });
    });

    // ── Timeline line draw-down (Tied directly to card centers so Sun stays in sync) ───
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (cards.length > 0 && lineRef.current) {
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];

      gsap.fromTo(lineRef.current, 
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: firstCard,
            start: 'center center',
            endTrigger: lastCard,
            end: 'center center',
            scrub: 0.3,
          }
        }
      );
    }

    // ── Experience cards fly in + bounce float after ────────────────────
    const isMobile = window.innerWidth < 768;
    cardRefs.current.forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      const xOffset = isMobile ? 30 : (fromLeft ? -80 : 80);
      gsap.fromTo(
        card,
        { x: xOffset, opacity: 0, y: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.6)',   // slight overshoot on entry
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
          },
          onComplete: () => {
            // gentle infinite float after entrance — each card slightly offset in phase
            gsap.to(card, {
              y: -8,
              duration: 1.8 + i * 0.15,   // stagger phase so they don't all move in sync
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });
          },
        }
      );
    });

    // ── Floating clouds animation ────────────────────────────────────────
    gsap.to(leftCloudRef.current, {
      y: -15,
      duration: 5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    gsap.to(rightCloudRef.current, {
      y: 15,
      duration: 5.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full z-20 pt-16 pb-48 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#153b67] via-[#245b96] via-45% to-[#3d85c6]"
    >
      {/* ── Ambient sky light ─────────────────────────────────────────── */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-300/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Clouds on Left and Right sides */}
      <div 
        ref={leftCloudRef}
        className="absolute left-0 top-[15%] w-[250px] md:w-[400px] pointer-events-none z-0 select-none -translate-x-[20%]"
      >
        <img src="/images/clouds.png" alt="Cloud Left" className="w-full h-auto object-contain opacity-75 filter brightness-110 drop-shadow-lg" />
      </div>
      <div 
        ref={rightCloudRef}
        className="absolute right-0 bottom-[10%] w-[250px] md:w-[400px] pointer-events-none z-0 select-none translate-x-[20%] scale-x-[-1]"
      >
        <img src="/images/clouds.png" alt="Cloud Right" className="w-full h-auto object-contain opacity-65 filter brightness-110 drop-shadow-lg" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* ── Section heading ───────────────────────────────────────── */}
        <div className="mb-10 text-center mt-20">
          <p className="text-cyan-300 text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase mb-3">
            Journey
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.3)] leading-none font-script">
            Experience
          </h2>
        </div>

        {/* ── Stats row ─────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => { statsRef.current[i] = el; }}
                style={{ perspective: '800px' }}
                className="group"
              >
                {/* 3D glass card */}
                <div className="
                  relative overflow-hidden rounded-2xl p-[1px]
                  bg-white/45 backdrop-blur-md border border-white/60
                  shadow-[0_8px_32px_rgba(30,58,138,0.12),0_1px_0_rgba(255,255,255,0.7)_inset]
                  transition-transform duration-500 ease-out
                  group-hover:[transform:rotateX(6deg)_rotateY(-4deg)_scale(1.04)]
                ">
                  {/* Inner glass — bright daylight theme */}
                  <div className="
                    rounded-[15px]
                    bg-white/40 backdrop-blur-md
                    px-4 py-5 flex flex-col items-center text-center
                  ">
                    {/* Thin top shimmer */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />

                    {/* Number */}
                    <div className="relative text-3xl md:text-4xl font-black text-indigo-950 leading-none mb-2 drop-shadow-sm">
                      <span ref={(el) => { counterRefs.current[i] = el; }}>0</span>
                      <span className="text-sky-700">{stat.suffix}</span>
                    </div>

                    {/* Label */}
                    <p className="relative text-[10px] md:text-xs text-slate-800 font-bold tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ──────────────────────────────────────────────── */}
        <div className="experience-timeline-container relative">

          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-4 w-1 bg-sky-900/15 rounded-full">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-cyan-400 via-teal-400 to-blue-500 rounded-full relative shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              style={{ height: '0%' }}
            >
              {/* Glowing Sun Head Dot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 flex items-center justify-center pointer-events-none z-20">
                {/* Sun Core */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 shadow-[0_0_16px_rgba(245,158,11,0.8),_0_0_32px_rgba(251,191,36,0.6)] relative flex items-center justify-center">
                  {/* Sun Rays SVG */}
                  <svg className="absolute w-10 h-10 text-amber-300/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-11">
            {EXPERIENCES.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const isDarkTheme = true; // Use bright daylight frosted card theme
              return (
                <div key={i} className="relative flex items-center">

                  {/* Period badge */}
                  <div className="absolute left-10 md:left-1/2 -translate-x-0 md:-translate-x-1/2 -top-6 z-10">
                    <span className={`text-[11px] font-semibold backdrop-blur-sm px-3 py-0.5 rounded-full whitespace-nowrap ${
                      isDarkTheme 
                        ? 'text-cyan-900 bg-white/80 border border-cyan-300/60 shadow-sm' 
                        : 'text-cyan-300 bg-black/60 border border-cyan-500/20 shadow-none'
                    }`}>
                      {exp.period}
                    </span>
                  </div>

                  {/* Spacer for opposite side */}
                  {!isLeft && <div className="hidden md:block flex-1 pr-8" />}

                  {/* Card */}
                  <div
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className={`flex-1 pl-10 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div className={`
                      relative rounded-2xl backdrop-blur-md p-4.5 transition-all duration-300 group overflow-hidden
                      ${isDarkTheme 
                        ? 'bg-white/60 border border-white/70 shadow-md hover:bg-white/70' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/8 shadow-none'
                      }
                    `}>
                      {/* Gradient accent bar */}
                      <div className={`absolute top-0 ${isLeft ? 'md:right-0 md:left-auto left-0' : 'left-0'} w-1 md:w-1.5 h-full bg-gradient-to-b ${exp.accent} rounded-full`} />

                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className={`text-base font-bold leading-snug ${isDarkTheme ? 'text-indigo-950' : 'text-white'}`}>{exp.role}</h3>
                          <p className={`text-xs font-medium ${isDarkTheme ? 'text-cyan-900' : 'text-cyan-300'}`}>{exp.company}</p>
                        </div>
                        <span className={`shrink-0 text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r ${exp.accent} text-white font-semibold shadow`}>
                          {exp.type}
                        </span>
                      </div>

                      <p className={`text-[13px] leading-relaxed mb-3 ${isDarkTheme ? 'text-slate-700' : 'text-slate-400'}`}>
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(tag => (
                          <span
                            key={tag}
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              isDarkTheme 
                                ? 'bg-white/80 border border-slate-200 text-slate-700 shadow-sm' 
                                : 'bg-white/5 border border-white/10 text-slate-300'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  {isLeft && <div className="hidden md:block flex-1 pl-8" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
