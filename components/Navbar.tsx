
import React, { useState } from 'react';
import Logo from './Logo';

interface NavbarProps {
  scrolled: boolean;
  onAuth: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate?: (view: string) => void;
  isLoggedIn?: boolean;
  isPaid?: boolean;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  scrolled,
  onAuth,
  theme,
  onToggleTheme,
  onNavigate,
  isLoggedIn,
  isPaid,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 md:py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-cyan-500/5' : 'py-5 md:py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo
          className="scale-90 md:scale-100"
          onClick={() => { if (onNavigate) onNavigate('LANDING'); else window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        />

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Pricing</a>
          <button onClick={() => onNavigate?.('BLOGS')} className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Blogs</button>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-all border border-slate-300 dark:border-white/10"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  if (isPaid) onNavigate?.('DASHBOARD');
                  else document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hidden sm:block text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button onClick={onLogout} className="text-xs font-bold text-red-500 hover:text-red-400 transition-colors uppercase tracking-widest hidden sm:block">Logout</button>
            </>
          ) : (
            <button onClick={onAuth} className="hidden sm:block text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Login</button>
          )}

          <button
            onClick={() => {
              if (isLoggedIn && isPaid) onNavigate?.('DASHBOARD');
              else document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-2 md:px-6 md:py-2.5 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 text-sm font-black rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            Get Started
          </button>

          <button onClick={toggleMenu} className="md:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-900 rounded-lg border border-slate-300 dark:border-white/10">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass dark:bg-slate-950/90 border-b border-white/5 py-8 px-6 animate-[slideDown_0.3s_ease-out]">
          <div className="flex flex-col gap-6">
            <button onClick={() => { onNavigate?.('LANDING'); toggleMenu(); }} className="text-lg font-black text-slate-900 dark:text-white text-left">Features</button>
            <button onClick={() => { onNavigate?.('LANDING'); toggleMenu(); }} className="text-lg font-black text-slate-900 dark:text-white text-left">Pricing</button>
            <button onClick={() => { onNavigate?.('BLOGS'); toggleMenu(); }} className="text-lg font-black text-slate-900 dark:text-white text-left">Blogs</button>
            <hr className="border-slate-200 dark:border-white/5" />
            <button onClick={() => { onAuth(); toggleMenu(); }} className="text-left text-lg font-black text-cyan-500 dark:text-cyan-400">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
