import React, { useState } from 'react';
import './style.scss';

const MathGame = ({ roundsData, onFinish }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(roundsData[0].questions.length).fill(null));
  const [score, setScore] = useState(0);

  const handleDrop = (e, index) => {
    const answerIndex = parseInt(e.dataTransfer.getData('answer-index'));
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = roundsData[currentRound].answers[answerIndex];

    const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((el, idx) => {
      if (idx === answerIndex) {
        el.classList.add('hidden');
      }
    });

    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextRound = () => {
    let roundScore = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === roundsData[currentRound].questions[index].answer) {
        roundScore += 1;
      }
    });
    setScore(score + roundScore);
  
    if (currentRound < roundsData.length - 1) {
      setCurrentRound(currentRound + 1);
      setSelectedAnswers(Array(roundsData[currentRound + 1].questions.length).fill(null));
      
      const answerElements = document.querySelectorAll('.answer');
      answerElements.forEach((el) => {
        el.classList.remove('hidden');
      });
    } else {
      onFinish(score + roundScore);
    }
  };
  

  const isRoundComplete = () => {
    const answerElements = document.querySelectorAll('.answer');
    return Array.from(answerElements).every((el) => el.classList.contains('hidden'));
  };

  return (
    <div className="math-game">
      <div className="questions">
        {roundsData[currentRound].questions.map((q, index) => (
          <div key={index} className={`question ${selectedAnswers[index] !== null ? 'has-answer' : ''}`}>
            <div className="q-wrapper">
              <div className="question-text">{q.question}</div>
              <div className="answer-slot" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, index)}>
                <div className="drop-slot">
                  {selectedAnswers[index] !== null ? selectedAnswers[index] : <span>Drag answer here</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="answers">
        {roundsData[currentRound].answers.map((answer, index) => (
          <div key={index} className="answer" draggable onDragStart={(e) => e.dataTransfer.setData('answer-index', index)}>
            {answer}
          </div>
        ))}
      </div>
      <button className="pushable-btn" onClick={handleNextRound} disabled={!isRoundComplete()}>
        <span className="shadow"></span>
        <span className="edge"></span>
        <span className="front">
          {currentRound < roundsData.length - 1 ? 'Next' : 'Finish'}
        </span>
      </button>
    </div>
  );
};

export default MathGame;
