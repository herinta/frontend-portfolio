import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CertificateItem {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string;
  logo: string;
  flatTop?: string;
  borderAccent?: string;
  tagColor?: string;
}

const CERTIFICATES_DATA: CertificateItem[] = [
  // ── 1. Pelatihan & Course Certifications (Dengan Gambar Asli di /images/certif) ──
  {
    title: 'Java Programming',
    issuer: 'Oracle Academy',
    issueDate: '28 Jan 2024',
    credentialId: 'ORACLE-JAVA-DEV',
    image: '/images/certif/java.png',
    logo: '☕',
    flatTop: 'bg-[#fed7aa]',
    borderAccent: 'border-orange-600',
    tagColor: 'bg-orange-100 text-orange-800',
  },
  {
    title: 'Database Programming with SQL',
    issuer: 'Oracle Academy',
    issueDate: '30 Jul 2023',
    credentialId: 'ORACLE-SQL-DEV',
    image: '/images/certif/sql.png',
    logo: '🗄️',
    flatTop: 'bg-[#fecaca]',
    borderAccent: 'border-red-600',
    tagColor: 'bg-red-100 text-red-800',
  },
  {
    title: 'Full-Stack JavaScript Next JS Developer',
    issuer: 'BuildWithAngga',
    issueDate: '28 Oct 2026',
    credentialId: '2WmM3qNAq8',
    credentialUrl: 'https://buildwithangga.com',
    image: '/images/certif/nextjs.png',
    logo: '▲',
    flatTop: 'bg-[#dbeafe]',
    borderAccent: 'border-blue-600',
    tagColor: 'bg-blue-100 text-blue-800',
  },
  {
    title: 'Backend - Node.js',
    issuer: 'MySkill',
    issueDate: '31 Oct 2026',
    credentialId: 'MS-20261031-wmCuc3SuWxlZry4x2bU7',
    image: '/images/certif/nodejs.png',
    logo: '🟢',
    flatTop: 'bg-[#ccfbf1]',
    borderAccent: 'border-teal-600',
    tagColor: 'bg-teal-100 text-teal-800',
  },
  {
    title: 'Backend - Python (Flask)',
    issuer: 'MySkill',
    issueDate: '1 Nov 2026',
    credentialId: 'MS-20261101-uKAHWtvGiUWU4yK9bHEJ',
    image: '/images/certif/py.png',
    logo: '🐍',
    flatTop: 'bg-[#e0f2fe]',
    borderAccent: 'border-sky-600',
    tagColor: 'bg-sky-100 text-sky-800',
  },
  {
    title: 'Backend - Basic Golang',
    issuer: 'MySkill',
    issueDate: '30 Oct 2026',
    credentialId: 'MS-20261030-Vhb6tjTR24qYvG5FgOjH',
    image: '/images/certif/golang.png',
    logo: '🐹',
    flatTop: 'bg-[#cffafe]',
    borderAccent: 'border-cyan-600',
    tagColor: 'bg-cyan-100 text-cyan-800',
  },
  {
    title: 'Frontend Web Development Mentor',
    issuer: 'Informatics Study Club (UNIMUS)',
    issueDate: '2025',
    credentialId: 'ISC-MENTOR-2025',
    image: '/images/certif/mentor.png',
    logo: '👨‍🏫',
    flatTop: 'bg-[#c7d2fe]',
    borderAccent: 'border-indigo-600',
    tagColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    title: 'Master Class: React JS & Tailwind CSS Website Development',
    issuer: 'BuildWithAngga',
    issueDate: '20 May 2024',
    credentialId: 'nZEOmvmVdY',
    credentialUrl: 'https://buildwithangga.com',
    image: '/images/certif/reactjs.png',
    logo: '⚛️',
    flatTop: 'bg-[#bbf7d0]',
    borderAccent: 'border-emerald-600',
    tagColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    issueDate: '20 May 2024',
    credentialId: 'NVP7Q78LWZR0',
    credentialUrl: 'https://www.dicoding.com/certificates/NVP7Q78LWZR0',
    image: '/images/certif/javascript.png',
    logo: '📜',
    flatTop: 'bg-[#fef08a]',
    borderAccent: 'border-amber-600',
    tagColor: 'bg-amber-100 text-amber-800',
  },
  {
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    issueDate: '19 Jun 2022',
    credentialId: 'GRX5L26VRP0M',
    credentialUrl: 'https://www.dicoding.com/certificates/GRX5L26VRP0M',
    image: '/images/certif/dasar-web.png',
    logo: '🌐',
    flatTop: 'bg-[#fed7aa]',
    borderAccent: 'border-orange-600',
    tagColor: 'bg-orange-100 text-orange-800',
  },
];

export const CertificatesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [previewCert, setPreviewCert] = useState<{ src: string; title: string } | null>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Calculate maximum horizontal travel distance
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1.5,
        start: 'top top',
        end: () => `+=${Math.max(window.innerHeight * 4.5, (track.scrollWidth - window.innerWidth) * 2.5)}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#f0f9ff]">
      <section 
        id="certificates-section" 
        className="relative w-full min-h-screen h-screen flex flex-col justify-between pt-16 pb-12 px-0 text-slate-800 overflow-hidden"
      >
        {/* Decorative ambient glows */}
        <div className="absolute top-[15%] right-[10%] w-[320px] h-[320px] bg-sky-100/40 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[10%] w-[300px] h-[300px] bg-sky-50/50 rounded-full blur-[100px] pointer-events-none" />

        {/* Centered Heading */}
        <div className="max-w-4xl mx-auto px-6 text-center mb-6 relative z-10 shrink-0">
          <p className="text-cyan-700 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-2">
            Verified Credentials &bull; Certifications
          </p>
          <h2 
            className="text-4xl sm:text-6xl md:text-7xl font-bold italic tracking-wide text-indigo-950 leading-none mb-3 font-script"
          >
            Certificates
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Scroll down to explore certificates horizontally &bull; Continues page scroll when finished
          </p>
        </div>

        {/* Horizontal Pin-Scrolled Track */}
        <div className="relative w-full z-10 overflow-visible flex items-center my-auto">
          <div
            ref={trackRef}
            className="flex flex-row items-stretch gap-6 sm:gap-8 px-8 sm:px-16 md:px-24 will-change-transform"
          >
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.title}
              className="
                group relative shrink-0 w-[290px] sm:w-[330px] md:w-[350px] snap-start flex flex-col justify-between
                bg-white rounded-2xl border border-slate-200/80 p-0 shadow-md hover:shadow-xl
                hover:-translate-y-2 transition-all duration-300
                overflow-hidden h-auto cursor-default select-none
              "
            >
              {/* Top photo area - Displays real certificate image if available, else flat paper illustration */}
              <div
                onClick={() => cert.image && setPreviewCert({ src: cert.image, title: cert.title })}
                className={`relative w-full aspect-[1.42/1] ${cert.flatTop} flex items-center justify-center p-3 overflow-hidden ${
                  cert.image ? 'cursor-zoom-in' : ''
                }`}
              >
                {cert.image ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden bg-white shadow-sm border border-black/5 flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-indigo-950 text-[11px] font-bold shadow-md">
                        🔍 Lihat Sertifikat
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Flat Paper Certificate Mockup (for competition awards without image file) */
                  <div className="w-[88%] h-[82%] bg-white p-3.5 flex flex-col justify-between relative shadow-sm">
                    {/* Subtle inner paper tone frame */}
                    <div className="absolute inset-1.5 bg-slate-50/60 pointer-events-none" />

                    {/* Certificate Title Banner */}
                    <div className="flex flex-col items-center z-10">
                      <span className="text-[7.5px] font-black tracking-widest text-slate-700 uppercase font-mono">
                        CERTIFICATE OF ACHIEVEMENT
                      </span>
                      <div className="w-12 h-[1px] bg-slate-300 mt-1" />
                    </div>

                    {/* Large Centered Flat Emoji */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                      <span className="text-3xl filter opacity-90 group-hover:scale-110 transition-transform duration-300">
                        {cert.logo}
                      </span>
                    </div>

                    {/* Certificate Footer Lines & Seal */}
                    <div className="flex justify-between items-end px-1 z-10">
                      <div className="flex flex-col items-start gap-1">
                        <div className="w-10 h-[1.5px] bg-slate-300" />
                        <div className="w-6 h-[1.5px] bg-slate-200" />
                      </div>
                      {/* Flat Sharp Badge Seal */}
                      <div className="w-5 h-5 bg-amber-400 flex items-center justify-center text-[10px] font-black text-amber-950 shadow-sm">
                        ★
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Content area */}
              <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                <div>
                  <span className={`inline-block rounded-full text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 ${cert.tagColor}`}>
                    {cert.issuer}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-2.5 mb-2 leading-snug group-hover:text-indigo-950 transition-colors line-clamp-2">
                    {cert.title}
                  </h3>
                  {cert.credentialId && (
                    <p className="text-slate-400 text-[10px] font-medium truncate" title={cert.credentialId}>
                      ID: <span className="font-mono font-semibold text-slate-600">{cert.credentialId}</span>
                    </p>
                  )}
                </div>

                {/* Date & Verification / Preview Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-4">
                  <span className="text-[10px] font-bold text-slate-400">
                    Issued: {cert.issueDate}
                  </span>
                  <div className="flex items-center gap-2.5">
                    {cert.image && (
                      <button
                        type="button"
                        onClick={() => setPreviewCert({ src: cert.image!, title: cert.title })}
                        className="text-[11px] font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer"
                      >
                        Preview
                      </button>
                    )}
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        Verify
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Minimal Scroll Progress / Hint */}
        <div className="flex items-center justify-center gap-3 mt-4 px-4 shrink-0">
          <span className="w-8 h-[2px] bg-slate-300 rounded-full" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Scroll Page to Slide Certificates
          </span>
          <span className="w-8 h-[2px] bg-slate-300 rounded-full" />
        </div>
      </section>

      {/* Lightbox Modal for Certificate Image Preview */}
      {previewCert && (
        <div
          className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="relative max-w-4xl w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between text-white pb-2 border-b border-white/15">
              <span className="text-xs sm:text-sm font-bold truncate pr-4">{previewCert.title}</span>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="px-3.5 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                Tutup ✕
              </button>
            </div>
            <div className="w-full rounded-2xl overflow-hidden bg-white p-2 shadow-2xl">
              <img
                src={previewCert.src}
                alt={previewCert.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
