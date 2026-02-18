import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { analyzeStrategicData, StrategicInsight } from '@/lib/strategic_ai';

type StrategicTab = 'DECISIONS' | 'TRAJECTORY' | 'JOURNAL' | 'SUMMARY';

interface StrategicIntelligenceProps {
    user: User;
}

const StrategicIntelligence: React.FC<StrategicIntelligenceProps> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<StrategicTab>('DECISIONS');

    return (
        <div className="animate-[slideUp_0.5s_ease-out_both] w-full">
            <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Strategic Intelligence</h2>
                <div className="flex items-center gap-2">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal uppercase tracking-widest">Personal Performance Audit Engine</p>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-black uppercase tracking-widest">System Integrated</span>
                </div>
            </div>

            {/* Strategic Navigation */}
            <div className="flex overflow-x-auto gap-1 mb-8 pb-2 custom-scrollbar no-bg">
                {[
                    { id: 'DECISIONS', label: 'Decision Log', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
                    { id: 'TRAJECTORY', label: 'Trajectory', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
                    { id: 'JOURNAL', label: 'Strategic Journal', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                    { id: 'SUMMARY', label: 'Strategic Summary', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as StrategicTab)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${activeTab === tab.id
                            ? 'bg-slate-900 dark:bg-cyan-500/10 text-white dark:text-cyan-400 border-slate-900 dark:border-cyan-500/30 shadow-lg'
                            : 'bg-white dark:bg-white/[0.03] text-slate-500 dark:text-slate-500 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10'
                            }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={tab.icon} />
                        </svg>
                        {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'DECISIONS' && <DecisionLog user={user} />}
            {activeTab === 'JOURNAL' && <StrategicJournal user={user} />}
            {activeTab === 'TRAJECTORY' && <TrajectoryVisualizer user={user} />}
            {activeTab === 'SUMMARY' && <StrategicSummary user={user} onTabChange={setActiveTab} />}
        </div>
    );
};

/* --- TRAJECTORY VISUALIZER MODULE --- */
/* --- STRATEGIC JOURNAL MODULE --- */
const StrategicJournal: React.FC<{ user: User }> = ({ user }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [entries, setEntries] = useState<Record<string, string>>({});
    const [showMobileCalendar, setShowMobileCalendar] = useState(false);

    const formatDateKey = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const fetchJournalEntries = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('journal_logs')
                .select('*')
                .eq('user_id', user.id);

            if (data) {
                const entryMap: Record<string, string> = {};
                data.forEach(entry => {
                    entryMap[entry.entry_date] = entry.content;
                });
                setEntries(entryMap);
                setContent(entryMap[formatDateKey(selectedDate)] || '');
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user.id]);

    useEffect(() => {
        fetchJournalEntries();
    }, [fetchJournalEntries]);

    useEffect(() => {
        setContent(entries[formatDateKey(selectedDate)] || '');
    }, [selectedDate, entries]);

    const handleSave = async () => {
        if (!content.trim() && !entries[formatDateKey(selectedDate)]) return;
        setSaving(true);
        const dateKey = formatDateKey(selectedDate);

        try {
            // Check if entry exists for this date
            const { data: existing } = await supabase
                .from('journal_logs')
                .select('id')
                .eq('user_id', user.id)
                .eq('entry_date', dateKey)
                .maybeSingle();

            if (existing) {
                await supabase
                    .from('journal_logs')
                    .update({ content })
                    .eq('id', existing.id);
            } else {
                await supabase
                    .from('journal_logs')
                    .insert({
                        user_id: user.id,
                        entry_date: dateKey,
                        content: content
                    });
            }

            setEntries(prev => ({ ...prev, [dateKey]: content }));
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    // Calendar Helper
    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const calendarDays = [];
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const offset = firstDayOfMonth(year, month);

    for (let i = 0; i < offset; i++) calendarDays.push(null);
    for (let i = 1; i <= totalDays; i++) calendarDays.push(new Date(year, month, i));

    const monthName = selectedDate.toLocaleString('default', { month: 'long' });

    return (
        <div className="flex flex-col gap-6 animate-[fadeIn_0.5s_ease-out]">
            {/* Mobile Calendar Toggle */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Date Selection</p>
                </div>
                <button
                    onClick={() => setShowMobileCalendar(!showMobileCalendar)}
                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg active:scale-95 transition-all"
                >
                    {showMobileCalendar ? 'HIDE CALENDAR' : 'SHOW CALENDAR'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Calendar & Info */}
                <div className={`${showMobileCalendar ? 'block' : 'hidden'} lg:block lg:col-span-1 space-y-6`}>
                    <div className="bg-slate-900 border border-white/10 rounded-lg p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-white font-black uppercase tracking-tighter text-lg">{monthName} {year}</h3>
                            <div className="flex gap-1">
                                <button onClick={() => setSelectedDate(new Date(year, month - 1, 1))} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={() => setSelectedDate(new Date(year, month + 1, 1))} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                <div key={d} className="text-[10px] font-black text-slate-500 text-center py-2">{d}</div>
                            ))}
                            {calendarDays.map((day, i) => {
                                if (!day) return <div key={`empty-${i}`} className="aspect-square"></div>;
                                const isToday = day.toDateString() === new Date().toDateString();
                                const isSelected = day.toDateString() === selectedDate.toDateString();
                                const hasEntry = entries[formatDateKey(day)];

                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDate(day)}
                                        className={`
                                        aspect-square flex flex-col items-center justify-center rounded-lg text-[11px] font-bold transition-all relative
                                        ${isSelected ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'hover:bg-white/5 text-slate-400'}
                                        ${isToday && !isSelected ? 'text-cyan-400' : ''}
                                    `}
                                    >
                                        {day.getDate()}
                                        {hasEntry && !isSelected && (
                                            <div className="absolute bottom-1 w-1 h-1 bg-cyan-500 rounded-full"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-600 to-cyan-400 p-6 rounded-lg shadow-xl">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-50/70 mb-2">Strategic Coach Tip</p>
                        <p className="text-white text-xs font-bold leading-relaxed italic">
                            "Your journal is the data source for the Neural Engine. Use it to record not just what happened, but your internal state, resistances, and wins."
                        </p>
                    </div>
                </div>

                {/* Right: Notebook */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-lg flex flex-col min-h-[400px] sm:min-h-[500px] overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-white/[0.01]">
                            <div>
                                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">Observation Notebook</p>
                                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                    {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </h3>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`
                                w-full sm:w-auto px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                ${saving ? 'bg-slate-200 dark:bg-white/5 text-slate-400' : 'bg-slate-950 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95 shadow-xl'}
                            `}
                            >
                                {saving ? 'UPDATING LEDGER...' : 'SAVE JOURNAL'}
                            </button>
                        </div>

                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your strategic reflections for today... (Wins, Blocks, Internal Resistance, Decision Logic)"
                            className="flex-1 p-5 sm:p-8 bg-transparent text-slate-700 dark:text-slate-300 text-sm leading-7 sm:leading-8 font-medium outline-none resize-none scrollbar-thin dark:placeholder:text-slate-700"
                        />

                        <div className="p-4 bg-slate-50 dark:bg-white/[0.01] border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
                                {content.length} characters recorded
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const TrajectoryVisualizer: React.FC<{ user: User }> = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [category, setCategory] = useState('Skill');
    const [name, setName] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('trajectory_data')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            if (data) setData(data);
        } catch (err) { console.error(err); }
    }, [user.id]);

    useEffect(() => { fetchData(); }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        try {
            const { data: newItem, error } = await supabase
                .from('trajectory_data')
                .insert({
                    user_id: user.id,
                    category,
                    item_name: name,
                })
                .select()
                .single();
            if (newItem) setData([newItem, ...data]);
            setName('');
        } catch (err) {
            console.error(err);
            const fallback = { id: Math.random().toString(), category, item_name: name, created_at: new Date().toISOString() };
            setData([fallback, ...data]);
        } finally { setLoading(false); }
    };

    const categories = [
        { name: 'Skill', color: 'cyan', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        { name: 'Project', color: 'purple', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { name: 'Money', color: 'emerald', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2' },
        { name: 'Network', color: 'orange', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' }
    ];

    const getColor = (cat: string) => {
        return categories.find(c => c.name === cat)?.color || 'cyan';
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <div key={cat.name} className="bg-white dark:bg-white/[0.03] p-4 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden group">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{cat.name} Growth</p>
                        <h4 className={`text-2xl font-black text-${cat.color}-600 dark:text-${cat.color}-400`}>+{data.filter(d => d.category === cat.name).length}</h4>
                        <div className="mt-3 h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-${cat.color}-500 transition-all duration-1000 shadow-[0_0_10px_rgba(34,197,94,0.3)]`}
                                style={{ width: `${Math.min(100, data.filter(d => d.category === cat.name).length * 10)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 p-6 rounded-xl border border-white/10">
                        <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                            Log Growth Signal
                        </h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.name}
                                            type="button"
                                            onClick={() => setCategory(cat.name)}
                                            className={`py-2 px-3 rounded-lg text-[10px] font-black transition-all border uppercase tracking-widest ${category === cat.name
                                                ? `bg-${cat.color}-500 text-white border-${cat.color}-500`
                                                : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Label</label>
                                <input
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="e.g., Learned Docker, Won client X"
                                    className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="w-full h-11 bg-white text-slate-900 font-black rounded-lg text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">
                                RECORD SIGNAL
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-white/[0.03] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Compound Interest Ledger</h3>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 -mr-1 custom-scrollbar no-bg">
                            {data.map((item) => {
                                const color = getColor(item.category);
                                return (
                                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl group transition-all hover:border-cyan-500/20 gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`px-2 py-0.5 rounded-md bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 text-[9px] font-black uppercase tracking-wider border border-${color}-500/20 flex-shrink-0`}>
                                                {item.category}
                                            </div>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 line-clamp-1">{item.item_name}</p>
                                        </div>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest sm:text-right">{new Date(item.created_at).toLocaleDateString()}</p>
                                    </div>
                                );
                            })}
                            {data.length === 0 && (
                                <div className="text-center py-12 opacity-50 italic text-sm">No growth signals recorded this cycle.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* --- STRATEGIC SUMMARY (AI) --- */
const StrategicSummary: React.FC<{ user: User, onTabChange: (t: StrategicTab) => void }> = ({ user, onTabChange }) => {
    const [insight, setInsight] = useState<StrategicInsight | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateInsights = async () => {
        setLoading(true);
        setError(null);
        try {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const dateStr = thirtyDaysAgo.toISOString().split('T')[0];

            const [decRes, traRes, jouRes] = await Promise.all([
                supabase.from('decision_logs').select('*').eq('user_id', user.id),
                supabase.from('trajectory_data').select('*').eq('user_id', user.id),
                supabase.from('journal_logs')
                    .select('*')
                    .eq('user_id', user.id)
                    .gte('entry_date', dateStr)
            ]);

            if ((decRes.data?.length || 0) < 1 && (jouRes.data?.length || 0) < 1) {
                setError("Insufficient data. Please log at least one decision or journal entry first so the system can find patterns.");
                setLoading(false);
                return;
            }

            const analysis = await analyzeStrategicData(
                decRes.data || [],
                [], // ambitions removed
                traRes.data || [],
                jouRes.data || []
            );
            setInsight(analysis);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to generate AI insights. Check your API key or connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-500 text-white p-5 sm:p-6 rounded-xl shadow-xl shadow-cyan-500/20 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-all"></div>
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-50/70">Strategic Health</p>
                        <div className="group/tip relative">
                            <svg className="w-3 h-3 text-cyan-100/50 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black">{insight ? `${insight.accuracy_rate}%` : '85%'}</h3>
                    <p className="text-[10px] sm:text-xs font-medium text-cyan-50/80 mt-2">Executive focus is {insight && insight.accuracy_rate > 80 ? 'Optimal' : 'Standard'}.</p>
                </div>
                <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Decision Quality</p>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black">High</h3>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-2 truncate">Pattern: {insight ? insight.patterns[0] : 'Idle'}</p>
                </div>
                <div className="bg-white dark:bg-white/[0.03] p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-white/10">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">Action Balance</p>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Minimum</h3>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-400 mt-2">Risk profile: {insight ? 'Aggressive' : 'Uncalculated'}.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-slate-200 dark:border-white/10 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-tight">Executive Summary (AI Generated)</h3>
                        {insight && (
                            <button
                                onClick={generateInsights}
                                disabled={loading}
                                className="text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:underline disabled:opacity-50"
                            >
                                {loading ? 'Analyzing...' : 'Refresh Analysis'}
                            </button>
                        )}
                    </div>
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <p className="text-xs text-red-500 font-bold uppercase tracking-widest mb-1">System Error</p>
                            <p className="text-[10px] text-red-400 font-medium leading-relaxed">{error}</p>
                        </div>
                    )}
                    {insight ? (
                        <div className="space-y-6">
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium italic border-l-4 border-cyan-500 pl-4 py-1 bg-cyan-500/5">
                                "{insight.executive_summary}"
                            </p>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Core Strategic Patterns</h4>
                                <div className="space-y-2">
                                    {insight.patterns.map((p, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Observed Cognitive Biases</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {insight.biases.map((b, i) => (
                                        <div key={i} className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                            <p className="text-xs font-bold text-red-500 mb-1">{b.name}</p>
                                            <p className="text-[10px] text-slate-500 leading-tight">{b.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl flex items-center justify-center mb-6 border border-white/5 animate-pulse">
                                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Insights Engine Idle</h4>
                            <p className="text-[11px] text-slate-500 font-medium max-w-[280px] mb-8 leading-relaxed uppercase tracking-widest">
                                CLICK BELOW TO TRIGGER THE INSIGHTS ENGINE. THE SYSTEM WILL PROCESS ALL YOUR LOGS TO FIND PATTERNS.
                            </p>
                            <button
                                onClick={generateInsights}
                                disabled={loading}
                                className="px-8 py-3 bg-slate-950 dark:bg-cyan-500 text-white font-black rounded-lg text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
                            >
                                {loading ? 'MAPPING INSIGHTS...' : 'GENERATE EXECUTIVE INSIGHTS'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-slate-200 dark:border-white/10 h-full">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tight">Strategic Action Items</h3>
                        <div className="space-y-4">
                            {insight ? (
                                insight.recommendations.map((rec, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl group hover:border-emerald-500/30 transition-all">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500 font-black text-[10px]">
                                            0{i + 1}
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-bold leading-relaxed uppercase tracking-wide group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{rec}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="space-y-4 opacity-30">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-14 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-xl"></div>
                                    ))}
                                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Awaiting Analysis</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* --- AMBITION AUDIT MODULE --- */
const AmbitionAudit: React.FC<{ user: User }> = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<any[]>([]);

    const [ambition, setAmbition] = useState('');
    const [actions, setActions] = useState('');

    const fetchLogs = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('ambition_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            if (data) setLogs(data);
        } catch (err) { console.error(err); }
    }, [user.id]);

    useEffect(() => { fetchLogs(); }, [fetchLogs]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ambition.trim() || !actions.trim()) return;
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('ambition_logs')
                .insert({
                    user_id: user.id,
                    working_toward: ambition,
                    weekly_actions: actions,
                })
                .select()
                .single();

            if (data) setLogs([data, ...logs]);
            setAmbition('');
            setActions('');
        } catch (err) {
            console.error(err);
            // Fallback
            const fallback = {
                id: Math.random().toString(),
                working_toward: ambition,
                weekly_actions: actions,
                created_at: new Date().toISOString()
            };
            setLogs([fallback, ...logs]);
        } finally {
            setLoading(false);
        }
    };

    const getBrutalClarity = (log: any) => {
        const text = log.weekly_actions.toLowerCase();
        const target = log.working_toward.toLowerCase();

        const words = target.split(' ').filter(w => w.length > 3);
        const matches = words.filter(w => text.includes(w));

        if (matches.length > 0) return { label: 'ALIGNED', color: 'emerald' };
        return { label: 'MISALIGNED', color: 'red' };
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-4">
                <p className="text-xs text-cyan-700 dark:text-cyan-400 font-medium">
                    <span className="font-black uppercase tracking-widest mr-2">How it works:</span>
                    The 'Brutal Clarity' system checks if the keywords in your actions match your North Star. If they don't, it flags a misalignment. Use the **CEO Dashboard** for AI-powered suggestions on how to fix this.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <div className="bg-slate-900 text-white p-6 rounded-xl border border-white/10 shadow-xl">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            Brutal Clarity Input
                        </h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">What am I working toward? (The North Star)</label>
                                <input
                                    required
                                    value={ambition}
                                    onChange={e => setAmbition(e.target.value)}
                                    placeholder="e.g., Building a $10k/mo SaaS"
                                    className="w-full h-11 px-4 bg-white/5 border border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">What did I do this week for that?</label>
                                <textarea
                                    required
                                    value={actions}
                                    onChange={e => setActions(e.target.value)}
                                    placeholder="List your high-leverage actions..."
                                    className="w-full h-32 p-4 bg-white/5 border border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                />
                            </div>
                            <button type="submit" disabled={loading} className="w-full h-11 bg-white text-slate-900 font-black rounded-lg text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all">
                                AUDIT MY ALIGNMENT
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tight">Audit History</h3>
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar no-bg">
                        {logs.map((log) => {
                            const clarity = getBrutalClarity(log);
                            return (
                                <div key={log.id} className="bg-white dark:bg-white/[0.03] p-5 rounded-xl border border-slate-200 dark:border-white/10 relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 px-3 py-1 bg-${clarity.color === 'emerald' ? 'emerald-500/10 text-emerald-500' : 'red-500/10 text-red-500'} text-[10px] font-black uppercase tracking-widest rounded-bl-lg`}>
                                        {clarity.label}
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-[10px] text-slate-400 font-medium mb-1">{new Date(log.created_at).toLocaleDateString()}</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Target: {log.working_toward}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-lg">
                                        <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-widest">Weekly Output:</p>
                                        <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-medium">{log.weekly_actions}</p>
                                    </div>
                                    {clarity.label === 'MISALIGNED' && (
                                        <p className="mt-4 text-[10px] text-red-500 font-black uppercase tracking-widest flex items-center gap-2">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                            WARNING: Your actions are not aligned with your stated ambition.
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                        {logs.length === 0 && (
                            <div className="text-center py-12 bg-white dark:bg-white/[0.03] rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                                <p className="text-slate-500 text-sm italic">Run your first ambition audit to see the gap between dreams and actions.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* --- DECISION LOG MODULE --- */
const DecisionLog: React.FC<{ user: User }> = ({ user }) => {
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<any[]>([]);

    // Form state
    const [title, setTitle] = useState('');
    const [rationale, setRationale] = useState('');
    const [fears, setFears] = useState('');
    const [prediction1m, setPrediction1m] = useState('');
    const [prediction6m, setPrediction6m] = useState('');

    const fetchLogs = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('decision_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            if (data) setLogs(data);
        } catch (err) {
            console.error(err);
        }
    }, [user.id]);

    useEffect(() => { fetchLogs(); }, [fetchLogs]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('decision_logs')
                .insert({
                    user_id: user.id,
                    decision_title: title,
                    rationale,
                    fears,
                    prediction_1m: prediction1m,
                    prediction_6m: prediction6m,
                })
                .select()
                .single();

            if (data) setLogs([data, ...logs]);
            setShowForm(false);
            resetForm();
        } catch (err) {
            console.error(err);
            // Fallback for demo
            const fallback = {
                id: Math.random().toString(),
                decision_title: title,
                rationale,
                fears,
                prediction_1m: prediction1m,
                prediction_6m: prediction6m,
                created_at: new Date().toISOString()
            };
            setLogs([fallback, ...logs]);
            setShowForm(false);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setRationale('');
        setFears('');
        setPrediction1m('');
        setPrediction6m('');
    };

    return (
        <div className="space-y-6">
            <div className="p-4 bg-slate-900 border border-white/10 rounded-xl mb-4">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    <span className="font-black text-cyan-400 uppercase tracking-widest mr-2">Audit Cycle:</span>
                    Great decisions take time to validate. 'Pending Audit' means the decision is locked in. High-performers review their choices after 1 and 6 months to see if they were right. This calibrates your intuition.
                </p>
            </div>

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Decision Intelligence Log</h3>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-slate-900 dark:bg-cyan-500 text-white text-xs font-bold rounded-lg hover:scale-[1.02] transition-all"
                >
                    LOG NEW DECISION
                </button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-white/[0.03] p-6 rounded-xl border border-slate-200 dark:border-white/10 animate-[scaleIn_0.3s_ease-out]">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Core Decision</label>
                                    <input
                                        required
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="e.g., Choosing the B2B SaaS path vs Ecommerce"
                                        className="w-full h-11 px-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">The 'Why' (Rationale)</label>
                                    <textarea
                                        required
                                        value={rationale}
                                        onChange={e => setRationale(e.target.value)}
                                        placeholder="Why is this the best choice? What data supports it?"
                                        className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">The 'Fear' (Risk)</label>
                                    <textarea
                                        value={fears}
                                        onChange={e => setFears(e.target.value)}
                                        placeholder="What am I afraid of failing? What is the worst case?"
                                        className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">1-Month Predicted Outcome</label>
                                    <textarea
                                        required
                                        value={prediction1m}
                                        onChange={e => setPrediction1m(e.target.value)}
                                        placeholder="What should be true in 30 days if this works?"
                                        className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">6-Month Predicted Outcome</label>
                                    <textarea
                                        required
                                        value={prediction6m}
                                        onChange={e => setPrediction6m(e.target.value)}
                                        placeholder="Where does this decision lead us in half a year?"
                                        className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                                    />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="submit" disabled={loading} className="flex-1 h-11 bg-slate-900 dark:bg-cyan-500 text-white font-bold rounded-lg text-xs uppercase tracking-widest">
                                        Commit to Decision
                                    </button>
                                    <button type="button" onClick={() => setShowForm(false)} className="px-6 h-11 bg-slate-100 dark:bg-white/5 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-widest">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {logs.map((log) => (
                    <div key={log.id} className="bg-white dark:bg-white/[0.03] p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-white/10 group hover:border-cyan-500/30 transition-all">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
                            <div>
                                <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-[0.2em] mb-1 block">Decision Audit</span>
                                <h4 className="text-base font-bold text-slate-900 dark:text-white">{log.decision_title}</h4>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{new Date(log.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 bg-slate-50 dark:bg-white/[0.02] rounded-lg border border-slate-100 dark:border-white/5">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">The Rationale</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{log.rationale}</p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 text-red-500">The Fear Threshold</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-red-500/20 pl-3">{log.fears}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">1-Month Target</p>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{log.prediction_1m}</p>
                                </div>

                                <div className="mt-2 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2">
                                    {(() => {
                                        const created = new Date(log.created_at);
                                        const now = new Date();
                                        const diff = now.getTime() - created.getTime();
                                        const daysPassed = Math.floor(diff / (1000 * 60 * 60 * 24));
                                        const daysRemaining = 30 - daysPassed;

                                        if (daysRemaining <= 0) {
                                            return (
                                                <>
                                                    <p className="text-[10px] font-bold text-emerald-500">READY FOR AUDIT</p>
                                                    <span className="text-[9px] text-slate-400 font-medium italic">30-day cycle complete</span>
                                                </>
                                            );
                                        }

                                        return (
                                            <>
                                                <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400">PENDING AUDIT</p>
                                                <span className="text-[9px] text-slate-400 font-medium italic">Audit due in {daysRemaining} days</span>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-white/[0.03] rounded-xl border border-dashed border-slate-200 dark:border-white/10">
                        <p className="text-slate-500 text-sm italic">No decisions audited yet. The quality of your life equals the quality of your decisions.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StrategicIntelligence;
