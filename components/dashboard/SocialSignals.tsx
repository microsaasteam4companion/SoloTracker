
import React from 'react';

const SocialSignals: React.FC = () => {
  return (
    <div className="w-full animate-[slideUp_0.6s_ease-out_both]">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-black text-cyan-400 mb-3 tracking-tighter">Social Intelligence</h1>
        <p className="text-slate-500 text-xl font-medium max-w-xl">AI-curated opportunities to engage, network, and convert.</p>
      </div>

      <div className="glass p-16 rounded-[4rem] border-white/10 min-h-[600px] flex flex-col relative overflow-hidden group animate-[scaleIn_0.7s_ease-out_both_0.2s]">
        <div className="absolute top-0 right-0 p-20 text-cyan-400/5 group-hover:scale-105 transition-transform duration-[3s]">
           <svg className="w-[30rem] h-[30rem]" fill="currentColor" viewBox="0 0 24 24">
               <path d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
        </div>

        <div className="flex items-center gap-4 mb-16 relative z-10">
           <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center shadow-xl">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
             </svg>
           </div>
           <h3 className="text-3xl font-black text-white">Live Opportunity Feed</h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-10 relative z-10">
          <div className="text-slate-800 animate-[pulse_3s_infinite]">
            <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-2xl font-black mb-4">Scanning Social Waves...</p>
            <p className="text-slate-600 font-medium max-w-sm mx-auto">No high-potential signals detected in the last hour. Optimize your tracking parameters to increase reach.</p>
          </div>
          
          <div className="inline-flex items-center gap-4 px-8 py-4 glass rounded-3xl border-white/5 text-sm font-black text-slate-500 animate-bounce">
            <span className="text-amber-500 text-xl">⚡</span>
            Pro Tip: Link your X/Reddit APIs for real-time alerts.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSignals;
