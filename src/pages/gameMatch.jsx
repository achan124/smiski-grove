import React, { useState } from "react";

const cards = [
  { id: 1, image: "img/Smiski-dancing.png", alt: "Smiski dancing" },
  { id: 2, image: "img/Smiski-onDrums.png", alt: "Smiski on drums" },
  { id: 3, image: "img/Smiski-dancing.png", alt: "Smiski dancing" },
  { id: 4, image: "img/Smiski-onDrums.png", alt: "Smiski on drums" },
  { id: 5, image: "img/Smiski-dancing.png", alt: "Smiski dancing" },
  { id: 6, image: "img/Smiski-onDrums.png", alt: "Smiski on drums" },
  { id: 7, image: "img/Smiski-dancing.png", alt: "Smiski dancing" },
  { id: 8, image: "img/Smiski-onDrums.png", alt: "Smiski on drums" },
  { id: 9, image: "img/Smiski-dancing.png", alt: "Smiski dancing" },
  { id: 10, image: "img/Smiski-onDrums.png", alt: "Smiski on drums" },
  { id: 11, image: "img/Smiski-dancing.png", alt: "Smiski dancing" },
  { id: 12, image: "img/Smiski-onDrums.png", alt: "Smiski on drums" },
];

const CardFlipGame = () => {
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((cardId) => cardId !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  return (
    <div className="game-grid">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`game-card ${flippedCards.includes(card.id) ? "flipped" : ""}`}
          onClick={() => handleCardClick(card.id)}
        >
          <div className="card-face game-front"></div>
          <div className="card-face game-back">
            <img src={card.image} alt={card.alt} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFlipGame;
