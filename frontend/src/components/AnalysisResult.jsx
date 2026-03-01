import React, { useState } from 'react';
import api from '../services/api';
import ScoreMeter from './ScoreMeter';
import SkillGapChart from './SkillGapChart';
import KeywordHeatmap from './KeywordHeatmap';
import ResumeQuickFix from './ResumeQuickFix';
import CoverLetterGenerator from './CoverLetterGenerator';

const AnalysisResult = ({ result }) => {
  const [showQuestions, setShowQuestions] = useState(false);

  if (!result) return null;

  const { filename, role_match, score, suggestions, keyword_heatmap, jd_provided, resume_text, jd_text } = result;

  const dynamicQuestions = [
    ...(role_match.required.missing.length > 0
      ? [`How would you approach mastering ${role_match.required.missing[0]} for a high-priority production task?`]
      : ["Can you describe a challenging project where you applied your specialized skills?"]),
    "How do you stay updated with the latest trends in your target industry?",
    "Walk me through your process for managing complex documentation workflows.",
    "Give an example of how you've used data to drive a professional decision.",
    "What is your approach to collaborative problem-solving in a remote environment?"
  ];

  const scoreBreakdown = [
    { label: 'Skill Coverage', value: score.breakdown.skill_coverage.toFixed(1), icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Completeness', value: score.breakdown.section_completeness.toFixed(1), icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Nice-to-Have', value: score.breakdown.nice_to_have.toFixed(1), icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' }
  ];

  const handleDownloadPDF = async () => {
    try {
      const response = await api.post('/api/v1/export/pdf', {
        resume_text: resume_text,
        role: role_match.role || 'Professional',
        score: score
      }, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Optimized_Resume_${filename.split('.')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark ai-glow overflow-hidden">
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">Performance Intelligence</h2>
              {jd_provided && (
                <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-secondary/20">
                  JD Contextualized
                </span>
              )}
            </div>
            <p className="text-foreground-light/60 dark:text-foreground-dark/60 text-sm">
              Analysis for <span className="text-primary font-bold">{filename}</span>
            </p>
          </div>
          <div className="p-4 bg-primary/10 text-primary rounded-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Score Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark flex flex-col items-center justify-center ai-glow overflow-hidden">
          <ScoreMeter score={score.total_score} />
          <p className="mt-6 text-center font-bold text-lg">Overall Authority</p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {scoreBreakdown.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-foreground-light/5 dark:bg-foreground-dark/5 border border-glass-border-light dark:border-glass-border-dark group hover:border-primary/50 transition-all duration-500">
                <svg className="w-5 h-5 text-primary/40 group-hover:text-primary mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <div className="text-2xl font-black">{item.value}%</div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground-light/40">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-2xl glass border border-glass-border-light dark:border-glass-border-dark ai-glow overflow-hidden">
            <p className="text-sm italic leading-relaxed text-foreground-light/70 dark:text-foreground-dark/70">"{score.explanation}"</p>
          </div>
        </div>
      </div>

      {/* Keyword Heatmap */}
      <KeywordHeatmap keywords={keyword_heatmap} />

      {/* Role Gap Section */}
      <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark ai-glow overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold">Industry Gap Analysis</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary">Core Strengths Found</h4>
            <div className="flex flex-wrap gap-2">
              {role_match.required.matched.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20">{skill}</span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-secondary">Improvement Targets</h4>
            <div className="flex flex-wrap gap-2">
              {role_match.required.missing.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-lg border border-secondary/20">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        <SkillGapChart roleMatch={role_match} />
      </div>

      {/* Optimization Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ResumeQuickFix />
        <CoverLetterGenerator resumeText={resume_text} jdText={jd_text} />
      </div>

      {/* Suggestions & Questions Toggle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Suggestion AI */}
        <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark h-full">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Strategist Advice
          </h3>
          <p className="text-sm leading-relaxed text-foreground-light/70 dark:text-foreground-dark/70 whitespace-pre-line">
            {suggestions}
          </p>
        </div>

        {/* Question Generator Mockup */}
        <div className="p-8 rounded-3xl glass border border-glass-border-light dark:border-glass-border-dark h-full relative overflow-hidden group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              Next-Step Preparation
            </h3>
            <button
              onClick={() => setShowQuestions(!showQuestions)}
              className="px-4 py-1.5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-secondary/90 transition-all font-mono"
            >
              {showQuestions ? 'Hide' : 'Generate Interview Prep'}
            </button>
          </div>

          {showQuestions ? (
            <div className="space-y-4 animate-page-in">
              <p className="text-xs font-bold text-foreground-light/40 mb-4 uppercase font-mono">Custom Questions for your profile:</p>
              {dynamicQuestions.map((q, i) => (
                <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl text-sm italic group/q hover:border-secondary/20 transition-all">
                  <span className="text-secondary font-bold mr-2">{i + 1}.</span> {q}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center py-8">
              <div className="p-4 bg-secondary/5 text-secondary/30 rounded-full mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-xs text-foreground-light/40 max-w-[200px]">Unlock personalized interview questions based on your unique skill gaps.</p>
            </div>
          )}
        </div>
      </div>

      {/* Persistence Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
        <button
          onClick={handleDownloadPDF}
          className="py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all outline-none"
        >
          Download PDF
        </button>
        <button className="py-4 glass border border-glass-border-light dark:border-glass-border-dark font-bold rounded-2xl hover:bg-primary/5 transition-all outline-none">
          Share Portfolio
        </button>
        <button className="py-4 bg-foreground-light dark:bg-foreground-dark text-background-light dark:text-background-dark font-bold rounded-2xl hover:opacity-90 transition-all outline-none">
          Optimize Again
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;
