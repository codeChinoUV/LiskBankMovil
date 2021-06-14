import {AuthState} from './AuthContext';
import {User} from '../types/Token';

type AuthAction = {type: 'login'; payload: User} | {type: 'logout'};

export const authReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'logout':
      return {
        isLoggedIn: false,
        user: {
          name: '',
          lastName: '',
          ine: '',
          address: '',
          phoneNumber: '',
          email: '',
          id: -1,
          birthday: new Date(),
          idAuthentication: -1,
          noClient: '',
          proofIncome: null,
        },
      };
    default:
      return state;
  }
};
