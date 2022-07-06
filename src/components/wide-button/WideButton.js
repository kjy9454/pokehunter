import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';

export default function WideButton({label, onPress, style, disabled, white}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled ? true : false}
      style={[
        styles.root,
        style,
        {backgroundColor: disabled ? colors.lightGray : colors.yellow},
        white && {
          backgroundColor: '#fff',
          borderColor: colors.yellow,
          borderWidth: 1,
        },
      ]}>
      <View>
        <TextWrap white={white ? false : true} yellow={white ? true : false}>
          {label}
        </TextWrap>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 4,
  },
});
