import React from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import {Marker} from 'react-native-maps';
import TextWrap from '../../components/text-wrap/TextWrap';
import {Bubble} from '../../libs/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../libs/colors';

export default function StockMarker({lat, lng, second, stock}) {
  return (
    <Marker
      zIndex={2}
      coordinate={
        second
          ? {
              latitude: parseFloat(lat + 0.001),
              longitude: parseFloat(lng + 0.001),
            }
          : {
              latitude: parseFloat(lat - 0.001),
              longitude: parseFloat(lng - 0.001),
            }
      }>
      <Ionicons name="location-outline" size={60} color={colors.yellow} />
      <View style={styles.textWrap}>
        <TextWrap white bold>
          {stock > 99 ? '99+' : stock}
        </TextWrap>
      </View>
    </Marker>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 50,
    resizeMode: 'contain',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    position: 'relative',
    bottom: 56,
    left: 14,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 100,
  },
});
