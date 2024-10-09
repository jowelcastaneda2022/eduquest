import React, { useState, useEffect } from 'react';
import { PageLoader, MathGame, GameNav, GameModal } from '../../components';
import { ResultPage } from '../../pages';
import { fetchMathData } from '../../mutations';
import './style.scss'
import { store, updateStore } from '../../unistore'
import { connect } from 'unistore/react';

function MathPage({ math }) {
  const { gameData, gameFinished, finalScore } = math;
  const [openInstructionModal, setOpenInstructionModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

  useEffect(() => {
    updateStore({
      math: {
        ...math,
        gameFinished: false,
      }
    })
    toggleInstructionModal();
    fetchMathData();
  }, []);

  // Function to toggle the instruction modal
  const toggleInstructionModal = () => {
    setOpenInstructionModal(!openInstructionModal);
  };

  // Function to toggle the result modal
  const toggleResultModal = () => {
    setOpenResultModal(!openResultModal);
  };

  const handleFinish = (score) => {
    const { math } = store.getState();
    updateStore({
      math: {
        ...math,
        finalScore: score,
        gameFinished: true,
      }
    })
    toggleResultModal();
  };

  const handleRetry = () => {
    const { math } = store.getState();
    updateStore({
      math: {
        ...math,
        finalScore: 0,
        gameFinished: false,
      }
    })
    toggleResultModal();
    fetchMathData();
  };

  if (gameData.fetching) {
    return <PageLoader />;
  }

  if (!gameData.data) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div className="math-page">
      {!gameFinished 
        ? <MathGame roundsData={gameData.data} onFinish={handleFinish} />
        : openResultModal 
          ? <GameModal 
              onButtonClick={toggleResultModal}
              type="withRate"
              title="Math Mountain"
              buttonText="Back to map"
              score={finalScore}
              totalQuestions={gameData.data.reduce((total, round) => total + round.questions.length, 0)}
              totalRounds={gameData.data.length}
              scoringMode="perQuestion"
              gameNumber= "1"
              onRetry={handleRetry}
            />
          : null
      }

      {openInstructionModal && (
        <GameModal description={"Drag and drop the correct answer into the highlighted area. Beat the timer and make your way through the different levels."} 
          onButtonClick={toggleInstructionModal} 
          type="howTo"
          title="Math Mountain"
          header=""
        />
      )}

      <GameNav onButtonClick={toggleInstructionModal}/>
    </div>
  );
}

export default connect('math')(MathPage);
