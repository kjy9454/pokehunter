import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import {screenWidth} from '../../services/utils';
import TextWrap from '../text-wrap/TextWrap';
export default function AddrInput({
  style,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled,
  onPress,
}) {
  const [color, setColor] = useState(colors.border);
  const onFocus = () => {
    setColor(colors.green);
  };
  const onBlur = () => {
    setColor(colors.border);
  };
  return (
    <View style={styles.root}>
      <View
        style={[
          style,
          styles.inputWrap,
          {borderColor: color},
          disabled && styles.disabled,
        ]}>
        <TextInput
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize="none"
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          maxLength={maxLength}
          placeholderTextColor={colors.placeholder}
          editable={disabled ? false : true}
        />
      </View>
      <TouchableOpacity onPress={onPress} style={styles.addr}>
        <TextWrap green>주소 검색</TextWrap>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: colors.border,
    paddingHorizontal: 10,
    marginLeft: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: screenWidth - 125,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 13.5,
    lineHeight: 21,
    color: '#000',
  },
  disabled: {
    backgroundColor: '#eeeeee',
  },
  addr: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    width: 85,
    borderColor: colors.green,
  },
});
