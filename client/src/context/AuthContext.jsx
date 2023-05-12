import { createContext, useEffect, useReducer } from 'react';

const INITIAL_STATE = {
  agent: JSON.parse(localStorage.getItem('agent')) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        agent: null,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        agent: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        agent: null,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        agent: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('agent', JSON.stringify(state.agent));
  }, [state.agent]);

  return (
    <AuthContext.Provider
      value={{
        agent: state.agent,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
