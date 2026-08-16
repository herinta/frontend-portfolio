import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TechItem {
  name: string;
  color: string;
  bg: string;
  abbr: string;
}

const TECH_ITEMS: TechItem[] = [
  { name: 'Next.js',      color: 'border-white/20 text-white',      bg: '#000',      abbr: 'N' },
  { name: 'Tailwind',     color: 'border-sky-400/30 text-sky-300',  bg: '#0ea5e9',   abbr: 'T' },
  { name: 'Bootstrap',    color: 'border-purple-400/30 text-purple-300', bg: '#7c3aed', abbr: 'B' },
  { name: 'JavaScript',   color: 'border-yellow-400/30 text-yellow-300', bg: '#ca8a04', abbr: 'JS' },
  { name: 'TypeScript',   color: 'border-blue-400/30 text-blue-300', bg: '#3b82f6',   abbr: 'TS' },
  { name: 'Git',          color: 'border-orange-400/30 text-orange-300', bg: '#ea580c', abbr: 'G' },
  { name: 'Laravel',      color: 'border-red-400/30 text-red-300',   bg: '#dc2626',   abbr: 'L' },
  { name: 'Spring Boot',  color: 'border-green-400/30 text-green-300', bg: '#16a34a', abbr: 'S' },
  { name: 'Python',       color: 'border-yellow-300/30 text-yellow-200', bg: '#a16207', abbr: 'Py' },
  { name: 'TensorFlow',   color: 'border-orange-300/30 text-orange-200', bg: '#d97706', abbr: 'TF' },
  { name: 'Docker',       color: 'border-cyan-400/30 text-cyan-300', bg: '#0891b2',   abbr: 'D' },
  { name: 'MySQL',        color: 'border-blue-300/30 text-blue-200', bg: '#1d4ed8',   abbr: 'M' },
  { name: 'Supabase',     color: 'border-emerald-400/30 text-emerald-300', bg: '#059669', abbr: 'Sb' },
];

const SPECIALTIES = [
  {
    title: 'Frontend Engineer',
    desc: 'React, Framer, GSAP, Tailwind dll',
    icon: (
      <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    color: 'from-sky-500/10 to-blue-500/5',
    border: 'border-sky-500/20 group-hover:border-sky-400/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]'
  },
  {
    title: 'Backend',
    desc: 'Node.js, Express, Databases & APIs',
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    color: 'from-purple-500/10 to-fuchsia-500/5',
    border: 'border-purple-500/20 group-hover:border-purple-400/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]'
  },
  {
    title: 'Machine Learning',
    desc: 'Python, TensorFlow, Data Analysis',
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: 'from-orange-500/10 to-amber-500/5',
    border: 'border-orange-500/20 group-hover:border-orange-400/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]'
  },
  {
    title: 'Mobile Dev',
    desc: 'React Native, Responsive, Cross-platform',
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    color: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-500/20 group-hover:border-emerald-400/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]'
  }
];

export const TechStackSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const isMobile = window.innerWidth < 768;
    const SPEED = isMobile ? 1.2 : 3.0;
    const AMPLITUDE = isMobile ? 20 : 120;
    const FREQUENCY = isMobile ? 0.012 : 0.010;

    const SCREEN_RANGE = window.innerWidth + (isMobile ? 500 : 600);
    const MIN_GAP = isMobile ? 115 : 120;
    const CARD_GAP = Math.max(MIN_GAP, Math.ceil(SCREEN_RANGE / TECH_ITEMS.length));
    const TRAIN_LENGTH = TECH_ITEMS.length * CARD_GAP;

    let phase = 0;
    const prevSlopes = new Array(TECH_ITEMS.length).fill(0);
    const zIndexState = new Array(TECH_ITEMS.length).fill(10);

    const ticker = gsap.ticker.add(() => {
      phase = (phase + SPEED) % TRAIN_LENGTH;

      logoRefs.current.forEach((ref, i) => {
        if (!ref) return;

        const x = (isMobile ? -150 : -300) + ((phase + i * CARD_GAP) % TRAIN_LENGTH);
        // Slope down: start slightly higher (-20px) on left, drop completely below text (+60px) on right
        const yOffset = isMobile ? -20 + (x * 0.22) : 0;
        const y = Math.sin(x * FREQUENCY) * AMPLITUDE + yOffset;
        
        // Include baseline slope in rotation calculation
        const sineSlope = AMPLITUDE * FREQUENCY * Math.cos(x * FREQUENCY);
        const totalSlope = sineSlope + (isMobile ? 0.22 : 0);
        const rotation = Math.atan2(totalSlope * SPEED, SPEED) * (180 / Math.PI);

        if (prevSlopes[i] < 0 && sineSlope >= 0) {
          zIndexState[i] = 10;
        } else if (prevSlopes[i] > 0 && sineSlope <= 0) {
          zIndexState[i] = 30;
        }
        prevSlopes[i] = sineSlope;

        gsap.set(ref, { x, y, rotation, zIndex: zIndexState[i] });
      });
    });

    return () => {
      gsap.ticker.remove(ticker);
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="tech-stack"
      className="relative w-full min-h-screen pt-0 pb-20 -mt-10 flex flex-col items-center justify-start overflow-hidden z-20 select-none"
    >
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Tech Stack Animation Container */}
      <div className="relative w-full max-w-7xl h-[280px] flex items-center justify-center shrink-0 mb-10 md:mb-20">
        {/* Single heading at z-20 */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-medium italic text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300/80 via-pink-300/70 to-indigo-300/80 drop-shadow-[0_0_40px_rgba(139,92,246,0.3)] select-none leading-none whitespace-nowrap"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            My Tech Stack
          </h1>
        </div>

        {/* Cards — z-index controlled per-card by GSAP */}
        <div className="absolute inset-0 overflow-visible pointer-events-none flex items-center">
          {TECH_ITEMS.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => { logoRefs.current[index] = el; }}
              className={`absolute left-0 flex items-center gap-1 md:gap-2.5 px-2 py-0.5 md:px-4 md:py-2 rounded-full bg-black/50 border backdrop-blur-md shadow-lg pointer-events-auto cursor-pointer hover:bg-white/10 transition-colors ${item.color}`}
            >
              {/* Colored icon dot */}
              <span
                className="w-3.5 h-3.5 md:w-5 md:h-5 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: item.bg, fontSize: '7px' }}
              >
                {item.abbr.length > 1 ? item.abbr[0] : item.abbr}
              </span>
              <span className="font-semibold tracking-wide text-[10px] md:text-sm whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specialties Cards Container */}
      <div className="relative w-full max-w-5xl px-6 mt-0 z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPECIALTIES.map((spec, index) => (
            <div
              key={index}
              className={`group relative p-4.5 md:p-6 rounded-2xl bg-gradient-to-br ${spec.color} bg-black/40 backdrop-blur-xl border ${spec.border} transition-all duration-300 hover:-translate-y-1 ${spec.glow} cursor-default overflow-hidden`}
            >
              <div className="relative z-10 flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(spec.icon, {
                    className: 'w-6 h-6 md:w-8 md:h-8 ' + (spec.icon.props.className || '')
                  })}
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 tracking-wide">{spec.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">{spec.desc}</p>
                </div>
              </div>
              
              {/* Card Hover Glow effect inside */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

