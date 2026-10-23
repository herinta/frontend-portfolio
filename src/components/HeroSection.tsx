import React from 'react';

export const HeroSection: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[#070312] text-white pt-16 pb-20 select-none"
    >
      {/* Background Image with subtle blend */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: 'url(/images/bg.webp)' }}
      />

      {/* Developer Modern Dot Grid Texture */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Soft Ambient Light Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-blue-500/20 to-teal-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute bottom-1/3 right-10 w-[300px] sm:w-[450px] h-[250px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content: Clean, Powerful, Minimalist */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Kicker Tag */}
        <p className="text-xs sm:text-sm font-bold tracking-[0.35em] text-cyan-300 uppercase mb-4 drop-shadow-md">
          Herinta Armantya &bull; Portfolio
        </p>

        {/* Impactful Title */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic tracking-wide text-white leading-[1.1] max-w-4xl mx-auto mb-8 font-script drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          Software Engineer{' '}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-300 drop-shadow-[0_0_40px_rgba(6,182,212,0.4)] font-script">
            &amp; AI Enthusiast
          </span>
        </h1>

        {/* Clean Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => scrollToSection('about')}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Explore Portfolio</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>

          {/* Secondary CTA: Download CV */}
          <a
            href="/CV - HERINTA ARMANTYA.pdf"
            download="CV - HERINTA ARMANTYA.pdf"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full font-medium text-xs sm:text-sm text-white/90 bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 hover:border-white/30 backdrop-blur-xl shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-cyan-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <span>Download CV</span>
          </a>
        </div>

        {/* Subtle Scroll Down Prompt */}
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="mt-14 inline-flex flex-col items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Scroll</span>
          <span className="text-sm transform group-hover:translate-y-1 transition-transform">&darr;</span>
        </button>

      </div>
    </div>
  );
};
