import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';

export default function Button({
  label,
  gray,
  onPress,
  white,
  style,
  width,
  view,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        style,
        // {width: width},
        white && {
          backgroundColor: '#fff',
          borderColor: colors.green,
          borderWidth: 1,
        },
        gray && {
          backgroundColor: colors.lightGray,
        },
      ]}
      onPress={onPress}>
      {label && (
        <TextWrap
          small
          white={white ? false : true}
          green={white ? true : false}>
          {label}
        </TextWrap>
      )}
      {view && view}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.green,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 8,
    // width: 60,
  },
});
