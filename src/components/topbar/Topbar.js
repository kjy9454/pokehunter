import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import colors from '../../libs/colors';
import {screenWidth} from '../../services/utils';
import TextWrap from '../text-wrap/TextWrap';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pokeball} from '../../libs/images';

export default function Topbar({title, back, showLike, like, onLike}) {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      {back ? (
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color={colors.icon} />
        </TouchableOpacity>
      ) : (
        <Image source={Pokeball} style={styles.pokeball} />
      )}

      <View style={styles.content}>
        <View style={styles.row}>
          <TextWrap name bold style={styles.title}>
            {title}
          </TextWrap>
        </View>
      </View>
      {showLike && (
        <TouchableOpacity style={styles.heart} onPress={onLike}>
          {like ? (
            <Ionicons name="heart" size={25} color={colors.red} />
          ) : (
            <Ionicons name="heart-outline" size={25} color={colors.icon} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderColor: colors.border,
    borderBottomWidth: 0.5,
  },
  back: {
    paddingLeft: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokeball: {
    width: 20,
    height: 20,
    marginLeft: 20,
  },
  title: {
    paddingHorizontal: 10,
  },
  heart: {
    marginRight: 10,
    padding: 10,
  },
});
