import {useIsFocused} from '@react-navigation/native';
import moment from 'moment-timezone';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Keyboard} from 'react-native';
import colors from '../../libs/colors';
import fonts from '../../libs/fonts';
import {isIos} from '../../services/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function BottomTabBar({state, descriptors, navigation}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const didShow = () => {
      setShow(false);
    };
    const didHide = () => {
      setShow(true);
    };
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', didShow);
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', didHide);
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);
  return (
    <View
      style={[
        styles.root,
        {height: 60},
        isIos && {height: 90, paddingBottom: 30},
        !show && {display: 'none'},
      ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          Keyboard.dismiss();
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.item]}>
            {route.name === 'map' &&
              (isFocused ? (
                <Icon name="map-outline" size={20} color={colors.yellow} />
              ) : (
                <Icon name="map-outline" size={20} color={colors.icon} />
              ))}
            {route.name === 'guidebook' &&
              (isFocused ? (
                <MaterialCommunityIcons
                  name="pokeball"
                  size={20}
                  color={colors.yellow}
                />
              ) : (
                <MaterialCommunityIcons
                  name="pokeball"
                  size={20}
                  color={colors.icon}
                />
              ))}
            {route.name === 'market' &&
              (isFocused ? (
                <AntDesign name="swap" size={20} color={colors.yellow} />
              ) : (
                <AntDesign name="swap" size={20} color={colors.icon} />
              ))}
            {route.name === 'forum' &&
              (isFocused ? (
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={20}
                  color={colors.yellow}
                />
              ) : (
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={20}
                  color={colors.icon}
                />
              ))}
            {route.name === 'profile' &&
              (isFocused ? (
                <Icon
                  name="person-circle-outline"
                  size={20}
                  color={colors.yellow}
                />
              ) : (
                <Icon
                  name="person-circle-outline"
                  size={20}
                  color={colors.icon}
                />
              ))}

            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? colors.yellow : colors.lightGray,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    marginTop: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  item: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  label: {
    lineHeight: 18,
    marginTop: 2,
    fontSize: 12,
    fontFamily: fonts.regularNonoSansKR,
  },
  home: {
    width: 48,
    height: 48,
    marginTop: -32,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eb0045',
  },
  homeItem: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 100,
  },
  notiLength: {
    position: 'absolute',
    top: 5,
    right: 22,
    backgroundColor: colors.green,
    alignItems: 'center',
    borderRadius: 100,
    width: 16,
    height: 16,
    justifyContent: 'center',
  },
  notiLabel: {
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 14,
    color: '#fff',
  },
});
