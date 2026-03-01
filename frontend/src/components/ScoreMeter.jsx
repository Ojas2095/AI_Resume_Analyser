import React from 'react';

const ScoreMeter = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-secondary';
    return 'text-red-500';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return '#0066CC'; // primary
    if (score >= 60) return '#FF9900'; // secondary
    return '#EF4444'; // red-500
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground-light/20 dark:text-foreground-dark/20"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={getScoreBg(score)}
            strokeWidth="2"
            strokeDasharray={`${score}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score.toFixed(0)}
          </span>
        </div>
      </div>
      <div>
        <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
          {score.toFixed(0)}/100
        </div>
        <div className="text-foreground-light/60 dark:text-foreground-dark/60">Resume Score</div>
      </div>
    </div>
  );
};

export default ScoreMeter;