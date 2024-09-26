import { initialStore } from "../initialStore";

export const mathReducer = (state = initialStore.math, action) => {
  switch (action.type) {
    case 'FINISH_MATH_GAME':
      return {
        ...state,
        finalScore: action.payload,
        gameFinished: true,
      };
    case 'RETRY_MATH_GAME':
      return {
        ...state,
        finalScore: 0,
        gameFinished: false,
      };
    case 'FETCH_MATH_DATA_START':
      return {
        ...state,
        gameData: {
          data: null,
          fetching: true,
          result: false,
        }
      };
    case 'FETCH_MATH_DATA_SUCCESS':
      console.error('FETCH_MATH_DATA_SUCCESS', JSON.stringify(state, null, 2));
      return {
        ...state,
        gameData: {
          data: action.payload,
          fetching: false,
          result: true,
        }
      };
    case 'FETCH_MATH_DATA_FAILURE':
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
