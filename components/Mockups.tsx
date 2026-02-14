
import React from 'react';
import AnimatedSection from './AnimatedSection';

const Mockups: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Desktop Dashboard Mockup */}
          <AnimatedSection delay={200} className="relative group">
            <div className="animate-float-slow glass rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative z-10">
              {/* Browser Header */}
              <div className="bg-slate-50 dark:bg-slate-900/90 px-5 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="bg-white dark:bg-slate-950 px-4 py-1.5 rounded-lg text-[11px] font-mono text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-white/5">
                  founderflow.ai/dashboard
                </div>
                <div className="w-10"></div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-8 bg-slate-50/30 dark:bg-slate-950/40 min-h-[450px] flex">
                {/* Sidebar */}
                <div className="w-16 border-r border-slate-200 dark:border-white/5 pr-4 hidden md:flex flex-col gap-6">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className={`h-10 w-10 rounded-xl flex items-center justify-center ${i === 1 ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-500 dark:text-cyan-400' : 'text-slate-300 dark:text-slate-600'}`}>
                       <div className="w-5 h-5 bg-current opacity-30 rounded-sm"></div>
                     </div>
                   ))}
                </div>

                <div className="flex-1 pl-8">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-bold text-lg">Revenue Intelligence</h4>
                      <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Real-time performance metrics</p>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 bg-slate-100 dark:bg-slate-800"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Real Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                      <p className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Weekly MRR</p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">$12,450</span>
                        <span className="text-emerald-500 text-[10px] font-bold pb-1">+14%</span>
                      </div>
                      <div className="mt-3 h-1 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-cyan-400"></div>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 shadow-sm dark:shadow-none">
                      <p className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Focus Time</p>
                      <div className="flex items-end gap-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-white">42.5h</span>
                        <span className="text-cyan-500 text-[10px] font-bold pb-1">Top 5%</span>
                      </div>
                      <div className="mt-3 flex gap-1">
                        {[1, 1, 1, 1, 0, 0, 1].map((v, i) => (
                          <div key={i} className={`h-3 w-full rounded-sm ${v ? 'bg-cyan-500/20 dark:bg-cyan-400/40' : 'bg-slate-100 dark:bg-slate-800'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SVG Chart Area */}
                  <div className="relative h-32 w-full bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 p-4 flex items-end justify-between gap-1 overflow-hidden shadow-inner">
                    <div className="absolute top-4 left-4 text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase">Growth Trajectory</div>
                    <svg className="absolute bottom-0 left-0 w-full h-16 text-cyan-400 opacity-10 dark:opacity-20" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0 20 V10 Q25 5 50 15 T100 5 V20 Z" fill="currentColor" />
                    </svg>
                    {[40, 60, 45, 90, 65, 80, 55, 95, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-cyan-500/10 dark:bg-cyan-400/20 rounded-t-sm relative group/bar" style={{ height: `${h}%` }}>
                        <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Mobile Timer Mockup */}
          <AnimatedSection delay={400} className="flex justify-center relative">
            <div className="animate-float w-[280px] h-[580px] rounded-[3.5rem] border-[12px] border-slate-900 bg-white dark:bg-slate-950 relative shadow-[0_64px_128px_-32px_rgba(0,0,0,0.2)] dark:shadow-[0_64px_128px_-32px_rgba(0,0,0,0.8)] z-10">
              {/* Dynamic Island Area */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 rounded-b-3xl"></div>
              
              <div className="p-8 h-full flex flex-col items-center justify-between">
                <div className="w-full text-center mt-6">
                   <div className="text-[11px] text-slate-400 dark:text-slate-500 mb-2 font-medium">Tuesday, March 14</div>
                   <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                     Session Active
                   </div>
                </div>

                <div className="relative flex items-center justify-center w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-[8px] border-slate-50 dark:border-slate-900 shadow-inner"></div>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="86" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="540" strokeDashoffset="135" className="text-cyan-500 dark:text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">58:24</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1 tracking-widest">Remaining</span>
                  </div>
                </div>

                <div className="w-full space-y-4 mb-4">
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black">Next Task</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Optimize Ad Copy</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 py-4 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl flex items-center justify-center transition-colors cursor-pointer">
                      <svg className="w-5 h-5 text-slate-400 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 9v6m4-6v6" strokeWidth="2.5" strokeLinecap="round"/></svg>
                    </div>
                    <div className="flex-1 py-4 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 rounded-2xl flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/20 cursor-pointer">
                      <svg className="w-5 h-5 text-white dark:text-slate-950" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[120px] -z-10 rounded-full opacity-40"></div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Mockups;
