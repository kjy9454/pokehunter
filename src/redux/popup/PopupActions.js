export const popupActionTypes = {
  open: 'popup/open',
  close: 'popup/close',
  closeStart: 'popup/closeStart',
};

export const popupOpen =
  ({title, message, onPress, button}) =>
  dispatch => {
    dispatch({type: popupActionTypes.open, title, message, onPress, button});
  };

export const popupCloseNow = () => dispatch => {
  dispatch({type: popupActionTypes.close});
};

export const popupClose = () => dispatch => {
  dispatch({type: popupActionTypes.closeStart});
  setTimeout(() => {
    dispatch({type: popupActionTypes.close});
  }, 300);
};
