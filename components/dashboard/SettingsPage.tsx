
import React from 'react';

interface SettingsPageProps {
  username: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ username }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-cyan-400 mb-2 tracking-tight">Settings</h1>
        <p className="text-slate-500 text-lg font-medium">Customize your FounderFlow experience</p>
      </div>

      <div className="glass p-10 rounded-[2.5rem] border-white/5">
        <div className="flex items-center gap-3 mb-10">
          <div className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">Profile Settings</h3>
        </div>

        <form className="space-y-8 max-w-2xl">
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3">Username</label>
            <input 
              type="text" 
              value={username} 
              disabled 
              className="w-full h-14 px-6 bg-slate-900/50 border border-white/5 rounded-2xl text-slate-500 cursor-not-allowed font-medium"
            />
            <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest ml-1">Username cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3">Email</label>
            <input 
              type="email" 
              placeholder={`${username}@founder.ai`}
              className="w-full h-14 px-6 bg-slate-900 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3">Timezone</label>
            <select className="w-full h-14 px-6 bg-slate-900 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-medium appearance-none">
              <option>UTC</option>
              <option>EST</option>
              <option>PST</option>
              <option>IST</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3">Target Market</label>
            <select className="w-full h-14 px-6 bg-slate-900 border border-white/5 rounded-2xl text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-medium appearance-none">
              <option>United States</option>
              <option>Europe</option>
              <option>Asia</option>
              <option>Global</option>
            </select>
            <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest ml-1">Helps optimize posting times for your audience</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-400 mb-3">Hourly Rate ($)</label>
            <input 
              type="number" 
              defaultValue="0"
              className="w-full h-14 px-6 bg-slate-900 border border-white/5 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 font-medium"
            />
            <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest ml-1">Used for Dollar-per-Hour tracking</p>
          </div>

          <button className="h-14 px-10 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-3">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
             Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
