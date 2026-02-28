
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface CTAProps {
  onStart: () => void;
}

const CTA: React.FC<CTAProps> = ({ onStart }) => {
  return (
    <section id="waitlist" className="py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="relative p-10 md:p-20 rounded-[3rem] bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 dark:from-cyan-900 dark:via-cyan-800 dark:to-blue-900 animate-gradient-x text-center shadow-[0_30px_100px_-20px_rgba(6,182,212,0.3)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white dark:bg-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl group transition-transform hover:scale-110 border-4 border-slate-50 dark:border-slate-950">
            <svg className="w-10 h-10 text-cyan-500 dark:text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h2 className="text-4xl md:text-6xl font-[900] text-white mb-8 mt-4 leading-tight tracking-tighter">
            Ready to <span className="text-cyan-100 dark:text-cyan-400 drop-shadow-md">10x Your Growth?</span>
          </h2>

          <p className="text-cyan-100/80 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-medium">Join SoloPilot today and stop playing small. Build with obsession. Grow with precision.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-14 px-8 rounded-full bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all backdrop-blur-md font-bold"
            />
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto whitespace-nowrap h-14 px-10 bg-white text-cyan-600 dark:text-slate-950 font-black rounded-full transition-all hover:bg-cyan-50 hover:scale-105 active:scale-95 shadow-xl"
            >
              Join Waitlist
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-xs md:text-sm font-black text-white/90 uppercase tracking-widest">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm font-black text-white/90 uppercase tracking-widest">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              Early access priority
            </div>
          </div>

          {/* Decorative radial overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_40%)] pointer-events-none"></div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTA;
