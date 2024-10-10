import React, { useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import { PageLoader, MemoryGame, GameNav, GameModal } from '../../components';
import { fetchFlipstoneGameData } from '../../mutations';
import { getItem } from '../../helpers';
import { store, updateStore } from '../../unistore';
import './style.scss';

function MemoryGamePage({ flipstoneGame }) {
  const { gameData, gameFinished, finalScore } = flipstoneGame;
  const [openInstructionModal, setOpenInstructionModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

  useEffect(() => {
    checkHistory();
    toggleInstructionModal();
    fetchFlipstoneGameData();
  }, []);

  const checkHistory = () => {
    const { flipstoneGame } = store.getState();
    updateStore({
      flipstoneGame: {
        ...flipstoneGame,
        finalScore: getItem('flipstoneGame') ? getItem('flipstoneGame').finalScore : 0,
        gameFinished: false,
        scorePercentage: getItem('flipstoneGame') ? getItem('flipstoneGame').scorePercentage : 0,
      }
    })
  }

  const toggleInstructionModal = () => {
    setOpenInstructionModal(!openInstructionModal);
  };

  const toggleResultModal = () => {
    setOpenResultModal(!openResultModal);
  };

  const handleFinish = (score) => {
    const { flipstoneGame } = store.getState();
    updateStore({
      flipstoneGame: {
        ...flipstoneGame,
        finalScore: score,
        gameFinished: true,
      }
    })
    toggleResultModal();
  };

  const handleRetry = () => {
    const { flipstoneGame } = store.getState();
    updateStore({
      flipstoneGame: {
        ...flipstoneGame,
        finalScore: 0,
        gameFinished: false,
        scorePercentage: 0,
      }
    })
    fetchFlipstoneGameData();
    toggleResultModal();
  };

  const getScorePercentage = (percent) => {
    const { flipstoneGame } = store.getState();
    updateStore({
      flipstoneGame: {
        ...flipstoneGame,
        scorePercentage: percent,
      }
    })
  }

  if (gameData.fetching) {
    return <PageLoader />;
  }

  if (!gameData.data) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div className="flipstoneGame-page">
      {!gameFinished
        ? <MemoryGame roundsData={gameData.data} onFinish={handleFinish} />
        : openResultModal
          ? <GameModal
            onButtonClick={toggleResultModal}
            type="withRate"
            title="Flipstone Falls"
            buttonText="Back to map"
            score={finalScore}
            totalQuestions={0}
            totalRounds={gameData.data.length}
            scoringMode="perRound"
            gameNumber="4"
            onRetry={handleRetry}
            getScorePercentage={getScorePercentage}
          />
          : null
      }

      {openInstructionModal && (
        <GameModal 
          description="Click the cards to flip and reveal the objects. Match all the pairs by remembering their locations to win!"
          onButtonClick={toggleInstructionModal}
          type="howTo"
          title="Flipstone Falls"
          header=""
        />
      )}

      <GameNav onButtonClick={toggleInstructionModal} />
    </div>
  );
}

export default connect('flipstoneGame')(MemoryGamePage);
