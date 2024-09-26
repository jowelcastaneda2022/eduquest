import { startFetchWordScrambleData, setFetchWordScrambleData, failFetchWordScrambleData } from '../store/actions';
import { shuffleArray } from '../helpers'
import teacher from '../assets/images/teacher.gif';
import books from '../assets/images/books.gif';
import pencils from '../assets/images/pencils.gif';
import school from '../assets/images/school.gif';
import apple from '../assets/images/apple.gif';

export function fetchWordScrambleData(dispatch) {
  startFetchWordScrambleData(dispatch);

  return new Promise((resolve) => {
    setTimeout(() => {
      const roundsData = shuffleArray([
        { scrambled: 'CHARTEE', correct: 'TEACHER', image: teacher },
        { scrambled: 'SBOKO', correct: 'BOOKS', image: books },
        { scrambled: 'LIPSECN', correct: 'PENCILS', image: pencils },
        { scrambled: 'LOOSCH', correct: 'SCHOOL', image: school },
        { scrambled: 'LPAEP', correct: 'APPLE', image: apple }
      ]);
      setFetchWordScrambleData(dispatch, roundsData);
      resolve(true);
    }, 2000);
  }).catch(() => {
    setTimeout(() => {
      failFetchWordScrambleData(dispatch);
    }, 1000);
    return false;
  });
}