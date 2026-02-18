
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface Task {
    id: string;
    title: string;
    completed: boolean;
    created_at: string;
}

interface OverviewProps {
    user: User;
}

const QUOTES = [
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It’s not about ideas. It’s about making ideas happen.", author: "Scott Belsky" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
    { text: "Everything you’ve ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "The hard part isn't coming up with a new idea. It's letting go of an old one.", author: "Seth Godin" },
    { text: "Focusing is about saying no.", author: "Steve Jobs" },
    { text: "Don’t find fault, find a remedy.", author: "Henry Ford" },
    { text: "Speed is the only weapon that really counts in a startup.", author: "Dave McClure" },
    { text: "Execution is everything.", author: "John Doerr" },
    { text: "Be so good they can't ignore you.", author: "Steve Martin" }
];

const Overview: React.FC<OverviewProps> = ({ user }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const username = user.email?.split('@')[0] || 'Founder';

    // Daily quote rotation logic
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const dailyQuote = QUOTES[dayOfYear % QUOTES.length];

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            // We assume a 'dashboard_tasks' table exists. 
            // If it doesn't, this will fail gracefully or show empty.
            const { data, error } = await supabase
                .from('dashboard_tasks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: true });

            if (error && error.code !== 'PGRST116') {
                // Handle case where table might not exist yet
                console.warn('Could not fetch tasks. Ensure dashboard_tasks table is created in Supabase.');
            } else {
                setTasks(data || []);
            }
        } catch (err) {
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    }, [user.id]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const addTask = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const { data, error } = await supabase
                .from('dashboard_tasks')
                .insert({
                    user_id: user.id,
                    title: newTaskTitle.trim(),
                    completed: false,
                })
                .select()
                .single();

            if (error) throw error;
            setTasks([...tasks, data]);
            setNewTaskTitle('');
        } catch (err) {
            console.error('Error adding task:', err);
            // Fallback for demo if table doesn't exist
            const fallbackTask: Task = {
                id: Math.random().toString(),
                title: newTaskTitle.trim(),
                completed: false,
                created_at: new Date().toISOString(),
            };
            setTasks([...tasks, fallbackTask]);
            setNewTaskTitle('');
        }
    };

    const toggleTask = async (id: string, completed: boolean) => {
        try {
            const { error } = await supabase
                .from('dashboard_tasks')
                .update({ completed: !completed })
                .eq('id', id);

            if (error) throw error;
            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
        } catch (err) {
            console.error('Error toggling task:', err);
            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t));
        }
    };

    const deleteTask = async (id: string) => {
        try {
            const { error } = await supabase
                .from('dashboard_tasks')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error('Error deleting task:', err);
            setTasks(tasks.filter(t => t.id !== id));
        }
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

    const [stats, setStats] = useState({
        streak: 0,
        focusHours: 0,
        productivity: 0,
        output: 0
    });

    const fetchStats = useCallback(async () => {
        try {
            // 1. Deep Focus Hours (Total from database)
            const { data: focusData } = await supabase
                .from('deep_work_sessions')
                .select('duration_minutes')
                .eq('user_id', user.id)
                .eq('status', 'completed');

            const totalMinutes = focusData?.reduce((acc, curr) => acc + (curr.duration_minutes || 0), 0) || 0;
            const hours = (totalMinutes / 60).toFixed(1);

            // 2. Daily Output (Based on Sessions + Decisions + Journal)
            const { count: decisionCount } = await supabase.from('decision_logs').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
            const { count: journalCount } = await supabase.from('journal_logs').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
            const dailyOutput = (focusData?.length || 0) + (decisionCount || 0) + (journalCount || 0);

            // 3. Streak (Based on count of sessions for now - can be made more precise later)
            const streakCount = (focusData?.length || 0);

            setStats({
                streak: Math.min(streakCount, 30),
                focusHours: Number(hours),
                productivity: progress,
                output: dailyOutput
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    }, [user.id, progress]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats, tasks]);

    return (
        <div className="animate-[slideUp_0.5s_ease-out_both] w-full">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
                        Welcome back, <span className="text-cyan-600 dark:text-cyan-400">{username}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">Your cockpit is ready. Focus on the next win.</p>
                </div>
            </div>

            {/* Daily Motivation */}
            <div className="mb-8 animate-[fadeIn_0.8s_ease-out_both_0.1s]">
                <div className="relative p-6 md:p-8 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] rounded-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 pointer-events-none">
                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56888 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56888 8 8.0166 8H5.0166C3.91203 8 3.0166 7.10457 3.0166 6V3L10.0166 3V15C10.0166 18.3137 7.3303 21 4.0166 21H3.0166Z" />
                        </svg>
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto text-center sm:text-left">
                        <p className="text-xl md:text-3xl font-medium text-slate-800 dark:text-slate-100 italic tracking-tight leading-snug mb-5">
                            "{dailyQuote.text}"
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                            <div className="hidden sm:block w-4 h-[1px] bg-slate-200 dark:bg-white/10"></div>
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">— {dailyQuote.author}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                {[
                    { label: 'Current Streak', value: `${stats.streak} days`, icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'cyan', trend: 'Consistency' },
                    { label: 'Deep Focus', value: `${stats.focusHours}h`, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'purple', trend: 'Total Time' },
                    { label: 'Task Progress', value: `${stats.productivity}%`, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'orange', trend: 'Daily Tasks' },
                    { label: 'Strategic Action', value: stats.output, icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', color: 'emerald', trend: 'Systems nominal' },
                ].map((stat, i) => (
                    <div key={i} style={{ animationDelay: `${i * 80}ms` }} className="animate-[scaleIn_0.4s_ease-out_both] bg-white dark:bg-white/[0.03] p-4 md:p-5 rounded-lg border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-all">
                        <div className={`w-9 h-9 rounded-lg bg-${stat.color}-500/10 dark:bg-${stat.color}-400/10 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-3`}>
                            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                            </svg>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-500 font-medium mb-0.5">{stat.label}</p>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">{stat.value}</h3>
                        <p className={`text-[11px] font-medium text-${stat.color}-600 dark:text-${stat.color}-400/70`}>{stat.trend}</p>
                    </div>
                ))}
            </div>



            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                {/* Today's Tasks */}
                <div style={{ animationDelay: '600ms' }} className="animate-[slideUp_0.5s_ease-out_both] bg-white dark:bg-white/[0.03] p-5 md:p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Today's Tasks</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-500 font-normal mt-0.5">{completedCount}/{tasks.length} completed</p>
                        </div>
                        <div className="hidden sm:flex flex-col items-end">
                            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${progress === 100 ? 'bg-emerald-50 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400' : 'bg-cyan-50 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400'}`}>
                                {progress}% Complete
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-2 custom-scrollbar pr-1">
                        {tasks.length === 0 && !loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-300 mb-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <p className="text-slate-400 text-xs">No tasks for today. Ready for launch.</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div key={task.id} className="group flex items-center gap-3 p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all">
                                    <button
                                        onClick={() => toggleTask(task.id, task.completed)}
                                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-700 text-transparent hover:border-cyan-500'}`}
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </button>
                                    <span className={`flex-1 text-sm font-medium transition-all ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {task.title}
                                    </span>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <form onSubmit={addTask} className="relative mt-auto">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Add high-leverage task..."
                            className="w-full h-10 pl-4 pr-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1 h-8 w-10 flex items-center justify-center bg-cyan-500 dark:bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                        </button>
                    </form>
                </div>

                {/* Empty space or placeholder for balanced layout if needed */}
                <div className="hidden xl:block"></div>
            </div>
        </div>
    );
};

export default Overview;
