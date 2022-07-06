import React from 'react';
import {View, Text, TextPropTypes} from 'react-native';
import fonts from '../../libs/fonts';
import PropTypes from 'prop-types';
import colors from '../../libs/colors';
export default function TextWrap(props) {
  return (
    <View style={props.style}>
      <Text
        {...props}
        style={[
          {
            fontFamily: props.bold
              ? fonts.boldNonoSansKR
              : fonts.regularNonoSansKR,
          },
          {
            color: props.green
              ? colors.green
              : props.gray
              ? colors.gray
              : props.white
              ? '#fff'
              : props.red
              ? colors.red
              : props.orange
              ? colors.orange
              : props.lightGray
              ? colors.lightGray
              : props.blue
              ? colors.blue
              : props.title
              ? colors.yellow
              : 'black',
          },
          {
            fontSize: props.big
              ? 21
              : props.small
              ? 12
              : props.name
              ? 17
              : props.title3
              ? 14.5
              : props.bignum
              ? 24
              : props.main
              ? 36
              : props.small2
              ? 11
              : 13.5,
            lineHeight: props.big
              ? 28
              : props.small
              ? 15
              : props.name
              ? 22
              : props.title3
              ? 19
              : props.bignum
              ? 30
              : props.main
              ? 45
              : props.small2
              ? 14
              : 18,
          },
          props.textStyle,
        ]}>
        {props.children}
      </Text>
    </View>
  );
}
TextWrap.propTypes = {
  font: PropTypes.oneOf([fonts.boldNonoSansKR, fonts.regularNonoSansKR]),
  ...TextPropTypes,
};
