import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ListItem({label, onPress}) {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress}>
      <View style={[styles.row, styles.sb]}>
        <TextWrap title3>{label}</TextWrap>
        <AntDesign name="right" size={20} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  sb: {
    justifyContent: 'space-between',
  },
  wrap: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});
