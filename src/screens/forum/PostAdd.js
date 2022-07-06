import React, {useState, useEffect, useRef} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Topbar from '../../components/topbar/Topbar';
import Input from '../../components/input/Input';
import categories from './categories.json';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../services/utils';
import colors from '../../libs/colors';
import {clearItem, getItem, setItem} from '../../services/preference';
import moment from 'moment-timezone';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function PostAdd() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');

  const onSave = async () => {
    try {
      const posts = await getItem('posts');
      if (posts) {
        setItem(
          'posts',
          JSON.stringify([
            ...JSON.parse(posts),
            {
              postId: posts.length + 1,
              title: title,
              content: content,
              categoryId: category.categoryId,
              createdAt: moment().tz('Asia/Seoul').format('YYYY. MM. DD'),
              likes: [],
            },
          ]),
        );
      } else {
        setItem(
          'posts',
          JSON.stringify([
            {
              postId: 1,
              title: title,
              content: content,
              categoryId: category.categoryId,
              createdAt: moment().tz('Asia/Seoul').format('YYYY. MM. DD'),
              likes: [],
            },
          ]),
        );
      }
      navigation.navigate({
        name: 'forum',
        params: {update: true},
        merge: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeLayout
      button={{
        label: '저장',
        onPress: onSave,
        disabled: title === '' || content === '' || category === '',
      }}>
      <Topbar title="게시글 작성하기" back />
      <FlatList
        ListHeaderComponent={
          <>
            <TextWrap style={styles.title}>카테고리</TextWrap>
            <TouchableOpacity
              style={[
                styles.drop,
                styles.dropbutton,
                open && {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
              onPress={() => {
                setOpen(!open);
              }}>
              <TextWrap gray={category === '' ? true : false}>
                {category === '' ? '카테고리를 선택해 주세요.' : category.name}
              </TextWrap>
              <AntDesign
                name={open ? 'up' : 'down'}
                size={20}
                color={colors.icon}
              />
            </TouchableOpacity>
            <Modal
              transparent={true}
              visible={open}
              onRequestClose={() => {
                setOpen(!open);
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => setOpen(!open)}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  style={[
                    styles.menuItem,
                    !open && {display: 'none'},
                    open ? {borderWidth: 1} : {borderWidth: 0},
                  ]}
                  data={categories}
                  keyExtractor={item => item.categoryId.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={
                          Boolean(index === categories.length - 1)
                            ? styles.last
                            : styles.types
                        }
                        onPress={() => {
                          setCategory(item);
                          setOpen(!open);
                        }}>
                        <TextWrap style={styles.size15}>{item.name}</TextWrap>
                      </TouchableOpacity>
                    );
                  }}
                />
              </TouchableOpacity>
            </Modal>

            <TextWrap style={[styles.title, {marginTop: 70}]}>제목</TextWrap>
            <Input
              value={title}
              onChange={x => {
                setTitle(x);
              }}
            />
            <TextWrap style={styles.title}>내용</TextWrap>
            <Input
              value={content}
              onChange={x => {
                setContent(x);
              }}
              numberOfLines={15}
            />
            <View style={{height: 30}} />
          </>
        }
      />
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  menu: {
    paddingVertical: 16,
  },
  drop: {
    marginVertical: 20,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#fff',
    top: 30,
    width: screenWidth - 40,
    paddingHorizontal: 20,
  },
  menuItem: {
    marginVertical: 20,
    borderColor: colors.border,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 20,
    position: 'absolute',
    zIndex: 3,
    backgroundColor: '#fff',
    top: 140,
    width: screenWidth - 40,
    borderTopWidth: 0,
  },
  dropbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  types: {
    borderColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  last: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 50,
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
