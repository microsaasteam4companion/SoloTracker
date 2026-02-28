
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import DashboardShowcase from '@/components/DashboardShowcase';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Blogs from '@/components/Blogs';
import Footer from '@/components/Footer';
import AuthFlow from '@/components/AuthFlow';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Overview from '@/components/dashboard/Overview';
import DeepWork from '@/components/dashboard/DeepWork';
import WeeklyGoals from '@/components/dashboard/WeeklyGoals';
import Analytics from '@/components/dashboard/Analytics';
import StrategicIntelligence from '@/components/dashboard/StrategicIntelligence';
import SettingsPage from '@/components/dashboard/SettingsPage';
import Admin from '@/components/dashboard/Admin';
import LegalPage from '@/components/LegalPage';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

type View = 'LANDING' | 'AUTH' | 'DASHBOARD' | 'PRIVACY' | 'TERMS' | 'BLOGS' | 'REDIRECTING';
const LANDING: View = 'LANDING';
type DashboardTab = 'DASHBOARD' | 'DEEP_WORK' | 'GOALS' | 'ANALYTICS' | 'STRATEGIC' | 'SETTINGS' | 'ADMIN';

const App: React.FC = () => {
  const [view, setView] = useState<View>('LANDING');
  const [dashTab, setDashTab] = useState<DashboardTab>('DASHBOARD');
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme to document and persist to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const fetchUserSettings = async (userId: string) => {
    try {
      // Use .maybeSingle() to avoid error noise if record doesn't exist yet
      const { data, error } = await supabase
        .from('user_settings')
        .select('theme, is_paid')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.warn('SoloPilot: Settings fetch error (ignoring for new users):', error.message);
        return;
      }

      if (data) {
        if (data.theme) setTheme(data.theme);
        setIsPaid(!!data.is_paid);
      }
    } catch (err) {
      console.error('SoloPilot: Critical error in fetchUserSettings:', err);
    }
  };

  useEffect(() => {

    // Check active sessions and sets the user
    const checkSession = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Session fetch timeout')), 3000)
        );
        const { data: { session } } = await Promise.race([supabase.auth.getSession(), timeoutPromise]) as any;
        const activeUser = session?.user ?? null;
        setUser(activeUser);
        if (activeUser) {
          setView('DASHBOARD');
          await fetchUserSettings(activeUser.id);
        }
      } catch (err) {
        console.error('SoloPilot: Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // Handle post-payment polling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment_success') === 'true' && user && !isPaid) {
      const interval = setInterval(() => {
        fetchUserSettings(user.id);
      }, 3000);

      // Stop polling after 45 seconds or if isPaid becomes true
      const timeout = setTimeout(() => {
        clearInterval(interval);
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 45000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [user, isPaid]);

  useEffect(() => {
    console.log('SoloPilot: Initializing Auth Listener');
    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const activeUser = session?.user ?? null;
      console.log(`SoloPilot: Auth Event [${event}] triggered. User: ${activeUser?.id || 'None'}`);

      setUser(activeUser);

      if (activeUser) {
        // Fetch settings in background (non-blocking)
        fetchUserSettings(activeUser.id);

        // Handle pending payment redirect
        const hasPendingPayment = localStorage.getItem('pending_payment') === 'true';
        if (hasPendingPayment) {
          console.log('SoloPilot: Found pending payment, redirecting...');
          localStorage.removeItem('pending_payment');
          const checkoutUrl = `https://test.checkout.dodopayments.com/buy/pdt_0NYtW8BmCxyMTGE3mvlj8?quantity=1&metadata[user_id]=${activeUser.id}`;
          setView('REDIRECTING');
          window.location.href = checkoutUrl;
          return;
        }

        // Handle URL-based payment success flag
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment_success') === 'true') {
          // Stay in current view or go to dashboard if returning from checkout
          setView('DASHBOARD');
          return;
        }

        // If newly signed in or session is available, go to dashboard
        const authEvents = ['SIGNED_IN', 'SIGNED_UP', 'INITIAL_SESSION'];
        if (authEvents.includes(event as string)) {
          setView('DASHBOARD');
        }
      } else {
        // Handle logout or session expiration
        if (event === 'SIGNED_OUT') {
          setView('LANDING');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []); // Only run once on mount

  // Handle redirection based on payment status
  useEffect(() => {
    // Only redirect if we are on the dashboard and we've confirmed the user is NOT paid
    // Adding a small delay to allow fetchUserSettings to potentially finish
    if (user && view === 'DASHBOARD' && !isPaid) {
      const timeout = setTimeout(() => {
        // Re-check after 1.5 seconds to avoid premature redirection
        if (!isPaid) {
          console.log('SoloPilot: Unpaid user on dashboard, redirecting to pricing...');
          setView('LANDING');
          setTimeout(() => {
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [isPaid, user, view]);


  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleTabChange = (e: any) => {
      setDashTab(e.detail);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const handleAuthSuccess = () => {
    setView('DASHBOARD');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('LANDING');
  };

  // Simple Error Boundary logic for the main render
  const [renderError, setRenderError] = useState<string | null>(null);

  if (renderError) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-black text-white mb-4">ENGINE FAILURE</h1>
        <p className="text-slate-400 text-sm mb-8 max-w-md">{renderError}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-cyan-500 text-slate-950 font-black rounded-lg text-xs uppercase"
        >
          Reboot System
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-500 font-black tracking-tighter text-2xl animate-pulse">
        SOLOPILOT...
      </div>
    );
  }

  try {
    if (view === 'REDIRECTING') {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <h1 className="text-2xl font-black text-white mb-2">Redirecting to Payment...</h1>
          <p className="text-slate-500">Please do not close this window.</p>
        </div>
      );
    }

    if (view === 'AUTH') {
      return <AuthFlow onBack={() => setView('LANDING')} onSuccess={handleAuthSuccess} />;
    }

    // Payment Success Verification Overlay
    const params = new URLSearchParams(window.location.search);
    const isReturningFromPayment = params.get('payment_success') === 'true';

    if (isReturningFromPayment && user && !isPaid) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-8"></div>
          <h1 className="text-2xl font-black text-white mb-2">Verifying Payment...</h1>
          <p className="text-slate-500">We're confirming your status. Dashboard will open automatically.</p>
        </div>
      );
    }

    if (view === 'DASHBOARD' && user) {
      const username = user.email?.split('@')[0] || 'Explorer';
      return (
        <DashboardLayout
          username={username}
          activeTab={dashTab}
          onTabChange={setDashTab}
          onLogout={handleLogout}
        >
          {dashTab === 'DASHBOARD' && <Overview user={user} />}
          {dashTab === 'DEEP_WORK' && <DeepWork user={user} />}
          {dashTab === 'GOALS' && <WeeklyGoals user={user} />}
          {dashTab === 'ANALYTICS' && <Analytics user={user} />}
          {dashTab === 'STRATEGIC' && <StrategicIntelligence user={user} />}
          {dashTab === 'SETTINGS' && <SettingsPage user={user} theme={theme} setTheme={setTheme} />}
          {dashTab === 'ADMIN' && <Admin username={username} />}
        </DashboardLayout>
      );
    }

    if (view === 'PRIVACY' || view === 'TERMS') {
      return <LegalPage type={view} onBack={() => setView('LANDING')} />;
    }

    if (view === 'BLOGS') {
      return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
          <div className="pt-20 px-6 max-w-7xl mx-auto">
            <button
              onClick={() => setView('LANDING')}
              className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-widest mb-12 hover:gap-3 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Home
            </button>
          </div>
          <Blogs />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 overflow-x-hidden transition-colors duration-500">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 dark:bg-cyan-900/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 dark:bg-cyan-900/10 blur-[120px] rounded-full"></div>
        </div>

        <Navbar
          scrolled={scrolled}
          onAuth={() => setView('AUTH')}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNavigate={(v) => setView(v as View)}
        />

        <main>
          <Hero onStart={() => setView('AUTH')} />
          <DashboardShowcase />
          <Features />
          <Pricing onStart={() => setView('AUTH')} />
          <FAQ />
        </main>

        <Footer onNavigate={(v) => setView(v as View)} />
      </div>
    );
  } catch (err: any) {
    setRenderError(err.message || 'Unknown render error');
    return null;
  }
};

export default App;
