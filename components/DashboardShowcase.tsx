
import React from 'react';
import AnimatedSection from './AnimatedSection';

const DashboardShowcase: React.FC = () => {
    return (
        <section id="hero-showcase-v2" className="py-20 md:py-32 px-6 relative overflow-hidden bg-slate-50/50 dark:bg-transparent">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="relative">
                    <div className="relative group perspective-[3000px]">

                        {/* Desktop Mockup - Hyper-Faithful Code Recreation */}
                        <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] bg-slate-900 transform lg:rotate-x-12 lg:rotate-y-[-10deg] lg:rotate-z-[2deg] hover:rotate-0 transition-all duration-1000 ease-in-out select-none">
                            {/* Browser Header */}
                            <div className="bg-slate-100 dark:bg-slate-800/80 px-4 py-3 border-b border-slate-200 dark:border-white/5 flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                                </div>
                                <div className="bg-white dark:bg-slate-950 px-3 py-1 rounded text-[10px] font-medium text-slate-400 border border-slate-200 dark:border-white/5 uppercase tracking-wider">
                                    solopilot.ai/dashboard
                                </div>
                            </div>

                            {/* Actual Dashboard UI Recreation */}
                            <div className="bg-slate-950 flex h-[500px] overflow-hidden">
                                {/* REAL SIDEBAR RECREATION */}
                                <aside className="w-48 border-r border-white/5 bg-slate-950 p-4 flex flex-col gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-cyan-400 rounded-sm transform rotate-45 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-slate-950 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="3" d="M12 3L4 21L12 17L20 21L12 3Z" /></svg>
                                        </div>
                                        <span className="text-sm font-black text-white uppercase tracking-tighter">SoloPilot</span>
                                    </div>

                                    <nav className="flex flex-col gap-1">
                                        {[
                                            { label: 'Dashboard', icon: 'M4 6h16M4 12h16M4 18h16', active: true },
                                            { label: 'Deep Work', icon: 'M12 8v4l3 3' },
                                            { label: 'Weekly Goals', icon: 'M9 12l2 2 4-4' },
                                            { label: 'Analytics', icon: 'M9 19v-6' },
                                            { label: 'Strategy', icon: 'M9 12h6' }
                                        ].map((item, i) => (
                                            <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-md text-[10px] font-bold ${item.active ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500'}`}>
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                                                {item.label}
                                            </div>
                                        ))}
                                    </nav>

                                    <div className="mt-auto p-2 bg-white/[0.03] border border-white/5 rounded-lg flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500 to-blue-600"></div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-[10px] font-bold text-white truncate">User</p>
                                        </div>
                                    </div>
                                </aside>

                                {/* REAL MAIN CONTENT RECREATION */}
                                <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold text-white mb-1">Welcome back, <span className="text-cyan-400">User</span></h2>
                                        <p className="text-[10px] text-slate-500">Your cockpit is ready. Focus on the next win.</p>
                                    </div>

                                    {/* Quote Box */}
                                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 mb-6 text-center relative group/quote">
                                        <div className="absolute top-2 right-2 opacity-10">
                                            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L21.017 3V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.0166 21...Z" /></svg>
                                        </div>
                                        <p className="text-lg font-medium text-slate-100 italic mb-2">"Be so good they can't ignore you."</p>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">— STEVE MARTIN</p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-4 gap-3 mb-6">
                                        {[
                                            { label: 'Current Streak', value: '5 days', color: 'cyan' },
                                            { label: 'Deep Focus', value: '0.1h', color: 'purple' },
                                            { label: 'Task Progress', value: '0%', color: 'orange' },
                                            { label: 'Strategic Action', value: '680%', color: 'emerald' }
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-white/[0.03] border border-white/5 p-3 rounded-lg">
                                                <div className={`w-6 h-6 rounded bg-${stat.color}-500/10 mb-2`}></div>
                                                <p className="text-[8px] text-slate-500 font-bold uppercase">{stat.label}</p>
                                                <p className="text-xs font-bold text-white">{stat.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tasks */}
                                    <div className="bg-white/[0.03] border border-white/5 rounded-xl p-5">
                                        <div className="flex justify-between mb-4">
                                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Today's Tasks</h4>
                                            <span className="text-[8px] text-cyan-400 font-bold">0% Complete</span>
                                        </div>
                                        <div className="space-y-2">
                                            {['do 9-6 grind', 'meet for idea validation', 'complete project demo'].map((task, i) => (
                                                <div key={i} className="flex items-center gap-3 p-2 bg-white/[0.02] border border-white/5 rounded">
                                                    <div className="w-3 h-3 border border-white/20 rounded"></div>
                                                    <span className="text-[10px] text-slate-400 font-medium">{task}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>

                        {/* Mobile Phone Mockup - Hyper-Faithful & Responsive */}
                        <div className="relative md:absolute -bottom-6 -right-2 md:-bottom-12 md:right-10 lg:right-20 w-[140px] md:w-[220px] aspect-[9/19] rounded-[2rem] md:rounded-[2.5rem] bg-slate-950 border-[4px] md:border-[6px] border-slate-800 shadow-2xl z-20 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform duration-1000 flex flex-col overflow-hidden mx-auto mt-6 md:mt-0">
                            {/* Speaker/Sensors Notch */}
                            <div className="h-4 md:h-6 w-16 md:w-20 bg-slate-800 rounded-b-xl md:rounded-b-2xl self-center mb-2 md:mb-4 shrink-0"></div>

                            <div className="flex-1 bg-slate-950 p-2 md:p-4 flex flex-col gap-3 md:gap-4 overflow-y-auto no-scrollbar">
                                {/* Mobile Header Replication */}
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-4 h-4 md:w-5 md:h-5 bg-cyan-400 rounded-sm transform rotate-45 flex items-center justify-center">
                                            <svg className="w-2 md:w-3 h-2 md:h-3 text-slate-950 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="4" d="M12 3L4 21L12 17L20 21L12 3Z" /></svg>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white/5 rounded-md border border-white/10">
                                        <svg className="w-3 md:w-4 h-3 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                                    </div>
                                </div>

                                <div className="space-y-0.5">
                                    <h3 className="text-[10px] md:text-xs font-bold text-white leading-tight">Welcome back, <br /><span className="text-cyan-400">User</span></h3>
                                </div>

                                {/* Mobile Quote Card */}
                                <div className="bg-white/[0.05] p-2 md:p-3 rounded-lg border border-white/10 text-center">
                                    <p className="text-[8px] md:text-[10px] italic text-slate-200 line-clamp-2">"Be so good they can't ignore you."</p>
                                </div>

                                {/* Mobile Stats (Vertical Stack for Mobile Feel) */}
                                <div className="grid grid-cols-1 gap-2">
                                    {[
                                        { label: 'Streak', value: '5 days', color: 'cyan' },
                                        { label: 'Focus', value: '0.1h', color: 'purple' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/[0.03] border border-white/5 p-2 rounded-lg flex items-center justify-between">
                                            <p className="text-[7px] md:text-[8px] text-slate-500 font-bold uppercase">{stat.label}</p>
                                            <p className="text-[9px] md:text-xs font-bold text-white">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Mobile Tasks List */}
                                <div className="space-y-1.5">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-7 md:h-8 bg-white/[0.02] border border-white/5 rounded flex items-center px-2">
                                            <div className="w-2.5 h-2.5 md:w-3 md:h-3 border border-white/20 rounded mr-2"></div>
                                            <div className="h-1 w-12 md:w-16 bg-white/10 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SIGNAL UI CALLOUTS */}
                        <div className="absolute -top-10 -left-10 z-30 animate-float hidden xl:block">
                            <div className="glass p-3 rounded-xl border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Strategy Activated</span>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            <style>{`
                .lg\\:rotate-x-12 { transform: rotateX(12deg) rotateY(-8deg) rotateZ(1deg); }
                .group:hover .lg\\:rotate-x-12 { transform: rotateX(0) rotateY(0) rotateZ(0); }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                .animate-float { animation: float 5s ease-in-out infinite; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
};

export default DashboardShowcase;
