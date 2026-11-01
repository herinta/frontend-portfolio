import React from 'react';

interface TechItem {
  name: string;
  role: string;
  badge: string;
  iconBg: string;
  iconText: string;
}

interface TechCategoryColumn {
  title: string;
  subtitle: string;
  accentColor: string;
  badgeClass: string;
  headerIcon: React.ReactNode;
  items: TechItem[];
}

const TECH_COLUMNS: TechCategoryColumn[] = [
  {
    title: 'Framework/Language',
    subtitle: 'Frontend & Backend Frameworks',
    accentColor: 'from-sky-400 to-cyan-300',
    badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
    headerIcon: (
      <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    items: [
      { name: 'React.js', role: 'Frontend UI Library', badge: 'Frontend', iconBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30', iconText: '⚛️' },
      { name: 'Next.js', role: 'Full-Stack React Framework', badge: 'Fullstack', iconBg: 'bg-slate-500/25 text-white border-slate-400/30', iconText: '▲' },
      { name: 'Spring Boot', role: 'Java Enterprise Backend', badge: 'Backend', iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', iconText: '🍃' },
      { name: 'Node.js & Express', role: 'REST API & Runtime', badge: 'Backend', iconBg: 'bg-green-500/20 text-green-300 border-green-400/30', iconText: '🟢' },
      {name: 'Golang', role: 'Static Type-Safe JavaScript', badge: 'Language', iconBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30', iconText: 'G' },
      { name: 'Tailwind CSS', role: 'Utility-First CSS Styling', badge: 'Styling', iconBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30', iconText: '🎨' },
      { name: 'Python', role: 'Backend/Machine Learning', badge: 'Fullstack', iconBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30', iconText: '🔥' },
    ],
  },
  {
    title: 'Database',
    subtitle: 'Data Storage, ORM & Cloud DB',
    accentColor: 'from-teal-400 to-emerald-300',
    badgeClass: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
    headerIcon: (
      <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    items: [
      { name: 'PostgreSQL', role: 'Relational SQL Database', badge: 'RDBMS', iconBg: 'bg-blue-500/20 text-blue-300 border-blue-400/30', iconText: '🐘' },
      { name: 'MySQL', role: 'Relational Database Engine', badge: 'RDBMS', iconBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30', iconText: '🐬' },
      { name: 'Supabase', role: 'Postgres Cloud & Auth BaaS', badge: 'Cloud DB', iconBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30', iconText: '⚡' },
      { name: 'Prisma ORM', role: 'Type-Safe Database Client', badge: 'ORM', iconBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30', iconText: '💎' },
      { name: 'Redis', role: 'In-Memory Caching Store', badge: 'Cache', iconBg: 'bg-red-500/20 text-red-300 border-red-400/30', iconText: '🚀' },
    ],
  },
  {
    title: 'Tools',
    subtitle: 'DevOps, AI APIs & Workflow',
    accentColor: 'from-amber-400 to-orange-300',
    badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
    headerIcon: (
      <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    items: [
      { name: 'Git & GitHub', role: 'Version Control & CI/CD', badge: 'VCS', iconBg: 'bg-slate-500/25 text-slate-200 border-slate-400/30', iconText: '🐙' },
      { name: 'OpenAI & Gemini API', role: 'LLM & Generative AI SDK', badge: 'AI Tools', iconBg: 'bg-purple-500/20 text-purple-300 border-purple-400/30', iconText: '✨' },
      { name: 'Postman & Swagger', role: 'API Testing & OpenAPI Docs', badge: 'API Tool', iconBg: 'bg-orange-500/20 text-orange-300 border-orange-400/30', iconText: '📮' },
      { name: 'Docker', role: 'Containerization & Deploy', badge: 'DevOps', iconBg: 'bg-sky-500/20 text-sky-300 border-sky-400/30', iconText: '🐳' },
      { name: 'Figma', role: 'UI/UX Design & Prototyping', badge: 'Design', iconBg: 'bg-pink-500/20 text-pink-300 border-pink-400/30', iconText: '🎯' },
    ],
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="relative w-full py-20 md:py-28 flex flex-col items-center justify-start overflow-hidden z-20 select-none bg-gradient-to-b from-[#0b1e3b] via-[#0f2b4e] to-[#153b67]"
    >
      {/* Section Title */}
      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center shrink-0 mb-12 md:mb-16 px-4 text-center">
        <p className="text-cyan-300/80 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Engineering Arsenal &bull; Modern Ecosystem
        </p>
        <h2
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-medium italic text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-100 to-sky-200 select-none leading-tight font-script"
        >
          My Tech Stack
        </h2>
      </div>

      {/* 3 Columns Grid: Framework | Database | Tools */}
      <div className="relative w-full max-w-6xl px-6 md:px-10 z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TECH_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col space-y-4">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-sky-300/15">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 shadow-sm">
                    {column.headerIcon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
                      {column.title}
                    </h3>
                    <p className="text-xs text-cyan-200/60 font-medium">
                      {column.subtitle}
                    </p>
                  </div>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${column.badgeClass}`}>
                  {column.items.length}
                </span>
              </div>

              {/* List of Rectangular Cards (Each Tech in its Own Rectangular Box) */}
              <div className="flex flex-col gap-3">
                {column.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="
                      group relative w-full rounded-xl bg-[#0d223f]/90 hover:bg-[#132f54]
                      border border-sky-400/20 hover:border-sky-300/60
                      px-4 py-3.5 flex items-center justify-between gap-3
                      transition-all duration-300 hover:-translate-y-0.5
                      shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(14,165,233,0.18)]
                      cursor-default
                    "
                  >
                    {/* Left: Tech Icon Box + Name & Subtitle */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-lg border flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-110 transition-transform duration-300 ${tech.iconBg}`}
                      >
                        {tech.iconText}
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors truncate">
                          {tech.name}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-cyan-100/60 truncate">
                          {tech.role}
                        </p>
                      </div>
                    </div>

                    {/* Right: Badge Pill */}
                    <span className="shrink-0 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-md bg-white/[0.05] text-cyan-200/80 border border-white/10 group-hover:border-sky-400/40 group-hover:text-white transition-colors">
                      {tech.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

