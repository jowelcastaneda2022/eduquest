import React, { createContext, useReducer } from 'react';
import { rootReducer } from './reducers';
import { initialStore } from './initialStore';

export const StoreContext = createContext(initialStore);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialStore);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
