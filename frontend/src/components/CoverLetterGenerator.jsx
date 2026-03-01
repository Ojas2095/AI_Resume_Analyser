import React, { useState } from 'react';
import api from '../services/api';

const CoverLetterGenerator = ({ resumeText, jdText }) => {
    const [coverLetter, setCoverLetter] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!resumeText || !jdText) return;
        setLoading(true);
        setError('');
        try {
            const response = await api.post('/api/v1/generate/cover-letter', {
                resume_text: resumeText,
                jd_text: jdText
            });
            setCoverLetter(response.data.cover_letter);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to generate cover letter. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(coverLetter);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 rounded-3xl glass border border-primary/20 bg-background-dark/20 ai-glow relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-secondary text-white rounded-xl shadow-lg shadow-secondary/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">Cover Letter AI</h3>
                    <p className="text-sm text-foreground-light/60 dark:text-foreground-dark/60 font-medium">Instantly tailored to your Resume & JD</p>
                </div>
            </div>

            {!coverLetter ? (
                <div className="space-y-6">
                    <p className="text-sm text-foreground-light/70 dark:text-foreground-dark/70 leading-relaxed">
                        Our AI will synthesize your experience and the job requirements to craft a compelling, high-impact cover letter.
                    </p>
                    <button
                        onClick={handleGenerate}
                        disabled={loading || !jdText}
                        className="w-full py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl shadow-lg shadow-secondary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn"
                    >
                        {loading ? (
                            <>
                                {/* Fixed: border-3 is not a valid Tailwind class — changed to border-2 */}
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Crafting Masterpiece...</span>
                            </>
                        ) : (
                            <>
                                <span>Generate Tailored Letter</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                    {error && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}
                    {!jdText && (
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xs font-medium text-primary/80">Please provide a Job Description to enable tailoring.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6 animate-page-in">
                    <div className="relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                                title="Copy to Clipboard"
                            >
                                {copied ? (
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2v-3M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={() => { setCoverLetter(''); setError(''); }}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                                title="Regenerate"
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl text-sm leading-relaxed whitespace-pre-line text-foreground-light/90 dark:text-foreground-dark/90 font-serif">
                            {coverLetter}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoverLetterGenerator;
