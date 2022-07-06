import {userActionType} from './UserActions';

const initUser = {
  signed: false,
};

export default function user(state = initUser, action) {
  switch (action.type) {
    case userActionType.update:
      return {
        ...state,
        ...action.user,
      };
    case userActionType.init:
      return initUser;
    case userActionType.signUp:
      return {
        ...state,
        ...action.user,
        signed: true,
      };
    case userActionType.signIn:
      return {
        ...state,
        ...action.user,
        signed: true,
      };
    case userActionType.error:
      return {
        ...action.user,
      };
    default:
      return state;
  }
}
