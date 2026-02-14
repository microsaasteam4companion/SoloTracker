
import React from 'react';

interface AdminProps {
  username: string;
}

const Admin: React.FC<AdminProps> = ({ username }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-cyan-400 mb-2 tracking-tight">Admin Panel</h1>
        <p className="text-slate-500 text-lg font-medium">Manage users and system settings</p>
      </div>

      <div className="glass p-10 rounded-[2.5rem] border-white/5 mb-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white">User Management</h3>
        </div>

        <div className="space-y-4">
           <div className="p-6 glass rounded-2xl border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-slate-500 font-black text-xl">
                   {username.slice(0, 2).toUpperCase()}
                 </div>
                 <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-black text-white">{username}</h4>
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest border border-cyan-400/20">admin</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">{username}@founder.ai</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <select className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50">
                   <option>Admin</option>
                   <option>User</option>
                 </select>
              </div>
           </div>
        </div>
      </div>

      <div className="p-8 bg-cyan-400/5 rounded-[2rem] border border-cyan-400/10">
        <div className="flex items-center gap-3 mb-4">
           <div className="text-cyan-400">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
           <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Admin Note</h4>
        </div>
        <p className="text-slate-500 leading-relaxed font-medium">
          The first user to register automatically becomes an admin. You can promote other users to admin status here.
        </p>
      </div>
    </div>
  );
};

export default Admin;
