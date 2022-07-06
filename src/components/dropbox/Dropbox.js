import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../../libs/colors';
import {DownGray} from '../../libs/images';
import TextWrap from '../text-wrap/TextWrap';

export default function Dropbox(props) {
  return (
    <View
      style={[
        styles.root,
        props.two && {marginHorizontal: 0, flex: 1},
        props.margin0 && {marginHorizontal: 0},
        props.style && props.style,
      ]}>
      <TextWrap style={{color: colors.placeholder}}>
        {props.title ? props.title : '카테고리'}
      </TextWrap>
      <TouchableOpacity style={styles.button}>
        <DownGray width={14} height={14} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  button: {
    paddingHorizontal: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});
