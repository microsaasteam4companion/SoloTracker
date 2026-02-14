
import React, { useState } from 'react';

const WeeklyGoals: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const days = [
    { name: 'Sun', date: 8 },
    { name: 'Mon', date: 9 },
    { name: 'Tue', date: 10 },
    { name: 'Wed', date: 11 },
    { name: 'Thu', date: 12 },
    { name: 'Fri', date: 13 },
    { name: 'Sat', date: 14, active: true },
  ];

  return (
    <div className="w-full animate-[slideUp_0.6s_ease-out_both]">
      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-cyan-600 dark:text-cyan-400 mb-2 md:mb-3 tracking-tighter">Goal Architect</h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium max-w-xl">Break your long-term vision into concrete, high-leverage weekly targets.</p>
      </div>

      {/* Weekly Goals Card */}
      <div className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-slate-200 dark:border-white/10 mb-8 md:mb-12 animate-[scaleIn_0.6s_ease-out_both_0.2s] relative overflow-hidden group shadow-sm">
        <div className="absolute top-0 right-0 p-8 md:p-12 text-cyan-500/5 dark:text-cyan-400/5 group-hover:scale-110 transition-transform hidden sm:block">
          <svg className="w-32 h-32 md:w-40 md:h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 md:mb-12 relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 md:border-4 border-cyan-500/20 dark:border-cyan-400/20 flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></div>
             </div>
             <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">This Week's Goals</h3>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-6 py-3.5 md:px-8 md:py-4 bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950 text-sm md:text-base font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-all shadow-xl shadow-cyan-500/30 active:scale-95"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            Add Milestone
          </button>
        </div>
        
        <div className="h-1.5 md:h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mb-12 md:mb-16">
           <div className="h-full w-0 bg-cyan-500 dark:bg-cyan-400 transition-all duration-1000 group-hover:w-[5%]"></div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center">
           <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-100 dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-5 md:mb-6 text-slate-300 dark:text-slate-700">
             <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>
           </div>
           <p className="text-slate-500 dark:text-slate-500 text-base md:text-lg font-bold">The canvas is blank. What's the biggest win this week?</p>
        </div>
        
        <div className="flex justify-end gap-2 text-[9px] md:text-[11px] text-slate-400 dark:text-slate-700 font-black uppercase tracking-[0.2em] mt-6 md:mt-8">
           <span>Completion</span>
           <span className="text-cyan-600 dark:text-cyan-400">0%</span>
        </div>
      </div>

      {/* Daily Roadmap */}
      <div className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-slate-200 dark:border-white/10 animate-[slideUp_0.7s_ease-out_both_0.4s] shadow-sm">
        <div className="flex justify-between items-end mb-10 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Execution Roadmap</h3>
          <p className="hidden sm:block text-[10px] md:text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Select Day</p>
        </div>
        
        {/* Scrollable Day Picker for Mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 gap-3 md:gap-4 mb-10 md:mb-12 custom-scrollbar snap-x">
           {days.map((day, i) => (
             <button key={i} className={`flex-1 min-w-[80px] md:min-w-[100px] flex flex-col items-center justify-center p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] transition-all transform hover:-translate-y-1 snap-start ${day.active ? 'bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950 shadow-xl shadow-cyan-500/20' : 'glass border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}>
                <span className="text-[9px] md:text-[11px] uppercase font-black tracking-widest mb-1">{day.name}</span>
                <span className="text-xl md:text-2xl font-black">{day.date}</span>
             </button>
           ))}
        </div>

        <div className="h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mb-10 md:mb-12">
           <div className="h-full w-0 bg-cyan-500/50 dark:bg-cyan-400/50"></div>
        </div>
        
        <div className="relative mb-12 md:mb-16">
          <input 
            type="text" 
            placeholder="Next step?" 
            className="w-full h-16 md:h-20 pl-6 md:pl-10 pr-20 md:pr-24 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] text-slate-900 dark:text-white text-base md:text-xl placeholder-slate-300 dark:placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-bold transition-all shadow-sm"
          />
          <button className="absolute right-2 md:right-3 top-2 md:top-3 w-12 h-12 md:w-14 md:h-14 bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-all shadow-xl active:scale-95">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center py-6 md:py-10 opacity-30">
           <p className="text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase text-[9px] md:text-xs text-center">Awaiting Objectives for February 14</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/60 dark:bg-slate-950/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
          <div className="glass w-full max-w-2xl rounded-[2.5rem] md:rounded-[3.5rem] border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden animate-[scaleIn_0.4s_ease-out] max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/5"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-8 md:p-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 md:mb-10">Architect Weekly Goal</h2>
              <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                <div>
                  <label className="block text-[10px] md:text-sm font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Goal Vision</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Scale to 10k MRR" 
                    className="w-full h-14 md:h-16 px-6 md:px-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white text-lg md:text-xl placeholder-slate-300 dark:placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-sm font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Tactical Details</label>
                  <textarea 
                    placeholder="Specific actions required..." 
                    rows={3}
                    className="w-full p-6 md:p-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl text-slate-900 dark:text-white text-base md:text-lg placeholder-slate-300 dark:placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-medium resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-sm font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Time Budget (Hrs)</label>
                  <input 
                    type="text" 
                    placeholder="e.g., 20" 
                    className="w-full h-14 md:h-16 px-6 md:px-8 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white text-lg md:text-xl placeholder-slate-300 dark:placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-bold"
                  />
                </div>
                <button type="submit" className="w-full h-16 md:h-20 bg-slate-900 dark:bg-cyan-400 text-white dark:text-slate-950 font-black text-lg md:text-xl rounded-2xl hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-all shadow-2xl active:scale-[0.98] mt-4">
                  Commit to Goal
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyGoals;
