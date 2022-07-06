import {popupActionTypes} from './PopupActions';

const initPopup = {
  message: '',
  title: '',
  button: '',
  open: false,
};
export default function popup(state = initPopup, action) {
  switch (action.type) {
    case popupActionTypes.open:
      return {
        ...state,
        open: true,
        message: action.message,
        title: action.title,
        onPress: action.onPress,
        button: action.button,
      };
    case popupActionTypes.close:
      return {
        ...initPopup,
      };
    case popupActionTypes.closeStart:
      return {
        ...state,
        closeStart: true,
      };
    default:
      return state;
  }
}
