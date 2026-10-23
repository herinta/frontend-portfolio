import React, { useRef, useEffect } from 'react';

interface CertificateItem {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  logo: string;
  gradientTop: string;
  gradientCard: string;
}

const CERTIFICATES_DATA: CertificateItem[] = [
  {
    title: '1st Place, Outstanding Student Award',
    issuer: 'Faculty of Engineering & Computer Science (UNIMUS)',
    issueDate: '2024',
    credentialId: 'MAPRES-FTIK-2024',
    logo: '🏆',
    gradientTop: 'from-[#fef08a] to-[#fde047]', // Gold/Yellow
    gradientCard: 'to-[#fef08a]/15'
  },
  {
    title: 'Best Presenter Category Winner',
    issuer: 'International Health Science Technology Competition',
    issueDate: '2023',
    credentialId: 'IHSTC-PRES-2023',
    logo: '🥇',
    gradientTop: 'from-[#c2e9fb] to-[#a1c4fd]', // Soft Blue
    gradientCard: 'to-[#a1c4fd]/15'
  },
  {
    title: '2nd Place Winner, Web Programming',
    issuer: 'Festival Technology Jawa Tengah',
    issueDate: '2023',
    credentialId: 'FESTEK-JTG-2023',
    logo: '🥈',
    gradientTop: 'from-[#84fab0] to-[#8fd3f4]', // Mint / Cyan
    gradientCard: 'to-[#84fab0]/15'
  },
  {
    title: '2nd Place Winner, Programming Game',
    issuer: 'APSI National Competition',
    issueDate: '2022',
    credentialId: 'APSI-GAME-2022',
    logo: '🎮',
    gradientTop: 'from-[#cd9cf2] to-[#fbc2eb]', // Lavender / Pink
    gradientCard: 'to-[#cd9cf2]/15'
  },
  {
    title: 'React JS & Tailwind CSS Development',
    issuer: 'BuildWithAngga',
    issueDate: '2023',
    credentialId: 'BWA-REACT-CSS',
    credentialUrl: 'https://buildwithangga.com',
    logo: '⚛️',
    gradientTop: 'from-[#a7f3d0] to-[#6ee7b7]', // Emerald
    gradientCard: 'to-[#6ee7b7]/15'
  },
  {
    title: 'Database & Java Programming',
    issuer: 'Oracle Academy',
    issueDate: '2022',
    credentialId: 'ORACLE-SQL-JAVA',
    logo: '☕',
    gradientTop: 'from-[#fed7aa] to-[#fdba74]', // Orange
    gradientCard: 'to-[#fdba74]/15'
  },
  {
    title: 'Web & JavaScript Programming',
    issuer: 'Dicoding Indonesia',
    issueDate: '2023',
    credentialId: 'DICODING-WEB-JS',
    credentialUrl: 'https://dicoding.com',
    logo: '📜',
    gradientTop: 'from-[#fed7aa] to-[#fca5a5]', // Coral
    gradientCard: 'to-[#fca5a5]/15'
  }
];

export const CertificatesSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  // Enable horizontal scrolling with mouse wheel when cursor is over the carousel
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Determine vertical scroll input
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 1) return;

      // Always prevent page scroll while mouse cursor is over carousel area
      e.preventDefault();
      e.stopPropagation();

      // User requirement:
      // "scroll mouse keatas itu ke kanan, kalo scroll ke bawah itu ke kiri"
      // deltaY < 0 (scroll ke atas) -> scroll ke kanan (+scrollLeft)
      // deltaY > 0 (scroll ke bawah) -> scroll ke kiri (-scrollLeft)
      const moveDirection = delta > 0 ? -1 : 1;
      const scrollDistance = Math.abs(delta) * 1.5;

      el.scrollBy({
        left: moveDirection * scrollDistance,
        behavior: 'auto'
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current || !carouselRef.current) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 4) {
      hasMovedRef.current = true;
      carouselRef.current.scrollLeft = scrollLeftRef.current - walk * 1.3;
    }
  };

  const handleMouseUp = () => {
    isDownRef.current = false;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 360;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="certificates-section" 
      className="relative w-full pt-20 pb-24 px-0 bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#f0f9ff] text-slate-800 overflow-hidden"
    >
      {/* Decorative ambient glows */}
      <div className="absolute top-[15%] right-[10%] w-[320px] h-[320px] bg-sky-100/40 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[10%] w-[300px] h-[300px] bg-sky-50/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Centered Heading */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-10 relative z-10">
        <p className="text-cyan-600 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Verified Credentials &bull; Certifications
        </p>
        <h2 
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic tracking-wide text-indigo-950 leading-none mb-4 font-script"
        >
          Certificates
        </h2>
        <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Verified technical certifications, specialization credentials, and industry honors.
        </p>
      </div>

      {/* Full Width Edge-to-Edge Scrollable Carousel */}
      <div className="relative w-full z-10">
        <div
          ref={carouselRef}
          data-lenis-prevent="true"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full flex flex-row items-stretch gap-5 md:gap-6 overflow-x-auto py-6 px-4 sm:px-6 md:px-8 snap-x snap-mandatory cursor-grab active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.title}
              className={`
                group relative shrink-0 w-[280px] sm:w-[320px] md:w-[350px] snap-start flex flex-col justify-between rounded-2xl
                bg-gradient-to-b from-white via-white ${cert.gradientCard} p-0 shadow-md 
                hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 
                overflow-hidden h-auto cursor-default border border-slate-200/70 select-none
              `}
            >
              {/* Top photo area - Certificate mockup on soft gradient */}
              <div className={`relative w-full aspect-[1.3/1] bg-gradient-to-br ${cert.gradientTop} flex items-center justify-center p-4 overflow-hidden`}>
                {/* Dynamic light reflection sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out pointer-events-none -skew-x-12" />
                
                {/* Miniature certificate paper mockup */}
                <div className="w-[85%] h-[80%] bg-white/95 rounded-md shadow-lg border border-white/40 p-2.5 flex flex-col justify-between relative select-none">
                  {/* Certificate borders */}
                  <div className="absolute inset-1 border border-indigo-900/10 rounded-[4px]" />
                  
                  {/* Certificate Header */}
                  <div className="flex flex-col items-center">
                    <span className="text-[7px] font-black tracking-widest text-indigo-950/40 uppercase font-display">
                      Certificate of Accomplishment
                    </span>
                    <div className="w-12 h-[1px] bg-indigo-950/20 mt-0.5" />
                  </div>

                  {/* Certificate Logo/Seal */}
                  <div className="flex justify-between items-end px-2">
                    <div className="flex flex-col items-start gap-1">
                      <div className="w-10 h-[1.5px] bg-slate-300 rounded-full" />
                      <div className="w-8 h-[1.5px] bg-slate-200 rounded-full" />
                    </div>
                    {/* Glowing circular gold seal in bottom-right */}
                    <div className="w-4 h-4 rounded-full bg-amber-400/90 shadow-sm border border-amber-300 flex items-center justify-center text-[8px] font-bold text-amber-950">
                      ★
                    </div>
                  </div>

                  {/* Large Centered Emoji Logo for Visual Association */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-2xl filter drop-shadow-md opacity-85 group-hover:scale-115 transition-transform duration-300">
                      {cert.logo}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase">
                    {cert.issuer}
                  </span>
                  <h3 className="text-sm font-extrabold text-indigo-950 mt-1 mb-2 leading-snug group-hover:text-indigo-900 transition-colors">
                    {cert.title}
                  </h3>
                  {cert.credentialId && (
                    <p className="text-slate-400 text-[9px] font-semibold">
                      ID: <span className="text-slate-500 font-mono">{cert.credentialId}</span>
                    </p>
                  )}
                </div>

                {/* Date & Verification Link Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-4">
                  <span className="text-[10px] font-bold text-slate-400">
                    Issued: {cert.issueDate}
                  </span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (hasMovedRef.current) e.preventDefault();
                      }}
                      className="text-[11px] font-bold text-indigo-600 hover:text-indigo-500 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Verify
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <div className="flex items-center justify-center gap-4 mt-6 px-4">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-950 transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous Certificate"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-slate-500 tracking-wider">
            Scroll or Drag to View All
          </span>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 shadow-md flex items-center justify-center text-slate-700 hover:text-indigo-950 transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next Certificate"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
