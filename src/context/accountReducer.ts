import {AccountState} from './AcountContext';
import {Accounts} from '../types/Account';
import {Transaction} from '../types/Transaction';

type AccountAction =
  | {type: 'setAccount'; payload: Accounts}
  | {type: 'setTransactions'; payload: Transaction[]}
  | {type: 'clearData'};

export const accountReducer = (
  state: AccountState,
  action: AccountAction,
): AccountState => {
  switch (action.type) {
    case 'setAccount':
      return {
        ...state,
        account: action.payload,
        transactions: [],
      };
    case 'setTransactions':
      return {
        ...state,
        transactions: action.payload,
      };
    case 'clearData':
      return {
        account: null,
        transactions: [],
      };
    default:
      return state;
  }
};
