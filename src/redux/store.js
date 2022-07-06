import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import popup from './popup/PopupReducer';
import user from './user/UserReducer';

const appReducer = combineReducers({
  popup: popup,
  user: user,
});

const rootReducer = (state, action) => {
  if (action.type === 'clear') {
    state = {};
  }
  return appReducer(state, action);
};
export default createStore(rootReducer, {}, applyMiddleware(thunk));
