import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Input from '../../components/input/Input';
import TextWrap from '../../components/text-wrap/TextWrap';
import SafeLayout from '../../layouts/SafeLayout';
import {screenWidth} from '../../services/utils';
import colors from '../../libs/colors';
import {useNavigation} from '@react-navigation/native';
import Topbar from '../../components/topbar/Topbar';
import {setItem} from '../../services/preference';
import {useDispatch} from 'react-redux';
import {signUp} from '../../redux/user/UserActions';

export default function SignUp({}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [show, setShow] = useState(false);

  const onSignUp = () => {
    dispatch(signUp({userId: userId, password: password, nickName: nickName}));
    setItem(
      userId,
      JSON.stringify({
        userId: userId,
        password: password,
        nickName: nickName,
      }),
    ).then(x => navigation.reset({routes: [{name: 'tabs'}]}));
  };

  const handleUserId = e => {
    setUserId(e);
  };
  const handlePassword = e => {
    setPassword(e);
  };
  const handleNickName = e => {
    setNickName(e);
  };

  return (
    <SafeLayout
      button={
        !show && {
          label: '회원가입 완료',
          popup: userId === '' || password === '' || nickName === '',
          onPress: onSignUp,
        }
      }>
      {/* {show && <AddressPopup />} */}
      <Topbar back title="회원가입" />
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.label}>
            <TextWrap gray>* 아이디</TextWrap>
          </View>
          <View style={styles.time}>
            <Input
              value={userId}
              onChange={handleUserId}
              placeholder="입력해주세요"
            />
          </View>
          <View style={styles.label}>
            <TextWrap gray>* 비밀번호</TextWrap>
          </View>
          <Input
            pwd
            value={password}
            onChange={handlePassword}
            placeholder="영문과 숫자를 포함하여 8~16자리"
          />
          <View style={styles.label}>
            <TextWrap gray>* 닉네임</TextWrap>
          </View>
          <Input
            value={nickName}
            onChange={handleNickName}
            placeholder="입력해주세요"
          />
        </View>
      </ScrollView>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  label: {
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  inputwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 65,
    marginHorizontal: 20,
  },
  won: {
    width: 20,
    textAlign: 'center',
    marginLeft: 5,
  },
  addImage: {
    width: 90,
    height: 90,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
    borderColor: colors.border,
  },
  addvideo: {
    width: 140,
    height: 90,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
    borderColor: colors.border,
  },
  image: {
    width: 90,
    height: 90,
    marginLeft: 7,
  },
  delete: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.green,
  },
  radiowrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  radio2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  deletebtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'relative',
    top: 5,
    right: 5,
  },
  videowrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  videowraptext: {
    marginLeft: 10,
    marginBottom: 5,
  },
  infowrap: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  infowrap2: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 20,
  },
  info: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  infotitle: {
    width: 100,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
    alignSelf: 'stretch',
    lineHeight: 20,
  },
  infocontent: {
    width: screenWidth - 160,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
    lineHeight: 20,
  },
  infotext: {
    lineHeight: 20,
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
