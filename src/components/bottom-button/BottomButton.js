import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import {screenWidth} from '../../services/utils';
import TextWrap from '../text-wrap/TextWrap';

export default function BottomButton({
  label,
  label2,
  onPress,
  onPress2,
  style,
}) {
  return (
    <View style={[styles.root, style]}>
      {label2 ? (
        <>
          <TouchableOpacity style={styles.leftbtn} onPress={onPress}>
            <TextWrap bold white title3>
              {label}
            </TextWrap>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightbtn} onPress={onPress2}>
            <TextWrap bold white title3>
              {label2}
            </TextWrap>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <TextWrap bold white title3>
            {label}
          </TextWrap>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonLabel: {color: '#fff', fontSize: 15, lineHeight: 21},
  leftbtn: {
    backgroundColor: colors.lightGray,
    paddingVertical: 20,
    width: screenWidth / 2,
    alignItems: 'center',
  },
  rightbtn: {
    backgroundColor: colors.green,
    paddingVertical: 20,
    width: screenWidth / 2,
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 20,
    width: screenWidth,
    alignItems: 'center',
  },
});
