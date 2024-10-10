import React, { useState, useEffect } from 'react';
import apple from '../../assets/images/memory-game/apple.png';
import ball from '../../assets/images/memory-game/ball.png';
import bear from '../../assets/images/memory-game/bear.png';
import car from '../../assets/images/memory-game/car.png';
import owl from '../../assets/images/memory-game/owl.png';
import star from '../../assets/images/memory-game/star.png';
import questionImg from '../../assets/images/memory-game/question-mark.jpg';
import './style.scss';

const initialCards = [
  { src: apple, matched: false },
  { src: ball, matched: false },
  { src: bear, matched: false },
  { src: car, matched: false },
  { src: owl, matched: false },
  { src: star, matched: false },
];

function MermoryGame() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [startFlip, setStartFlip] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
    shuffleCards();
  }, []);

  function shuffleCards() {
    const shuffledCards = [...initialCards, ...initialCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
    setDisabled(false);
    setStartFlip(true);
    setTimeout(() => {
      setStartFlip(false);
    }, 1000);
  }

  function handleChoice(card) {
    choiceOne
      ? choiceOne.id !== card.id && setChoiceTwo(card)
      : setChoiceOne(card);
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="memory-container">

      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched ||
              startFlip
            }
            disabled={disabled}
            matched={card.matched}
          />
        ))}
      </div>
      <div className="btn-group">
        <button className="restart-btn" onClick={shuffleCards}>Restart</button>

        <p className="turn-label">
          Turns: {turn}
        </p>
      </div>
    </div>
  );
}

const Card = (props) => {
  function handleChoice() {
    if (!props.disabled) props.handleChoice(props.card);
  }

  return (
    <div className="memory-card">
      <div className={props?.flipped ? "flipped" : ""}>
        <img
          className={`front ${props?.card?.matched ? "matched" : ""}`}
          src={props.card ? props.card.src : null}
          alt="memory-card front"
          height="150px"
          width="150px"
        />
        <img
          className="back"
          src={questionImg}
          alt="card back"
          onClick={() => handleChoice()}
          height="150px"
        />
      </div>
    </div>
  );
}


export default MermoryGame;
