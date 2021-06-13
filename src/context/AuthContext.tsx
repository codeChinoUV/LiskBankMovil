import {User} from '../types/Token';
import React, {createContext, useReducer} from 'react';
import {authReducer} from './authReducer';

export interface AuthState {
  isLoggedIn: Boolean;
  user?: User;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export interface AuthContextProps {
  authState: AuthState;
  logIn: (login: User) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  const logIn = (user: User) => {
    dispatch({type: 'login', payload: user});
  };

  const logout = () => {
    dispatch({type: 'logout'});
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        logIn,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
