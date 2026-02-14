
import React, { useState } from 'react';

interface AuthFlowProps {
  onBack: () => void;
  onSuccess: (username: string) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('SIGNUP');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSuccess(username);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      {/* Background Blobs for Visual Interest */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 dark:bg-cyan-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-cyan-900/10 blur-[120px] rounded-full"></div>

      <div className="absolute top-8 left-8 z-10">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Website
        </button>
      </div>

      <div className="w-full max-w-md relative z-10 animate-[scaleIn_0.4s_ease-out]">
        {mode === 'SIGNUP' ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Join Flow</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Start your journey to 10x productivity</p>
            </div>

            <div className="glass p-8 md:p-10 rounded-[2.5rem] border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none bg-white/70 dark:bg-white/[0.03]">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Create Account</h2>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-bold mb-8 uppercase tracking-widest text-[10px]">Step 1: Identity & Security</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Username</label>
                  <input 
                    type="text" 
                    placeholder="Choose a username" 
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Password</label>
                  <input 
                    type="password" 
                    placeholder="Create a password" 
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="p-5 bg-cyan-50 dark:bg-cyan-400/5 rounded-2xl border border-cyan-500/10 dark:border-cyan-400/10 space-y-3">
                  {[
                    "Access to all core features",
                    "Deep work timer & streak tracking",
                    "AI-powered content generation"
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 font-bold">
                      <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </div>
                  ))}
                </div>

                <button type="submit" className="w-full h-16 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black rounded-2xl transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]">
                  Initiate Account
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500 font-bold">
                Already registered? <button onClick={() => setMode('LOGIN')} className="text-cyan-600 dark:text-cyan-400 hover:underline">Sign in</button>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-cyan-500 dark:bg-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 transform rotate-12">
                <svg className="w-10 h-10 text-white dark:text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Welcome Back</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Re-enter the focus cockpit</p>
            </div>

            <div className="glass p-8 md:p-10 rounded-[2.5rem] border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none bg-white/70 dark:bg-white/[0.03]">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Login</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Username</label>
                  <input 
                    type="text" 
                    placeholder="Enter your username" 
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Password</label>
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="w-full h-16 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black rounded-2xl transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]">
                  Confirm Entry
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500 font-bold">
                New to the platform? <button onClick={() => setMode('SIGNUP')} className="text-cyan-600 dark:text-cyan-400 hover:underline">Register</button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;
