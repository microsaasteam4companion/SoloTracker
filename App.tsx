
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Mockups from './components/Mockups';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import AuthFlow from './components/AuthFlow';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Overview from './components/dashboard/Overview';
import DeepWork from './components/dashboard/DeepWork';
import WeeklyGoals from './components/dashboard/WeeklyGoals';
import SocialSignals from './components/dashboard/SocialSignals';
import Analytics from './components/dashboard/Analytics';
import IncomeStreams from './components/dashboard/IncomeStreams';
import ContentLibrary from './components/dashboard/ContentLibrary';
import SettingsPage from './components/dashboard/SettingsPage';
import Admin from './components/dashboard/Admin';

type View = 'LANDING' | 'AUTH' | 'DASHBOARD';
type DashboardTab = 'DASHBOARD' | 'DEEP_WORK' | 'GOALS' | 'SOCIAL' | 'ANALYTICS' | 'INCOME' | 'CONTENT' | 'SETTINGS' | 'ADMIN';

const App: React.FC = () => {
  const [view, setView] = useState<View>('LANDING');
  const [dashTab, setDashTab] = useState<DashboardTab>('DASHBOARD');
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleAuthSuccess = (username: string) => {
    setUser({ username });
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    setUser(null);
    setView('LANDING');
  };

  if (view === 'AUTH') {
    return <AuthFlow onBack={() => setView('LANDING')} onSuccess={handleAuthSuccess} />;
  }

  if (view === 'DASHBOARD') {
    return (
      <DashboardLayout 
        username={user?.username || 'hello'} 
        activeTab={dashTab} 
        onTabChange={setDashTab}
        onLogout={handleLogout}
      >
        {dashTab === 'DASHBOARD' && <Overview username={user?.username || 'hello'} />}
        {dashTab === 'DEEP_WORK' && <DeepWork />}
        {dashTab === 'GOALS' && <WeeklyGoals />}
        {dashTab === 'SOCIAL' && <SocialSignals />}
        {dashTab === 'ANALYTICS' && <Analytics />}
        {dashTab === 'INCOME' && <IncomeStreams />}
        {dashTab === 'CONTENT' && <ContentLibrary />}
        {dashTab === 'SETTINGS' && <SettingsPage username={user?.username || 'hello'} />}
        {dashTab === 'ADMIN' && <Admin username={user?.username || 'hello'} />}
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 overflow-x-hidden transition-colors duration-500">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 dark:bg-cyan-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 dark:bg-cyan-900/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar scrolled={scrolled} onAuth={() => setView('AUTH')} theme={theme} onToggleTheme={toggleTheme} />
      
      <main>
        <Hero onStart={() => setView('AUTH')} />
        <Mockups />
        <Features />
        <Pricing onStart={() => setView('AUTH')} />
        <CTA onStart={() => setView('AUTH')} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
