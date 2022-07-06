import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import TextWrap from '../text-wrap/TextWrap';
import {screenWidth} from '../../services/utils';
import colors from '../../libs/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import moment from 'moment-timezone';

export default function ChangePopup({
  onClose,
  title,
  leftbtn,
  rightbtn,
  body,
  onRight,
  onLeft,
  query,
  setQuery,
  state,
  selected2,
}) {
  const inset = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback>
      <View style={[styles.view, {paddingBottom: inset.bottom}]}>
        <TextWrap bold title3 style={styles.title}>
          {title}
        </TextWrap>
        <View style={styles.message}>{body}</View>
        <View style={styles.button2box}>
          <TouchableOpacity style={styles.button2} onPress={onLeft}>
            <TextWrap white bold title3>
              {leftbtn}
            </TextWrap>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightbtn} onPress={onRight}>
            <TextWrap white bold title3>
              {rightbtn}
            </TextWrap>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  view: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
  message: {
    marginVertical: 30,
  },
  button2box: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  button2: {
    alignSelf: 'stretch',
    width: screenWidth / 2,
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingVertical: 23,
  },
  rightbtn: {
    alignSelf: 'stretch',
    width: screenWidth / 2,
    alignItems: 'center',
    backgroundColor: colors.green,
    paddingVertical: 23,
  },
});
