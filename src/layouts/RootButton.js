import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, TouchableOpacity, View} from 'react-native';
// import {useDispatch} from 'react-redux';
import TextWrap from '../components/text-wrap/TextWrap';
import colors from '../libs/colors';
import fonts from '../libs/fonts';
// import {popupOpen} from '../../redux/popup/PopupActions';
import {screenWidth} from '../../services/utils';

export default function RootButton({label, disabled, onPress, popup}) {
  // const dispatch = useDispatch();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const didShow = () => {
      setShow(false);
    };
    const didHide = () => {
      setShow(true);
    };
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', didShow);
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', didHide);
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  // const onPopup = () => {
  //   dispatch(
  //     popupOpen({
  //       title: '알림',
  //       message: (
  //         <TextWrap style={styles.popup}>
  //           필수 입력사항을 모두 입력해주세요
  //         </TextWrap>
  //       ),
  //     }),
  //   );
  // };
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        !show && {display: 'none'},
        disabled && styles.buttonDisabled,
        popup && styles.buttonDisabled,
      ]}
      onPress={popup ? null : onPress}>
      <TextWrap textStyle={styles.buttonLabel} white bold>
        {label}
      </TextWrap>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 22,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.lightGray,
  },
  buttonLabel: {fontSize: 15, lineHeight: 21},
  popup: {paddingVertical: 20},
});
