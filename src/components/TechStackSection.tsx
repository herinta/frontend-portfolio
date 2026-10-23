import React from 'react';

const SPECIALTIES = [
  {
    title: 'Frontend Engineer',
    desc: 'React, Framer, GSAP, Tailwind',
    dimension: '240 × 240',
    tilt: '-rotate-[4deg]',
    icon: (
      <svg className="w-8 h-8 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    )
  },
  {
    title: 'Backend Dev',
    desc: 'Node.js, Express, DBs & APIs',
    dimension: '240 × 240',
    tilt: 'rotate-[3.5deg]',
    icon: (
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    )
  },
  {
    title: 'Machine Learning',
    desc: 'Python, TensorFlow, AI Models',
    dimension: '240 × 240',
    tilt: '-rotate-[3deg]',
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
      </svg>
    )
  },
  {
    title: 'Mobile Dev',
    desc: 'React Native, Cross-platform Apps',
    dimension: '240 × 240',
    tilt: 'rotate-[4deg]',
    icon: (
      <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    )
  }
];

export const TechStackSection: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="relative w-full py-20 md:py-28 flex flex-col items-center justify-start overflow-hidden z-20 select-none bg-gradient-to-b from-[#0b1e3b] via-[#0f2b4e] to-[#153b67]"
    >
      {/* Section Title */}
      <div className="relative w-full max-w-7xl flex items-center justify-center shrink-0 mb-10 md:mb-14 px-4">
        <h2
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium italic text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-100 to-sky-200 select-none leading-tight font-script"
        >
          My Tech Stack
        </h2>
      </div>

      {/* 1 Row Berjejer Container */}
      <div className="relative w-full max-w-7xl px-4 sm:px-6 z-30">
        <div className="flex flex-row items-center justify-center gap-5 sm:gap-6 md:gap-7 lg:gap-8 overflow-x-auto py-12 px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {SPECIALTIES.map((spec, index) => (
            <div
              key={index}
              style={{ transformOrigin: 'center center' }}
              className={`group relative shrink-0 w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 lg:w-60 lg:h-60 aspect-square rounded-2xl bg-[#0d223f] hover:bg-[#112a4d] transition-all duration-300 ${spec.tilt} hover:rotate-0 hover:scale-105 hover:z-30 cursor-pointer shadow-xl`}
            >
              {/* ── Vector Shape Edit Mode Overlay ── */}
              {/* Dashed Edit Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-sky-400/70 group-hover:border-sky-300 group-hover:border-solid transition-colors duration-200 pointer-events-none" />

              {/* Vector Corner Anchor Handles (Square nodes with white stroke) */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-sky-500 border border-white rounded-[2px] shadow-sm pointer-events-none z-20 group-hover:scale-125 transition-transform" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-sky-500 border border-white rounded-[2px] shadow-sm pointer-events-none z-20 group-hover:scale-125 transition-transform" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-sky-500 border border-white rounded-[2px] shadow-sm pointer-events-none z-20 group-hover:scale-125 transition-transform" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-sky-500 border border-white rounded-[2px] shadow-sm pointer-events-none z-20 group-hover:scale-125 transition-transform" />

              {/* Midpoint Anchor Nodes */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-sky-500 rounded-[1px] pointer-events-none z-20" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border border-sky-500 rounded-[1px] pointer-events-none z-20" />
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-white border border-sky-500 rounded-[1px] pointer-events-none z-20" />
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border border-sky-500 rounded-[1px] pointer-events-none z-20" />

              {/* Vector Rotation / Path Control Stem */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20">
                <div className="w-3 h-3 rounded-full bg-sky-400 border-2 border-white shadow-md group-hover:scale-125 group-hover:bg-cyan-300 transition-all" />
                <div className="w-[1.5px] h-4 bg-sky-400/80" />
              </div>

              {/* Dimension / Node Pill Tag */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-sky-600 border border-sky-300/40 text-[9px] font-mono font-bold text-white shadow-md z-20 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                {spec.dimension}
              </div>

              {/* Centered Square Content */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 sm:p-5 h-full">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-white/[0.07] border border-white/10 mb-2.5 sm:mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {React.cloneElement(spec.icon, {
                    className: 'w-7 h-7 sm:w-8 sm:h-8 ' + (spec.icon.props.className || '')
                  })}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 tracking-wide leading-tight">
                  {spec.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-cyan-100/70 font-normal leading-snug line-clamp-2 max-w-[150px]">
                  {spec.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
