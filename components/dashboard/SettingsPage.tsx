
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface SettingsPageProps {
  user: User;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ user, theme, setTheme }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setTheme(data.theme || 'dark');
        setEmailNotifications(data.email_notifications ?? true);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          theme,
          email_notifications: emailNotifications,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) throw error;
      alert('Settings saved successfully!');
    } catch (err: any) {
      console.error('Error saving settings:', err);
      alert(`Failed to save settings: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-[slideUp_0.5s_ease-out_both]">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-white/[0.03] p-5 md:p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] mb-4">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-400/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Profile</h3>
        </div>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Username</label>
            <input
              type="text"
              value={user.email?.split('@')[0] || 'User'}
              disabled
              className="w-full h-10 px-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-lg text-slate-400 dark:text-slate-500 cursor-not-allowed font-normal text-sm"
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-1.5 font-normal ml-0.5">Username cannot be changed</p>
          </div>

          <div>
            <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Email</label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="w-full h-10 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-lg text-slate-400 dark:text-white font-normal text-sm cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white dark:bg-white/[0.03] p-5 md:p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] mb-4">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Preferences</h3>
        </div>

        <div className="space-y-3 max-w-lg">
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-white/5">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-0.5">Email Notifications</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 font-normal">Updates about goals and sessions</p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-10 h-5 rounded-full transition-all flex-shrink-0 ${emailNotifications ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${emailNotifications ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-white/5">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white mb-0.5">Theme</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 font-normal">Choose color scheme</p>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          disabled={loading}
          className="h-10 px-6 bg-cyan-500 dark:bg-cyan-500 hover:bg-cyan-600 dark:hover:bg-cyan-400 text-white font-medium rounded-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Save Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
