import React, { useState, useRef, useEffect, useMemo } from 'react';

type SubFilter = 'All' | 'Backend' | 'Frontend' | 'AI / Fullstack';

interface RepoItem {
  id: string;
  name: string;
  category: 'Backend' | 'Frontend' | 'AI / Fullstack';
  description: string;
  tags: string[];
  language: string;
  langColor: string;
  stars: number;
  forks: number;
  githubUrl: string;
  liveUrl?: string;
}

const REPOSITORIES: RepoItem[] = [
  {
    id: 'alvaya-discord-bot',
    name: 'alvaya-discord-bot',
    category: 'AI / Fullstack',
    description: 'Community management Discord bot equipped with role dispatchers, music streaming queue, moderation filters, and slash command integrations.',
    tags: ['#discord-js', '#automation', '#nodejs', '#bot', '#mysql'],
    language: 'JavaScript',
    langColor: '#f1e05a',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/alvaya-discord-bot',
  },
  {
    id: 'codevas-learning',
    name: 'codevas-learning',
    category: 'Frontend',
    description: 'Interactive frontend coding platform with an in-browser live execution playground, real-time feedback engine, and structured curricula for web architecture.',
    tags: ['#engineering', '#github', '#nextjs', '#react', '#typescript'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 2,
    forks: 0,
    githubUrl: 'https://github.com/herinta/codevas-learning',
  },
  {
    id: 'digisell-frontend',
    name: 'digisell-frontend',
    category: 'Frontend',
    description: 'Modern, high-conversion creator storefront & digital download checkout portal built with React, Vite & Tailwind CSS with instant file delivery access.',
    tags: ['#react', '#vite', '#tailwind-css', '#marketplace'],
    language: 'JavaScript',
    langColor: '#f1e05a',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/digisell-frontend',
  },
  {
    id: 'digisell-backend-api',
    name: 'digisell-backend-api',
    category: 'Backend',
    description: 'High-performance digital products marketplace REST API built with Java Spring Boot, Spring Security, JWT, PostgreSQL & Midtrans payment webhook integration.',
    tags: ['#java', '#spring-boot', '#postgresql', '#midtrans'],
    language: 'Java',
    langColor: '#b07219',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/digisell-backend-api',
  },
  {
    id: 'siakad-backend-api',
    name: 'siakad-backend-api',
    category: 'Backend',
    description: 'Enterprise Academic Information System backend built with Java 17, Spring Boot 4.x, Spring Security 6, JWT, Spring Data JPA & Swagger OpenAPI 3.',
    tags: ['#java', '#spring-boot', '#jwt', '#swagger', '#mysql'],
    language: 'Java',
    langColor: '#b07219',
    stars: 2,
    forks: 1,
    githubUrl: 'https://github.com/herinta/siakad-backend-api',
  },
  {
    id: 'multichat-ai',
    name: 'multichat-ai',
    category: 'AI / Fullstack',
    description: 'Multi-agent conversational AI platform built with Next.js App Router, Supabase, and Google Gemini API supporting persistent multi-persona chat rooms.',
    tags: ['#nextjs', '#gemini-api', '#supabase', '#ai-agents', '#motion'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 3,
    forks: 1,
    githubUrl: 'https://github.com/herinta/multichat-ai',
  },
  {
    id: 'law-firm-haip',
    name: 'law-firm-haip',
    category: 'Frontend',
    description: 'Premium corporate legal portal featuring luxury dark glassmorphism, online attorney consultation booking, and dynamic practice area directories.',
    tags: ['#nextjs', '#typescript', '#tailwind-css', '#corporate'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/law-firm-haip',
    liveUrl: 'https://law-firm-haip.vercel.app',
  },
  {
    id: 'SleepWise',
    name: 'SleepWise',
    category: 'AI / Fullstack',
    description: 'Intelligent circadian health advisor that leverages Google Generative AI to analyze sleep patterns and generate personalized circadian rhythm recovery schedules.',
    tags: ['#nextjs', '#gemini-ai', '#supabase-ssr', '#healthtech'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 2,
    forks: 0,
    githubUrl: 'https://github.com/herinta/SleepWise',
  },
  {
    id: 'mediguard',
    name: 'mediguard',
    category: 'AI / Fullstack',
    description: 'Clinical assistant and medical symptom triaging system powered by generative AI for preliminary patient evaluations and drug interaction safety checks.',
    tags: ['#nextjs', '#gemini-api', '#healthcare', '#ai-triage'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 2,
    forks: 0,
    githubUrl: 'https://github.com/herinta/mediguard',
  },
  {
    id: 'SIMPUS',
    name: 'SIMPUS',
    category: 'Backend',
    description: 'Comprehensive Community Health Center (Puskesmas) management system handling electronic medical records (EMR), patient queues, and pharmacy inventory.',
    tags: ['#nextjs', '#supabase', '#typescript', '#emr'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/SIMPUS',
  },
  {
    id: 'SI-CERDAS-V2-REACT',
    name: 'SI-CERDAS-V2-REACT',
    category: 'Frontend',
    description: 'Psychological and cognitive assessment testing engine featuring real-time automated scoring, test timer controls, and instant evaluation charts.',
    tags: ['#react', '#vite', '#psychometrics', '#assessment-tool'],
    language: 'JavaScript',
    langColor: '#f1e05a',
    stars: 2,
    forks: 1,
    githubUrl: 'https://github.com/herinta/SI-CERDAS-V2-REACT',
    liveUrl: 'https://si-cerdas-v2-react.vercel.app',
  },
  {
    id: 'detikcom-travel',
    name: 'detikcom-travel',
    category: 'AI / Fullstack',
    description: 'High-traffic travel editorial platform and CMS with article publication workflows, destination search indices, and photo story galleries.',
    tags: ['#laravel', '#php', '#blade', '#mysql'],
    language: 'PHP',
    langColor: '#4F5D95',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/detikcom-travel',
    liveUrl: 'https://detiktravel-herinta.vercel.app',
  },
  {
    id: 'sportify',
    name: 'sportify',
    category: 'Frontend',
    description: 'Sports arena and court scheduling platform featuring real-time slot reservation matrices, facility filtering, and instant booking confirmation.',
    tags: ['#nextjs', '#react', '#court-booking', '#tailwind'],
    language: 'TypeScript',
    langColor: '#3178c6',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/sportify',
    liveUrl: 'https://sportify-nu.vercel.app',
  },
  {
    id: 'Foodeli',
    name: 'Foodeli',
    category: 'Frontend',
    description: 'Responsive restaurant food delivery interface with dietary category filtering, animated shopping cart drawer, and frictionless checkout flow.',
    tags: ['#react', '#vite', '#food-delivery', '#e-commerce'],
    language: 'JavaScript',
    langColor: '#f1e05a',
    stars: 1,
    forks: 0,
    githubUrl: 'https://github.com/herinta/Foodeli',
    liveUrl: 'https://foodeli-kohl.vercel.app',
  },
];

export const FullProjectsSection: React.FC = () => {
  const [subFilter, setSubFilter] = useState<SubFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepos = useMemo(() => {
    return REPOSITORIES.filter(repo => {
      if (subFilter !== 'All' && repo.category !== subFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = repo.name.toLowerCase().includes(query);
        const matchesDesc = repo.description.toLowerCase().includes(query);
        const matchesTags = repo.tags.some(t => t.toLowerCase().includes(query));
        const matchesLang = repo.language.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesTags || matchesLang;
      }
      return true;
    });
  }, [subFilter, searchQuery]);

  return (
    <section 
      id="full-projects" 
      className="relative w-full py-24 px-6 md:px-12 bg-gradient-to-b from-[#9ad9ff] via-[#d0ecff] via-35% to-[#f8fafc] text-slate-800 overflow-hidden min-h-[950px]"
    >
      {/* High-performance scoped styles for falling leaves */}
      <style>{`
        @keyframes fall-sway-1 {
          0% { transform: translate3d(0, -60px, 0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.55; }
          100% { transform: translate3d(-140px, 1250px, 0) rotate(360deg); opacity: 0; }
        }
        @keyframes fall-sway-2 {
          0% { transform: translate3d(0, -60px, 0) rotate(0deg); opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { transform: translate3d(160px, 1250px, 0) rotate(-480deg); opacity: 0; }
        }
        @keyframes fall-sway-3 {
          0% { transform: translate3d(0, -60px, 0) rotate(0deg); opacity: 0; }
          12% { opacity: 0.45; }
          88% { opacity: 0.45; }
          100% { transform: translate3d(-70px, 1250px, 0) rotate(240deg); opacity: 0; }
        }
        @keyframes fall-sway-4 {
          0% { transform: translate3d(0, -60px, 0) rotate(0deg); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translate3d(90px, 1250px, 0) rotate(-180deg); opacity: 0; }
        }
        .falling-leaf {
          position: absolute;
          width: 24px;
          height: 24px;
          color: rgba(16, 185, 129, 0.22);
          pointer-events: none;
          z-index: 1;
        }
        .leaf-1 { left: 8%; animation: fall-sway-1 14s infinite linear; }
        .leaf-2 { left: 24%; animation: fall-sway-2 16s infinite linear; animation-delay: 2.5s; }
        .leaf-3 { left: 42%; animation: fall-sway-3 13s infinite linear; animation-delay: 1s; }
        .leaf-4 { left: 58%; animation: fall-sway-4 15s infinite linear; animation-delay: 4.2s; }
        .leaf-5 { left: 74%; animation: fall-sway-1 17s infinite linear; animation-delay: 1.8s; }
        .leaf-6 { left: 90%; animation: fall-sway-2 14.5s infinite linear; animation-delay: 3s; }
      `}</style>

      {/* Decorative ambient glows - Green Earth themed */}
      <div className="absolute top-[10%] left-[5%] w-[320px] h-[320px] bg-emerald-100/35 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[350px] h-[350px] bg-teal-100/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Falling Leaves elements */}
      <svg className="falling-leaf leaf-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C12.5 8 9.5 11 8.5 15.5C8 18 9 20 11.5 20C16 20 19 17 20 12.5C20.5 10 19.5 8 17 8ZM12.7 18.5C11.5 18.5 10.5 17.5 10.7 15.8C11.5 12.5 13.5 10.5 16 10.5C17.2 10.5 18.2 11.5 18 13.2C17.2 16.5 15.2 18.5 12.7 18.5Z" /></svg>
      <svg className="falling-leaf leaf-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C12.5 8 9.5 11 8.5 15.5C8 18 9 20 11.5 20C16 20 19 17 20 12.5C20.5 10 19.5 8 17 8ZM12.7 18.5C11.5 18.5 10.5 17.5 10.7 15.8C11.5 12.5 13.5 10.5 16 10.5C17.2 10.5 18.2 11.5 18 13.2C17.2 16.5 15.2 18.5 12.7 18.5Z" /></svg>
      <svg className="falling-leaf leaf-3" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C12.5 8 9.5 11 8.5 15.5C8 18 9 20 11.5 20C16 20 19 17 20 12.5C20.5 10 19.5 8 17 8ZM12.7 18.5C11.5 18.5 10.5 17.5 10.7 15.8C11.5 12.5 13.5 10.5 16 10.5C17.2 10.5 18.2 11.5 18 13.2C17.2 16.5 15.2 18.5 12.7 18.5Z" /></svg>
      <svg className="falling-leaf leaf-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C12.5 8 9.5 11 8.5 15.5C8 18 9 20 11.5 20C16 20 19 17 20 12.5C20.5 10 19.5 8 17 8ZM12.7 18.5C11.5 18.5 10.5 17.5 10.7 15.8C11.5 12.5 13.5 10.5 16 10.5C17.2 10.5 18.2 11.5 18 13.2C17.2 16.5 15.2 18.5 12.7 18.5Z" /></svg>
      <svg className="falling-leaf leaf-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C12.5 8 9.5 11 8.5 15.5C8 18 9 20 11.5 20C16 20 19 17 20 12.5C20.5 10 19.5 8 17 8ZM12.7 18.5C11.5 18.5 10.5 17.5 10.7 15.8C11.5 12.5 13.5 10.5 16 10.5C17.2 10.5 18.2 11.5 18 13.2C17.2 16.5 15.2 18.5 12.7 18.5Z" /></svg>
      <svg className="falling-leaf leaf-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 8C12.5 8 9.5 11 8.5 15.5C8 18 9 20 11.5 20C16 20 19 17 20 12.5C20.5 10 19.5 8 17 8ZM12.7 18.5C11.5 18.5 10.5 17.5 10.7 15.8C11.5 12.5 13.5 10.5 16 10.5C17.2 10.5 18.2 11.5 18 13.2C17.2 16.5 15.2 18.5 12.7 18.5Z" /></svg>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-10">
          <p className="text-emerald-600 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Open Source &bull; Code &amp; Contributions
          </p>
          <h2 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic tracking-wide text-emerald-950 leading-none mb-4 font-script"
          >
            GitHub Repositories
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-medium">
            Browse through my verified project repositories and architectures authored by Herinta.
          </p>
        </div>

        {/* GitHub Live Green Commit Activity Box (Full width matching cards container) */}
        <div className="w-full mb-10 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-[0_4px_20px_rgba(6,78,59,0.05)] text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-emerald-800" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="font-bold text-sm text-slate-800">GitHub Commit Activity</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="hidden md:inline font-mono text-slate-400">Continuous Integration &bull; Public Activity</span>
              <a 
                href="https://github.com/herinta" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold transition-colors flex items-center gap-1"
              >
                <span>@herinta on GitHub</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

          <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 flex justify-center items-center">
            <img 
              src="https://ghchart.rshah.org/10b981/herinta" 
              alt="Herinta's Live GitHub Contribution Chart" 
              className="w-full max-w-5xl min-w-[700px] h-auto select-none"
              loading="lazy"
            />
          </div>
        </div>

        {/* Filter Bar with Search Box and Categories */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Sub-filter Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Backend', 'Frontend', 'AI / Fullstack'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setSubFilter(filter)}
                className={`
                  px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer
                  ${subFilter === filter
                    ? 'bg-emerald-950 text-white shadow-[0_6px_14px_rgba(6,78,59,0.2)] scale-105'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50/50 hover:border-emerald-300'
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Box on the right */}
          <div className="relative w-full sm:w-64">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter repos / tags..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Repository Cards Grid (3 Columns, Wide & Compact Horizontal Cards) */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-4">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="
                  group relative flex flex-col justify-between rounded-xl border border-slate-200/90
                  bg-white p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_24px_rgba(6,78,59,0.08)] 
                  hover:border-emerald-400/80 hover:-translate-y-0.5 transition-all duration-300 
                  overflow-hidden cursor-default
                "
              >
                <div>
                  {/* Card Header: Repo Book Icon + Name + Public Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {/* GitHub Repo Folder/Book Icon */}
                      <svg
                        className="w-4 h-4 text-emerald-800 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors truncate"
                        title={repo.name}
                      >
                        {repo.name}
                      </a>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500 border border-slate-200/80 px-2 py-0.5 rounded-full bg-slate-50/80 shrink-0">
                      Public
                    </span>
                  </div>

                  {/* Description: Clamped to 2 lines so card stays wide & compact */}
                  <p className="text-slate-600 text-xs leading-relaxed mb-3 font-normal line-clamp-2 min-h-[32px]">
                    {repo.description}
                  </p>

                  {/* Hashtag Topic Badges (Top 3 tags + overflow counter) */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                    {repo.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50/80 text-emerald-900 border border-emerald-200/60 font-medium truncate max-w-[120px]"
                      >
                        {tag}
                      </span>
                    ))}
                    {repo.tags.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-400 font-semibold px-1">
                        +{repo.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Language dot, Stars, Forks & Commits Link */}
                <div className="flex items-center justify-between pt-2.5 mt-auto border-t border-slate-100 text-[11px] text-slate-500">
                  {/* Left: Language indicator + Stars + Forks */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: repo.langColor }}
                      />
                      <span className="font-medium text-slate-700 text-[11px]">{repo.language}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors" title="Stars">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                      <span>{repo.stars}</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors" title="Forks">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3 0v-2.25m3 0v2.25m3 0v-2.25m-12-6.75h12a2.25 2.25 0 012.25 2.25v6.75a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 18v-6.75A2.25 2.25 0 014.5 7.5z" />
                      </svg>
                      <span>{repo.forks}</span>
                    </div>
                  </div>

                  {/* Right: Commits badge button + Repo Link */}
                  <div className="flex items-center gap-1.5">
                    <a
                      href={repo.githubUrl + '/commits'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border border-slate-200/80 hover:border-emerald-200 text-[10px] font-mono transition-colors"
                      title="View Commits"
                    >
                      <span>Commits</span>
                    </a>

                    {repo.liveUrl && (
                      <a
                        href={repo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                        title="Live Demo"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}

                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200/80 transition-colors"
                      title="Open GitHub Repository"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-emerald-950">Looking for more repositories?</h4>
            <p className="text-xs text-slate-500">Over 60+ open-source repositories and contributions are public on GitHub.</p>
          </div>
          <a
            href="https://github.com/herinta?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Visit @herinta on GitHub</span>
            <span className="text-sm">&rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
