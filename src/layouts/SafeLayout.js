import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {isIos} from '../services/utils';
import RootButton from './RootButton';

export default function SafeLayout({
  style,
  button,
  screenColor = '#fff',
  children,
}) {
  return (
    <SafeAreaView
      style={[styles.safe, isIos && {backgroundColor: screenColor}]}>
      <StatusBar backgroundColor={screenColor} barStyle="dark-content" />
      <View style={[styles.root, style]}>{children}</View>
      {Boolean(button) && <RootButton {...button} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  root: {backgroundColor: '#fff', flex: 1},
});
