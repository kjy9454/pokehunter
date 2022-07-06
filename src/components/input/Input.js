import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import Icon from 'react-native-vector-icons/Fontisto';
import {screenHeight} from '../../services/utils';
export default function Input({
  style,
  value,
  onChange,
  placeholder,
  maxLength,
  margin0,
  disabled,
  search,
  pwd,
  onPress,
  numberOfLines,
  num,
  number,
  multiline,
}) {
  const [color, setColor] = useState(colors.border);
  const onFocus = () => {
    setColor(colors.yellow);
  };
  const onBlur = () => {
    setColor(colors.border);
  };
  return (
    <View
      style={[
        styles.inputWrap,
        margin0 && {marginHorizontal: 0},
        {borderColor: color},
        disabled && styles.disabled,
        style,
      ]}>
      <TextInput
        onSubmitEditing={search && onPress}
        multiline={numberOfLines || multiline ? true : false}
        secureTextEntry={pwd ? true : false}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
        style={[
          styles.input,
          numberOfLines && {
            textAlignVertical: 'top',
            minHeight: screenHeight * 0.3,
          },
          num && styles.num,
        ]}
        keyboardType={number && 'number-pad'}
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
          <Icon name="search" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.border,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 13.5,
    lineHeight: 18,
    color: '#000',
    minHeight: 50,
  },
  disabled: {
    backgroundColor: '#eeeeee',
  },
  num: {
    textAlign: 'right',
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});
