import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface DeepWorkProps {
  user: User;
}

const DeepWork: React.FC<DeepWorkProps> = ({ user }) => {
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem('deep_focus_isActive') === 'true';
  });
  const [showSettings, setShowSettings] = useState(false);
  const [workDuration, setWorkDuration] = useState(() => {
    return Number(localStorage.getItem('deep_focus_workDuration')) || 90;
  });
  const [breakDuration, setBreakDuration] = useState(() => {
    return Number(localStorage.getItem('deep_focus_breakDuration')) || 15;
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('deep_focus_timeLeft');
    const startTime = localStorage.getItem('deep_focus_startTime');
    const active = localStorage.getItem('deep_focus_isActive') === 'true';

    if (active && startTime) {
      const elapsed = Math.floor((Date.now() - Number(startTime)) / 1000);
      const remaining = (Number(savedTime) || (workDuration * 60)) - elapsed;
      return Math.max(0, remaining);
    }
    return Number(savedTime) || (workDuration * 60);
  });

  const [saving, setSaving] = useState(false);
  const [distractions, setDistractions] = useState(() => {
    return Number(localStorage.getItem('deep_focus_distractions')) || 0;
  });
  const [todayTotal, setTodayTotal] = useState(0);

  useEffect(() => {
    localStorage.setItem('deep_focus_workDuration', workDuration.toString());
  }, [workDuration]);

  useEffect(() => {
    localStorage.setItem('deep_focus_breakDuration', breakDuration.toString());
  }, [breakDuration]);

  useEffect(() => {
    localStorage.setItem('deep_focus_isActive', isActive.toString());
    if (isActive) {
      if (!localStorage.getItem('deep_focus_startTime')) {
        localStorage.setItem('deep_focus_startTime', Date.now().toString());
        localStorage.setItem('deep_focus_timeLeft', timeLeft.toString());
      }
    } else {
      localStorage.removeItem('deep_focus_startTime');
      localStorage.setItem('deep_focus_timeLeft', timeLeft.toString());
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        localStorage.setItem('deep_focus_timeLeft', timeLeft.toString());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isActive, timeLeft]);

  useEffect(() => {
    localStorage.setItem('deep_focus_distractions', distractions.toString());
  }, [distractions]);

  const clearPersistence = () => {
    localStorage.removeItem('deep_focus_isActive');
    localStorage.removeItem('deep_focus_startTime');
    localStorage.removeItem('deep_focus_timeLeft');
    localStorage.removeItem('deep_focus_distractions');
  };

  const fetchTodayStats = useCallback(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const { data, error } = await supabase
        .from('deep_work_sessions')
        .select('duration_minutes')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('created_at', today.toISOString());

      if (error) throw error;

      const total = data.reduce((acc, curr) => acc + (curr.duration_minutes || 0), 0);
      setTodayTotal(total);
    } catch (err) {
      console.error('Failed to fetch today stats:', err);
    }
  }, [user.id]);

  useEffect(() => {
    fetchTodayStats();
  }, [fetchTodayStats]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        setDistractions((prev) => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          const nextTime = time - 1;
          if (nextTime % 5 === 0) localStorage.setItem('deep_focus_timeLeft', nextTime.toString());
          return nextTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleComplete = async () => {
    const totalSessionSeconds = workDuration * 60;
    const elapsedSeconds = totalSessionSeconds - timeLeft;
    const elapsedMinutes = Math.max(1, Math.floor(elapsedSeconds / 60));

    setIsActive(false);
    setSaving(true);
    clearPersistence();
    try {
      const { error } = await supabase.from('deep_work_sessions').insert({
        user_id: user.id,
        duration_minutes: elapsedMinutes,
        status: 'completed',
        end_time: new Date().toISOString(),
      });
      if (error) throw error;
      await fetchTodayStats();
      setTimeLeft(workDuration * 60);
      alert(`Session saved: ${elapsedMinutes} minutes recorded.`);
    } catch (err) {
      console.error('Failed to save session:', err);
    } finally {
      setSaving(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100;

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center animate-[slideUp_0.5s_ease-out_both]">
      <div className="w-full">
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Deep Work</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">Focus timer and session tracking</p>
          </div>
        </div>

        <div className="mb-6 animate-[scaleIn_0.4s_ease-out_both_0.1s]">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${isActive ? 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-400/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10'}`}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            {isActive ? 'Session Active' : 'Ready'}
          </div>
        </div>

        <div className="bg-white dark:bg-white/[0.03] p-6 md:p-8 rounded-xl border border-slate-200 dark:border-white/[0.06] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="relative w-44 h-44 md:w-56 md:h-56 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100 dark:text-slate-900" />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray="600"
                strokeDashoffset={600 - (600 * progress) / 100}
                className="text-cyan-500 dark:text-cyan-400 transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">{formatTime(timeLeft)}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-1">
                {isActive ? 'In Progress' : 'Ready'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-8 mt-6 animate-[slideUp_0.4s_ease-out_both_0.3s]">
        <button
          onClick={() => setIsActive(!isActive)}
          disabled={saving}
          className={`h-11 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 flex-1 sm:flex-none min-w-[140px] ${isActive
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'
            : 'bg-cyan-500 dark:bg-cyan-500 text-white hover:bg-cyan-600 dark:hover:bg-cyan-400 border border-cyan-400/20 shadow-lg shadow-cyan-500/20'
            } disabled:opacity-50`}
        >
          {isActive ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Start Session
            </>
          )}
        </button>
        {(isActive || timeLeft < workDuration * 60) && (
          <button
            onClick={handleComplete}
            disabled={saving}
            className="h-11 px-6 bg-emerald-500 text-white rounded-xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all border border-emerald-400/20 shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 flex-1 sm:flex-none min-w-[140px]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z" /></svg>
            End & Save
          </button>
        )}
        <div className="flex gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={() => {
              setTimeLeft(workDuration * 60);
              setIsActive(false);
              setDistractions(0);
              clearPersistence();
            }}
            className="h-11 px-5 bg-white dark:bg-white/[0.03] rounded-xl flex items-center gap-2 text-slate-500 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-white/[0.06] flex-1 sm:flex-none shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`h-11 px-5 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all border flex-1 sm:flex-none shadow-sm ${showSettings ? 'text-slate-900 dark:text-white border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/5' : 'text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] hover:text-slate-900 dark:hover:text-white'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            Settings
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="w-full max-w-md bg-white dark:bg-white/[0.03] p-5 md:p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] mb-8 animate-[scaleIn_0.3s_ease-out]">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-5">Session Settings</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowSettings(false); setTimeLeft(workDuration * 60); localStorage.setItem('deep_focus_timeLeft', (workDuration * 60).toString()); }}>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Work Duration (min)</label>
              <input
                type="number"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full h-10 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Break Duration (min)</label>
              <input
                type="number"
                value={breakDuration}
                onChange={(e) => setBreakDuration(Number(e.target.value))}
                className="w-full h-10 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30"
              />
            </div>
            <button type="submit" className="w-full h-10 bg-slate-900 dark:bg-cyan-500 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-cyan-400 transition-all active:scale-[0.98] text-sm">
              Save Settings
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full mb-8 animate-[slideUp_0.4s_ease-out_both_0.4s]">
        <div className="bg-white dark:bg-white/[0.03] p-4 md:p-5 rounded-xl border border-slate-200 dark:border-white/[0.06] text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium mb-1">Today's Focus</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{todayTotal}m</h4>
          <div className="mt-3 h-1 w-16 bg-slate-200 dark:bg-slate-800 mx-auto rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 dark:bg-cyan-400" style={{ width: `${Math.min(100, (todayTotal / 480) * 100)}%` }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-white/[0.03] p-4 md:p-5 rounded-xl border border-slate-200 dark:border-white/[0.06] text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium mb-1">Remaining</p>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{Math.floor(timeLeft / 60)}m {timeLeft % 60}s</h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-600 font-medium mt-1">Current Session</p>
        </div>
        <div className="bg-white dark:bg-white/[0.03] p-4 md:p-5 rounded-xl border border-slate-200 dark:border-white/[0.06] text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium mb-1">Distractions</p>
          <h4 className="text-2xl font-bold text-slate-400 dark:text-slate-400">{distractions}</h4>
          <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium mt-1">Tab Switches</p>
        </div>
      </div>

      <div className="animate-[fadeIn_0.8s_ease-out_both_0.6s] text-slate-500 dark:text-slate-500 text-sm font-normal flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-white/[0.02] rounded-lg border border-slate-200 dark:border-white/5 text-center">
        <span className="text-base">💡</span>
        Stay on this screen during focus sessions for best results.
      </div>
    </div>
  );
};

export default DeepWork;
