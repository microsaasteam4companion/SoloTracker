
import React from 'react';

interface OverviewProps {
  username: string;
}

const Overview: React.FC<OverviewProps> = ({ username }) => {
  return (
    <div className="animate-[slideUp_0.6s_ease-out_both] w-full">
      <div className="mb-10 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-2 md:mb-3 tracking-tighter leading-none">
            Welcome, <span className="text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">{username}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-lg">Your founder cockpit is live. What's the target for today?</p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-2 text-right">
           <p className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Current Date</p>
           <p className="text-slate-900 dark:text-white font-black text-xl">Feb 14, 2026</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-12">
        {[
          { label: 'Current Streak', value: '12 days', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'cyan', trend: '+2 today' },
          { label: 'Deep Focus', value: '42.5h', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'purple', trend: 'Top 5% of users' },
          { label: 'Productivity', value: '88%', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'orange', trend: '+12% this week' },
          { label: 'Daily Output', value: '1,240', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', color: 'emerald', trend: 'Stable' },
        ].map((stat, i) => (
          <div key={i} style={{ animationDelay: `${i * 100}ms` }} className="animate-[scaleIn_0.5s_ease-out_both] glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-slate-200 dark:border-white/10 relative overflow-hidden group hover:bg-white/50 dark:hover:bg-white/5 transition-all shadow-sm">
            <div className={`absolute -top-6 -right-6 w-32 h-32 bg-${stat.color}-500/5 dark:bg-${stat.color}-400/5 rounded-full blur-3xl group-hover:bg-${stat.color}-500/10 dark:group-hover:bg-${stat.color}-400/10 transition-all`}></div>
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-${stat.color}-500/10 dark:bg-${stat.color}-400/10 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform`}>
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon} />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</h3>
            <p className={`text-[10px] md:text-[11px] font-bold text-${stat.color}-600/60 dark:text-${stat.color}-400/60 uppercase tracking-wider`}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h3 className="text-[10px] md:text-sm font-black text-slate-400 dark:text-slate-700 uppercase tracking-[0.3em] mb-6 pl-2">Mission Control</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-12">
        {[
          { title: 'Launch Deep Work', desc: 'Focus session for 90m', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'cyan' },
          { title: 'Goal Architect', desc: 'Refine weekly targets', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'purple' },
          { title: 'Social Listening', desc: 'Discovery opportunities', icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0', color: 'amber' },
          { title: 'Performance', desc: 'Deep dive into data', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'emerald' },
        ].map((card, i) => (
          <button key={i} style={{ animationDelay: `${400 + i * 100}ms` }} className="animate-[scaleIn_0.5s_ease-out_both] text-left glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-slate-200 dark:border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/[0.02] dark:hover:bg-cyan-400/[0.02] transition-all group flex flex-col justify-between h-[220px] md:h-[280px] shadow-sm hover:shadow-xl">
            <div className="flex justify-between items-start">
               <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center bg-${card.color}-500/10 dark:bg-${card.color}-400/10 text-${card.color}-600 dark:text-${card.color}-400 shadow-sm group-hover:scale-105 transition-transform`}>
                 <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={card.icon} />
                 </svg>
               </div>
               <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-400/10 transition-all border-slate-200 dark:border-white/5">
                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                 </svg>
               </div>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1 md:mb-2">{card.title}</h4>
              <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-500 font-bold uppercase tracking-widest">{card.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
        {/* Today's Tasks */}
        <div style={{ animationDelay: '800ms' }} className="animate-[slideUp_0.7s_ease-out_both] glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-slate-200 dark:border-white/10 flex flex-col h-[400px] md:h-[500px] shadow-sm">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Daily Roadmap</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">High-leverage tasks for today</p>
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-500/20 dark:border-cyan-400/20 uppercase tracking-widest">Active</span>
              <p className="text-slate-400 dark:text-slate-600 font-bold text-[9px] mt-2 tracking-widest uppercase">0% Complete</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-300 dark:text-slate-800 mb-8 md:mb-10 animate-pulse">
               <svg className="w-10 h-10 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
               </svg>
             </div>
             <p className="text-slate-500 dark:text-slate-500 text-base md:text-lg font-bold max-w-[200px] mb-6 md:mb-8">No high-leverage tasks defined yet.</p>
             <button className="px-8 py-4 md:px-10 md:py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-sm md:text-base font-black rounded-2xl hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all shadow-xl active:scale-95">
               Add Primary Objective
             </button>
          </div>
        </div>

        {/* This Week's Progress */}
        <div style={{ animationDelay: '900ms' }} className="animate-[slideUp_0.7s_ease-out_both] glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-slate-200 dark:border-white/10 flex flex-col h-[400px] md:h-[500px] shadow-sm">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Momentum Tracker</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 font-medium mt-1">Weekly performance breakdown</p>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
            {[
              { label: 'Deep Work Hours', value: '32.5h', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'cyan', progress: 75 },
              { label: 'Revenue Generated', value: '$4,250', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2', color: 'purple', progress: 40 },
              { label: 'Flow Consistency', value: 'High', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'emerald', progress: 92 },
            ].map((row, i) => (
              <div key={i} className="p-4 md:p-8 glass rounded-2xl md:rounded-3xl border-slate-100 dark:border-white/5 flex items-center justify-between group hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-[1rem] md:rounded-2xl bg-${row.color}-500/10 dark:bg-${row.color}-400/10 text-${row.color}-600 dark:text-${row.color}-400 flex items-center justify-center`}>
                    <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={row.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-sm text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mb-1">{row.label}</p>
                    <h4 className="text-xl md:text-3xl font-black text-slate-900 dark:text-white">{row.value}</h4>
                  </div>
                </div>
                <div className="w-16 md:w-32 h-1.5 md:h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                   <div className={`h-full bg-${row.color}-500 dark:bg-${row.color}-400 rounded-full group-hover:w-full transition-all duration-1000`} style={{ width: `${row.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
