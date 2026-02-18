
import React from 'react';
import AnimatedSection from './AnimatedSection';

const DashboardShowcase: React.FC = () => {
    return (
        <section className="py-20 md:py-32 px-6 relative overflow-hidden bg-slate-50/50 dark:bg-transparent">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full -z-10"></div>

            <div className="max-w-7xl mx-auto">
                <AnimatedSection className="relative">
                    <div className="relative group">
                        {/* The "Glow" behind the image */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        {/* Actual Screenshot from User */}
                        <div className="relative rounded-lg md:rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] bg-slate-900 group transform lg:rotate-x-12 lg:rotate-y-[-10deg] lg:rotate-z-[2deg] hover:rotate-0 transition-transform duration-1000 ease-in-out cursor-default">
                            {/* Browser-like Chrome Header */}
                            <div className="bg-slate-50 dark:bg-slate-900/90 px-4 py-3 border-b border-slate-200 dark:border-white/5 flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 dark:bg-red-500/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 dark:bg-amber-500/40"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 dark:bg-emerald-500/40"></div>
                                </div>
                                <div className="bg-white dark:bg-slate-950 px-3 py-1 rounded text-[10px] font-medium text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-white/5 tracking-wider uppercase">
                                    solopilot.ai/dashboard
                                </div>
                            </div>

                            <img
                                src="/dashboard-screenshot.png"
                                alt="SoloPilot Dashboard"
                                className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-700"
                                onError={(e) => {
                                    // Professional Fallback: Premium Glass UI Placeholder
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement!;
                                    parent.classList.add('aspect-video', 'flex', 'items-center', 'justify-center', 'bg-slate-900', 'relative', 'overflow-hidden');

                                    // Create a "Techy" placeholder div
                                    const fallback = document.createElement('div');
                                    fallback.className = 'absolute inset-0 flex flex-col items-center justify-center';
                                    fallback.innerHTML = `
                                        <div class="absolute inset-0 bg-[url(\'https://images.unsplash.com/photo-1451187534963-1d02837bc59f?auto=format&fit=crop&q=80&w=2000\')] bg-cover bg-center opacity-20"></div>
                                        <div class="relative z-10 flex flex-col items-center">
                                            <div class="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-6 border border-cyan-500/20 shadow-2xl animate-pulse">
                                                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2.5" /></svg>
                                            </div>
                                            <p class="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-2">System Cockpit</p>
                                            <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">Connect dashboard screenshot to activate visualizer</p>
                                        </div>
                                    `;
                                    parent.appendChild(fallback);
                                }}
                            />

                            {/* Subtle glass overlay for that premium feel */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent dark:from-white/[0.02] dark:to-transparent"></div>
                        </div>

                        {/* Floating UI Callouts for more "Animated" feel */}
                        <div className="absolute -top-10 -right-10 hidden xl:block animate-float-slow">
                            <div className="glass p-4 rounded-xl border border-white/20 shadow-2xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Growth Locked</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Strategy Activated</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -left-10 hidden xl:block animate-float" style={{ animationDelay: '1s' }}>
                            <div className="glass p-4 rounded-xl border border-white/20 shadow-2xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Efficiency</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">+42% Growth MRR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>

            <style>{`
        .rotate-x-12 { transform: perspective(2000px) rotateX(12deg); }
        .rotate-y-[-10deg] { transform: perspective(2000px) rotateY(-10deg); }
        .rotate-z-[2deg] { transform: perspective(2000px) rotateZ(2deg); }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }

        @media (min-width: 1024px) {
          .lg\\:rotate-x-12 { transform: perspective(2000px) rotateX(14deg) rotateY(-12deg) rotateZ(2deg); }
          .lg\\:rotate-y-\\[-10deg\\] { }
          .lg\\:rotate-z-\\[2deg\\] { }
        }
      `}</style>
        </section>
    );
};

export default DashboardShowcase;
