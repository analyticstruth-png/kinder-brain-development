import React from 'react';
import { useConversation } from '../../hooks/useConversation';

export default function ConversationInterface() {
  const { messages } = useConversation();

  return (
    <div className="conversation-interface">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <p>{msg.content}</p>
            {msg.cognitiveSkills && (
              <div className="skills-tags">
                {msg.cognitiveSkills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}