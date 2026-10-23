import React from 'react';

interface EducationItem {
  institution: string;
  degree: string;
  major?: string;
  period: string;
  details: string[];
  gpa?: string;
  logo: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'Gadjah Mada University',
    degree: 'Bachelor of Engineering (S.T.)',
    major: 'Information Technology / Electrical Engineering',
    period: '2022 - Present (Final Year)',
    gpa: '3.86 / 4.00',
    logo: '🎓',
    details: [
      'Awarded Most Outstanding Student (Mapres) of the Faculty of Engineering.',
      'Specializing in Software Architecture, Full-Stack Web Development, and Artificial Intelligence.',
      'Active Programming Mentor, helping junior undergraduates learn React, Next.js, and clean code principles.'
    ]
  },
  {
    institution: 'Senior High School 1 Surakarta',
    degree: 'Science Major',
    period: '2019 - 2022',
    logo: '🏫',
    details: [
      'Graduated with honors in Natural Sciences.',
      'Active in competitive programming, physics olympiads, and robotics club.'
    ]
  }
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

      <section 
        id="education-section" 
        className="relative w-full pt-24 md:pt-32 pb-24 px-6 md:px-12 bg-gradient-to-b from-white via-[#f0f9ff] to-[#e0f2fe] text-slate-800 overflow-hidden"
      >
        {/* Decorative ambient glows */}
        <div className="absolute top-[15%] right-[10%] w-[320px] h-[320px] bg-sky-200/30 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[280px] h-[280px] bg-sky-200/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Section Heading */}
          <div className="text-center mb-16">
            <p className="text-cyan-600 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
              Academic Background &bull; Degree
            </p>
            <h2 
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold italic tracking-wide text-indigo-950 leading-none mb-6 font-script"
            >
              Education
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto leading-relaxed">
              My academic milestones, honors, and formal engineering background.
            </p>
          </div>

          {/* Education Timeline */}
          <div className="flex flex-col gap-8 md:gap-12 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {EDUCATION_DATA.map((edu) => (
              <div 
                key={edu.institution} 
                className="relative pl-14 md:pl-16 group transition-all duration-300"
              >
                {/* Timeline Node Symbol */}
                <span className="absolute left-2.5 top-0 w-8.5 h-8.5 rounded-full bg-white border-2 border-indigo-600 shadow-md flex items-center justify-center text-lg z-10 group-hover:scale-110 transition-transform duration-300">
                  {edu.logo}
                </span>

                {/* Content Card */}
                <div className="
                  bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 p-6 md:p-8
                  shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden
                ">
                  {/* Subtle sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-slate-50/50 to-transparent transition-transform duration-1000 ease-out pointer-events-none -skew-x-12" />

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-indigo-950 group-hover:text-indigo-900 transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="text-sm font-bold text-indigo-600 mt-0.5">
                        {edu.degree} &bull; <span className="text-slate-500 font-medium">{edu.major}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {edu.period}
                      </span>
                      {edu.gpa && (
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2 text-sm text-slate-600">
                    {edu.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <span className="text-indigo-500 font-bold mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
