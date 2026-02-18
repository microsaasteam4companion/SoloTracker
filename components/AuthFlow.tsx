
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

interface AuthFlowProps {
  onBack: () => void;
  onSuccess: (email: string) => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('SIGNUP');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'SIGNUP') {
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signupError) throw signupError;
        if (data.user) {
          onSuccess(data.user.email || email);
        }
      } else {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (loginError) throw loginError;
        if (data.user) {
          onSuccess(data.user.email || email);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
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
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Join SoloPilot</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Start your journey to 10x productivity</p>
            </div>

            <div className="bg-white/70 dark:bg-white/[0.03] p-8 md:p-10 rounded-lg border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">Create Account</h2>
              <p className="text-slate-500 dark:text-slate-500 text-sm font-bold mb-8 uppercase tracking-widest text-[10px]">Step 1: Your Solo Pilot Identity</p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Password</label>
                  <input
                    type="password"
                    placeholder="Create a password"
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="p-5 bg-cyan-50 dark:bg-cyan-400/5 rounded-lg border border-cyan-500/10 dark:border-cyan-400/10 space-y-3">
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black rounded-lg transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Sign Up'}
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
              <Logo iconOnly className="scale-150" />
            </div>

            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Welcome Back</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Re-enter the focus cockpit</p>
            </div>

            <div className="bg-white/70 dark:bg-white/[0.03] p-8 md:p-10 rounded-lg border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Sign In</h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full h-14 px-6 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all font-bold text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-16 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black rounded-lg transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Sign In'}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-500 font-bold">
                New to the platform? <button onClick={() => setMode('SIGNUP')} className="text-cyan-600 dark:text-cyan-400 hover:underline">Sign up</button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthFlow;
