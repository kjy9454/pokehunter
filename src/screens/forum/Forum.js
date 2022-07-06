import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Topbar from '../../components/topbar/Topbar';
import colors from '../../libs/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../services/utils';
import categories from './categories.json';
import {getItem} from '../../services/preference';

export default function Forum() {
  const navigation = useNavigation();
  const {params: update} = useRoute();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [filteredPost, setFilteredPost] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getItem('posts')
      .then(post => {
        console.log(post);
        setPosts([...JSON.parse(post)]);
      })
      .catch(error => console.log(error));
  }, [update]);

  const comments = [
    {
      commentId: 1,
      content: '댓글 내용',
      likes: [1, 2, 3],
      postId: 1,
    },
  ];

  useEffect(() => {
    const filtered = posts.filter(post => post.categoryId === selectedCategory);
    if (selectedCategory !== 0) {
      setFilteredPost([...filtered]);
    } else {
      setFilteredPost([...posts]);
    }
  }, [selectedCategory, posts]);

  return (
    <SafeLayout>
      <Topbar title="자유게시판" />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('post-add');
        }}>
        <AntDesign name="plus" size={25} color="#fff" />
      </TouchableOpacity>
      <View>
        <FlatList
          ListHeaderComponent={
            <FlatList
              style={{paddingLeft: 20}}
              showsHorizontalScrollIndicator={false}
              ListHeaderComponent={
                <TouchableOpacity
                  onPress={() => setSelectedCategory(0)}
                  style={[
                    styles.category,
                    selectedCategory === 0 && styles.selected,
                  ]}>
                  <TextWrap
                    white={selectedCategory === 0 ? true : false}
                    gray={selectedCategory === 0 ? false : true}>
                    전체
                  </TextWrap>
                </TouchableOpacity>
              }
              ListFooterComponent={<View style={{width: 30}} />}
              horizontal={true}
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item.categoryId)}
                    style={[
                      styles.category,
                      selectedCategory === item.categoryId && styles.selected,
                    ]}>
                    <TextWrap
                      white={
                        selectedCategory === item.categoryId ? true : false
                      }
                      gray={
                        selectedCategory === item.categoryId ? false : true
                      }>
                      {item.name}
                    </TextWrap>
                  </TouchableOpacity>
                );
              }}
            />
          }
          data={filteredPost}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            const postCategory = categories.filter(
              category => category.categoryId === item.categoryId,
            )[0];
            const filteredComment = comments.filter(
              comment => item.postId === comment.postId,
            );

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('post-detail', {item, filteredComment});
                }}
                style={styles.postWrap}>
                <TextWrap lightGray small>
                  {postCategory.name}
                </TextWrap>
                <TextWrap>{item.title}</TextWrap>
                <View style={styles.infoWrap}>
                  <TextWrap lightGray small>
                    {item.createdAt}
                  </TextWrap>
                  <View style={styles.likeWrap}>
                    <TextWrap style={styles.like} lightGray small>
                      댓글
                    </TextWrap>
                    <TextWrap style={styles.like} lightGray small>
                      {filteredComment.length}
                    </TextWrap>
                    <TextWrap style={styles.like} lightGray small>
                      좋아요
                    </TextWrap>
                    <TextWrap style={styles.like} lightGray small>
                      {item.likes.length}
                    </TextWrap>
                  </View>
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
  postWrap: {
    marginHorizontal: 20,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.border,
  },
  infoWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeWrap: {
    flexDirection: 'row',
  },
  like: {
    marginLeft: 7,
  },
  addBtn: {
    backgroundColor: colors.yellow,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    borderRadius: 100,
    width: 40,
    height: 40,
    bottom: 20,
  },
});
