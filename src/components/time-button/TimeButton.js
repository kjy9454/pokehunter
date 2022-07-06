import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';

export default function TimeButton({label, onPress, style}) {
  return (
    <TouchableOpacity style={[styles.root, style]} onPress={onPress}>
      {label && <TextWrap>{label}</TextWrap>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 13,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
  },
});
