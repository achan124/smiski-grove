//timer logic help: https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9
import React, { useState, useEffect } from "react";

export function OddOneOut({ setGameStats }) {
  const [time, setTime] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cards, setCards] = useState([]); // cards array
  const [isGameOver, setIsGameOver] = useState(false); // game over state
  const [endTime, setEndTime] = useState(0); // time when game ended
  const [showStartPopup, setShowStartPopup] = useState(true);

  const imgSeries = {
    "bath series": [
      "img_search/bath series/looking.png",
      "img_search/bath series/dazed.png",
      "img_search/bath series/not looking.png",
      "img_search/bath series/scrubbing.png",
      "img_search/bath series/shampooing.png",
      "img_search/bath series/with duck.png",
    ],
    "dressing series": [
      "img_search/dressing/img_loose-pants.png",
    "img_search/dressing/img_putting-on-socks_2.png",
    "img_search/dressing/img_struggling.png",
    "img_search/dressing/img_sweater.png",
    "img_search/dressing/img_tight-pants.png",
    "img_search/dressing/img_underpants_2.png",
    ],
    "exercising series": [
     "img_search/exersicing/aerobics.png",
    "img_search/exersicing/doingcrunches.png",
    "img_search/exersicing/dumbbell.png",
    "img_search/exersicing/hoop.png",
    "img_search/exersicing/little_smiski_balance.png",
    "img_search/exersicing/stretch.png",
    ],
    "series 1": [
      "img_search/series 1/hiding.png",
    "img_search/series 1/hugging knees.png",
    "img_search/series 1/looking back.png",
    "img_search/series 1/lounging.png",
    "img_search/series 1/peeking.png",
    "img_search/series 1/sitting.png",
    ],
  };

  const levels = {
    easy: 90,
    medium: 238,
    hard: 468,
  };

  const [level, setLevel] = useState("easy");

  useEffect(() => {
    resetGame();
  }, [level]);

  const resetGame = () => {
    const numCards = levels[level];

    // game will only include 1 series
    const seriesNames = Object.keys(imgSeries);
    const randomSeries = seriesNames[Math.floor(Math.random() * seriesNames.length)];
    const selectedImages = imgSeries[randomSeries];

    // randomize which cards are odd and identical
    const oddCard = selectedImages[Math.floor(Math.random() * selectedImages.length)];
    let identicalCard;
    do {
      identicalCard = selectedImages[Math.floor(Math.random() * selectedImages.length)];
    } while (identicalCard === oddCard);

    // array with identical cards and one odd card
    const identicalCards = Array(numCards - 1).fill(identicalCard);
    const allCards = [...identicalCards, oddCard]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({ id: index, src }));

    setCards(allCards);
    setTime(0);
    setIsTimerRunning(false);
    setIsGameOver(false);
    setEndTime(0);
    setShowStartPopup(true);
  };

  useEffect(() => {
    let timerInterval;
    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isTimerRunning && time !== 0) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning]);

  const handleStartClick = () => {
    resetGame();
    setShowStartPopup(false);
    setIsTimerRunning(true);
  };

  const handleCardClick = (cardId) => {
    if (!isTimerRunning) return;

    const clickedCard = cards.find((card) => card.id === cardId);

    if (cards.filter((card) => card.src === clickedCard.src).length === 1) {
      // ends when odd clicked
      setIsTimerRunning(false);
      setIsGameOver(true);
      setEndTime(time);

      setGameStats((prevStats) => ({
        ...prevStats,
        oddOneOut: {
          ...prevStats.oddOneOut,
          [level]: formatTime(time), 
        },
      }));
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="page-container">
      <header>
        <h1 className="mt-5 pt-5">Odd One Out</h1>
        <div className="game-settings">
          <div className="level-buttons">
            <button
              onClick={() => setLevel("easy")}
              className={`level-button ${level === "easy" ? "active" : ""}`}
            >
              Easy
            </button>
            <button
              onClick={() => setLevel("medium")}
              className={`level-button ${level === "medium" ? "active" : ""}`}
            >
              Medium
            </button>
            <button
              onClick={() => setLevel("hard")}
              className={`level-button ${level === "hard" ? "active" : ""}`}
            >
              Hard
            </button>
          </div>
          <p>Time - {formatTime(time)}</p>
        </div>
      </header>

      {showStartPopup && (
        <div className="start-popup" onClick={handleStartClick}>
          <div className="start-popup-content">
            <h2>Click to Start</h2>
          </div>
        </div>
      )}

      <main class="game-container">
      <div
        className={`game-grid ${
          level === "easy" ? "grid-10x9" : level === "medium" ? "grid-17x14" : "grid-26x18"
        }`}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="gameCard"
            onClick={() => handleCardClick(card.id)}
          >
            <img src={card.src} alt="Card" />
          </div>
        ))}
      </div>
      </main>

      {isGameOver && (
        <div className="leaderboard-popup">
          <div className="leaderboard-content">
            <h2>Game Over!</h2>
            <p>You found the odd one!</p>
            <p>Your Time: {formatTime(endTime)}</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}



/*
export function OddOneOut() {
  return (
    <div>
      <header >
        <h1 className="mt-5 pt-5">Odd One Out</h1>
        <div className="game-settings">
          <p><strong>Level: Easy</strong></p>
          <p>Time - 00:00</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <a className="primary-button secondary-button" href="#">Leaderboard</a>
        </div>
      </header>

      <div className="game-grid">
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-onDrums.png" alt="Smiski on drums"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
        <div className="gameCard"><img src="img/Smiski-dancing.png" alt="Smiski dancing"/></div>
      </div>
    </div>
  )
} */
