'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faClipboardList, faCalendarDays, faCheck, faInbox, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { ExperienceData } from '../../types';
import Button from '../ui/Button';

interface Props {
  data: ExperienceData[];
}

export default function ExperienceSection({ data }: Props) {
  const [activeTab, setActiveTab] = useState<'formal' | 'pkl'>('formal');

  const formalExps = data.filter((e) => e.type === 'formal');
  const pklExps    = data.filter((e) => e.type === 'pkl');
  const displayed  = activeTab === 'formal' ? formalExps : pklExps;

  const tabs = [
    { id: 'formal' as const, label: 'Formal',  icon: faSchool        },
    { id: 'pkl'    as const, label: 'PKL',     icon: faClipboardList },
  ];

  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      {/* Background Decorative Elements (Matching About Section) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative blobs */}
        <div className="absolute -top-16 right-0 w-72 h-72 rounded-xs opacity-20 animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #f9c6d3, transparent)', filter: 'blur(70px)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-xs opacity-20 animate-pulse-slower"
          style={{ background: 'radial-gradient(circle, #e0bbff, transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-xs opacity-10 animate-pulse"
          style={{ background: 'radial-gradient(circle, #fce7f3, transparent)', filter: 'blur(50px)', animationDelay: '1s' }} />
        
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(190,24,93,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(190,24,93,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-40 left-20 w-20 h-20 border-2 border-pink-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-32 right-16 w-16 h-16 border-2 border-purple-400/10 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-5">
            <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-purple-400" />
          </div>
          
          <h2 className="section-title text-4xl md:text-5xl font-bold animate-fade-in delay-100 mb-4 relative">
            Experience
            {/* Decorative dots */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400/30"></div>
            </div>
          </h2>
          
          <p className="section-subtitle mx-auto text-center animate-fade-in delay-200 text-slate-600 max-w-2xl mb-6">
            My professional journey in the field of English language education.
          </p>
          
          <div className="w-16 h-1 rounded-xs mx-auto animate-fade-in delay-300 relative" 
            style={{background: 'linear-gradient(90deg, #be185d, #e0bbff)'}}>
            {/* Small accent circles on line */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-500"></div>
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-16 animate-fade-in delay-100 relative">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              className={`inline-flex items-center gap-2 px-7 py-2.5 rounded-xs font-semibold text-sm transition-all duration-300 border-2 focus:outline-none relative overflow-hidden group ${
                activeTab === tab.id
                  ? 'bg-pink-50 text-pink-600 border-pink-400 shadow-md scale-105'
                  : 'bg-white text-slate-500 border-pink-100 hover:text-pink-500 hover:bg-pink-50/50 hover:border-pink-300 shadow-sm'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 text-pink-500' : 'group-hover:scale-110'}`} />
              <span className="relative z-10">{tab.label}</span>
              
              {/* Tab Hover/Active Sparkle Effect */}
              {activeTab === tab.id && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full"></div>
              )}
            </Button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto animate-fade-in delay-200">
          {/* Vertical line (desktop) with gradient matching About */}
          <div className="absolute left-6 top-6 bottom-6 w-px hidden md:block bg-gradient-to-b from-transparent via-pink-300 to-transparent opacity-50" />

          {displayed.length > 0 ? (
            <div className="space-y-8">
              {displayed.map((exp, index) => (
                <div key={exp.id ?? index} className="relative flex flex-col md:flex-row gap-6 md:pl-16 group">
                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:flex absolute left-3.5 top-8 w-6 h-6 rounded-full bg-pink-50 border-4 border-white shadow-md items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-pink-100">
                    <FontAwesomeIcon icon={exp.type === 'pkl' ? faClipboardList : faSchool} className="w-3 h-3 text-pink-500" />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-pink-400 opacity-0 group-hover:opacity-40 blur-sm transition-opacity"></div>
                  </div>

                  {/* Card (Styled to match InfoCards and Text in AboutSection) */}
                  <div className="card flex-1 rounded-xs shadow border-2 border-pink-100/50 bg-white bg-opacity-90 p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1 relative overflow-hidden group/card">
                    
                    {/* Left accent bar */}
                    <div className="absolute -left-0.5 top-6 bottom-6 w-1 bg-gradient-to-b from-pink-500 to-purple-400 rounded-r-full opacity-70 group-hover/card:opacity-100 transition-opacity"></div>

                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                      <div className="absolute top-0 right-0 w-full h-full bg-pink-50 opacity-50 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover/card:bg-purple-50 transition-colors"></div>
                    </div>

                    {/* Hover sparkle effect */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>

                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4 relative">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-800 group-hover/card:text-pink-600 transition-colors">{exp.title}</h3>
                        <p className="text-pink-500 font-semibold text-sm mt-1">{exp.institution}</p>
                      </div>
                      {exp.period && (
                        <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1.5 rounded-xs border border-purple-200 shadow-sm">
                          <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
                          {exp.period}
                        </span>
                      )}
                    </div>

                    {exp.description && (
                      <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 pl-1">
                        {exp.description}
                      </p>
                    )}

                    {exp.responsibilities.length > 0 && (
                      <ul className="space-y-3 mt-4">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 hover:text-slate-900 transition-colors">
                            <span className="mt-0.5 shrink-0 w-5 h-5 rounded-xs bg-pink-50 flex items-center justify-center border border-pink-200">
                              <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5 text-pink-500" />
                            </span>
                            <span className="leading-relaxed">{r}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xs border-2 border-dashed border-pink-200">
              <FontAwesomeIcon icon={faInbox} className="w-12 h-12 mx-auto mb-4 text-pink-300 opacity-50" />
              <p className="text-lg text-slate-500 font-medium">Belum ada data pengalaman.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}