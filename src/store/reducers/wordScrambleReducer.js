import { initialStore } from "../initialStore";

export const wordScrambleReducer = (state = initialStore.wordScramble, action) => {
  switch (action.type) {
    case 'FINISH_WORD_SCRAMBLEGAME':
      return {
        ...state,
        finalScore: action.payload,
        gameFinished: true,
      };
    case 'RETRY_WORD_SCRAMBLEGAME':
      return {
        ...state,
        finalScore: 0,
        gameFinished: false,
      };
    case 'FETCH_WORD_SCRAMBLEDATA_START':
      return {
        ...state,
        gameData: {
          data: null,
          fetching: true,
          result: false,
        }
      };
    case 'FETCH_WORD_SCRAMBLEDATA_SUCCESS':
      return {
        ...state,
        gameData: {
          data: action.payload,
          fetching: false,
          result: true,
        }
      };
    case 'FETCH_WORD_SCRAMBLEDATA_FAILURE':
      return {
        ...state,
        gameData: {
          data: null,
          fetching: false,
          result: false,
        }
      };
    default:
      return state;
  }
};
