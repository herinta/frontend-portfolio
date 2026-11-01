import React from 'react';

interface HonorAwardItem {
  id: string;
  rankBadge: string;
  title: string;
  event: string;
  year: string;
  description: string;
  highlights: string[];
  image: string;
  imageCaption: string;
}

const HONORS_AWARDS_DATA: HonorAwardItem[] = [
  {
    id: 'mapres-ftik-2024',
    rankBadge: '🏆 1st Place Winner',
    title: 'Outstanding Student Award (Mahasiswa Berprestasi 1)',
    event: 'Faculty of Engineering & Computer Science — Universitas Muhammadiyah Semarang (UNIMUS)',
    year: '2024',
    description:
      'Meraih peringkat Terbaik 1 dalam pemilihan Mahasiswa Berprestasi (Pilmapres) tingkat Fakultas Teknik dan Ilmu Komputer UNIMUS melalui penilaian komprehensif meliputi Indeks Prestasi Kumulatif (3.84), karya tulis ilmiah inovatif di bidang teknologi, serta portofolio capaian prestasi dan kepemimpinan organisasi.',
    highlights: ['1st Outstanding Student FTIK', 'Scientific Innovation Paper', 'Academic & Leadership Excellence'],
    image: '/images/lomba/mapres.png',
    imageCaption: 'Penghargaan Juara 1 Mahasiswa Berprestasi FTIK UNIMUS 2024',
  },
  {
    id: 'ihstc-best-presenter-2023',
    rankBadge: '🥇 Best Presenter Winner',
    title: 'Best Presenter Category Winner — International Competition',
    event: 'International Health Science & Technology Competition (IHSTC)',
    year: '2023',
    description:
      'Terpilih sebagai Best Presenter tingkat internasional dalam ajang International Health Science & Technology Competition berkat pemaparan riset solusi teknologi kesehatan berbasis perangkat lunak yang sistematis, komunikatif, dan berdampak langsung bagi pengguna.',
    highlights: ['International Level', 'Health-Tech Innovation', 'Public Speaking & Research Defense'],
    image: '/images/lomba/health-2023.png',
    imageCaption: 'Presentasi & Penghargaan Best Presenter di Ajang Internasional IHSTC 2023',
  },
  {
    id: 'festek-jateng-2023',
    rankBadge: '🥈 2nd Place Winner',
    title: '2nd Place Winner — Web Programming Competition',
    event: 'Festival Technology Jawa Tengah',
    year: '2023',
    description:
      'Meraih Juara 2 cabang lomba Web Programming tingkat Provinsi Jawa Tengah dengan merancang dan membangun aplikasi web full-stack yang responsif, memiliki arsitektur kode yang bersih, performa cepat, serta antarmuka pengguna modern.',
    highlights: ['Regional Jawa Tengah', 'Full-Stack Web Engineering', 'UI/UX & Performance'],
    image: '/images/lomba/web.png',
    imageCaption: 'Juara 2 Lomba Web Programming — Festival Technology Jawa Tengah 2023',
  },
  {
    id: 'apsi-national-2022',
    rankBadge: '🥈 2nd Place Winner',
    title: '2nd Place Winner — Programming Game Competition',
    event: 'APSI National Competition',
    year: '2022',
    description:
      'Memenangkan Juara 2 tingkat Nasional dalam kompetisi pengembangan dan pemrograman gim yang diselenggarakan oleh APSI, menonjolkan logika algoritma permainan interaktif, mekanika gameplay yang kreatif, dan eksekusi teknis yang solid.',
    highlights: ['National Competition', 'Game Logic & Algorithms', 'Interactive Mechanics'],
    image: '/images/lomba/game.png',
    imageCaption: 'Juara 2 Nasional Programming Game — APSI National Competition 2022',
  },
];

export const HonorsAwardsSection: React.FC = () => {
  return (
    <section
      id="honors-awards"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-[#f0f9ff] text-slate-800 overflow-hidden"
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-[15%] left-[8%] w-[380px] h-[380px] bg-sky-200/35 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[8%] w-[380px] h-[380px] bg-indigo-200/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20 md:mb-28">
          <p className="text-cyan-700 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3">
             Competitions &bull; Recognition &bull; Achievements
          </p>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold italic tracking-wide text-indigo-950 leading-none mb-5 font-script">
            Honors &amp; Awards
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Jejak pencapaian kompetisi teknologi, penghargaan akademik, dan rekognisi inovasi di tingkat regional, nasional, hingga internasional.
          </p>
        </div>

        {/* Alternating Left-Right Rows (No Card Wrapper) */}
        <div className="flex flex-col gap-20 md:gap-28">
          {HONORS_AWARDS_DATA.map((item, index) => {
            const isImageRight = index % 2 !== 0;

            return (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center"
              >
                {/* Photo Column — Alternating Left (even index) & Right (odd index) */}
                <div
                  className={`lg:col-span-5 w-full ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="group relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.12)] border border-white/80 bg-slate-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    {/* Year Pill on Corner */}
                    <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-indigo-950/85 backdrop-blur-md text-white text-xs font-mono font-bold shadow">
                      {item.year}
                    </span>

                    {/* Bottom Image Caption */}
                    <p className="absolute bottom-3.5 left-4 right-4 text-left text-white/95 text-xs font-medium leading-snug drop-shadow">
                      {item.imageCaption}
                    </p>
                  </div>
                </div>

                {/* Open Text Description Column (No Card Box) */}
                <div
                  className={`lg:col-span-7 flex flex-col items-start text-left space-y-4 ${
                    isImageRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Number & Rank Badge */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-mono font-black text-sky-600 tracking-widest uppercase">
                      0{index + 1} // AWARD
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-extrabold shadow-2xs">
                      {item.rankBadge}
                    </span>
                  </div>

                  {/* Title & Organizer */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-950 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base font-bold text-sky-700">
                      {item.event}
                    </p>
                  </div>

                  {/* Story / Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlight Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {item.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 text-slate-700 border border-slate-200/90 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

