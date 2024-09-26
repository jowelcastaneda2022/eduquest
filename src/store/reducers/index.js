import { mathReducer } from './mathReducer';
import { wordScrambleReducer } from './wordScrambleReducer';

export const rootReducer = (state = {}, action) => {
  return {
    math: mathReducer(state.math, action),
    wordScramble: wordScrambleReducer(state.wordScramble, action),
  };
};

export { mathReducer, wordScrambleReducer };
