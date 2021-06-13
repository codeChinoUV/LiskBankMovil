import React, {createContext, useReducer} from 'react';
import {Accounts} from '../types/Account';
import {Transaction} from '../types/Transaction';
import {accountReducer} from './accountReducer';

export interface AccountState {
  account: Accounts | null;
  transactions: Transaction[];
}

const initialState: AccountState = {
  account: null,
  transactions: [],
};

export interface AccountContextProps {
  accountState: AccountState;
  setAccount: (account: Accounts) => void;
  setTransactions: (transactions: Transaction[]) => void;
  clearData: () => void;
}

export const AccountContext = createContext({} as AccountContextProps);

export const AccountProvider = ({children}: any) => {
  const [accountState, dispatch] = useReducer(accountReducer, initialState);

  const setAccount = (account: Accounts) => {
    dispatch({type: 'setAccount', payload: account});
  };

  const setTransactions = (transactions: Transaction[]) => {
    dispatch({type: 'setTransactions', payload: transactions});
  };

  const clearData = () => {
    dispatch({type: 'clearData'});
  };

  return (
    <AccountContext.Provider
      value={{
        accountState,
        setAccount,
        setTransactions,
        clearData,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
