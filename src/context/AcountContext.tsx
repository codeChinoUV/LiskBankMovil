import React, {createContext, useReducer} from 'react';
import {Accounts, CreditAccount, DebitAccount} from '../types/Account';
import {Transaction} from '../types/Transaction';
import {accountReducer} from './accountReducer';

export interface AccountState {
  account: Accounts | null;
  transactions: Transaction[];
  currentAccountDetail: CreditAccount | DebitAccount | null;
}

const initialState: AccountState = {
  account: null,
  transactions: [],
  currentAccountDetail: null,
};

export interface AccountContextProps {
  accountState: AccountState;
  setAccount: (account: Accounts) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setCurrentDetailAccount: (account: CreditAccount | DebitAccount) => void;
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

  const setCurrentDetailAccount = (account: CreditAccount | DebitAccount) => {
    dispatch({type: 'setCurrentDetailAccount', payload: account});
  };

  return (
    <AccountContext.Provider
      value={{
        accountState,
        setAccount,
        setTransactions,
        setCurrentDetailAccount,
        clearData,
      }}>
      {children}
    </AccountContext.Provider>
  );
};
