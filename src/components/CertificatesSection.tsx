import React from 'react';

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
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google / TensorFlow.org',
    issueDate: '2025',
    credentialId: 'TF-DEV-88391',
    credentialUrl: 'https://www.coursera.org',
    logo: '🤖',
    gradientTop: 'from-[#ffafbd] to-[#ffc3a0]', // Soft Pink/Peach
    gradientCard: 'to-[#ffafbd]/10'
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI / Coursera',
    issueDate: '2024',
    credentialId: 'DL-SPEC-9281',
    credentialUrl: 'https://www.coursera.org',
    logo: '🧠',
    gradientTop: 'from-[#c2e9fb] to-[#a1c4fd]', // Soft Light Blue
    gradientCard: 'to-[#a1c4fd]/10'
  },
  {
    title: 'Architecting on AWS',
    issuer: 'Amazon Web Services',
    issueDate: '2024',
    credentialId: 'AWS-ARCH-5542',
    credentialUrl: 'https://aws.amazon.com',
    logo: '☁️',
    gradientTop: 'from-[#f6d365] to-[#fda085]', // Soft Yellow/Orange
    gradientCard: 'to-[#f6d365]/10'
  },
  {
    title: 'Menjadi React Web Developer Expert',
    issuer: 'Dicoding Indonesia',
    issueDate: '2024',
    credentialId: 'REACT-EXP-7729',
    credentialUrl: 'https://dicoding.com',
    logo: '⚛️',
    gradientTop: 'from-[#84fab0] to-[#8fd3f4]', // Soft Mint/Blue
    gradientCard: 'to-[#84fab0]/10'
  },
  {
    title: 'Back-End Developer Expert',
    issuer: 'Dicoding Indonesia',
    issueDate: '2023',
    credentialId: 'BK-EXP-4410',
    credentialUrl: 'https://dicoding.com',
    logo: '⚙️',
    gradientTop: 'from-[#cd9cf2] to-[#fbc2eb]', // Soft Lavender/Pink
    gradientCard: 'to-[#cd9cf2]/10'
  }
];

export const CertificatesSection: React.FC = () => {
  return (
    <section 
      id="certificates-section" 
      className="relative w-full pt-20 pb-24 px-6 md:px-12 bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#e0f2fe] text-slate-800 overflow-hidden"
    >
      {/* Decorative ambient glows */}
      <div className="absolute top-[15%] right-[10%] w-[320px] h-[320px] bg-sky-200/30 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[280px] h-[280px] bg-teal-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-cyan-600 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
            Verified Credentials &bull; Certifications
          </p>
          <h2 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic tracking-wide text-indigo-950 leading-none mb-6 font-script"
          >
            Certificates
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Verified technical certifications, specialization credentials, and industry honors.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.title}
              className={`
                group relative flex flex-col justify-between rounded-2xl
                bg-gradient-to-b from-white via-white ${cert.gradientCard} p-0 shadow-md 
                hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 
                overflow-hidden h-full cursor-default border border-slate-200/60
              `}
            >
              {/* Top photo area - Certificate mockup on soft gradient */}
              <div className={`relative w-full aspect-[1.3/1] bg-gradient-to-br ${cert.gradientTop} flex items-center justify-center p-4 overflow-hidden`}>
                {/* Dynamic light reflection sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1200ms] ease-out pointer-events-none -skew-x-12" />
                
                {/* Miniature certificate paper mockup */}
                <div className="w-[85%] h-[80%] bg-white/95 rounded-md shadow-lg border border-white/40 p-2 flex flex-col justify-between relative select-none">
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

      </div>
    </section>
  );
};
