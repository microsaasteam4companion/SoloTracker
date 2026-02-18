
import React from 'react';

interface LogoProps {
    className?: string;
    iconOnly?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false }) => {
    return (
        <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
            <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center">
                {/* Background Hexagon/Shield Shape */}
                <div className="absolute inset-0 bg-cyan-400 rounded-lg transform rotate-45 group-hover:rotate-[135deg] transition-transform duration-500 shadow-lg shadow-cyan-400/20"></div>

                {/* The "Pilot" Icon - Minimalist Aircraft/HUD */}
                <svg className="relative w-4 h-4 md:w-5 md:h-5 text-slate-950" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 3L4 21L12 17L20 21L12 3Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 17V21" />
                </svg>
            </div>
            {!iconOnly && (
                <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
                    SoloPilot
                </span>
            )}
        </div>
    );
};

export default Logo;
