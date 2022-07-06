import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import WideButton from '../../components/wide-button/WideButton';
import TextWrap from '../../components/text-wrap/TextWrap';
import {useNavigation} from '@react-navigation/native';
import LoginInput from '../../components/input/LoginInput';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getItem, setItem} from '../../services/preference';
import {signIn} from '../../redux/user/UserActions';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {signed, idCheck, pwdCheck} = useSelector(s => s.user, shallowEqual);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = () => {
    Keyboard.dismiss();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (signed) {
      navigation.replace('tabs');
    }
  }, [signed]);
  return (
    <SafeLayout>
      <ScrollView>
        <View style={styles.logo}>
          <View style={styles.logowrap}>
            <TextWrap main title bold>
              포켓헌터
            </TextWrap>
          </View>
          <TextWrap lightGray>포켓헌터에 오신 것을 환영합니다.</TextWrap>
        </View>
        <View>
          <LoginInput
            value={email}
            onDelete={() => setEmail()}
            onChange={c => setEmail(c)}
            placeholder="아이디"
          />
          <View style={styles.check}>
            {idCheck && (
              <TextWrap small red>
                아이디를 확인해주세요
              </TextWrap>
            )}
          </View>
          <LoginInput
            value={password}
            pwd
            onDelete={() => setPassword()}
            onChange={c => setPassword(c)}
            placeholder="비밀번호"
          />
          <View style={styles.check}>
            {pwdCheck && (
              <TextWrap small red>
                비밀번호를 확인해주세요
              </TextWrap>
            )}
          </View>
        </View>
        <View style={{height: 20}} />
        <WideButton
          disabled={email && password ? false : true}
          label="로그인"
          onPress={onLogin}
        />
        <WideButton
          white
          label="회원가입"
          onPress={() => navigation.navigate('sign-up')}
        />
      </ScrollView>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    paddingTop: 90,
    paddingBottom: 70,
  },
  check: {
    marginLeft: 20,
    height: 25,
    justifyContent: 'flex-end',
  },
  check2: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logowrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
