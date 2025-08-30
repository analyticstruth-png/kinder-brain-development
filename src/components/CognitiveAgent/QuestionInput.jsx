import React, { useState } from 'react';

export default function QuestionInput() {
  const [question, setQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() && !isProcessing) {
      setIsProcessing(true);
      try {
        const response = await fetch('/api/ai/cognitive/respond', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: question })
        });
        const data = await response.json();
        // You'll need to update conversation state here
        console.log('AI Response:', data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsProcessing(false);
        setQuestion('');
      }
    }
  };

  return (
    <form className="question-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about cognitive skills development..."
        disabled={isProcessing}
      />
      <button type="submit" disabled={isProcessing || !question.trim()}>
        {isProcessing ? 'Thinking...' : 'Ask'}
      </button>
    </form>
  );
}