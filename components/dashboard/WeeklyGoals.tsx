
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface Goal {
  id: string;
  title: string;
  description: string;
  time_budget: number;
  category: string;
  priority: string;
  completed: boolean;
  progress: number;
  created_at: string;
}

interface WeeklyGoalsProps {
  user: User;
}

const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [budget, setBudget] = useState('');
  const [quickTask, setQuickTask] = useState('');

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('weekly_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (err) {
      console.error('Error fetching goals:', err);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const addGoal = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalTitle = title || quickTask;
    if (!finalTitle) return;

    try {
      const { error } = await supabase.from('weekly_goals').insert({
        user_id: user.id,
        title: finalTitle,
        description: desc,
        time_budget: Number(budget) || 0,
        category: 'Tactical',
        priority: 'Medium',
        progress: 0,
      });

      if (error) throw error;

      setTitle('');
      setDesc('');
      setBudget('');
      setQuickTask('');
      setShowModal(false);
      fetchGoals();
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  const toggleGoal = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('weekly_goals')
        .update({
          completed: !completed,
          progress: !completed ? 100 : 0
        })
        .eq('id', id);

      if (error) throw error;
      setGoals(goals.map(g => g.id === id ? { ...g, completed: !completed, progress: !completed ? 100 : 0 } : g));
    } catch (err) {
      console.error('Error toggling goal:', err);
    }
  };

  const deleteGoal = async (id: string) => {
    if (!confirm('Delete this goal?')) return;
    try {
      const { error } = await supabase
        .from('weekly_goals')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setGoals(goals.filter(g => g.id !== id));
    } catch (err) {
      console.error('Error deleting goal:', err);
    }
  };

  const activeGoals = goals.filter(g => !g.completed).sort((a, b) => b.progress - a.progress);
  const completedGoals = goals.filter(g => g.completed);

  const clearCompleted = async () => {
    if (!confirm('Clear all completed goals?')) return;
    try {
      const ids = completedGoals.map(g => g.id);
      const { error } = await supabase
        .from('weekly_goals')
        .delete()
        .in('id', ids);

      if (error) throw error;
      setGoals(goals.filter(g => !g.completed));
    } catch (err) {
      console.error('Error clearing goals:', err);
    }
  };

  const consistencyScore = goals.length > 0 ? Math.round((goals.filter(g => g.progress > 0).length / goals.length) * 100) : 0;

  return (
    <div className="animate-[slideUp_0.5s_ease-out_both] w-full">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-1">Weekly Goals</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-normal">Track your weekly targets and progress.</p>
        </div>
      </div>

      {/* Active Goals */}
      <div className="bg-white dark:bg-white/[0.03] p-5 md:p-6 rounded-xl border border-slate-200 dark:border-white/[0.06] mb-6 animate-[scaleIn_0.4s_ease-out_both_0.1s]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse"></div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Active Goals</h3>
              <p className="text-xs text-slate-500 font-medium">Consistency: {consistencyScore}%</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="w-full md:w-auto px-4 py-2 bg-cyan-500 dark:bg-cyan-500 text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            Add Goal
          </button>
        </div>

        {activeGoals.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center mb-4 text-slate-300 dark:text-slate-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>
            </div>
            <p className="text-slate-500 dark:text-slate-500 text-sm font-normal">No goals yet. What do you want to achieve this week?</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeGoals.map((goal) => (
              <div key={goal.id} className={`p-3 md:p-4 bg-slate-50 dark:bg-white/[0.02] rounded-lg border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all group flex items-center gap-3 ${goal.completed ? 'opacity-60' : ''}`}>
                <button
                  onClick={() => toggleGoal(goal.id, goal.completed)}
                  className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${goal.completed ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-slate-200 dark:border-white/10 text-transparent hover:border-cyan-400'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </button>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium text-slate-900 dark:text-white ${goal.completed ? 'line-through' : ''}`}>{goal.title}</h4>
                  <p className="text-xs text-slate-500 font-normal">{goal.category} · {goal.time_budget}h budget</p>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1.5 text-slate-300 hover:text-red-500 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Add */}
      <div className="relative mb-8">
        <input
          type="text"
          value={quickTask}
          onChange={(e) => setQuickTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addGoal()}
          placeholder="Quick add — type a goal and press Enter..."
          className="w-full h-11 md:h-12 pl-4 md:pl-5 pr-14 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-normal transition-all"
        />
        <button
          onClick={() => addGoal()}
          className="absolute right-1.5 top-1.5 w-8 h-8 md:w-9 md:h-9 bg-cyan-500 dark:bg-cyan-500 text-white rounded-lg flex items-center justify-center hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <div className="mb-8 animate-[slideUp_0.4s_ease-out_both_0.3s]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Completed</h3>
            <div className="flex items-center gap-3">
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">{completedGoals.length} done</span>
              <button
                onClick={clearCompleted}
                className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {completedGoals.map((goal) => {
              const daysToComplete = Math.ceil((new Date().getTime() - new Date(goal.created_at).getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={goal.id} className="p-4 bg-white dark:bg-white/[0.03] rounded-xl border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all group relative">
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-1.5 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                    <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{goal.category}</p>
                    </div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">{goal.title}</h4>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-normal">Completed in {daysToComplete}d</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">100%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/50 dark:bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 shadow-xl relative overflow-hidden animate-[scaleIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Add Goal</h2>
              <form className="space-y-4" onSubmit={addGoal}>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Launch MVP this week"
                    className="w-full h-10 px-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-normal"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Description</label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="What needs to be done..."
                    rows={3}
                    className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-normal resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-500 font-medium mb-2">Time Budget (hours)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g., 20"
                    className="w-full h-10 px-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-normal"
                  />
                </div>
                <button type="submit" className="w-full h-10 bg-slate-900 dark:bg-cyan-500 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-cyan-400 transition-all active:scale-[0.98] text-sm mt-2">
                  Save Goal
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyGoals;
