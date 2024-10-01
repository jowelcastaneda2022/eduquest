
import { store, updateStore } from '../unistore'
import { shuffleArray } from '../helpers'
import teacher from '../assets/images/teacher.gif';
import books from '../assets/images/books.gif';
import pencils from '../assets/images/pencils.gif';
import school from '../assets/images/school.gif';
import apple from '../assets/images/apple.gif';

export function fetchWordScrambleData() {
  const { wordScramble } = store.getState();
  const { gameData } = wordScramble
  updateStore({
    wordScramble: {
      ...wordScramble,
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
        { scrambled: 'CHARTEE', correct: 'TEACHER', image: teacher },
        { scrambled: 'SBOKO', correct: 'BOOKS', image: books },
        { scrambled: 'LIPSECN', correct: 'PENCILS', image: pencils },
        { scrambled: 'LOOSCH', correct: 'SCHOOL', image: school },
        { scrambled: 'LPAEP', correct: 'APPLE', image: apple }
      ]);

      updateStore({
        wordScramble: {
          ...wordScramble,
          gameData: {
            data: roundsData,
            fetching: false,
            result: true,
          }
        }
      })
      resolve(true);
    }, 2000);
  }).catch(() => {
    setTimeout(() => {
      updateStore({
        wordScramble: {
          ...wordScramble,
          gameData: {
            data: null,
            fetching: false,
            result: false,
          }
        }
      })
    }, 1000);
    return false;
  });
}