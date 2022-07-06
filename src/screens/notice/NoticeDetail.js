import React from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {View, StyleSheet} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Topbar from '../../components/topbar/Topbar';
import colors from '../../libs/colors';
import {useRoute} from '@react-navigation/native';
import {screenWidth} from '../../services/utils';
export default function NoticeDetail() {
  const {
    params: {notice},
  } = useRoute();

  return (
    <SafeLayout>
      <Topbar title="공지사항" back />
      <View style={{marginVertical: 10, marginHorizontal: 20}}>
        <TextWrap name>{notice.title}</TextWrap>
        <TextWrap style={{alignSelf: 'flex-end'}} gray small>
          {notice.createdAt}
        </TextWrap>
      </View>
      <View
        style={{
          width: screenWidth,
          height: 0.5,
          backgroundColor: colors.border,
          alignSelf: 'center',
        }}
      />
      <View style={styles.margin}>
        <TextWrap style={{marginTop: 10}}>{notice.content}</TextWrap>
      </View>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 20,
  },
});
