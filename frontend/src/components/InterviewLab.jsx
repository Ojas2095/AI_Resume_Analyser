import React, { useState } from 'react';
import axios from 'axios';

const InterviewLab = ({ questions, resumeText, onExit }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const handleSubmit = async () => {
        if (!answer.trim()) return;
        setLoading(true);
        try {
            const response = await axios.post('/api/v1/interview/evaluate', {
                question: questions[currentIdx],
                answer: answer,
                resume_context: resumeText
            });
            setFeedback(response.data.feedback);
            setHistory([...history, {
                question: questions[currentIdx],
                answer: answer,
                feedback: response.data.feedback
            }]);
        } catch (err) {
            console.error('Evaluation error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setAnswer('');
        setFeedback(null);
        setCurrentIdx(prev => prev + 1);
    };

    const isLast = currentIdx === questions.length - 1;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl animate-page-in">
            <div className="w-full max-w-4xl h-[80vh] bg-background-light dark:bg-background-dark/90 rounded-[40px] border border-primary/20 shadow-2xl overflow-hidden flex flex-col ai-glow">
                {/* Header */}
                <div className="px-10 py-6 border-b border-primary/10 flex justify-between items-center bg-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                        <h3 className="text-xl font-bold tracking-tight">Interview Strategy Lab</h3>
                    </div>
                    <button
                        onClick={onExit}
                        className="p-2 hover:bg-primary/10 rounded-full transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Lab Content */}
                <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                    {currentIdx < questions.length ? (
                        <div className="space-y-8">
                            {/* Progress */}
                            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary">
                                <span>Phase {currentIdx + 1} of {questions.length}</span>
                                <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}% Complete</span>
                            </div>
                            <div className="w-full h-1 bg-primary/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all duration-700"
                                    style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                                />
                            </div>

                            {/* Question */}
                            <div className="p-8 bg-primary/5 border border-primary/10 rounded-3xl">
                                <p className="text-2xl font-black text-foreground-light dark:text-foreground-dark leading-tight">
                                    "{questions[currentIdx]}"
                                </p>
                            </div>

                            {/* Interaction Area */}
                            {!feedback ? (
                                <div className="space-y-4">
                                    <textarea
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="Type your response here... (Be specific, use the STAR method)"
                                        className="w-full h-40 p-6 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-primary/50 transition-all font-serif resize-none"
                                    />
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading || !answer.trim()}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'AI Analyzing Performance...' : 'Submit Response for Critique'}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-page-in">
                                    <div className="p-8 bg-secondary/5 border border-secondary/20 rounded-3xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-6">
                                            <div className="text-4xl font-black text-secondary/20">{feedback.score}</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/40 text-right">Rating</div>
                                        </div>

                                        <h4 className="text-secondary font-black uppercase text-xs tracking-widest mb-4">Coach Feedback</h4>
                                        <p className="text-sm leading-relaxed text-foreground-light/90 dark:text-foreground-dark/90 font-serif mb-6 whitespace-pre-line">
                                            {feedback.feedback}
                                        </p>

                                        {feedback.tips && feedback.tips.length > 0 && (
                                            <div className="space-y-2">
                                                <h5 className="text-[10px] font-bold uppercase tracking-widest text-foreground-light/40">Actionable Tips:</h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {feedback.tips.map((tip, i) => (
                                                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-medium italic">
                                                            {tip}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={isLast ? onExit : handleNext}
                                        className="w-full py-4 bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark font-bold rounded-xl hover:scale-[1.01] active:scale-95 transition-all"
                                    >
                                        {isLast ? 'Complete Session' : 'Proceed to Next Question'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-black mb-4">Mission Success</h3>
                            <p className="text-foreground-light/60 dark:text-foreground-dark/60 max-w-md mx-auto mb-8">
                                You've completed the laboratory phase. Use this feedback to dominate your real interview.
                            </p>
                            <button
                                onClick={onExit}
                                className="px-10 py-4 bg-primary text-white font-bold rounded-full shadow-xl shadow-primary/20"
                            >
                                Return to Command Center
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InterviewLab;
