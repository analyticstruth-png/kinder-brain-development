import React from 'react';
import ConversationInterface from './ConversationInterface';
import QuestionInput from './QuestionInput';
import SkillVisualization from './SkillVisualization';
import './CognitiveAgent.css';

export default function CognitiveAgent() {
  return (
    <div className="cognitive-agent">
      <div className="conversation-section">
        <ConversationInterface />
        <QuestionInput />
      </div>
      <div className="visualization-section">
        <SkillVisualization />
      </div>
    </div>
  );
}