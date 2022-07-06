import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Topbar from '../../components/topbar/Topbar';
import colors from '../../libs/colors';
import {useRoute} from '@react-navigation/native';
import {screenWidth} from '../../services/utils';
export default function PostDetail() {
  const {params} = useRoute();
  const comments = params.filteredComment;
  const post = params.item;

  return (
    <SafeLayout>
      <Topbar title="자유게시판" back />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={{marginVertical: 10, marginHorizontal: 20}}>
              <TextWrap name>{post.title}</TextWrap>
              <TextWrap style={{alignSelf: 'flex-end'}} gray small>
                {post.createdAt}
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
              <TextWrap style={{marginTop: 10}}>{post.content}</TextWrap>
              {/* <TextWrap>좋아요 {post.likes.length}</TextWrap> */}
              {/* <TextWrap>댓글 {comments.length}</TextWrap> */}
            </View>
          </>
        }
        ListFooterComponent={<View style={{height: 30}} />}
        data={comments}
        keyExtractor={(item, index) => item.commentId.toString()}
        renderItem={({item: {content}, index}) => {
          // return <TextWrap style={styles.margin}>{content}</TextWrap>;
        }}
      />
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 20,
  },
});
