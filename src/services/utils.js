import {Dimensions, Platform} from 'react-native';

export const isIos = Platform.OS === 'ios';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export function formatId(x) {
  return x.toString().length === 1
    ? '00' + x.toString()
    : x.toString().length === 2
    ? '0' + x.toString()
    : x.toString();
}

export function formatNumber3digit(x) {
  return (x === 0 ? '0' : x || '')
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
