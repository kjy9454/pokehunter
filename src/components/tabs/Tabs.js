import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import fonts from '../../libs/fonts';
import colors from '../../libs/colors';
import TextWrap from '../text-wrap/TextWrap';
import images from '../../libs/images';

const Tabs = ({titles, index, onChange, scroll, onLayout}) => {
  const [tabHeight, setTabHeight] = useState(0);
  if (scroll) {
    return (
      <ScrollView
        onLayout={onLayout}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={[
          styles.rootScroll,
          tabHeight && {maxHeight: tabHeight + 20, height: tabHeight + 20},
        ]}>
        {titles.map((x, i) => {
          const sel = i === index;
          return (
            <TouchableWithoutFeedback
              key={i.toString()}
              onPress={e => {
                onChange(i);
              }}>
              <View
                onLayout={e => {
                  if (!tabHeight) {
                    setTabHeight(e.nativeEvent.layout.height);
                  }
                }}
                style={[styles.tabScroll]}>
                <View style={[styles.titleWrap, sel && styles.titleWrapS]}>
                  <TextWrap
                    font={sel ? fonts.notoB : fonts.notoR}
                    style={[styles.title, sel && styles.titleS]}>
                    {x}
                  </TextWrap>
                  <Image source={images.refresh} style={styles.search} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    );
  }
  return (
    <View style={[styles.root]} onLayout={onLayout}>
      {titles.map((x, i) => {
        const sel = i === index;
        return (
          <TouchableWithoutFeedback
            key={i.toString()}
            onPress={e => {
              onChange(i);
            }}>
            <View style={styles.tab}>
              <View
                style={[
                  styles.titleWrap,
                  sel && styles.titleWrapS,
                  x === '내 주변 스토어/트럭' && styles.refreshwrap,
                ]}>
                <TextWrap
                  font={sel ? fonts.notoB : fonts.notoR}
                  style={[styles.title, sel && styles.titleS]}>
                  {x}
                </TextWrap>
                {x === '내 주변 스토어/트럭' && sel && (
                  <Image source={images.refresh} style={styles.refresh} />
                )}
                {x === '내 주변 스토어/트럭' && !sel && (
                  <Image source={images.refresh_off} style={styles.refresh} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  rootScroll: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  tab: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  tabScroll: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPlaceHolder,
    fontSize: 14,
    lineHeight: 18,
  },
  titleS: {
    color: colors.primaryBold,
  },
  titleWrap: {
    paddingVertical: 10,
  },
  titleWrapS: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryBold,
  },
  refresh: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  refreshwrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Tabs;
