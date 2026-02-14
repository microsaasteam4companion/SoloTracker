
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-12 px-6 border-t border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8 group cursor-pointer">
              <div className="w-10 h-10 bg-cyan-400 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
                <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white">FounderFlow AI</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-8 text-lg">
              Empowering solo entrepreneurs to build high-leverage systems with the power of focus and AI.
            </p>
            <div className="flex gap-4">
              {/* Discord */}
              <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-[#5865F2] hover:border-[#5865F2]/50 hover:bg-[#5865F2]/5 transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/5 transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* Substack */}
              <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-[#FF6719] hover:border-[#FF6719]/50 hover:bg-[#FF6719]/5 transition-all">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.812V24L12 18.11L22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.078V0z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Blogs', 'Integrations', 'Pricing', 'Changelog'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4">
              {['Help Center', 'Guides', 'Contact Us', 'Status', 'Twitter Support'].map(item => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center group">
                    <span className="w-0 group-hover:w-2 h-[1px] bg-cyan-400 transition-all mr-0 group-hover:mr-2"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-900 text-slate-600 text-[11px] font-bold uppercase tracking-widest">
          <p>© 2024 FounderFlow AI. Built with precision.</p>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <div className="flex items-center gap-2">
                <span>By Solo Founders</span>
                <span className="text-cyan-500 animate-pulse">●</span>
                <span>For Solo Founders</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
