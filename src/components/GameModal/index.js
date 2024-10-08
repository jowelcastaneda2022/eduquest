import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import owl from '../../assets/images/owl-welcome.png'
import './style.scss'
import { default as StarsResult } from '../StarsResult'

function GameModal({ description, link , onButtonClick, buttonText, type, title, header, score, totalQuestions, totalRounds, scoringMode, onRetry }) {
  const navigate = useNavigate();

  const denominator = scoringMode === 'perQuestion' ? totalQuestions : totalRounds;
  const percentage = Math.round((score / denominator) * 100);

  let resultMessage;
  let resultTitle;
  
  const handleHomeClick = () => {
    onRetry();
    navigate('/');
  };

  if (type === 'advance') {
    if (percentage >= 80) {
      resultTitle = "Congratulations";
      resultMessage = "You made it past the first level.";
    } else {
      resultTitle = "Oops!";
      resultMessage = "Try again! You can do it-give it another shot and keep going!";
    }
  }  

  return (
    <div className="howto-modal">
      <div className="content">
          {type === 'regular' ? (
            <div className="img-wrapper">
              <img className="owl" src={owl} alt="owl" />
            </div>
          ) : type === 'advance' ? (
            <div className="advance-wrapper">
              <p>{title ? title : ""}</p>
              <StarsResult onScore={percentage}/>
            </div>
          ) : (
            <p>Choose Modal Type Please.</p>
          )}
        <h1>{header ? header : resultTitle ? resultTitle : 'How to play'}</h1>
        <p>{resultMessage ? resultMessage : description ? description : "Description Here..."}</p>
        <div className="btn-wrapper">
            {type === 'regular' ? (
               <a className="btn-style" onClick={onButtonClick}>{buttonText ? buttonText : 'Close'}</a>
            ) : type === 'advance' ? (
              <div>
                <a className="btn-style" onClick={handleHomeClick}>{buttonText ? buttonText : 'Close'}</a>
                {percentage <= 80 && (
                  <a className="btn-style-tryAgain" onClick={onRetry}>Try Again</a>
                )}
              </div>
            ) : (
              <></>
            )}
            
        </div>
      </div>
    </div>
  );
}

export default GameModal;