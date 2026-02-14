
import React, { useState, useEffect } from 'react';

const DeepWork: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
  const [workDuration, setWorkDuration] = useState(90);
  const [breakDuration, setBreakDuration] = useState(15);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center animate-[slideUp_0.6s_ease-out_both]">
      <div className="text-center mb-8 md:mb-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Deep Work Cockpit</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg font-medium px-4">Lock in. Achieve more. Focus on what matters.</p>
      </div>

      <div className="mb-8 md:mb-10 animate-[scaleIn_0.5s_ease-out_both_0.2s]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 dark:bg-cyan-400/10 border border-cyan-500/20 dark:border-cyan-400/20 text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-widest">
           <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
           </svg>
           Deep Focus Mode Active
        </div>
      </div>

      <div className="relative flex items-center justify-center w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] mb-8 md:mb-12 animate-[scaleIn_0.7s_ease-out_both_0.3s]">
        <div className="absolute inset-0 rounded-full border-[10px] md:border-[16px] border-slate-200 dark:border-slate-900 shadow-xl"></div>
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="50%" 
            cy="50%" 
            r="46%"
            stroke="currentColor" 
            strokeWidth="10"
            className="text-cyan-500 dark:text-cyan-400 transition-all duration-1000 ease-linear drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] lg:stroke-[16]" 
            fill="transparent" 
            strokeDasharray="1000" 
            strokeDashoffset={1000 - (1000 * (workDuration * 60 - timeLeft) / (workDuration * 60))}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-1 md:mb-2">{formatTime(timeLeft)}</span>
          <span className="text-slate-500 dark:text-slate-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm">
            {isActive ? 'In Progress' : 'Ready'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16 animate-[slideUp_0.5s_ease-out_both_0.5s] px-4">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`h-14 md:h-16 px-8 md:px-12 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-3 font-black text-sm md:text-lg transition-all active:scale-95 shadow-2xl ${
            isActive 
              ? 'bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-800' 
              : 'bg-cyan-500 dark:bg-cyan-400 text-white dark:text-slate-950 hover:bg-cyan-600 dark:hover:bg-cyan-300 shadow-cyan-500/30'
          }`}
        >
          {isActive ? (
            <>
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Start Session
            </>
          )}
        </button>
        <button 
          onClick={() => { setTimeLeft(workDuration * 60); setIsActive(false); }}
          className="h-14 md:h-16 px-6 md:px-10 glass rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-3 text-slate-500 dark:text-slate-400 font-black text-sm md:text-base hover:text-slate-900 dark:hover:text-white transition-all border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`h-14 md:h-16 px-6 md:px-10 glass rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-3 font-black text-sm md:text-base transition-all border-slate-200 dark:border-white/10 ${showSettings ? 'text-slate-900 dark:text-white border-cyan-500 dark:border-cyan-400/50 bg-cyan-500/5 dark:bg-cyan-400/5' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'}`}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
          Config
        </button>
      </div>

      {showSettings && (
        <div className="w-full max-w-md glass p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-slate-200 dark:border-white/10 mb-12 md:mb-16 shadow-2xl animate-[scaleIn_0.3s_ease-out] mx-4">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 text-center md:text-left">Session Settings</h3>
          <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); setShowSettings(false); setTimeLeft(workDuration * 60); }}>
            <div>
              <label className="block text-[10px] md:text-sm font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Work Duration (min)</label>
              <input 
                type="number" 
                value={workDuration} 
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full h-12 md:h-14 px-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-black text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30"
              />
            </div>
            <div>
              <label className="block text-[10px] md:text-sm font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Break Duration (min)</label>
              <input 
                type="number" 
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full h-12 md:h-14 px-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white font-black text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30"
              />
            </div>
            <button type="submit" className="w-full h-14 md:h-16 bg-slate-900 dark:bg-cyan-400 text-white dark:text-slate-950 font-black rounded-2xl hover:bg-slate-800 dark:hover:bg-cyan-300 transition-all shadow-xl active:scale-[0.98]">
               Commit Changes
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 w-full mb-12 md:mb-16 animate-[slideUp_0.5s_ease-out_both_0.6s]">
        <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-slate-200 dark:border-white/5 text-center group hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mb-2 md:mb-3">Session Progress</p>
          <h4 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{Math.floor(progress)}%</h4>
          <div className="mt-4 h-1 w-20 bg-slate-200 dark:bg-slate-900 mx-auto rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 dark:bg-cyan-400" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-slate-200 dark:border-white/5 text-center group hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mb-2 md:mb-3">Time Remaining</p>
          <h4 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">{Math.floor(timeLeft / 60)}m</h4>
          <p className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase mt-2">Focused</p>
        </div>
        <div className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border-slate-200 dark:border-white/5 text-center group hover:bg-white dark:hover:bg-white/5 transition-all shadow-sm">
          <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 font-black uppercase tracking-widest mb-2 md:mb-3">Distractions</p>
          <h4 className="text-3xl md:text-4xl font-black text-slate-400 dark:text-slate-400">0m</h4>
          <p className="text-[9px] md:text-[10px] text-emerald-600 dark:text-emerald-500 font-bold uppercase mt-2">Locked In</p>
        </div>
      </div>

      <div className="animate-[fadeIn_1s_ease-out_both_0.8s] text-slate-500 dark:text-slate-500 text-[10px] md:text-sm font-bold flex items-center gap-3 px-6 py-3 glass rounded-2xl border-slate-200 dark:border-white/5 mx-4 text-center shadow-sm">
         <span className="text-amber-500 text-lg">💡</span>
         Deep focus is a skill. Stay on this screen to maximize neural density.
      </div>
    </div>
  );
};

export default DeepWork;
