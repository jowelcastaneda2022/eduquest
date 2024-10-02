import React from 'react';
import './style.scss';

const ResultBubble = ({ message, onButtonClick, isCorrect }) => {
  return (
    <div className={`result ${isCorrect ? '' : 'incorrect'}`}>
      <h2>{message}</h2>
      <button onClick={onButtonClick} className={isCorrect ? 'next-button' : 'clear-button'}>
        {isCorrect ? 'Next Object' : 'Clear'}
      </button>
    </div>
  );
};

export default ResultBubble;
