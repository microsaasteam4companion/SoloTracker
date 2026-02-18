
import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border ${isOpen
                    ? 'bg-cyan-500/10 border-cyan-500/20 shadow-lg shadow-cyan-500/5'
                    : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]'
                    }`}
            >
                <span className={`text-lg font-bold tracking-tight ${isOpen ? 'text-cyan-400' : 'text-slate-200'}`}>
                    {question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'bg-cyan-500/20 rotate-180' : 'bg-white/5'}`}>
                    <svg className={`w-4 h-4 ${isOpen ? 'text-cyan-400' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 text-slate-400 text-lg leading-relaxed bg-white/5 border border-white/5 rounded-2xl">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ: React.FC = () => {
    const faqs = [
        {
            question: "What is SoloPilot exactly?",
            answer: "SoloPilot is an all-in-one 'Cockpit' designed specifically for solo founders. It replaces fragmented tools by combining task management, deep work timers, strategic project auditing, and AI-powered insights into one unified, distraction-free environment."
        },
        {
            question: "Is my data secure and private?",
            answer: "Yes, absolutely. We use Enterprise-grade security via Supabase. All your data is protected by Row Level Security (RLS), meaning only YOU can ever access your cockpit data. We also follow strict data ownership principles—your data belongs to you."
        },
        {
            question: "Can I use it for free?",
            answer: "Yes! We offer a generous free tier for early pilots which includes basic cockpit features and progress tracking. Our Early Believer plan, currently at $1/month for the first 100 users, unlocks the full strategic intelligence suite."
        },
        {
            question: "How does the 'Strategic Intelligence' work?",
            answer: "Our Strategic Intelligence layer uses AI to analyze your goals and tasks, identifying 'Revenue Generating Activities' vs 'Vanity Tasks'. It helps you stay focused on moves that actually move the needle for your micro-SaaS."
        },
        {
            question: "Can I use it on my mobile phone?",
            answer: "SoloPilot is fully mobile-responsive. Whether you're at your desk or on the move, you can access your cockpit, track your deep work, and manage your focus windows from any device with a browser."
        },
        {
            question: "What is the 'Early Believer' Lifetime Lock-In?",
            answer: "The 'Early Believer' plan is our way of rewarding early adopters. By joining now for just $1/month, you lock in that price forever, even as we add advanced features and increase pricing for new users in the future."
        }
    ];

    return (
        <section id="faq" className="py-24 px-6 bg-transparent">
            <div className="max-w-4xl mx-auto">
                <AnimatedSection className="text-center mb-16">
                    <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-3">Intelligence Support</p>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Frequently Asked Questions</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Everything you need to know about the SoloPilot experience.</p>
                </AnimatedSection>

                <AnimatedSection delay={200}>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <FAQItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={400} className="mt-16 text-center">
                    <p className="text-slate-500 dark:text-slate-400 font-bold">
                        Still have questions?
                        <a href="mailto:support@solopilot.ai" className="text-cyan-500 hover:text-cyan-400 ml-2 transition-colors">Contact Ground Control</a>
                    </p>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default FAQ;
