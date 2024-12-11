import React from "react";

export function Card({ imgSrc, onClick }) {
  return (
    <div className="game-card" onClick={onClick}>
      <div className="card-face game-front"></div>
      <div className="card-face game-back">
        <img src={imgSrc} alt="Smiski dancing" />
      </div>
    </div>
  );
}

export function GameGrid() {
  const flipCard = (event) => {
    event.currentTarget.classList.toggle("flipped");
  };

  const cards = Array.from({ length: 12 }).map((_, index) => (
    //will switch to random generation of img
    <Card key={index} imgSrc="img/Smiski-dancing.png" onClick={flipCard} />
  ));

  return <div className="game-grid">{cards}</div>;
}

