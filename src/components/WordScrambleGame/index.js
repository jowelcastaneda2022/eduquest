import React, { useState } from 'react';
import './style.scss';

const WordScrambleGame = ({ wordsData, onFinish }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letters, setLetters] = useState(wordsData[0].scrambled.split(''));
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleDrop = (e, index) => {
    const draggedLetterIndex = e.dataTransfer.getData('letterIndex');
    const newLetters = [...letters];
    const draggedLetter = newLetters[draggedLetterIndex];

    newLetters.splice(draggedLetterIndex, 1);
    newLetters.splice(index, 0, draggedLetter);

    setLetters(newLetters);
    setHasMoved(true);

    if (newLetters.join('') === wordsData[currentWordIndex].correct) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('letterIndex', index);
  };

  const handleNextWord = () => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentWordIndex < wordsData.length - 1) {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      setLetters(wordsData[nextIndex].scrambled.split(''));
      setIsCorrect(false);
      setHasMoved(false); // Reset hasMoved when moving to the next word
    } else {
      onFinish(score + (isCorrect ? 1 : 0));
    }
  };

  const isWordComplete = letters.join('') === wordsData[currentWordIndex].correct;

  return (
    <div className="word-scramble-game">
      <div className="scrambled-word">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="letter-box"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
          >
            {letter}
          </div>
        ))}
      </div>
      {/* <div className="status">
        {isCorrect ? <p>Correct!</p> : <p>Keep trying...</p>}
      </div> */}
      <div className="image-container">
        {/* <div className="circle circle-one"></div> */}
        <div className="img-content">
            <img src={wordsData[currentWordIndex].image} alt="word" />
        </div>
        {/* <div className="circle circle-two"></div> */}
      </div>
      <button
        className="pushable-btn"
        onClick={handleNextWord}
        disabled={!isWordComplete && !hasMoved} // Enable the button if either the word is complete or a box has been moved
      >
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          {currentWordIndex < wordsData.length - 1 ? 'Next' : 'Finish'}
        </span>
      </button>
    </div>
  );
};

export default WordScrambleGame;
