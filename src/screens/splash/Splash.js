import React, {useEffect, useState} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {View, StyleSheet, Image} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import {useNavigation} from '@react-navigation/native';
import colors from '../../libs/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Poketmon} from '../../libs/images';
import {screenWidth} from '../../services/utils';
import {clearItem, getItem, setItem} from '../../services/preference';
import {useDispatch} from 'react-redux';
import {signIn} from '../../redux/user/UserActions';

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [reload, setReload] = useState();

  useEffect(() => {
    getItem('user')
      .then(user => {
        if (Boolean(user)) {
          const loggedInUser = JSON.parse(user);
          dispatch(signIn(loggedInUser.userId, loggedInUser.password));
          navigation.replace('tabs');
        } else {
          navigation.replace('login');
        }
      })
      .catch(error => console.log(error));
  }, [reload]);

  useEffect(() => {
    let tm = setTimeout(() => {
      setReload(!reload);
    }, 1000);
    return () => clearTimeout(tm);
  }, []);
  return (
    <SafeLayout>
      <View style={styles.root}>
        <Image
          source={Poketmon}
          style={{width: screenWidth - 200, height: 70, resizeMode: 'contain'}}
        />
        <TextWrap big red>
          포켓헌터
        </TextWrap>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
