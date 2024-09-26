import { startFetchMathData, setFetchMathData, failFetchMathData } from '../store/actions';
import { shuffleArray } from '../helpers'


export function fetchMathData(dispatch) {
  startFetchMathData(dispatch);

  return new Promise((resolve) => {
    setTimeout(() => {
      const roundsData = shuffleArray([
        {
          questions: shuffleArray([
            { question: '-15 + 5', answer: -10 },
            { question: '-15 - 5', answer: -20 },
            { question: '-11 - 4', answer: -15 },
            { question: '-4 + 11', answer: 7 },
          ]),
          answers: shuffleArray([-10, -20, -15, 7]),
        },
        {
          questions: shuffleArray([
            { question: '10 - 2', answer: 8 },
            { question: '20 + 5', answer: 25 },
            { question: '-3 + 7', answer: 4 },
            { question: '8 - 3', answer: 5 },
          ]),
          answers: shuffleArray([8, 25, 4, 5]),
        },
        {
          questions: shuffleArray([
            { question: '12 + 7', answer: 19 },
            { question: '14 - 9', answer: 5 },
            { question: '5 + 2', answer: 7 },
            { question: '11 - 6', answer: 5 },
          ]),
          answers: shuffleArray([19, 5, 7, 5]),
        }
      ]);

      setFetchMathData(dispatch, roundsData);
      resolve(true);
    }, 2000);
  }).catch(() => {
    setTimeout(() => {
      failFetchMathData(dispatch);
    }, 1000);
    return false;
  });
}