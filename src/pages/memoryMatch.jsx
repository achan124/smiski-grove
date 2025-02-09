//timer logic help: https://dev.to/yuridevat/how-to-create-a-timer-with-react-7b9
import React, { useState, useEffect } from "react";

export default function MemoryMatch({ setGameStats }) {
  const [time, setTime] = useState(0); // timer in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [cards, setCards] = useState([]); // Cards array
  const [flippedCards, setFlippedCards] = useState([]); // flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // matched cards
  const [level, setLevel] = useState("easy"); // Game level
  const [isGameOver, setIsGameOver] = useState(false); // game over 
  const [endTime, setEndTime] = useState(0); // end time
  const [leaderboards, setLeaderboards] = useState({
    easy: [],
    medium: [],
    hard: [],
  });
  const [fastestTimes, setFastestTimes] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const imgSources = [
    "img_search/bath series/looking.png",
    "img_search/bath series/dazed.png",
    "img_search/bath series/not looking.png",
    "img_search/bath series/scrubbing.png",
    "img_search/bath series/shampooing.png",
    "img_search/bath series/with duck.png",
    "img_search/dressing/img_loose-pants.png",
    "img_search/dressing/img_putting-on-socks_2.png",
    "img_search/dressing/img_struggling.png",
    "img_search/dressing/img_sweater.png",
    "img_search/dressing/img_tight-pants.png",
    "img_search/dressing/img_underpants_2.png",
    "img_search/exersicing/aerobics.png",
    "img_search/exersicing/doingcrunches.png",
    "img_search/exersicing/dumbbell.png",
    "img_search/exersicing/hoop.png",
    "img_search/exersicing/little_smiski_balance.png",
    "img_search/exersicing/stretch.png",
    "img_search/series 1/hiding.png",
    "img_search/series 1/hugging knees.png",
    "img_search/series 1/looking back.png",
    "img_search/series 1/lounging.png",
    "img_search/series 1/peeking.png",
    "img_search/series 1/sitting.png",
  ];

  const levels = {
    easy: 12,
    medium: 20,
    hard: 24,
  };

  useEffect(() => {
    resetGame();
  }, [level]);

  const resetGame = () => {
    const numCards = levels[level];
    const shuffledImgSources = imgSources.sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImgSources.slice(0, numCards / 2);
    const shuffledImages = [...selectedImages, ...selectedImages]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({ id: index, src, isFlipped: false }));

    setCards(shuffledImages);
    setFlippedCards([]);
    setMatchedCards([]);
    setTime(0);
    setIsTimerRunning(false);
    setIsGameOver(false);
    setEndTime(0);
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

  const handleCardClick = (cardId) => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const clickedCard = cards.find((card) => card.id === cardId);
    if (clickedCard.isFlipped || flippedCards.length === 2) return;

    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
    setFlippedCards((prev) => [...prev, cardId]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard.src === secondCard.src) {
        setMatchedCards((prev) => [...prev, firstCardId, secondCardId]);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsTimerRunning(false);
      setIsGameOver(true);
      setEndTime(time);

      const formattedTime = formatTime(time);
      setGameStats((prevStats) => ({
        ...prevStats,
        memoryMatch: {
          ...prevStats.memoryMatch,
          [level]: formattedTime,
        },
      }));

      setLeaderboards((prev) => {
        const newLeaderboard = [...prev[level], time].sort((a, b) => a - b);
        return { ...prev, [level]: newLeaderboard };
      }); 

      setFastestTimes((prev) => {
        const currentFastest = prev[level];
        if (currentFastest === 0 || time < currentFastest) {
          return { ...prev, [level]: time };
        }
        return prev;
      });
    }
  }, [matchedCards, cards, time, level]);


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <header>
        <h1>Memory Match</h1>
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

      <div
        className={`game-grid ${level === "easy" ? "grid-4x3" : level === "medium" ? "grid-5x4" : "grid-6x4"
          }`}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`gameCard ${card.isFlipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            {card.isFlipped || matchedCards.includes(card.id) ? (
              <img src={card.src} alt="Card" />
            ) : (
              <div className="card-back">
                <img src="img/GreyBox.png" alt="empty" />
              </div>
            )}
          </div>
        ))}
      </div>
      {isGameOver && (
        <div className="leaderboard-popup">
          <div className="leaderboard-content">
            <h2>Game Over!</h2>
            {/* <h3>Leaderboard - {level}</h3> */} 
            <p>You found all the pairs!</p>
            <p>Your Time: {formatTime(endTime)}</p>
            {/* 
            <ol>
              <li>
                SmiskiLuvr -{" "}
                {level === "easy"
                  ? "00:11"
                  : level === "medium"
                    ? "00:24"
                    : "00:56"}
              </li>
              <li>
                Smis4ever -{" "}
                {level === "easy"
                  ? "00:12"
                  : level === "medium"
                    ? "00:26"
                    : "00:58"}
              </li>
              <li>
                HeartSmiski -{" "}
                {level === "easy"
                  ? "00:13"
                  : level === "medium"
                    ? "00:30"
                    : "01:00"}
              </li>
            </ol> */}
            <script>
console.log(fastestTimes);
</script>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

    </div>
  );
}


// const MemoryMatch = () => {
//   return (
//     <>
//       {/* Navigation */}
//       <nav>
//         <ul className="navigation">
//           <div className="nav-left">
//             <div id="homepage-hamburger-menu">
//               <span className="hamburger-line"></span>
//               <span className="hamburger-line"></span>
//               <span className="hamburger-line"></span>
//             </div>
//             <li>
//               <a href="/">Home</a>
//             </li>
//             <li>
//               <a href="/search">Search</a>
//             </li>
//             <li>
//               <a href="/wishlist">My Smiskis</a>
//             </li>
//             <li>
//               <a href="/memoryMatch">Memory Match</a>
//             </li>
//             <li>
//               <a href="/oddOneOut">Odd One Out</a>
//             </li>
//           </div>
//         </ul>
//       </nav>

//       {/* Header */}
//       <header>
//         <h1>Memory Match</h1>
//         <div className="game-settings">
//           <p>
//             <strong>Level: Easy</strong>
//           </p>
//           <p>Time - 00:00</p>
//         </div>
//         <div className="button-container">
//           <a className="primary-button secondary-button" href="#leaderboard">
//             Leaderboard
//           </a>
//         </div>
//       </header>

//       {/* Footer */}
//       <footer>
//         <div className="group-name">
//           <p>&copy; 2024 Authors: Alexia Chan, Teresa Wang, Raizel Lagunero, Edlyn Hsueh</p>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default MemoryMatch;
