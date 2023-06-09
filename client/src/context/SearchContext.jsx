import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  from: undefined,
  to: undefined,
  departure_date: undefined,
  arrival_date: undefined,
  pax: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      return action.payload;
    case 'RESET_SEARCH':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        from: state.from,
        to: state.to,
        departure_date: state.departure_date,
        arrival_date: state.arrival_date,
        pax: state.pax,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
