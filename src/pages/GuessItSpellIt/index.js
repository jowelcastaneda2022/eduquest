import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../../helpers'
import './style.scss';
import { ResultBubble, GameNav, GameModal } from '../../components';
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

function GuessItSpellIt() {
  const [currentObject, setCurrentObject] = useState(getRandomObject());
  const [selectedLetters, setSelectedLetters] = useState(Array(currentObject?.name.length || 0).fill(null));
  const [randomLetters, setRandomLetters] = useState([]);
  const [clickedButtons, setClickedButtons] = useState([]);
  const [points, setPoints] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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

  const showModal = () => {
    setOpenModal(!openModal)
  }

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
      {/* <h1 className="title">Guess the object and spell it correctly</h1> */}

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

      <div className="result-wrapper">
        <div className="points">Points: {points}</div>
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

        {openModal && (
          <GameModal description={"In Guess It, Spell It, your goal is to identify the object shown in the picture. Below the image, there’s a blank square representing the hidden name of the object. Beneath that, you'll find a set of scrambled letters. Your task is to choose the correct letters from the scrambled ones to spell out the object’s name and complete the challenge. Have fun guessing and spelling!"} 
          onButtonClick={showModal}
          type="howTo"
          />
        )}

        <GameNav onButtonClick={showModal}/>
    </div>
  );
}

export default GuessItSpellIt;
