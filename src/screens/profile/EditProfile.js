import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Input from '../../components/input/Input';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import Topbar from '../../components/topbar/Topbar';
import ListItem from '../../components/list-item/ListItem';
import colors from '../../libs/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {clearItem, getItem, setItem} from '../../services/preference';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {signOut, updateUser} from '../../redux/user/UserActions';
import {isIos, screenWidth} from '../../services/utils';
import Divider from '../../components/divider/Divider';
import {
  popupClose,
  popupCloseNow,
  popupOpen,
} from '../../redux/popup/PopupActions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function EditProfile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userId, profileImage, nickName} = useSelector(
    s => s.user,
    shallowEqual,
  );

  const onSave = () => {
    dispatch(
      updateUser({nickName: newNickName, profileImage: newProfileImage}),
    );
    navigation.goBack();
  };
  const [newNickName, setNewNickName] = useState(nickName || '');
  const [newProfileImage, setNewProfileImage] = useState(profileImage);

  const imageChangeSelects = [
    {
      title: '현재 사진 삭제',
      onPress: () => {
        setNewProfileImage();

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
    setNewProfileImage({
      name: asset[0].fileName,
      size: asset[0].fileSize,
      type: asset[0].type,
      uri: asset[0].uri,
      width: asset[0].width,
      height: asset[0].height,
    });
  };

  return (
    <SafeLayout button={{label: '저장', onPress: onSave}}>
      <Topbar title="내 정보 관리" back />
      <ScrollView>
        <View style={styles.infoWrap}>
          <View style={styles.profileImageWrap}>
            <TouchableOpacity
              style={styles.profileImage}
              onPress={onImageChange}>
              {Boolean(newProfileImage) ? (
                <Image
                  source={{
                    uri: newProfileImage.uri,
                  }}
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
              <TextWrap style={{marginTop: 10}}>프로필 사진 변경</TextWrap>
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <View style={styles.row}>
              <View style={styles.title}>
                <TextWrap gray>아이디</TextWrap>
              </View>
              <TextWrap>{userId}</TextWrap>
            </View>
          </View>
        </View>
        <Divider />
        <TextWrap gray style={styles.label}>
          닉네임
        </TextWrap>
        <Input value={newNickName} onChange={e => setNewNickName(e)} />
      </ScrollView>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  label: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    width: screenWidth / 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    minHeight: 50,
    width: screenWidth - 40,
    justifyContent: 'space-between',
    borderColor: colors.border,
    alignItems: 'center',
  },
  infoWrap: {
    paddingBottom: 40,
    marginTop: 20,
  },
  profileImage: {
    marginBottom: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  profileImageWrap: {
    alignSelf: 'center',
    width: screenWidth - 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  select: {
    width: screenWidth,
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
});
