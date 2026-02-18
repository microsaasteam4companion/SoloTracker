import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AnalyticsProps {
  user: User;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState<number[]>(new Array(30).fill(0));
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const fetchRealData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch sessions for the selected month/year
      const firstDay = new Date(currentYear, currentMonth, 1).toISOString();
      const lastDay = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59).toISOString();

      const { data, error } = await supabase
        .from('deep_work_sessions')
        .select('created_at, duration_minutes')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .gte('created_at', firstDay)
        .lte('created_at', lastDay);

      if (data) {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const aggregated = new Array(daysInMonth).fill(0);

        data.forEach(session => {
          const day = new Date(session.created_at).getDate();
          aggregated[day - 1] += session.duration_minutes || 0;
        });

        setDailyData(aggregated);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  }, [user.id, currentMonth, currentYear]);

  useEffect(() => {
    fetchRealData();
  }, [fetchRealData]);

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  return (
    <div className="animate-[slideUp_0.5s_ease-out_both] w-full max-w-full overflow-hidden">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-1">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-normal uppercase tracking-widest leading-relaxed">Growth Velocity & Output Tracking</p>
        </div>
        <div className="flex items-center gap-1.5 self-end sm:self-auto bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10">
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(v => v - 1);
              } else {
                setCurrentMonth(v => v - 1);
              }
            }}
            className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-lg text-slate-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="px-3 py-1.5 text-slate-900 dark:text-white text-[10px] sm:text-xs font-black uppercase tracking-widest min-w-[120px] text-center">
            {monthName} {currentYear}
          </div>
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(v => v + 1);
              } else {
                setCurrentMonth(v => v + 1);
              }
            }}
            className="p-1.5 hover:bg-white dark:hover:bg-white/10 rounded-lg text-slate-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-white/[0.03] p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-white/[0.06] flex flex-col shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyan-500/10 transition-all"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1">Daily Output History</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Consolidated focus minutes by day</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Output</span>
            </div>
            <button
              onClick={fetchRealData}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all text-slate-400"
              title="Refresh Logs"
            >
              <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto custom-scrollbar pb-6 -mx-2 px-2">
          <div className="flex items-end justify-between gap-1 sm:gap-2 h-48 border-b border-slate-200 dark:border-white/10 border-l border-slate-200 dark:border-white/10 px-4 pb-4 min-w-[600px] sm:min-w-0">
            {dailyData.map((minutes, i) => {
              const h = Math.min(100, (minutes / 480) * 100); // Scale relative to 8 hours
              const isToday = i + 1 === new Date().getDate() && currentMonth === new Date().getMonth();

              return (
                <div
                  key={i}
                  className="flex-1 group/bar relative"
                  style={{ height: '100%', minWidth: '8px' }}
                >
                  <div
                    style={{
                      height: minutes > 0 ? `${Math.max(8, h)}%` : '4%',
                      animationDelay: `${i * 15}ms`
                    }}
                    className={`
                    w-full rounded-t-sm transition-all duration-700 animate-[slideUp_0.8s_ease-out_both]
                    ${minutes > 0 ? 'bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-slate-100 dark:bg-white/5'}
                    ${isToday && minutes > 0 ? 'ring-2 ring-cyan-500/50' : ''}
                    hover:brightness-125 cursor-help group-hover/bar:scale-x-110
                  `}
                  ></div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[9px] font-black rounded opacity-0 group-hover/bar:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-xl border border-white/10 pointer-events-none">
                    Day {i + 1}: {minutes}m
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Neural mapping synchronized</p>
          </div>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent('changeTab', { detail: 'STRATEGIC' }))}
            className="px-6 py-2 bg-slate-950 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg"
          >
            SYNC WITH NEURAL ENGINE (VIEW SUMMARY)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
