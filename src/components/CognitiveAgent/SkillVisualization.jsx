import React from 'react';
import { useConversation } from '../../hooks/useConversation';

export default function SkillVisualization() {
  const { cognitiveSkillsProgress } = useConversation();

  return (
    <div className="skill-visualization">
      <h3>Cognitive Skills Development</h3>
      <div className="skills-grid">
        {Object.entries(cognitiveSkillsProgress).map(([skill, progress]) => (
          <div key={skill} className="skill-item">
            <div className="skill-name">{skill}</div>
            <div className="skill-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}