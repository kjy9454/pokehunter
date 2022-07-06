import {useNavigation} from '@react-navigation/native';
import moment from 'moment-timezone';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../libs/colors';
import {CalendarLeft, CalendarRight, Left} from '../../libs/images';
import {screenWidth} from '../../services/utils';
import TextWrap from '../text-wrap/TextWrap';

export default function Topbar2({
  title,
  size,
  date,
  left,
  right,
  rightbtn,
  button,
  onPress,
  noback,
  onModalBack,
  onReplace,
}) {
  const [width, setWidth] = useState(0);
  const navigation = useNavigation();

  const handleLayout = e => {
    if (e.nativeEvent.layout.width > width) {
      setWidth(e.nativeEvent.layout.width);
    }
  };
  return (
    <View style={styles.header}>
      {!onReplace && !noback && !onModalBack && (
        <TouchableOpacity
          onLayout={handleLayout}
          onPress={navigation.goBack}
          style={[styles.back, {minWidth: width}]}>
          <Left height={14} width={15} />
        </TouchableOpacity>
      )}
      {onModalBack && (
        <TouchableOpacity
          onLayout={handleLayout}
          onPress={onModalBack}
          style={[styles.back, {minWidth: width}]}>
          <Left height={14} width={15} />
        </TouchableOpacity>
      )}
      {onReplace && (
        <TouchableOpacity
          onLayout={handleLayout}
          onPress={onReplace}
          style={[styles.back, {minWidth: width}]}>
          <Left height={14} width={15} />
        </TouchableOpacity>
      )}
      <TextWrap
        title2
        bold
        style={[size && {fontSize: size}, noback && styles.noback]}>
        {title}
      </TextWrap>
      {right && <View style={styles.right}>{right}</View>}
      {button && (
        <TouchableOpacity onPress={onPress} style={styles.right}>
          <TextWrap>{button}</TextWrap>
        </TouchableOpacity>
      )}
      {date && (
        <View style={styles.date}>
          <TouchableOpacity style={styles.left} onPress={left}>
            <CalendarLeft height={16} />
          </TouchableOpacity>
          <TextWrap title2 bold>
            {moment(date).format('YYYY. MM. DD')}
          </TextWrap>
          <TouchableOpacity style={styles.right2} onPress={rightbtn}>
            <CalendarRight height={16} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  right: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    position: 'absolute',
    right: 0,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
    backgroundColor: '#fff',
  },
  back: {
    paddingLeft: 20,
    paddingRight: 13,
    paddingVertical: 10,
  },
  noback: {
    paddingLeft: 20,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
    width: screenWidth,
  },
  left: {
    paddingRight: 10,
  },
  right2: {
    paddingLeft: 10,
  },
});
