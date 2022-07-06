import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import fonts from '../../libs/fonts';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';

const ButtonWrap = ({bold, style, loading, disabled, label, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={disabled || loading}>
      <View style={[styles.root, style, disabled && styles.rootDisabled]}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.green} />
        ) : (
          <TextWrap
            font={bold ? fonts.notoB : fonts.notoM}
            style={[styles.label]}>
            {label}
          </TextWrap>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    alignSelf: 'stretch',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
  },
  rootDisabled: {
    backgroundColor: colors.placeholder,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
  },
});

export default ButtonWrap;
