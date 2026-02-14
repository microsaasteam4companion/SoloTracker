
import React, { useState } from 'react';

const Analytics: React.FC = () => {
  const [tab, setTab] = useState<'SESSIONS' | 'RGA'>('SESSIONS');

  return (
    <div className="w-full animate-[slideUp_0.6s_ease-out_both]">
      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-cyan-600 dark:text-cyan-400 mb-2 md:mb-3 tracking-tighter">Performance Core</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-xl">Deep analytics to optimize your neural output and business ROI.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-12">
        {[
          { label: 'Deep Time (30d)', value: '142.5h', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'cyan', delay: 100 },
          { label: 'Success Rate', value: '94.2%', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'purple', delay: 200 },
          { label: 'Flow States', value: '28', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'orange', delay: 300 },
          { label: 'Efficiency', value: 'High', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', color: 'emerald', delay: 400 },
        ].map((stat, i) => (
          <div key={i} style={{ animationDelay: `${stat.delay}ms` }} className="animate-[scaleIn_0.5s_ease-out_both] glass p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-slate-200 dark:border-white/10 group hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-${stat.color}-500/10 dark:bg-${stat.color}-400/10 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform`}>
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon} />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-1 md:mb-2">{stat.label}</p>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="mb-8 flex gap-3 md:gap-4 animate-[fadeIn_0.5s_ease-out_both_0.5s]">
        <button 
          onClick={() => setTab('SESSIONS')}
          className={`flex-1 sm:flex-none px-6 py-3 md:px-10 md:py-5 rounded-2xl md:rounded-[2rem] text-sm md:text-lg font-black transition-all ${tab === 'SESSIONS' ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-xl' : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}
        >
          History
        </button>
        <button 
          onClick={() => setTab('RGA')}
          className={`flex-1 sm:flex-none px-6 py-3 md:px-10 md:py-5 rounded-2xl md:rounded-[2rem] text-sm md:text-lg font-black transition-all ${tab === 'RGA' ? 'bg-slate-900 dark:bg-slate-800 text-white shadow-xl' : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}
        >
          Analysis
        </button>
      </div>

      {tab === 'SESSIONS' ? (
        <div className="animate-[scaleIn_0.5s_ease-out_both] glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-slate-200 dark:border-white/10 min-h-[400px] md:min-h-[500px] flex flex-col shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-12">
            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Daily Output Trajectory</h4>
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">30 Day Window</span>
          </div>
          <div className="flex-1 flex items-end justify-between gap-1 sm:gap-3 h-40 md:h-48 border-b border-slate-200 dark:border-white/5 border-l px-4 pb-2">
             {[30, 45, 20, 60, 80, 40, 55, 90, 70, 85, 30, 40, 25, 50, 65, 95, 80, 60, 40, 35, 70, 90, 100, 85, 75, 60, 45, 50, 70, 90].map((h, i) => (
               <div key={i} style={{ height: `${h}%`, animationDelay: `${i * 30}ms` }} className={`flex-1 bg-cyan-500/20 dark:bg-cyan-400/20 rounded-t-sm hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors animate-[slideUp_1s_ease-out_both] ${i % 2 === 0 ? 'block' : 'hidden sm:block'}`}></div>
             ))}
          </div>
          <p className="mt-8 text-center text-slate-400 dark:text-slate-700 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Dataset Analytics - Live</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 animate-[scaleIn_0.5s_ease-out_both]">
          <div className="lg:col-span-2 glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-slate-200 dark:border-white/10 min-h-[400px] md:min-h-[500px] flex flex-col justify-center shadow-sm">
            <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-10 md:mb-12 text-center">Output Leverage (RGA)</h4>
            <div className="flex items-center justify-center relative">
               <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-[24px] md:border-[32px] border-slate-100 dark:border-slate-900 relative shadow-inner">
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">72%</span>
                    <span className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest">Leverage</span>
                  </div>
                  <div className="absolute inset-0 rounded-full border-[24px] md:border-[32px] border-cyan-500/10 dark:border-cyan-400/30 border-t-cyan-500 dark:border-t-cyan-400 border-r-cyan-500/50 dark:border-r-cyan-400/50 transform rotate-45"></div>
               </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 md:mt-16">
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cyan-500 dark:bg-cyan-400"></div>
                 <span className="text-[10px] md:text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Revenue Ops</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200 dark:bg-slate-900"></div>
                 <span className="text-[10px] md:text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Admin</span>
               </div>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
             <h4 className="text-[10px] md:text-sm font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.3em] px-2 text-center md:text-left">Intelligence Insights</h4>
             <div className="p-8 md:p-10 glass rounded-[2rem] md:rounded-[3rem] border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-all text-center md:text-left shadow-sm">
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mb-2 md:mb-3">High Leverage Time</p>
                <h4 className="text-3xl md:text-4xl font-black text-cyan-600 dark:text-cyan-400">102.6h</h4>
             </div>
             <div className="p-8 md:p-10 glass rounded-[2rem] md:rounded-[3rem] border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition-all text-center md:text-left shadow-sm">
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mb-2 md:mb-3">Low Leverage Time</p>
                <h4 className="text-3xl md:text-4xl font-black text-slate-300 dark:text-slate-600">39.9h</h4>
             </div>
             <div className="p-6 md:p-8 bg-cyan-500/5 dark:bg-cyan-400/5 rounded-[2rem] md:rounded-[2.5rem] border border-cyan-500/10 dark:border-cyan-400/10 shadow-sm">
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <span className="text-xl md:text-2xl text-amber-500">⚡</span>
                  <p className="text-[10px] md:text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Advice</p>
                </div>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-bold text-center md:text-left">Your non-RGA time has decreased by 14% this week. Keep automating.</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
