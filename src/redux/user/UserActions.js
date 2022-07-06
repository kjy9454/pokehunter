import {clearItem, getItem, setItem} from '../../services/preference';

export const userActionType = {
  signIn: 'user/signIn',
  signUp: 'user/signUp',
  init: 'user/init',
  update: 'user/update',
  error: 'user/error',
};

export const updateUser = user => dispatch => {
  getItem('user').then(x => {
    const parse = JSON.parse(x);
    setItem('user', JSON.stringify({...parse, ...user}));
    setItem(parse.userId, JSON.stringify({...parse, ...user}));
  });
  dispatch({
    type: userActionType.update,
    user: {
      ...user,
    },
  });
};

export const signIn = (email, password) => async dispatch => {
  try {
    const userData = await getItem(email);
    let user = JSON.parse(userData);
    if (user.userId === email && user.password === password) {
      setItem('user', JSON.stringify(user));
      dispatch({
        type: userActionType.signIn,
        user,
      });
    } else if (user.password !== password) {
      dispatch({
        type: userActionType.error,
        user: {pwdCheck: true},
      });
    }
  } catch (error) {
    dispatch({
      type: userActionType.error,
      user: {idCheck: true},
    });
  }
};

export const signUp = user => async dispatch => {
  setItem('user', JSON.stringify(user));
  dispatch({
    type: userActionType.signUp,
    user,
  });
};

export const signOut = () => async dispatch => {
  clearItem('user');
  dispatch({
    type: userActionType.init,
  });
};
