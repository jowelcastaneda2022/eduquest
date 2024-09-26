export const finishWordScrambleGame = (dispatch, score) => {
  dispatch({ type: 'FINISH_WORD_SCRAMBLEGAME', payload: score });
};

export const retryWordScrambleGame = (dispatch) => {
  dispatch({ type: 'RETRY_WORD_SCRAMBLEGAME' });
};

export const startFetchWordScrambleData = (dispatch) => {
  dispatch({
    type: 'FETCH_WORD_SCRAMBLEDATA_START',
  });
};

export const setFetchWordScrambleData = (dispatch, data) => {
  dispatch({
    type: 'FETCH_WORD_SCRAMBLEDATA_SUCCESS',
    payload: data,
  });
};

export const failFetchWordScrambleData = (dispatch) => {
  dispatch({
    type: 'FETCH_WORD_SCRAMBLEDATA_FAILURE',
  });
};
