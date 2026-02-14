
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.15)_0%,_transparent_70%)] pointer-events-none -z-10 opacity-60 dark:opacity-100"></div>

      <div className="max-w-5xl mx-auto text-center">
        <AnimatedSection delay={100}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full glass border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-6 md:mb-10 shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Waitlist Now Open • Lifetime $1 access
          </div>
        </AnimatedSection>

        <div className="mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-6xl md:text-[120px] font-[900] leading-[0.9] md:leading-[0.85] tracking-tighter">
            <span className="block reveal-1 text-cyan-500 dark:text-cyan-400">Focus.</span>
            <span className="block reveal-2 text-cyan-500 dark:text-cyan-400">Build.</span>
            <span className="block reveal-3 text-slate-900 dark:text-white">Grow.</span>
          </h1>
        </div>

        <AnimatedSection delay={600}>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-medium">
            The all-in-one productivity engine for <span className="text-slate-900 dark:text-white font-bold">solo founders</span>.
            Automate your reach, dominate focus, <span className="text-blue-600 dark:text-blue-400 font-bold">build</span>, and
            <span className="text-cyan-600 dark:text-cyan-400 font-black italic ml-1">ship 10x faster.</span>
          </p>
        </AnimatedSection>

        <AnimatedSection delay={700}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative w-full max-w-md group">
              <input
                type="email"
                placeholder="founder@yourstartup.com"
                className="w-full h-14 md:h-16 pl-6 md:pl-8 pr-12 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all text-base md:text-lg font-medium shadow-sm"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-700 group-focus-within:text-cyan-500 transition-colors hidden sm:block">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <button onClick={onStart} className="w-full md:w-auto whitespace-nowrap h-14 md:h-16 px-10 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black text-base md:text-lg rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-xl shadow-cyan-500/20 active:scale-95">
              Secure Early Access
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-400 dark:text-slate-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-slate-50 dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  {i === 4 ? '+2k' : ''}
                </div>
              ))}
            </div>
            <p className="text-xs md:text-sm font-semibold italic text-center">
              Join <span className="text-slate-900 dark:text-white">2,400+ builders</span> already scaling.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
