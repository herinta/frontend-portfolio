import React from 'react';

interface EducationAchievementPhoto {
  src: string;
  caption: string;
  badge: string;
}

interface EducationItem {
  id: string;
  institution: string;
  shortName: string;
  degree: string;
  major: string;
  period: string;
  gpa?: string;
  logo: string;
  storyTitle: string;
  story: string;
  details: string[];
  coursework: string[];
  mainPhoto: EducationAchievementPhoto;
  secondaryPhotos: EducationAchievementPhoto[];
  accentColor: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'unimus',
    institution: 'Universitas Muhammadiyah Semarang (UNIMUS)',
    shortName: 'UNIMUS • Semarang',
    degree: 'Bachelor of Informatics (S.Kom)',
    major: 'Faculty of Engineering and Computer Science (FTIK)',
    period: 'August 2022 – August 2026 (Final Year)',
    gpa: '3.84 / 4.00',
    logo: '🎓',
    storyTitle: 'Perjalanan Akademik & Cerita Prestasi (Mapres 1 FTIK)',
    story:
      'Selama menempuh studi S1 Informatika di UNIMUS, saya aktif menggabungkan keunggulan akademik dengan riset teknologi dan kepemimpinan organisasi. Puncak perjalanan ini adalah terpilihnya saya sebagai Juara 1 Mahasiswa Berprestasi (Mapres) tingkat Fakultas Teknik dan Ilmu Komputer tahun 2024, serta menjuarai berbagai kompetisi teknologi tingkat nasional dan internasional sambil menjadi mentor Web Development bagi mahasiswa di Informatics Study Club.',
    details: [
      '1st Place Winner, Outstanding Student Award (Mahasiswa Berprestasi): Faculty of Engineering and Computer Science 2024.',
      'Best Presenter Category Winner — International Health Science & Technology Competition (IHSTC).',
      'Active Web Development Mentor & Technology Researcher in student organizations (HIMAFOR & Informatics Study Club).',
    ],
    coursework: [
      'Web Programming',
      'Software Engineering',
      'Database Systems',
      'Artificial Intelligence',
      'System Architecture',
    ],
    mainPhoto: {
      src: '/images/lomba/mapres.png',
      caption: 'Dokumentasi Penghargaan Juara 1 Mahasiswa Berprestasi (Mapres) FTIK UNIMUS 2024',
      badge: '🏆 1st Outstanding Student',
    },
    secondaryPhotos: [
      {
        src: '/images/certif/mentor.png',
        caption: 'Mentoring Web Dev & Riset di HIMAFOR / Study Club',
        badge: '👨‍🏫 Mentor & Researcher',
      },
      {
        src: '/images/lomba/health-2023.png',
        caption: 'Presentasi Karya Ilmiah & Kompetisi Inovasi Teknologi',
        badge: '🥇 Best Presenter',
      },
    ],
    accentColor: 'from-sky-400/20 to-indigo-500/20',
  },
  {
    id: 'smk-telkom',
    institution: 'SMK Telkom Sandhy Putra Purwokerto',
    shortName: 'SMK Telkom • Purwokerto',
    degree: 'Vocational High School Diploma',
    major: 'Software Engineering / Rekayasa Perangkat Lunak (RPL)',
    period: '2019 – 2021',
    logo: '🏫',
    storyTitle: 'Fondasi Rekayasa Perangkat Lunak & Program Teaching Factory',
    story:
      'Perjalanan engineering saya dimulai di SMK Telkom Purwokerto jurusan Rekayasa Perangkat Lunak (RPL). Di sini saya terpilih masuk ke dalam program bergengsi TeFa (Teaching Factory) dari Telkom Indonesia, mengerjakan proyek industri nyata dengan standar pengembangan perangkat lunak profesional, serta membangun aplikasi pemantau Covid-19 sebagai proyek akhir kelulusan.',
    details: [
      'Selected to participate in the prestigious TeFa (Teaching Factory) industry program by Telkom Indonesia.',
      'Developed an end-to-end Covid-19 Real-time Tracker application as a Capstone Final Project.',
      'Built strong fundamentals in full-stack web development, mobile apps, and object-oriented programming.',
    ],
    coursework: [
      'Web Programming',
      'Android Programming',
      'Object-Oriented Systems',
      'Relational Databases',
      'UI/UX Design',
    ],
    mainPhoto: {
      src: '/images/p3.svg',
      caption: 'Program Industri TeFa (Teaching Factory) Telkom & Capstone Project RPL',
      badge: '🚀 Telkom TeFa Program',
    },
    secondaryPhotos: [
      {
        src: '/images/p1.svg',
        caption: 'Pengembangan Aplikasi Covid-19 Tracker (Capstone Project)',
        badge: '💻 Capstone Project',
      },
      {
        src: '/images/p2.svg',
        caption: 'Praktikum Software Engineering & Android Development',
        badge: '📱 RPL Engineering',
      },
    ],
    accentColor: 'from-indigo-400/20 to-cyan-500/20',
  },
];

export const EducationSection: React.FC = () => {
  return (
    <div className="relative w-full z-30">
      {/* Cloud border at the top with highest z-index to overlay previous section */}
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none transform -translate-y-[40%]">
        <img
          src="/images/clouds.png"
          alt="Transition clouds top"
          className="w-full h-[150px] md:h-[250px] lg:h-[300px] object-cover object-top opacity-100"
          loading="lazy"
        />
        {/* Seamless white fade at the bottom of the clouds */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Normal vertical scroll section with stacked large cards */}
      <section
        id="education-section"
        className="relative w-full pt-44 sm:pt-52 md:pt-60 pb-28 px-6 md:px-12 bg-gradient-to-b from-white via-[#f0f9ff] to-[#e0f2fe] text-slate-800 overflow-hidden"
      >
        {/* Decorative ambient glows */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[15%] right-[10%] w-[420px] h-[420px] bg-sky-200/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[380px] h-[380px] bg-indigo-200/30 rounded-full blur-[110px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Heading */}
          <div className="text-center mb-16 md:mb-20">
            <p className="text-cyan-600 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
              Academic Background &bull; Degree &amp; Honors
            </p>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic tracking-wide text-indigo-950 leading-none mb-6 font-script">
              Education
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              My academic milestones, honors, and formal engineering background.
            </p>
          </div>

          {/* Stacked Large Education Cards (Atas & Bawah) */}
          <div className="flex flex-col gap-14 md:gap-20 items-center">
            {EDUCATION_DATA.map((edu, index) => (
              <div key={edu.id} className="relative w-full max-w-[1200px]">
                {/* Figma Selection Bounding Box */}
                <div className="absolute inset-[-6px] md:inset-[-12px] border-2 border-dashed border-indigo-400/50 rounded-[2.4rem] pointer-events-none">
                  <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                  <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 bg-indigo-600 border-2 border-white rounded-[2px]" />
                </div>

                {/* Large Education Card */}
                <div
                  className="
                    w-full rounded-[2rem] border border-white/90
                    bg-white/95 backdrop-blur-xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)]
                    grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center
                    relative overflow-hidden
                  "
                >
                  {/* Ambient Gradient Blob inside card */}
                  <div
                    className={`absolute -right-24 -bottom-24 w-96 h-96 bg-gradient-to-br ${edu.accentColor} rounded-full blur-3xl pointer-events-none opacity-60`}
                  />

                  {/* LEFT COLUMN (5 cols): Achievement Photos & Visual Documentation */}
                  <div className="lg:col-span-5 w-full h-full flex flex-col justify-center gap-4 relative z-10 min-w-0">
                    {/* Main Achievement Photo Card */}
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-lg group bg-slate-100">
                      <img
                        src={edu.mainPhoto.src}
                        alt={edu.mainPhoto.caption}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      {/* Top Floating Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-indigo-950 text-xs font-extrabold shadow-md">
                        {edu.mainPhoto.badge}
                      </div>

                      {/* Step Counter Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md text-white text-[11px] font-mono font-bold">
                        0{index + 1} / 0{EDUCATION_DATA.length}
                      </div>

                      {/* Photo Caption */}
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <p className="text-white text-xs sm:text-sm font-semibold leading-snug drop-shadow">
                          {edu.mainPhoto.caption}
                        </p>
                      </div>
                    </div>

                    {/* 2 Secondary Documentation Thumbnails */}
                    <div className="hidden sm:grid grid-cols-2 gap-3">
                      {edu.secondaryPhotos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className="relative rounded-xl overflow-hidden border border-slate-200/90 bg-slate-50 p-2 flex items-center gap-2.5 shadow-xs hover:border-indigo-300 transition-colors"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200 border border-slate-200">
                            <img
                              src={photo.src}
                              alt={photo.caption}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 text-left">
                            <span className="inline-block text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full mb-0.5 truncate max-w-full">
                              {photo.badge}
                            </span>
                            <p className="text-[11px] text-slate-600 font-medium line-clamp-2 leading-tight">
                              {photo.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT COLUMN (7 cols): University Details, Achievement Story & Milestones */}
                  <div className="lg:col-span-7 flex flex-col justify-center items-start text-left relative z-10 min-w-0 space-y-4">
                    {/* Top Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-950 text-white shadow-xs">
                        <span>{edu.logo}</span>
                        <span>{edu.shortName}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {edu.period}
                      </span>
                      {edu.gpa && (
                        <span className="px-3.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-2xs">
                          ★ GPA: {edu.gpa}
                        </span>
                      )}
                    </div>

                    {/* Institution & Degree Heading */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-950 leading-tight">
                        {edu.institution}
                      </h3>
                      <p className="text-sm sm:text-base font-bold text-sky-700 mt-1">
                        {edu.degree} &bull;{' '}
                        <span className="text-slate-500 font-semibold">{edu.major}</span>
                      </p>
                    </div>

                    {/* Achievement Story Box */}
                    <div className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50/90 via-indigo-50/50 to-white border border-sky-200/80 shadow-2xs space-y-1.5">
                      <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                        <span>✨</span>
                        <span>{edu.storyTitle}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {edu.story}
                      </p>
                    </div>

                    {/* Key Milestones & Honors Bullet Points */}
                    <div className="w-full space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Honors &amp; Milestones
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {edu.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span className="leading-relaxed font-medium">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Coursework Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-bold text-slate-400 mr-1">Coursework:</span>
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

