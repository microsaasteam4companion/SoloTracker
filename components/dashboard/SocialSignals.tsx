
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { getFounderInsights, GrokAnalysisResult } from '../../lib/grok';

interface SocialSignalsProps {
  user: User;
}

const SocialSignals: React.FC<SocialSignalsProps> = ({ user }) => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<GrokAnalysisResult | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!niche.trim()) return;
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const data = await getFounderInsights(niche.trim());
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return { bg: 'bg-emerald-500/10 dark:bg-emerald-400/10', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-500/20 dark:border-emerald-400/20', icon: '🎯' };
      case 'recommendation': return { bg: 'bg-cyan-500/10 dark:bg-cyan-400/10', text: 'text-cyan-600 dark:text-cyan-400', border: 'border-cyan-500/20 dark:border-cyan-400/20', icon: '💡' };
      case 'lead': return { bg: 'bg-purple-500/10 dark:bg-purple-400/10', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500/20 dark:border-purple-400/20', icon: '👤' };
      default: return { bg: 'bg-blue-500/10 dark:bg-blue-400/10', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-500/20 dark:border-blue-400/20', icon: '📊' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-[slideUp_0.6s_ease-out_both]">
      <div className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Social Signals</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base font-medium">AI-powered insights for your niche • Powered by Grok</p>
      </div>

      {/* Search Bar */}
      <div className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-slate-200 dark:border-white/5 mb-6 md:mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest mb-3">Your Niche or Product</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="e.g., SaaS productivity tools, AI writing assistant, fitness app..."
              className="w-full h-14 md:h-16 px-6 md:px-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-white text-base md:text-lg placeholder-slate-300 dark:placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400/30 font-bold transition-all"
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading || !niche.trim()}
            className="w-full md:w-auto mt-2 md:mt-7 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-black rounded-2xl hover:from-purple-600 hover:to-cyan-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Analyze with Grok
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="space-y-6 md:space-y-8 animate-[slideUp_0.5s_ease-out_both]">

          {/* Summary & Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="glass p-6 rounded-2xl border-slate-200 dark:border-white/5 shadow-sm">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Engagement Score</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white">{results.engagementScore}</span>
                <span className="text-lg font-bold text-slate-400 mb-1">/100</span>
              </div>
              <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${results.engagementScore >= 70 ? 'bg-emerald-500' : results.engagementScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${results.engagementScore}%` }}
                ></div>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl border-slate-200 dark:border-white/5 shadow-sm">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Best Time to Post</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">{results.bestTimeToPost}</p>
            </div>

            <div className="glass p-6 rounded-2xl border-slate-200 dark:border-white/5 shadow-sm">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Top Topics</p>
              <div className="flex flex-wrap gap-2">
                {results.topTopics.map((topic, i) => (
                  <span key={i} className="px-3 py-1 bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold rounded-lg">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="glass p-6 md:p-8 rounded-2xl border-slate-200 dark:border-white/5 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">📝 Summary</h3>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">{results.summary}</p>
          </div>

          {/* AI Insights */}
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 md:mb-6">🧠 AI Insights</h3>
            <div className="space-y-4">
              {results.insights.map((insight, i) => {
                const colors = getInsightColor(insight.type);
                return (
                  <div key={i} className={`p-5 md:p-6 rounded-2xl border ${colors.border} ${colors.bg} transition-all hover:scale-[1.01]`}>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{colors.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white">{insight.title}</h4>
                          <span className={`text-xs font-black ${colors.text} px-3 py-1 rounded-lg ${colors.bg}`}>
                            {insight.confidence}% confidence
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{insight.description}</p>
                        <div className="space-y-1.5">
                          {insight.actionItems.map((action, j) => (
                            <div key={j} className="flex items-start gap-2 text-sm">
                              <svg className={`w-4 h-4 mt-0.5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                              </svg>
                              <span className="text-slate-700 dark:text-slate-300">{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Potential Leads */}
          {results.potentialLeads.length > 0 && (
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 md:mb-6">👥 Potential Leads & Communities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {results.potentialLeads.map((lead, i) => (
                  <div key={i} className="p-5 glass rounded-2xl border-slate-200 dark:border-white/5 shadow-sm hover:bg-white dark:hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${lead.platform === 'reddit' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                        {lead.platform === 'reddit' ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white">{lead.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{lead.platform}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{lead.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!results && !loading && !error && (
        <div className="glass p-10 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border-slate-200 dark:border-white/5 text-center shadow-sm">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-[2rem] flex items-center justify-center">
            <svg className="w-10 h-10 md:w-12 md:h-12 text-purple-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">Discover Your Social Signals</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-lg mx-auto mb-6">
            Enter your niche or product type above and let Grok AI analyze the best opportunities, communities, and strategies for your growth.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['SaaS Tools', 'AI Writing', 'Mobile Apps', 'E-commerce', 'Dev Tools', 'EdTech'].map((tag) => (
              <button
                key={tag}
                onClick={() => { setNiche(tag); }}
                className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-sm font-bold rounded-xl hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all border border-slate-200 dark:border-white/5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialSignals;
