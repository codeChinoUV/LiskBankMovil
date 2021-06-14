import {AccountState} from './AcountContext';
import {Accounts, CreditAccount, DebitAccount} from '../types/Account';
import {Transaction} from '../types/Transaction';

type AccountAction =
  | {type: 'setAccount'; payload: Accounts}
  | {type: 'setTransactions'; payload: Transaction[]}
  | {type: 'setCurrentDetailAccount'; payload: CreditAccount | DebitAccount}
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
    case 'setCurrentDetailAccount':
      return {
        ...state,
        currentAccountDetail: action.payload,
      };
    case 'clearData':
      return {
        account: null,
        transactions: [],
        currentAccountDetail: null,
      };
    default:
      return state;
  }
};
