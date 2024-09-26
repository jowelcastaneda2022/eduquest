export const finishMathGame = (dispatch, score) => {
  dispatch({ type: 'FINISH_MATH_GAME', payload: score });
};

export const retryMathGame = (dispatch) => {
  dispatch({ type: 'RETRY_MATH_GAME' });
};

export const startFetchMathData = (dispatch) => {
  dispatch({
    type: 'FETCH_MATH_DATA_START',
  });
};

export const setFetchMathData = (dispatch, data) => {
  dispatch({
    type: 'FETCH_MATH_DATA_SUCCESS',
    payload: data,
  });
};

export const failFetchMathData = (dispatch) => {
  dispatch({
    type: 'FETCH_MATH_DATA_FAILURE',
  });
};
