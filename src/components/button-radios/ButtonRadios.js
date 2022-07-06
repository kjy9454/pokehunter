import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import fonts from '../../libs/fonts';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';

const ButtonRadios = ({data, value, onChange}) => {
  return (
    <View style={styles.root}>
      {data.map((x, i) => {
        const sel = x.value === value;
        return (
          <TouchableWithoutFeedback
            key={i.toString()}
            onPress={() => {
              onChange && onChange(x.value);
            }}>
            <View style={[styles.item, sel && styles.itemS]}>
              <TextWrap
                // font={sel ? fonts.notoM : fonts.notoR}
                style={[styles.label, sel && styles.labelS]}>
                {x.label}
              </TextWrap>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderColor: colors.border,
    borderRadius: 10,
    alignItems: 'center',
  },
  item: {
    paddingHorizontal: 28,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemS: {
    backgroundColor: colors.green,
    borderRadius: 10,
  },
  label: {
    fontSize: 13,
    color: colors.placeholder,
    lineHeight: 17,
  },
  labelS: {
    color: colors.white,
  },
});

export default ButtonRadios;
