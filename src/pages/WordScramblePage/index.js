import React, { useEffect } from 'react';
import { PageLoader, WordScrambleGame, PageHeader } from '../../components';
import { fetchWordScrambleData } from '../../mutations';
import { ResultPage } from '../../pages';
import './style.scss';
import { store, updateStore } from '../../unistore'
import { connect } from 'unistore/react';

function WordScramblePage(props) {
  const { gameData, gameFinished, finalScore } = props.wordScramble;

  useEffect(() => {
    fetchWordScrambleData();
  }, []);

  const handleFinish = (score) => {
    const { wordScramble } = store.getState();
    updateStore({
      wordScramble: {
        ...wordScramble,
        finalScore: score,
        gameFinished: true,
      }
    })
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
  };

  if (gameData.fetching) {
    return <PageLoader />;
  }

  if (!gameData.data) {
    return <div>Failed to load data. Please try again later.</div>;
  }

  return (
    <div className="word-scramble-page">
      <PageHeader text="Scramble Word Game" />
      {!gameFinished ? (
        <WordScrambleGame wordsData={gameData.data} onFinish={handleFinish} />
      ) : (
        <ResultPage
          score={finalScore}
          totalQuestions={0}
          totalRounds={gameData.data.length}
          onRetry={handleRetry}
          scoringMode="perRound"
        />
      )}

      <ul className="circles">
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  );
}

export default (connect('wordScramble'))(WordScramblePage);