import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Topbar from '../../components/topbar/Topbar';
import ListItem from '../../components/list-item/ListItem';
import colors from '../../libs/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {signOut, updateUser} from '../../redux/user/UserActions';
import {
  popupClose,
  popupCloseNow,
  popupOpen,
} from '../../redux/popup/PopupActions';
import {isIos, screenWidth} from '../../services/utils';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Profile() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {nickName, profileImage} = useSelector(s => s.user, shallowEqual);

  const onLogout = () => {
    dispatch(signOut());
    navigation.reset({index: 0, routes: [{name: 'splash'}]});
  };

  const imageChangeSelects = [
    {
      title: '현재 사진 삭제',
      onPress: () => {
        dispatch(
          updateUser({
            profileImage: null,
          }),
        ),
          dispatch(popupClose());
      },
    },
    {
      title: '사진 찍기',
      onPress: () => {
        dispatch(popupCloseNow());
        handleCamera();
      },
    },
    {
      title: '앨범에서 선택',
      onPress: () => {
        dispatch(popupCloseNow());
        handleImage();
      },
    },
  ];

  const onImageChange = () => {
    dispatch(
      popupOpen({
        title: '프로필 사진 변경',
        message: imageChangeSelects.map((select, i) => {
          return (
            <TouchableOpacity
              style={[
                styles.select,
                Boolean(imageChangeSelects.length === i + 1) && {
                  borderBottomWidth: 0,
                },
              ]}
              key={i.toString()}
              onPress={select.onPress}>
              <TextWrap>{select.title}</TextWrap>
            </TouchableOpacity>
          );
        }),
        button: '취소',
      }),
    );
  };

  const handleImage = async () => {
    //이미지 추가
    if (!isIos) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          throw '';
        }
      } catch (error) {
        return dispatch(
          popupOpen({
            title: '알림',
            message: '설정에서 저장공간 권한을 허용해 주세요.',
          }),
        );
      }
    }
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.5,
        selectionLimit: 1,
      },
      ({assets, errorMessage, didCancel}) => {
        if (didCancel) {
          return;
        } else if (errorMessage) {
          //   dispatch(errorOpen(errorMessage));
          console.log(errorMessage);
        } else {
          uploadImage(assets);
        }
      },
    );
  };

  const handleCamera = async () => {
    if (!isIos) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          throw '';
        }
      } catch (error) {
        return dispatch(
          popupOpen({
            title: '알림',
            message: '설정에서 저장공간 권한을 허용해 주세요.',
          }),
        );
      }
    }
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 0.5,
      },
      ({assets, errorMessage, didCancel}) => {
        if (didCancel) {
          return;
        } else if (errorMessage) {
          console.log(errorMessage);
        } else {
          uploadImage(assets);
        }
      },
    );
  };

  const uploadImage = asset => {
    //이미지 설정

    dispatch(
      updateUser({
        profileImage: {
          name: asset[0].fileName,
          size: asset[0].fileSize,
          type: asset[0].type,
          uri: asset[0].uri,
          width: asset[0].width,
          height: asset[0].height,
        },
      }),
    );
  };

  return (
    <SafeLayout>
      <Topbar title="프로필" />
      <ScrollView>
        <View style={styles.profileWrap}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onImageChange}>
              {Boolean(profileImage) ? (
                <Image
                  source={{uri: profileImage.uri}}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    resizeMode: 'cover',
                  }}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={60}
                  color={colors.icon}
                />
              )}
            </TouchableOpacity>
            <TextWrap white title3 style={styles.name}>
              {Boolean(nickName) && nickName} 트레이너님 환영합니다
            </TextWrap>
          </View>
        </View>
        <View style={styles.root}>
          <ListItem
            label="내 정보 관리"
            onPress={() => navigation.navigate('edit-profile')}
          />
          <ListItem
            label="공지사항"
            onPress={() => navigation.navigate('notice')}
          />
          <ListItem label="로그아웃" onPress={onLogout} />
        </View>
      </ScrollView>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  profileWrap: {
    padding: 20,
    backgroundColor: colors.yellow,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  bar: {
    width: 1,
    marginHorizontal: 10,
    backgroundColor: '#97e092',
    height: 10,
  },
  popupWrap: {
    marginVertical: 20,
  },
  popupText: {
    textAlign: 'center',
  },
  name: {
    marginLeft: 10,
  },
  select: {
    width: screenWidth,
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
});
