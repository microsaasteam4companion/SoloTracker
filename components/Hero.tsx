
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

        <div className="mb-8 md:mb-12 flex flex-col items-center">
          <h1 className="text-6xl md:text-[120px] font-[900] leading-[0.9] md:leading-[0.85] tracking-tighter">
            <span className="block reveal-1 text-cyan-500 dark:text-cyan-400">Focus.</span>
            <span className="block reveal-2 text-cyan-500 dark:text-cyan-400">Build.</span>
            <span className="block reveal-3 text-slate-900 dark:text-white">Grow.</span>
          </h1>
        </div>

        <AnimatedSection delay={600}>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-medium">
            SoloPilot is your personal growth terminal. Built for those who build alone, but think big.
            For <span className="text-slate-900 dark:text-white font-bold">Solo Entrepreneurs</span> & <span className="text-cyan-600 dark:text-cyan-400">Solo Pilots</span>.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={700}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => window.open('https://entrextlabs.substack.com/subscribe', '_blank')}
              className="w-full md:w-auto whitespace-nowrap h-14 md:h-16 px-10 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black text-base md:text-lg rounded-lg transition-all flex items-center justify-center gap-3 group shadow-xl shadow-cyan-500/20 active:scale-95"
            >
              Subscribe Our Newsletter
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
