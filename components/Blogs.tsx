
import React, { useState, useEffect, useMemo } from 'react';
import { blogPosts, BlogPost } from '../lib/blogData';
import AnimatedSection from './AnimatedSection';

const Blogs: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
    const [activePostId, setActivePostId] = useState<string | null>(null);

    const categories = ['ALL', 'MOTIVATIONAL', 'SEO', 'TRENDING', 'EDUCATIONAL', 'PRODUCT'];

    const filteredPosts = useMemo(() => {
        return selectedCategory === 'ALL'
            ? blogPosts
            : blogPosts.filter(post => post.category === selectedCategory);
    }, [selectedCategory]);

    const activePost = useMemo(() => {
        return blogPosts.find(p => p.id === activePostId) || null;
    }, [activePostId]);

    const relatedPosts = useMemo(() => {
        if (!activePost) return [];
        return blogPosts
            .filter(p => p.id !== activePost.id && (p.category === activePost.category || p.id.startsWith('m')))
            .slice(0, 3);
    }, [activePost]);

    // Scroll to top when post changes
    useEffect(() => {
        if (activePostId) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activePostId]);

    // Blog ListView
    if (!activePost) {
        return (
            <section id="blogs" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-3">Intelligence Hub</p>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Latest from SoloPilot</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${selectedCategory === cat
                                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                                            : 'bg-white dark:bg-white/5 text-slate-400 hover:text-cyan-500 border border-slate-200 dark:border-white/5'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all group flex flex-col h-full cursor-pointer"
                                onClick={() => setActivePostId(post.id)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="text-[9px] font-black text-white bg-cyan-500 px-2 py-1 rounded uppercase tracking-widest shadow-lg shadow-cyan-500/20">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-cyan-500 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8 font-medium line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase">{post.date} • {post.readTime}</span>
                                        <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                                            Read Full Article
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // Blog Detailed Full-Page View
    return (
        <section className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-24 transition-colors">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header/Back Button */}
                <button
                    onClick={() => setActivePostId(null)}
                    className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-cyan-500 uppercase tracking-[0.2em] mb-12 transition-colors group"
                >
                    <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to all insights
                </button>

                {/* Article Header */}
                <div className="mb-12">
                    <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">
                        {activePost.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-[0.95] mb-8">
                        {activePost.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-400">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                            <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">SoloPilot Editorial</p>
                            <p className="text-[10px] font-medium uppercase tracking-widest">{activePost.date} • {activePost.readTime} reading</p>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="rounded-2xl overflow-hidden mb-16 shadow-2xl shadow-cyan-900/10">
                    <img src={activePost.image} alt={activePost.title} className="w-full h-auto" />
                </div>

                {/* Article Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-24">
                    <p className="text-2xl font-medium text-slate-600 dark:text-slate-400 italic mb-12 border-l-4 border-cyan-500 pl-8 leading-relaxed">
                        {activePost.excerpt}
                    </p>
                    <div className="space-y-8 text-lg md:text-xl text-slate-800 dark:text-slate-300 leading-[1.6] font-medium whitespace-pre-line">
                        {activePost.content}
                    </div>
                </div>

                {/* Related Posts Section */}
                <div className="pt-24 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-3">Interconnected Knowledge</p>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Continue Your Journey</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map(post => (
                            <div
                                key={post.id}
                                onClick={() => setActivePostId(post.id)}
                                className="group cursor-pointer"
                            >
                                <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-slate-200 dark:border-white/5 shadow-lg">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h4 className="text-md font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors uppercase tracking-tight line-clamp-2">
                                    {post.title}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-24 p-10 md:p-16 bg-slate-900 rounded-3xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                    <div className="relative z-10 text-center max-w-xl mx-auto">
                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-6">Stop building in the dark.</h3>
                        <p className="text-slate-400 mb-10 text-lg">SoloPilot gives you the cockpit needed to navigate the solo journey with absolute clarity.</p>
                        <button className="px-10 py-5 bg-cyan-500 hover:bg-cyan-600 text-white font-black rounded-xl transition-all shadow-2xl shadow-cyan-500/40 active:scale-95 uppercase tracking-widest text-xs">
                            Start Piloting Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;
