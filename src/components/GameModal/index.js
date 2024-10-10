import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import owl from '../../assets/images/owl-inventa-island.png';
import { StarsResult } from '../../components';
import './style.scss';

function GameModal({ 
  description, 
  link , 
  onButtonClick, 
  buttonText, 
  type, 
  title, 
  header, 
  score, 
  totalQuestions, 
  totalRounds, 
  scoringMode, 
  onRetry, 
  gameNumber, 
  getScorePercentage 
}) {
  const navigate = useNavigate();

  const denominator = scoringMode === 'perQuestion' ? totalQuestions : totalRounds;
  const percentage = Math.max(1, Math.round((score / denominator) * 100));

  useEffect(() => {
    if(percentage){
      getScorePercentage(percentage)
    }
  }, []);

  let resultMessage;
  let resultTitle;
  
  const handleHomeClick = () => {
    navigate('/game-map');
  };

  if (type === 'withRate') {
    if (percentage > 90) {
      resultTitle = "Well done";
      resultMessage = "You’ve found the first key!";
    } else {
      resultTitle = "Great effort";
      resultMessage = "Try again, you can do it! <br/> Give it another shot and keep going!";
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
        <h2>{header ? header : resultTitle ? resultTitle : 'How to play'}</h2>
        <p dangerouslySetInnerHTML={{ __html: resultMessage 
          ? resultMessage 
          : description 
            ? description 
            : "Try picking any games. Each games have description on how to play. Try it and have fun!" 
        }} />
        <div className="btn-wrapper">
            {type === 'howTo' 
              ? <button className="btn-style" onClick={onButtonClick}>{buttonText ? buttonText : 'Close'}</button>
              : type === 'withRate' 
                ? <div>
                    <button className="btn-style" onClick={handleHomeClick}>{buttonText ? buttonText : 'Close'}</button>
                    {percentage <= 88 && (
                      <button className="btn-style-tryAgain" onClick={onRetry}>Try Again</button>
                    )}
                  </div>
                : <p>empty</p>
            }
        </div>
      </div>
    </div>
  );
}

export default GameModal;