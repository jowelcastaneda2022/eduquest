import React, { useState, useEffect } from 'react';
import { connect } from 'unistore/react';
import { PageLoader, WordScrambleGame, GameNav, GameModal } from '../../components';
import { fetchWordScrambleData } from '../../mutations';
import { getItem } from '../../helpers';
import { store, updateStore } from '../../unistore';
import './style.scss';

function WordScramblePage(props) {
  const { gameData, gameFinished, finalScore } = props.wordScramble;
  const [openInstructionModal, setOpenInstructionModal] = useState(false);
  const [openResultModal, setOpenResultModal] = useState(false);

  useEffect(() => {
    checkHistory();
    toggleInstructionModal();
    fetchWordScrambleData();
  }, []);

  const checkHistory = () => {
    const { wordScramble } = store.getState();
    updateStore({
      wordScramble: {
        ...wordScramble,
        finalScore: getItem('wordScramble') ? getItem('wordScramble').finalScore : 0,
        gameFinished: false,
        scorePercentage: getItem('wordScramble') ? getItem('wordScramble').scorePercentage : 0,
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
    const { wordScramble } = store.getState();
    updateStore({
      wordScramble: {
        ...wordScramble,
        finalScore: score,
        gameFinished: true,
      }
    })
    toggleResultModal();
  };

  const handleRetry = () => {
    const { wordScramble } = store.getState();
    updateStore({
      wordScramble: {
        ...wordScramble,
        finalScore: 0,
        gameFinished: false,
      }
    })
    fetchWordScrambleData();
    toggleResultModal();
  };

  const getScorePercentage = (percent) => {
    const { wordScramble } = store.getState();
    updateStore({
      wordScramble: {
        ...wordScramble,
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
    <div className="word-scramble-page">
      {!gameFinished 
      ? <WordScrambleGame wordsData={gameData.data} onFinish={handleFinish} />
      : <GameModal
            onButtonClick={toggleResultModal}
            type="withRate"
            title="Scramble Savannah"
            buttonText="Back to map"
            score={finalScore}
            totalQuestions={0}
            totalRounds={gameData.data.length}
            scoringMode="perRound"
            gameNumber="2"
            onRetry={handleRetry}
            getScorePercentage={getScorePercentage}
          />
      }

      {openInstructionModal && (
        <GameModal 
          description="Drag the letters into its corresponding position to spell it right. Beat the timer and make your way through the different levels."
          onButtonClick={toggleInstructionModal}
          type="howTo"
          title="Scramble Savannah"
          header=""
        />
      )}

      <GameNav onButtonClick={toggleInstructionModal} />
    </div>
  );
}

export default (connect('wordScramble'))(WordScramblePage);