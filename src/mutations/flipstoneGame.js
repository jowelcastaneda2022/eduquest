import { store, updateStore } from '../unistore'
import { shuffleArray } from '../helpers'


export function fetchFlipstoneGameData() {
  const { flipstoneGame } = store.getState();
  const { gameData } = flipstoneGame
  updateStore({
    flipstoneGame: {
      ...flipstoneGame,
      gameData: {
        ...gameData,
        fetching: true,
        result: false,
      }
    }
  })

  return new Promise((resolve) => {
    setTimeout(() => {
      const roundsData = shuffleArray([
        // {
        //   questions: shuffleArray([
        //     { question: '-15 + 5', answer: -10 },
        //     { question: '-15 - 5', answer: -20 },
        //     { question: '-11 - 4', answer: -15 },
        //     { question: '-4 + 11', answer: 7 },
        //   ]),
        //   answers: shuffleArray([-10, -20, -15, 7]),
        // },
        // {
        //   questions: shuffleArray([
        //     { question: '10 - 2', answer: 8 },
        //     { question: '20 + 5', answer: 25 },
        //     { question: '-3 + 7', answer: 4 },
        //     { question: '8 - 3', answer: 5 },
        //   ]),
        //   answers: shuffleArray([8, 25, 4, 5]),
        // },
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

      updateStore({
        flipstoneGame: {
          ...flipstoneGame,
          gameData: {
            data: roundsData,
            fetching: false,
            result: true,
          }
        }
      })
      resolve(true);
    }, 1000);
  }).catch(() => {
    setTimeout(() => {
      updateStore({
        flipstoneGame: {
          ...flipstoneGame,
          gameData: {
            data: null,
            fetching: false,
            result: false,
          }
        }
      })
    }, 500);
    return false;
  });
}