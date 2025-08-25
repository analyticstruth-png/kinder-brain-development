import { useState, useEffect } from "react";

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const emojis = ["🐶", "🐱", "🦊", "🐸", "🐼", "🐯"];
    const cardPairs = [...emojis, ...emojis];
    
    // Shuffle cards
    const shuffledCards = cardPairs
      .map((emoji, index) => ({ id: index, emoji, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };

  const handleCardClick = (id) => {
    // Don't allow clicking if already flipped or matched, or if 2 cards are already flipped
    if (flippedCards.length === 2 || cards.find(card => card.id === id).flipped || cards.find(card => card.id === id).matched) {
      return;
    }

    const newCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    // If this is the second card flipped, check for match
    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      const secondCard = cards.find(card => card.id === id);
      
      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        setMatchedCards([...matchedCards, flippedCards[0], id]);
        setFlippedCards([]);
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setCards(cards.map(card =>
            card.id === flippedCards[0] || card.id === id ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check for win
  useEffect(() => {
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      setTimeout(() => {
        alert(`Congratulations! You won in ${moves} moves!`);
      }, 500);
    }
  }, [matchedCards]);

  return (
    <div className="memory-game">
      <div className="memory-stats">
        <span>Moves: {moves}</span>
        <span>Matches: {matchedCards.length / 2}</span>
      </div>
      
      <div className="memory-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? "flipped" : ""} ${card.matched ? "matched" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front">?</div>
            <div className="card-back">{card.emoji}</div>
          </div>
        ))}
      </div>
      
      <div className="memory-controls">
        <button onClick={resetGame}>New Game</button>
      </div>
    </div>
  );
};

export default MemoryMatch;