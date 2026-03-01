import React from 'react';

const KeywordHeatmap = ({ keywords }) => {
    if (!keywords || keywords.length === 0) return null;

    return (
        <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark ai-glow overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.99 7.99 0 0120 13a7.98 7.98 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14l.879 2.121z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold">AI Keyword Heatmap</h3>
            </div>

            <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60 mb-8 leading-relaxed">
                This heatmap visualizes the impact and presence of key industry terms found in your resume. Higher "heat" indicates stronger alignment and emphasis.
            </p>

            <div className="flex flex-wrap gap-4">
                {keywords.map((item, index) => (
                    <div
                        key={`kw-${index}`}
                        className="relative group transition-all duration-300"
                        style={{
                            fontSize: `${Math.max(0.75, item.strength / 60)}rem`,
                            opacity: Math.max(0.4, item.strength / 100)
                        }}
                    >
                        <span
                            className={`px-4 py-2 rounded-xl font-bold border transition-all duration-300 ${item.strength > 80
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                : item.strength > 50
                                    ? 'bg-primary/20 text-primary border-primary/30'
                                    : 'bg-foreground-light/5 dark:bg-foreground-dark/5 text-foreground-light/40 border-glass-border-light'
                                }`}
                        >
                            {item.keyword}
                        </span>

                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                            Impact: {item.strength}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeywordHeatmap;
