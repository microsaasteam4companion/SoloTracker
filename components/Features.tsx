
import React from 'react';
import AnimatedSection from './AnimatedSection';

const features = [
  {
    title: "Deep Work Timer",
    description: "Maximize productivity with 90-minute focused sessions. Smart breaks and distraction tracking included to keep you in flow state.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "cyan"
  },
  {
    title: "Smart Goal Tracking",
    description: "Break weekly goals into daily tasks. Track progress and maintain streaks to stay motivated and achieve consistent results.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "purple"
  },
  {
    title: "Social Signals",
    description: "Automatically discover relevant conversations on Reddit and X where you can engage authentically and find quality leads.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "amber"
  },
  {
    title: "AI Content Writer",
    description: "Generate authentic replies and viral hooks that match your unique voice. Say goodbye to blank page syndrome forever.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    color: "emerald"
  },
  {
    title: "RGA Analytics",
    description: "Detailed analysis of Revenue-Generating Activities vs Non-RGA. Understand exactly where your time is being invested.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "blue"
  },
  {
    title: "Income Dashboard",
    description: "Track multiple income streams in one place. Compare ROI and understand which hustle is most profitable for your business.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "cyan"
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-6 relative bg-slate-50/50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase mb-4">
            Built for Solo Founders
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Supercharge Your Productivity
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Maintain deep work discipline and focus exclusively on <span className="text-slate-900 dark:text-slate-200 font-semibold">Revenue-Generating Activities</span>
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <AnimatedSection key={idx} delay={idx * 100}>
              <div className="h-full p-8 rounded-3xl glass dark:border-slate-800 border-slate-200 bg-white/40 dark:bg-white/[0.03] hover:border-cyan-500/40 transition-all group hover:-translate-y-2 shadow-sm dark:shadow-none">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${
                  feature.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' :
                  feature.color === 'purple' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' :
                  feature.color === 'amber' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                  feature.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
