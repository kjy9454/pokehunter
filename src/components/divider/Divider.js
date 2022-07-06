import React from 'react';
import {View} from 'react-native';
import colors from '../../libs/colors';
export default function Divider({margin, height}) {
  return (
    <View
      style={[
        {backgroundColor: colors.background, height: height ? height : 10},
        margin && {marginHorizontal: 20},
      ]}
    />
  );
}
