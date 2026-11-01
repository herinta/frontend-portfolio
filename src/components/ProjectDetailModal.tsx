import React, { useState, useEffect } from 'react';
import type { ProjectDetail, DatabaseTable } from '../data/projectDetailsData';

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [selectedDbTable, setSelectedDbTable] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  // Close on Escape key press & prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, previewImage]);

  // Reset selected table when project changes or modal opens
  useEffect(() => {
    if (project) {
      setSelectedDbTable(project.databaseDesign.tables[0]?.name || null);
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col bg-[#f4f8fc]/95 backdrop-blur-2xl text-slate-800 overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
    >
      {/* ─── LIGHT AMBIENT BACKGROUND ────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Soft Ambient Sky Light Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-sky-200/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[350px] bg-indigo-100/60 rounded-full blur-[140px] pointer-events-none" />

      {/* ─── TOP STICKY HEADER (No Tabs, Clean Action Bar) ───────────────────── */}
      <header className="relative z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
        {/* Left: Project Title */}
        <div className="flex items-center min-w-0">
          <h2 className="text-base sm:text-lg font-extrabold text-indigo-950 truncate font-display">
            {project.title}
          </h2>
        </div>

        {/* Right: Action Links & Close */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Open Live Website"
            >
              <span>Live Web</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
              title="View Source on GitHub"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}

          {/* Close button with ESC indicator */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 text-xs font-semibold transition-all cursor-pointer group"
            title="Close modal (Esc)"
          >
            <span>Close</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white text-[10px] text-slate-500 font-mono border border-slate-200 group-hover:border-red-200">
              ESC
            </kbd>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      {/* ─── SCROLLABLE CONTENT BODY (Single Page Scroll Layout) ─────────────── */}
      <main 
        className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 md:px-12 py-8 max-w-7xl mx-auto w-full space-y-16"
        data-lenis-prevent="true"
      >
        {/* ── 1. HERO & OVERVIEW SECTION ── */}
        <section className="space-y-10 animate-fadeIn">
          {/* Top Project Hero Banner with Figma-inspired selection border */}
          <div className="relative">
            {/* Figma Canvas Dashed Bounding Frame */}
            <div className="absolute inset-[-8px] md:inset-[-12px] border-2 border-dashed border-indigo-400/40 rounded-[2.5rem] pointer-events-none origin-center">
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-indigo-600 border-2 border-white rounded-[2px]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-indigo-600 border-2 border-white rounded-[2px]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-indigo-600 border-2 border-white rounded-[2px]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-indigo-600 border-2 border-white rounded-[2px]" />
            </div>

            {/* The Actual Banner Card (Clean White) */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gradient-to-br from-sky-200/40 to-indigo-200/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold">
                    <span>{project.category}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold italic tracking-wide text-indigo-950 leading-tight font-script drop-shadow-xs">
                    {project.title}
                  </h1>

                  <p className="text-base sm:text-lg text-sky-700 font-semibold leading-relaxed">
                    {project.tagline}
                  </p>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                    {project.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-semibold">Role</span>
                      <span className="text-xs sm:text-sm font-bold text-indigo-950">{project.role}</span>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-semibold">Timeline</span>
                      <span className="text-xs sm:text-sm font-bold text-indigo-950">{project.timeline}</span>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono font-semibold">Status</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-700">{project.status}</span>
                    </div>
                  </div>
                </div>

                {/* Right side: Mockup preview */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-md rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-50 p-2.5 group">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200/60">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                        <span className="font-mono text-[11px] bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur">
                          {project.title.toLowerCase().replace(/\s+/g, '')}.app
                        </span>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-950 hover:bg-indigo-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow transition-all inline-flex items-center gap-1"
                          >
                            <span>Demo</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Problem & Solution Cards (Light Theme) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-rose-50/70 border border-rose-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider font-mono">
                <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>The Problem / Challenge</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider font-mono">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>The Engineering Solution</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold italic text-indigo-950 font-script">
                Key Capabilities &amp; Features
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">Core architectural components and functional modules.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-300 transition-all hover:-translate-y-1 group shadow-xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-110 transition-transform font-mono">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-indigo-950 mb-1.5">{feat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. TECH STACK SECTION (Small Cards in 1 Row) ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold italic text-indigo-950 font-script">
                Tech Stack Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">Teknologi utama yang digunakan dalam ekosistem sistem.</p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              {project.techStacks.length} Technologies
            </span>
          </div>

          {/* 1 Row Horizontal Layout */}
          <div className="flex items-stretch gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {project.techStacks.map((tech, idx) => (
              <div
                key={idx}
                className="shrink-0 w-52 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-mono ${
                      tech.category === 'Frontend' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                      tech.category === 'Backend' ? 'bg-teal-100 text-teal-800 border border-teal-200' :
                      tech.category === 'Database' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      tech.category === 'AI & Tools' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                      'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}>
                      {tech.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                  </div>

                  <h4 className="text-sm font-bold text-indigo-950 font-display truncate" title={tech.name}>
                    {tech.name}
                  </h4>
                  <p className="text-[11px] text-sky-700 font-semibold truncate mt-0.5" title={tech.role}>
                    {tech.role}
                  </p>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 pt-2 border-t border-slate-100 leading-snug" title={tech.reason}>
                  {tech.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. SYSTEM DESIGN & FLOWCHART SECTION ── */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold italic text-indigo-950 font-script">
              System Design &amp; Architecture Flowchart
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {project.systemDesign.overview}
            </p>
          </div>

          {/* Main Flowchart Image Display Card (Light Frame) */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 space-y-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-slate-600 font-semibold ml-2">
                  {(project.systemDesign.diagramImage || '/images/dummy-system-architecture.jpg').split('/').pop()}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  Blueprint Flowchart
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewImage({
                    src: project.systemDesign.diagramImage || '/images/dummy-system-architecture.jpg',
                    title: `${project.title} - System Architecture Flowchart`
                  })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  <span>Perbesar Diagram</span>
                </button>

                <a
                  href={project.systemDesign.diagramImage || '/images/dummy-system-architecture.jpg'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                  title="Buka Gambar Tab Baru"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Flowchart Image Showcase */}
            <div
              onClick={() => setPreviewImage({
                src: project.systemDesign.diagramImage || '/images/dummy-system-architecture.jpg',
                title: `${project.title} - System Architecture Flowchart`
              })}
              className="relative rounded-2xl overflow-hidden border border-slate-300 bg-white cursor-zoom-in group aspect-[16/9] flex items-center justify-center shadow-xs"
            >
              <img
                src={project.systemDesign.diagramImage || '/images/dummy-system-architecture.jpg'}
                alt="System Architecture Flowchart"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white text-slate-900 border border-slate-300 text-xs font-bold shadow-xl flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  Klik untuk Memperbesar Flowchart
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-mono">
              <span>Format: 16:9 HD Architecture Blueprint</span>
              <span className="text-indigo-600 font-semibold">
                {project.systemDesign.diagramImage || '/images/dummy-system-architecture.jpg'}
              </span>
            </div>
          </div>

          {/* Step-by-Step Request Lifecycle */}
          <div className="space-y-3">
            <h4 className="text-xl sm:text-2xl font-bold italic text-indigo-950 font-script">
              Data Flow &amp; Request Lifecycle
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.systemDesign.dataFlow.map(flow => (
                <div
                  key={flow.step}
                  className="p-5 rounded-3xl bg-white border border-slate-200/80 space-y-2 relative shadow-xs"
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-950 text-white font-bold text-xs flex items-center justify-center font-mono shadow-xs">
                    {flow.step}
                  </div>
                  <h5 className="text-sm font-bold text-indigo-950">{flow.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{flow.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. DATABASE DESIGN & ERD SECTION ── */}
        <section className="space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold italic text-indigo-950 font-script">
              Database Schema &amp; ERD Diagram
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {project.databaseDesign.overview}
            </p>
          </div>

          {/* Main ERD Image Display Card (Light Frame) */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-4 sm:p-6 space-y-4 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-slate-600 font-semibold ml-2">
                  {(project.databaseDesign.erdImage || '/images/dummy-database-erd.jpg').split('/').pop()}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  ERD Architecture
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewImage({
                    src: project.databaseDesign.erdImage || '/images/dummy-database-erd.jpg',
                    title: `${project.title} - Database ERD Schema`
                  })}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  <span>Perbesar ERD</span>
                </button>

                <a
                  href={project.databaseDesign.erdImage || '/images/dummy-database-erd.jpg'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
                  title="Buka Gambar Tab Baru"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* ERD Image Showcase */}
            <div
              onClick={() => setPreviewImage({
                src: project.databaseDesign.erdImage || '/images/dummy-database-erd.jpg',
                title: `${project.title} - Database ERD Schema`
              })}
              className="relative rounded-2xl overflow-hidden border border-slate-300 bg-white cursor-zoom-in group aspect-[16/9] flex items-center justify-center shadow-xs"
            >
              <img
                src={project.databaseDesign.erdImage || '/images/dummy-database-erd.jpg'}
                alt="Database ERD Schema Diagram"
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-white text-slate-900 border border-slate-300 text-xs font-bold shadow-xl flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  Klik untuk Memperbesar ERD
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-mono">
              <span>Relasi Tabel: 1:N Referential Integrity</span>
              <span className="text-indigo-600 font-semibold">
                {project.databaseDesign.erdImage || '/images/dummy-database-erd.jpg'}
              </span>
            </div>
          </div>

          {/* Table Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs text-slate-600 font-mono font-bold mr-2">Inspector:</span>
            {project.databaseDesign.tables.map(table => (
              <button
                key={table.name}
                type="button"
                onClick={() => setSelectedDbTable(table.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  selectedDbTable === table.name
                    ? 'bg-indigo-950 text-white shadow-xs border border-indigo-950 font-bold'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{table.name}</span>
                <span className="text-[10px] text-slate-400">({table.fields.length})</span>
              </button>
            ))}
          </div>

          {/* Tables Detail Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Selected Table Fields Card */}
            <div className="lg:col-span-8 rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-md">
              {(() => {
                const currentTable: DatabaseTable | undefined = project.databaseDesign.tables.find(
                  t => t.name === (selectedDbTable || project.databaseDesign.tables[0]?.name)
                );

                if (!currentTable) return null;

                return (
                  <div>
                    {/* Table Header */}
                    <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🗄️</span>
                          <h4 className="text-base font-bold text-indigo-950 font-mono">{currentTable.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{currentTable.description}</p>
                      </div>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs">
                        {currentTable.fields.length} Columns
                      </span>
                    </div>

                    {/* Fields Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100/60 text-slate-600 uppercase font-mono tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="py-3.5 px-4 font-bold">Column Name</th>
                            <th className="py-3.5 px-4 font-bold">Data Type</th>
                            <th className="py-3.5 px-4 font-bold">Key Constraints</th>
                            <th className="py-3.5 px-4 font-bold">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono">
                          {currentTable.fields.map((f, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                              <td className="py-3 px-4 text-indigo-950 font-bold flex items-center gap-2">
                                <span>{f.name}</span>
                              </td>
                              <td className="py-3 px-4 text-sky-700">
                                <span className="px-2 py-0.5 rounded bg-sky-50 border border-sky-200 text-[11px] font-semibold">
                                  {f.type}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {f.isPk && (
                                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold mr-1">
                                      PRIMARY KEY (PK)
                                    </span>
                                )}
                                {f.isFk && (
                                    <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-bold">
                                      FOREIGN KEY (FK)
                                    </span>
                                )}
                                {!f.isPk && !f.isFk && (
                                    <span className="text-slate-400 text-[11px]">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-slate-600 font-sans text-xs">
                                {f.desc || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Table Relationships & ERD Summary */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-3 shadow-md">
                <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs uppercase tracking-wider font-mono">
                  <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>Entity Relationships (ERD)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Relasi data dirancang dengan referential integrity ketat dan composite B-Tree indexes.
                </p>

                <div className="space-y-2 pt-2">
                  {project.databaseDesign.relationships.map((rel, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-indigo-950 font-semibold"
                    >
                      {rel}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-200 space-y-2 shadow-xs">
                <h5 className="text-xs font-bold text-indigo-950 uppercase tracking-wider font-mono">
                  Indexing &amp; Performance Strategy
                </h5>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Setiap tabel mengimplementasikan composite index pada field filter utama (seperti <code className="text-indigo-800 font-bold">user_id</code> dan <code className="text-indigo-800 font-bold">created_at</code>) untuk scanning konstan O(log N).
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FULL-RESOLUTION LIGHTBOX MODAL ─────────────────────────────────── */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="relative max-w-6xl w-full flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Toolbar */}
            <div className="w-full flex items-center justify-between pb-2 text-white border-b border-white/15">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-sm sm:text-base font-bold font-mono text-white">
                  {previewImage.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all inline-flex items-center gap-1.5"
                >
                  <span>Buka Tab Baru</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="px-3.5 py-1 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
                >
                  Tutup [ESC]
                </button>
              </div>
            </div>

            {/* Lightbox Image Container */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-300 shadow-2xl bg-white max-h-[82vh] flex items-center justify-center p-2">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─── BOTTOM CTA BAR ─────────────────────────────────────────────────── */}
      <footer className="relative z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-sky-700 font-mono font-semibold">Portfolio Detail •</span>
          <span className="text-indigo-950 font-bold">{project.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-indigo-950 hover:bg-indigo-900 text-white font-bold transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
          >
            Tutup Modal
          </button>
        </div>
      </footer>
    </div>
  );
};
