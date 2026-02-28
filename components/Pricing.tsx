
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface PricingProps {
  onStart: () => void;
  userId?: string;
}

const Pricing: React.FC<PricingProps> = ({ onStart, userId }) => {
  const checkoutUrl = userId
    ? `https://checkout.dodopayments.com/buy/pdt_0NYtGkj1aAJ15xX7NJss5?session=sess_l7HHK50CDg&quantity=1&metadata[user_id]=${userId}`
    : 'https://checkout.dodopayments.com/buy/pdt_0NYtGkj1aAJ15xX7NJss5?session=sess_l7HHK50CDg&quantity=1';

  return (
    <section id="pricing" className="py-24 px-6 bg-slate-50 dark:bg-slate-950/50 transition-colors">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Simple, Transparent Pricing</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Start with the Early Believer tier and lock in lifetime pricing</p>
        </AnimatedSection>

        <div className="max-w-lg mx-auto">
          <AnimatedSection delay={200}>
            <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-cyan-400 to-cyan-600 dark:from-cyan-400 dark:to-cyan-800 shadow-[0_20px_50px_rgba(34,211,238,0.15)] md:hover:scale-[1.02] transition-transform">
              <div className="bg-white dark:bg-slate-950 rounded-[2.25rem] p-8 md:p-12">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase mb-6 border border-cyan-500/10 tracking-widest">
                  First 100 Users Only
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Early Believer</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-6xl font-black text-cyan-600 dark:text-cyan-400">$1</span>
                  <span className="text-slate-400 dark:text-slate-500 font-bold">/month</span>
                </div>

                <ul className="space-y-5 mb-10">
                  {[
                    "Lifetime lock-in pricing - forever $1/month",
                    "Access to all MVP features",
                    "Automatic Pro status upgrade in the future",
                    "Priority support and early feature access"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-300">
                      <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-bold leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (userId) {
                      window.location.href = checkoutUrl;
                    } else {
                      localStorage.setItem('pending_payment', 'true');
                      onStart(); // Go to Auth
                    }
                  }}
                  className="w-full py-5 bg-cyan-500 dark:bg-cyan-400 hover:bg-cyan-600 dark:hover:bg-cyan-300 text-white dark:text-slate-950 font-black rounded-2xl transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
