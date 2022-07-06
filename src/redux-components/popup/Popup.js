import React, {useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import TextWrap from '../../components/text-wrap/TextWrap';
import colors from '../../libs/colors';
import {popupClose} from '../../redux/popup/PopupActions';
import {screenHeight, screenWidth} from '../../services/utils';

export default function Popup({}) {
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const {open, message, onPress, title, button, closeStart} = useSelector(
    s => s.popup,
  );
  let animi = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (open) {
      let listener = () => {
        dispatch(popupClose());
        return true;
      };
      const hardwareBackPress = BackHandler.addEventListener(
        'hardwareBackPress',
        listener,
      );
      return () => {
        hardwareBackPress.remove();
      };
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open && !closeStart) {
      Animated.timing(animi, {
        duration: 200,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    } else if (closeStart) {
      Animated.timing(animi, {
        duration: 200,
        toValue: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [open, closeStart]);

  const handlePress = () => {
    dispatch(popupClose());
    if (onPress) {
      return onPress();
    }
  };

  if (!open) {
    return null;
  }

  return (
    <View style={[styles.root]}>
      <TouchableWithoutFeedback
        onPress={() => {
          dispatch(popupClose());
        }}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.view,
          {paddingBottom: inset.bottom},
          {transform: [{translateY: animi}]},
        ]}>
        <TextWrap bold title3 style={styles.title}>
          {title}
        </TextWrap>
        <View>
          {typeof message === 'string' ? (
            <TextWrap style={styles.message}>{message}</TextWrap>
          ) : (
            message
          )}
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <TextWrap bold white title3 style={styles.label}>
            {button || '확인'}
          </TextWrap>
        </TouchableOpacity>
      </Animated.View>
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
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingVertical: 20,
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  message: {
    marginVertical: 40,
  },
  button: {
    paddingVertical: 23,
    borderTopWidth: 0.5,
    alignSelf: 'stretch',
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.yellow,
  },
  label: {
    fontSize: 15,
    lineHeight: 22,
  },
});
