import React from 'react';

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
      <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    color: 'from-teal-500/10 to-cyan-500/5',
    border: 'border-teal-500/20 group-hover:border-teal-400/50',
    glow: 'group-hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]'
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
  return (
    <section
      id="tech-stack"
      className="relative w-full py-20 md:py-32 flex flex-col items-center justify-start overflow-hidden z-20 select-none bg-gradient-to-b from-[#0b1e3b] via-[#0f2b4e] to-[#153b67]"
    >
      {/* Decorative ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-teal-300/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Section Title */}
      <div className="relative w-full max-w-7xl flex items-center justify-center shrink-0 mb-12 md:mb-18 px-4">
        <h2
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium italic text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-100 to-sky-200 drop-shadow-[0_0_40px_rgba(6,182,212,0.4)] select-none leading-tight font-script"
        >
          My Tech Stack
        </h2>
      </div>

      {/* Specialties Cards Container */}
      <div className="relative w-full max-w-5xl px-6 mt-0 z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SPECIALTIES.map((spec, index) => (
            <div
              key={index}
              className={`group relative p-5 md:p-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl border border-white/20 group-hover:border-white/35 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.18)] ${spec.glow} cursor-default overflow-hidden`}
            >
              {/* Colored ambient glow inside the glass card */}
              <div className={`absolute inset-0 bg-gradient-to-br ${spec.color} opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`} />

              {/* Glass reflection sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1200ms] ease-in-out pointer-events-none -skew-x-12" />

              {/* Subtle top shimmer/light reflection on glass edge */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-start gap-3 md:gap-4">
                <div className="p-2.5 md:p-3 rounded-xl bg-white/10 border border-white/20 shadow-inner group-hover:scale-110 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300">
                  {React.cloneElement(spec.icon, {
                    className: 'w-6 h-6 md:w-8 md:h-8 ' + (spec.icon.props.className || '')
                  })}
                </div>
                <div>
                  <h3 className="text-base md:text-xl font-bold text-white mb-1 tracking-wide">{spec.title}</h3>
                  <p className="text-xs md:text-sm text-cyan-50/90 font-light leading-relaxed">{spec.desc}</p>
                </div>
              </div>
              
              {/* Card Hover Glow effect inside */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-[50px] group-hover:bg-white/15 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
