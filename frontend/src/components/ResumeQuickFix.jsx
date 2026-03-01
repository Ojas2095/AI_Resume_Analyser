import React, { useState } from 'react';
import axios from 'axios';

const ResumeQuickFix = () => {
    const [bullet, setBullet] = useState('');
    const [optimized, setOptimized] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleOptimize = async () => {
        if (!bullet.trim()) return;
        setLoading(true);
        setError('');
        setOptimized('');
        try {
            const response = await axios.post('/api/v1/optimize/bullet', { bullet_point: bullet });
            setOptimized(response.data.optimized);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to optimize. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 rounded-3xl glass border border-primary/20 bg-primary/5 ai-glow relative overflow-hidden group">
            {/* Decorative Background Element */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">Resume Quick-Fix</h3>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60 font-medium">Powered by Google's XYZ Formula</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Original Bullet Point</label>
                    <textarea
                        value={bullet}
                        onChange={(e) => setBullet(e.target.value)}
                        placeholder="e.g. Responsible for managing the project team and documentation."
                        className="w-full p-4 bg-background-dark/20 border border-glass-border-light dark:border-glass-border-dark rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm h-24 resize-none"
                    />
                </div>

                <button
                    onClick={handleOptimize}
                    disabled={loading || !bullet.trim()}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Optimizing...</span>
                        </>
                    ) : (
                        'Transform with AI'
                    )}
                </button>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                        {error}
                    </div>
                )}

                {optimized && (
                    <div className="space-y-3 animate-page-in">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Optimized (XYZ Formula)</label>
                        <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-2xl text-sm font-medium leading-relaxed italic text-foreground-light dark:text-foreground-dark relative">
                            <svg className="absolute top-2 right-2 w-4 h-4 text-secondary/40" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                            </svg>
                            {optimized}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeQuickFix;
