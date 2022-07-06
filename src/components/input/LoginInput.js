import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LoginInput({
  style,
  value,
  onChange,
  placeholder,
  margin0,
  disabled,
  pwd,
  onDelete,
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
        style,
        styles.inputWrap,
        margin0 && {marginHorizontal: 0},
        {borderColor: color},
        disabled && styles.disabled,
      ]}>
      <TextInput
        secureTextEntry={pwd ? true : false}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={colors.placeholder}
      />
      {Boolean(value) && (
        <TouchableOpacity onPress={onDelete}>
          <AntDesign name="closecircleo" size={15} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 13.5,
    lineHeight: 21,
    color: '#000',
  },
  disabled: {
    backgroundColor: '#eeeeee',
  },
});
