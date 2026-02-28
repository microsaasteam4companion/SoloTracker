
import React, { useEffect } from 'react';

interface LegalPageProps {
    type: 'PRIVACY' | 'TERMS';
    onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    const content = {
        PRIVACY: {
            title: "Privacy Policy",
            lastUpdated: "February 18, 2026",
            sections: [
                {
                    h: "1. Data Collection",
                    p: "We collect minimal data necessary to provide SoloPilot services. This includes your email address for authentication and the data you explicitly input into our strategic modules (decisions, sessions, goals)."
                },
                {
                    h: "2. Data Usage",
                    p: "Your data is used solely to provide personalized insights and maintain your productivity trackers. We do not sell your personal data to third parties."
                },
                {
                    h: "3. AI Processing",
                    p: "SoloPilot uses AI models to analyze your patterns. This data is processed securely and is only accessible to you. We do not use your strategic data to train public models."
                },
                {
                    h: "4. Cookies",
                    p: "We use essential cookies to keep you logged in and remember your theme preferences (Dark/Light mode)."
                }
            ]
        },
        TERMS: {
            title: "Terms and Conditions",
            lastUpdated: "February 18, 2026",
            sections: [
                {
                    h: "1. Acceptance of Terms",
                    p: "By using SoloPilot, you agree to these terms. SoloPilot is provided 'as is' without warranty of any kind."
                },
                {
                    h: "2. User Responsibility",
                    p: "You are responsible for maintaining the confidentiality of your account. SoloPilot is a tool for strategic organization; final business decisions remain your sole responsibility."
                },
                {
                    h: "3. Subscription & Payments",
                    p: "Early access pricing is locked in for the duration of your active subscription. Cancellations are effective at the end of the current billing cycle."
                },
                {
                    h: "4. Intellectual Property",
                    p: "The structure, design, and code of SoloPilot are the intellectual property of SoloPilot. Your personal inputs and data remain your own."
                }
            ]
        }
    };

    const current = content[type];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase tracking-widest mb-12 hover:gap-3 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Back to Home
                </button>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">
                    {current.title}
                </h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-12 border-b border-slate-200 dark:border-white/10 pb-8">
                    Last Updated: {current.lastUpdated}
                </p>

                <div className="space-y-12">
                    {current.sections.map((section, i) => (
                        <div key={i}>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4 tracking-tight uppercase tracking-widest text-sm">
                                {section.h}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {section.p}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-12 border-t border-slate-200 dark:border-white/10 text-center">
                    <p className="text-slate-400 text-sm italic">
                        Questions? Contact us at business@entrext.in
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
