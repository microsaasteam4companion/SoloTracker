
import React, { useState } from 'react';

const ContentLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FRAMEWORKS' | 'HOOKS'>('FRAMEWORKS');

  const frameworks = [
    {
      name: "AIDA Protocol",
      tag: "Conversion",
      description: "The classic sequence: Attention → Interest → Desire → Action. Optimized for cold outreach and landing pages."
    },
    {
      name: "PAS Mechanism",
      tag: "Direct Response",
      description: "Problem → Agitate → Solution. The strongest framework for sales copy. Identify the pain, amplify the emotional cost, present your solution."
    }
  ];

  const hooks = [
    {
      name: "Transparency Hook",
      tag: "Viral",
      description: "I spent $12,400 and 320 hours on this project. Here is the exact data on what worked (and failed):"
    },
    {
      name: "Build Public #01",
      tag: "Engagement",
      description: "Day 1 of building [FounderFlow]: I've never felt this nervous. Here's the plan for 30 days..."
    },
    {
      name: "The Myth-Buster",
      tag: "Authority",
      description: "Everyone told me this was impossible for a solo founder. 6 months later, we're at $10k MRR."
    }
  ];

  return (
    <div className="w-full animate-[slideUp_0.6s_ease-out_both]">
      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-cyan-400 mb-2 md:mb-3 tracking-tighter">Content Foundry</h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl">Zero blank page syndrome. Use pre-validated mental frameworks to scale.</p>
      </div>

      <div className="flex gap-3 md:gap-4 mb-10 md:mb-12 animate-[fadeIn_0.5s_ease-out_both_0.4s]">
        <button 
          onClick={() => setActiveTab('FRAMEWORKS')}
          className={`flex-1 sm:flex-none px-6 py-4 md:px-10 md:py-5 rounded-[1.5rem] md:rounded-[2rem] text-sm md:text-lg font-black transition-all ${activeTab === 'FRAMEWORKS' ? 'bg-slate-800 text-white shadow-2xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
        >
          Protocols
        </button>
        <button 
          onClick={() => setActiveTab('HOOKS')}
          className={`flex-1 sm:flex-none px-6 py-4 md:px-10 md:py-5 rounded-[1.5rem] md:rounded-[2rem] text-sm md:text-lg font-black transition-all ${activeTab === 'HOOKS' ? 'bg-slate-800 text-white shadow-2xl' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
        >
          Viral Hooks
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 animate-[slideUp_0.7s_ease-out_both_0.5s]">
        {(activeTab === 'FRAMEWORKS' ? frameworks : hooks).map((f, i) => (
          <div key={i} style={{ animationDelay: `${i * 100}ms` }} className="animate-[scaleIn_0.5s_ease-out_both] glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/[0.01] transition-all group cursor-pointer relative overflow-hidden shadow-2xl">
             <div className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 md:w-16 md:h-16 glass rounded-[1.2rem] md:rounded-2xl flex items-center justify-center text-slate-600 group-hover:text-cyan-400 group-hover:bg-cyan-400/10 transition-all border border-white/5">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
             </div>
             <div className="mb-6 md:mb-10 pr-12 md:pr-0">
               <h4 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tighter group-hover:text-cyan-400 transition-colors">{f.name}</h4>
               <span className="px-4 py-1.5 md:px-5 md:py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{f.tag}</span>
             </div>
             <p className="text-lg md:text-2xl text-slate-400 leading-snug font-bold group-hover:text-slate-200 transition-colors max-w-4xl">
               {f.description}
             </p>
             <div className="mt-8 md:mt-12 flex items-center gap-4 text-cyan-400/40 group-hover:text-cyan-400 transition-colors">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Protocol Template</span>
                <div className="flex-1 h-[1px] bg-white/5 group-hover:bg-cyan-400/20 transition-all"></div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentLibrary;
