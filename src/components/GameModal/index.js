import React from 'react';
import { useNavigate } from 'react-router-dom';
import owl from '../../assets/images/owl-inventa-island.png'
import './style.scss'
import { default as StarsResult } from '../StarsResult'

function GameModal({ description, link , onButtonClick, buttonText, type, title, header, score, totalQuestions, totalRounds, scoringMode, onRetry, gameNumber, getScorePercentage }) {
  const navigate = useNavigate();

  const denominator = scoringMode === 'perQuestion' ? totalQuestions : totalRounds;
  const percentage = Math.round((score / denominator) * 100);

  let resultMessage;
  let resultTitle;
  
  const handleHomeClick = () => {
    getScorePercentage(percentage)
    navigate('/game-map');
  };

  if (type === 'withRate') {
    if (percentage > 30) {
      resultTitle = "Well done";
      resultMessage = "You’ve found the first key!";
    } else {
      resultTitle = "Great effort";
      resultMessage = "Try again, You can do it!!! Give it another shot and keep going!";
    }
  }

  return (
    <div className="howto-modal">
      <div className="content">
          {type === 'howTo' 
            ? (<div className="img-wrapper">
                <img className="owl" src={owl} alt="owl" />
              </div>) 
            : type === 'withRate' 
              ? (<div className="with-rate-wrapper">
                  <p>{title ? title : ""}</p>
                  <StarsResult percentage={percentage} gameNumber={gameNumber}/>
                </div>) 
              : (<p>Choose Modal Type Please.</p>)
          }
        <h1>{header ? header : resultTitle ? resultTitle : 'How to play'}</h1>
        <p>{resultMessage ? resultMessage : description ? description : "Description Here..."}</p>
        <div className="btn-wrapper">
            {type === 'howTo' 
              ? (<button className="btn-style" onClick={onButtonClick}>{buttonText ? buttonText : 'Close'}</button>) 
              : type === 'withRate' 
                ? (<div>
                    <button className="btn-style" onClick={handleHomeClick}>{buttonText ? buttonText : 'Close'}</button>
                    {percentage <= 30 && (
                      <button className="btn-style-tryAgain" onClick={onRetry}>Try Again</button>
                    )}
                  </div>) 
                : (<p>empty</p>)
            }
        </div>
      </div>
    </div>
  );
}

export default GameModal;