
import React, { useState } from 'react';

const IncomeStreams: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full animate-[slideUp_0.6s_ease-out_both]">
      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-cyan-400 mb-2 md:mb-3 tracking-tighter">Income Matrix</h1>
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl">Centralize your revenue streams and track lifetime ROI for every hour invested.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-10 md:mb-12">
        {[
          { label: 'Cumulative Revenue', value: '$84,250', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2', color: 'cyan', delay: 100 },
          { label: 'Aggregated ROI', value: '$312/hr', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z', color: 'purple', delay: 200 },
          { label: 'Active Channels', value: '4', icon: 'M21 13.255A23.931 23.931 0 0112 15', color: 'orange', delay: 300 },
        ].map((stat, i) => (
          <div key={i} style={{ animationDelay: `${stat.delay}ms` }} className="animate-[scaleIn_0.5s_ease-out_both] glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/10 group hover:bg-white/5 transition-all text-center md:text-left">
            <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto md:mx-0 rounded-[1.2rem] md:rounded-[1.5rem] bg-${stat.color}-400/10 text-${stat.color}-400 flex items-center justify-center mb-6 md:mb-10 shadow-xl group-hover:scale-110 transition-transform`}>
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon} />
              </svg>
            </div>
            <p className="text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest mb-1 md:mb-2">{stat.label}</p>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white/10 min-h-[400px] md:min-h-[500px] flex flex-col relative overflow-hidden group animate-[scaleIn_0.7s_ease-out_both_0.4s]">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 mb-12 md:mb-16 relative z-10 text-center sm:text-left">
          <h3 className="text-2xl md:text-3xl font-black text-white">Revenue Sources</h3>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-cyan-400 text-slate-950 text-sm md:text-base font-black rounded-[1.5rem] md:rounded-3xl flex items-center justify-center gap-3 hover:bg-cyan-300 transition-all shadow-2xl shadow-cyan-500/30 active:scale-95"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v16m8-8H4" /></svg>
            New Stream
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 md:space-y-10 relative z-10">
           <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-900 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center mb-4 md:mb-6 text-slate-800 animate-pulse border border-white/5">
              <svg className="w-12 h-12 md:w-16 md:h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <p className="text-slate-500 text-lg md:text-xl font-black max-w-sm">No revenue channels connected. Scale your matrix today.</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-2xl animate-[fadeIn_0.3s_ease-out]">
          <div className="glass w-full max-w-2xl rounded-[2.5rem] md:rounded-[4rem] border-white/10 shadow-2xl relative overflow-hidden animate-[scaleIn_0.4s_ease-out] max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-2xl md:rounded-3xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/5"
            >
              <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-8 md:p-20">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8 md:mb-12">New Revenue Engine</h2>
              <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); setShowModal(false); }}>
                <div>
                  <label className="block text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Stream Identity</label>
                  <input 
                    type="text" 
                    placeholder="e.g., SaaS Product" 
                    className="w-full h-14 md:h-16 px-6 md:px-8 bg-slate-950 border border-white/10 rounded-2xl text-white text-base md:text-xl placeholder-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Channel Model</label>
                  <select className="w-full h-14 md:h-16 px-6 md:px-8 bg-slate-950 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/30 font-bold appearance-none">
                    <option>SaaS / Recurring</option>
                    <option>High-Ticket Agency</option>
                    <option>Digital Products</option>
                    <option>Affiliate Matrix</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <label className="block text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Monthly Target ($)</label>
                    <input 
                      type="number" 
                      defaultValue="5000" 
                      className="w-full h-14 md:h-16 px-6 md:px-8 bg-slate-950 border border-white/10 rounded-2xl text-white text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/30 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] md:text-sm font-black text-slate-500 uppercase tracking-widest mb-3 md:mb-4">Allocation (Hrs/Mo)</label>
                    <input 
                      type="number" 
                      defaultValue="40" 
                      className="w-full h-14 md:h-16 px-6 md:px-8 bg-slate-950 border border-white/10 rounded-2xl text-white text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/30 font-bold"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full h-16 md:h-20 bg-cyan-400 text-slate-950 font-black text-lg md:text-xl rounded-[1.5rem] md:rounded-[2rem] hover:bg-cyan-300 transition-all shadow-2xl shadow-cyan-500/30 active:scale-[0.98] mt-4">
                  Initiate Stream
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeStreams;
