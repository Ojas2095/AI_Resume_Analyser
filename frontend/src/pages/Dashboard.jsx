import React, { useState } from 'react';
import UploadResume from '../components/UploadResume';
import AnalysisResult from '../components/AnalysisResult';
import AIScanningLoader from '../components/AIScanningLoader';

const Dashboard = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history on mount
  React.useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('resume_history') || '[]');
    setHistory(savedHistory);
  }, []);

  const handleAnalysisComplete = (result) => {
    setLoading(false);
    // result is null when upload/analysis failed — just reset loading and do nothing else
    if (!result) {
      setAnalysisResult(null);
      return;
    }
    setAnalysisResult(result);

    // Save to history (keep last 5)
    const newHistory = [
      {
        id: Date.now(),
        filename: result.filename,
        score: result.score.total_score,
        timestamp: new Date().toLocaleDateString(),
        data: result
      },
      ...history.filter(h => h.filename !== result.filename)
    ].slice(0, 5);

    setHistory(newHistory);
    localStorage.setItem('resume_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('resume_history');
  };

  const handleUploadStart = () => {
    setLoading(true);
    setAnalysisResult(null);
  };

  const tips = [
    { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', text: 'Use a professional PDF or DOCX format.' },
    { icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', text: 'Ensure all sections are clearly labeled.' },
    { icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', text: 'Include quantifiable achievements and metrics.' },
    { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', text: 'Tailor your resume to the specific industry standards.' }
  ];

  return (
    <div className="min-h-screen py-16 animate-page-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Analysis <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-lg text-foreground-light/70 dark:text-foreground-dark/70 max-w-2xl leading-relaxed">
            Optimize your resume with our AI engine. Upload your document below to receive a comprehensive performance report.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Upload Section */}
            <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark shadow-xl ai-glow overflow-hidden">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Document Upload</h2>
              </div>
              <UploadResume
                onAnalysisComplete={handleAnalysisComplete}
                onUploadStart={handleUploadStart}
              />
            </div>

            {/* Analysis Progress / Results Placeholder */}
            {loading && (
              <div className="space-y-8 animate-page-in">
                <AIScanningLoader />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Neural Scan in Progress</h3>
                  <p className="text-foreground-light/60 dark:text-foreground-dark/60 tracking-wide uppercase text-[10px] font-bold">Decoding skills · Evaluating Experience · Mapping Gaps</p>
                </div>
              </div>
            )}

            {analysisResult && (
              <div className="animate-fade-in-up">
                <AnalysisResult result={analysisResult} />
              </div>
            )}

            {!loading && !analysisResult && (
              <div className="p-12 rounded-3xl border-2 border-dashed border-glass-border-light dark:border-glass-border-dark flex flex-col items-center justify-center text-center opacity-60">
                <div className="p-4 bg-foreground-light/5 dark:bg-foreground-dark/5 rounded-2xl mb-4">
                  <svg className="w-12 h-12 text-foreground-light/20 dark:text-foreground-dark/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-1">Awaiting Report</h3>
                <p className="text-sm">Upload a file to generate your analysis report.</p>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* History Section */}
            {history.length > 0 && (
              <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark ai-glow overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold flex items-center space-x-3">
                    <span className="p-2 bg-primary/10 text-primary rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span>Recent Analyses</span>
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-[10px] font-bold uppercase tracking-widest text-foreground-light/40 hover:text-secondary transition-all"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-4">
                  {history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAnalysisResult(item.data)}
                      className="w-full p-4 rounded-2xl bg-foreground-light/5 dark:bg-foreground-dark/5 border border-transparent hover:border-primary/30 text-left transition-all group"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold truncate pr-2 group-hover:text-primary transition-colors">{item.filename}</span>
                        <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded-full">{item.score}%</span>
                      </div>
                      <div className="text-[10px] text-foreground-light/40 font-bold uppercase tracking-widest">{item.timestamp}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tips Section */}
            <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark ai-glow overflow-hidden">
              <h3 className="text-xl font-bold mb-8 flex items-center space-x-3">
                <span className="p-2 bg-secondary/10 text-secondary rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>Pro Recommendations</span>
              </h3>
              <ul className="space-y-6">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-4 group">
                    <div className="mt-1 p-2 bg-foreground-light/5 dark:bg-foreground-dark/5 text-foreground-light/40 dark:text-foreground-dark/40 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-all-custom">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tip.icon} />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground-light/80 dark:text-foreground-dark/80 group-hover:text-foreground-light dark:group-hover:text-foreground-dark transition-all-custom">
                      {tip.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Support / Feedback */}
            <div className="p-8 rounded-3xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-lg font-bold mb-2">Need Assistance?</h4>
              <p className="text-white/80 text-sm mb-6">Our experts are here to help you refine your professional identity.</p>
              <button className="px-6 py-2 bg-white text-primary font-bold rounded-xl text-sm hover:bg-white/90 transition-all-custom">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
