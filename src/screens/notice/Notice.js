import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Topbar from '../../components/topbar/Topbar';
import colors from '../../libs/colors';
import {useNavigation} from '@react-navigation/native';
import {screenWidth} from '../../services/utils';

export default function Notice() {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredPost, setFilteredPost] = useState([]);

  const notices = [
    {
      noticeId: 1,
      title: '테스트 공지사항',
      createdAt: '2022. 04. 07',
      content: '공지사항 내용',
    },
    {
      noticeId: 2,
      title: '테스트 공지사항2',
      createdAt: '2022. 04. 08',
      content:
        '공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2공지사항 내용2',
    },
  ];

  return (
    <SafeLayout>
      <Topbar title="공지사항" back />
      <View>
        <FlatList
          data={notices.reverse()}
          ListHeaderComponent={<View style={styles.header} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('notice-detail', {notice: item});
                }}
                style={styles.noticeWrap}>
                <TextWrap>{item.title}</TextWrap>
                <View style={styles.infoWrap}>
                  <TextWrap lightGray small>
                    {item.createdAt}
                  </TextWrap>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  category: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginVertical: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selected: {
    backgroundColor: colors.yellow,
    borderColor: colors.yellow,
  },
  noticeWrap: {
    borderBottomWidth: 0.5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: colors.border,
  },
  infoWrap: {
    alignItems: 'flex-end',
  },
  header: {height: 10},
});
