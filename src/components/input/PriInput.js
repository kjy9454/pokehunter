import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import fonts from '../../libs/fonts';
import {Search} from '../../libs/images';
import {screenWidth} from '../../services/utils';
import TextWrap from '../text-wrap/TextWrap';
export default function PriInput({
  style,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled,
  search,
  onPress,
  numberOfLines,
}) {
  return (
    <View style={[styles.inputWrap, disabled && styles.disabled, style]}>
      <TextInput
        multiline={numberOfLines ? true : false}
        autoCapitalize="none"
        style={[styles.input, numberOfLines && {textAlignVertical: 'top'}]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        placeholderTextColor={colors.placeholder}
        editable={disabled ? false : true}
      />
      {search && (
        <TouchableOpacity onPress={onPress}>
          <Search width={20} height={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 160,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: 2,
    fontSize: 12,
    lineHeight: 18,
    color: '#000',
  },
  disabled: {
    backgroundColor: '#eeeeee',
  },
});
