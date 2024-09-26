import React, { useContext, useEffect } from 'react';
import { PageLoader, MathGame, PageHeader } from '../../components';
import { fetchMathData } from '../../mutations';
import { StoreContext } from '../../store';
import { finishMathGame, retryMathGame } from '../../store/actions';
import { ResultPage } from '../../pages'
import './style.scss'

function MathPage() {
  const { state, dispatch } = useContext(StoreContext);
  const { gameData, gameFinished, finalScore } = state.math;

  useEffect(() => {
    fetchMathData(dispatch);
  }, [dispatch]);

  const handleFinish = (score) => {
    finishMathGame(dispatch, score);
  };

  const handleRetry = () => {
    retryMathGame(dispatch);
    fetchMathData(dispatch);
  };
  console.error('gameData', state)
  console.error('MathPage gameData', JSON.stringify(gameData, null, 2));

  if (gameData.fetching) {
    return <PageLoader />;
  }

  if (!gameData.data) {
    return <div>Failed to load data. Please try again later.</div>;
  }


  return (
    <div className="math-page">
      <PageHeader text="Number Crunching Game" />
      {!gameFinished ? (
        <MathGame roundsData={gameData.data} onFinish={handleFinish} />
      ) : (
        <ResultPage
          score={finalScore}
          totalQuestions={gameData.data.reduce((total, round) => total + round.questions.length, 0)}
          totalRounds={gameData.data.length}
          onRetry={handleRetry}
          scoringMode="perQuestion"
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

export default MathPage;
