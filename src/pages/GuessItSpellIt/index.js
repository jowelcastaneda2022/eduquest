import React, { useState, useEffect } from 'react';
import './style.scss';
import { ResultBubble } from '../../components';
import apple from '../../assets/images/guess-spell-object/apple.png';
import orange from '../../assets/images/guess-spell-object/orange.png';
import avocado from '../../assets/images/guess-spell-object/avocado.png';
import banana from '../../assets/images/guess-spell-object/banana.png';
import carrots from '../../assets/images/guess-spell-object/carrots.png';
import cherry from '../../assets/images/guess-spell-object/cherry.png';
import grapes from '../../assets/images/guess-spell-object/grapes.png';
import lemon from '../../assets/images/guess-spell-object/lemon.png';
import pineapple from '../../assets/images/guess-spell-object/pineapple.png';
import strawberry from '../../assets/images/guess-spell-object/strawberry.png';

const objects = [
  { name: 'apple', image: apple },
  { name: 'orange', image: orange },
  { name: 'avocado', image: avocado },
  { name: 'banana', image: banana },
  { name: 'carrots', image: carrots },
  { name: 'cherry', image: cherry },
  { name: 'grapes', image: grapes },
  { name: 'lemon', image: lemon },
  { name: 'pineapple', image: pineapple },
  { name: 'strawberry', image: strawberry }
];

function getRandomObject() {
  return objects[Math.floor(Math.random() * objects.length)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function GuessItSpellIt() {
  const [currentObject, setCurrentObject] = useState(getRandomObject());
  const [selectedLetters, setSelectedLetters] = useState(Array(currentObject?.name.length || 0).fill(null));
  const [randomLetters, setRandomLetters] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (currentObject) {
      const letters = currentObject.name.split('');
      while (letters.length < 10) {
        const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        letters.push(randomLetter);
      }
      setRandomLetters(shuffleArray(letters));
      setClickedButtons(new Array(letters.length).fill(false));
      setSelectedLetters(Array(currentObject.name.length).fill(null)); 
    }
  }, [currentObject]);

  const handleLetterClick = (letter, index) => {
    const firstEmptyIndex = selectedLetters.indexOf(null);
    if (firstEmptyIndex !== -1 && !clickedButtons[index]) {
      const updatedSelectedLetters = [...selectedLetters];
      updatedSelectedLetters[firstEmptyIndex] = { letter, index };
      setSelectedLetters(updatedSelectedLetters);

      const updatedClickedButtons = [...clickedButtons];
      updatedClickedButtons[index] = true;
      setClickedButtons(updatedClickedButtons);
    }
  };

  const handleClearLetter = (letterIndex) => {
    const updatedSelectedLetters = [...selectedLetters];
    const letterToRemove = updatedSelectedLetters[letterIndex];
    updatedSelectedLetters[letterIndex] = null;
    setSelectedLetters(updatedSelectedLetters);

    if (letterToRemove) {
      const updatedClickedButtons = [...clickedButtons];
      updatedClickedButtons[letterToRemove.index] = false;
      setClickedButtons(updatedClickedButtons);
    }
  };

  const resetGame = () => {
    setSelectedLetters([]);
    setClickedButtons([]);
    
    // Temporarily set currentObject to null to force useEffect to trigger
    setCurrentObject(null);
    
    setTimeout(() => {
      setCurrentObject(getRandomObject());
    }, 0);
  };

  const clearGame = () => {
    setSelectedLetters(Array(currentObject?.name.length || 0).fill(null));
    setClickedButtons([]);
  };

  const handleCorrectAnswer = () => {
    setPoints(points + 1);
    resetGame();
  };

  const selectedWord = selectedLetters.map(item => item?.letter || '').join('');

  return (
    <div className="game-container">
       <div className="result-wrapper">
        <div className="points">Points: {points}</div>
      </div>
      <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
        <path
          fill="#ccddff"
          className="out-top"
          d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
        />
        <path
          fill="#9dbcff"
          className="in-top"
          d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
        />
        <path
          fill="#96b5f4"
          className="out-bottom"
          d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
        />
        <path
          fill="#a5bff6"
          className="in-bottom"
          d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
        />
    </svg>

      <h1 className="title">Guess the object and spell it correctly</h1>

      <div className="game-wrapper">
          {currentObject && (
            <>
              <div className="object-wrapper"><img src={currentObject.image} alt="object" className="object-image" /></div>
              <div className="blank-card">
                {selectedLetters.map((item, index) => (
                  <span key={index} className="letter" onClick={() => handleClearLetter(index)}>
                    {item ? item.letter : ''}
                  </span>
                ))}
              </div>
              <div className="letter-buttons">
                {randomLetters.map((letter, index) => (
                  <button
                    key={index}
                    onClick={() => handleLetterClick(letter, index)}
                    className="letter-button"
                    disabled={clickedButtons[index]}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </>
          )}
      </div>
      {selectedWord === currentObject?.name && (
          <ResultBubble 
            message={`Correct! The word is ${currentObject.name}`} 
            onButtonClick={handleCorrectAnswer} 
            isCorrect={true} 
          />
        )}
        {selectedWord.length === currentObject?.name.length && selectedWord !== currentObject.name && (
          <ResultBubble 
            message="Oops! Give it another try and spell it correctly!" 
            onButtonClick={clearGame} 
            isCorrect={false} 
          />
        )}
    </div>
  );
}

export default GuessItSpellIt;
