import React from 'react';

const SkillGapChart = ({ roleMatch }) => {
  const requiredTotal = roleMatch.required.matched.length + roleMatch.required.missing.length;
  const niceTotal = roleMatch.nice_to_have.matched.length + roleMatch.nice_to_have.missing.length;

  const requiredMatchedPercent = requiredTotal > 0 ? (roleMatch.required.matched.length / requiredTotal) * 100 : 0;
  const niceMatchedPercent = niceTotal > 0 ? (roleMatch.nice_to_have.matched.length / niceTotal) * 100 : 0;

  return (
    <div className="mb-8">
      <h3 className="text-xl font-medium mb-4 text-foreground-light dark:text-foreground-dark">Skill Gap Analysis</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1 text-foreground-light dark:text-foreground-dark">
            <span>Required Skills</span>
            <span>{roleMatch.required.matched.length}/{requiredTotal} matched</span>
          </div>
          <div className="w-full bg-foreground-light/20 dark:bg-foreground-dark/20 rounded-full h-4">
            <div
              className="bg-primary h-4 rounded-full"
              style={{ width: `${requiredMatchedPercent}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1 text-foreground-light dark:text-foreground-dark">
            <span>Nice-to-Have Skills</span>
            <span>{roleMatch.nice_to_have.matched.length}/{niceTotal} matched</span>
          </div>
          <div className="w-full bg-foreground-light/20 dark:bg-foreground-dark/20 rounded-full h-4">
            <div
              className="bg-secondary h-4 rounded-full"
              style={{ width: `${niceMatchedPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapChart;