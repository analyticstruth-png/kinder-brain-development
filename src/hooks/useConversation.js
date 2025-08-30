import { useState } from 'react';

export function useConversation() {
  const [messages, setMessages] = useState([]);
  const [cognitiveSkillsProgress, setSkillsProgress] = useState({
    'Problem Solving': 0,
    'Critical Thinking': 0,
    'Memory': 0,
    'Attention': 0,
    'Language': 0,
    'Executive Function': 0
  });

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
    
    if (message.cognitiveSkills) {
      setSkillsProgress(prev => {
        const updated = { ...prev };
        message.cognitiveSkills.forEach(skill => {
          updated[skill] = Math.min(100, (updated[skill] || 0) + 5);
        });
        return updated;
      });
    }
  };

  return { messages, cognitiveSkillsProgress, addMessage };
}