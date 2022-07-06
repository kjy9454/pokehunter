import React, {useState, useEffect, useRef} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Input from '../../components/input/Input';
import Topbar from '../../components/topbar/Topbar';
import poketmonDatas from './poketmonDatas.json';
import {formatId, screenHeight, screenWidth} from '../../services/utils';
import colors from '../../libs/colors';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Guidebook() {
  const navigation = useNavigation();
  const scrollRef = useRef();
  let animi = useRef(new Animated.Value(0)).current;
  const [search, setSearch] = useState();
  const [data, setData] = useState([...poketmonDatas]);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const onSearch = () => {
    const f = poketmonDatas.filter(d => d.name.includes(search));
    setData([...f]);
  };

  const onPressPoketmon = item => {
    navigation.navigate('guidebook-detail', {item});
  };

  const handleScroll = e => {
    const {
      contentOffset: {y},
    } = e.nativeEvent;
    if (y > 200) {
      setShowTopBtn(true);
    } else if (y === 0) {
      removeBtn();
    }
  };
  useEffect(() => {
    if (search === '') {
      setData([...poketmonDatas]);
    }
  }, [search]);

  const onScrollToTop = () => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      y: 0,
    });
  };

  useEffect(() => {
    if (showTopBtn) {
      Animated.timing(animi, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }
  }, [showTopBtn]);

  const removeBtn = () => {
    Animated.timing(animi, {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    }).start(() => {
      setShowTopBtn(false);
    });
  };
  return (
    <SafeLayout>
      <Topbar title="포켓몬 도감" />
      <View>
        {data.length === 0 ? (
          <>
            <Input
              value={search}
              search
              onChange={e => {
                setSearch(e);
              }}
              onPress={onSearch}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: screenHeight / 2 - 120,
              }}>
              <TextWrap>데이터 없음</TextWrap>
            </View>
          </>
        ) : (
          <FlatList
            style={styles.flatlist}
            data={data}
            ref={scrollRef}
            onScroll={handleScroll}
            ListHeaderComponent={
              <Input
                style={{marginHorizontal: 10, marginTop: 10}}
                value={search}
                search
                onChange={e => {
                  setSearch(e);
                }}
                onPress={onSearch}
              />
            }
            ListFooterComponent={<View style={styles.footer} />}
            keyExtractor={(item, index) => index.toString() + item.name}
            numColumns={2}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressPoketmon(item)}
                  style={styles.imageWrap}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'flex-start',
                    }}>
                    <TextWrap
                      style={{
                        backgroundColor: colors[`${item.type[0]}`],
                        borderRadius: 100,
                        paddingHorizontal: 7,
                        paddingVertical: 1,
                        zIndex: 2,
                      }}>
                      {formatId(item.id)}
                    </TextWrap>
                    <TextWrap
                      style={{
                        position: 'relative',
                        right: 9,
                        paddingLeft: 13,
                        paddingRight: 7,
                        borderColor: colors.border,
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderTopRightRadius: 100,
                        borderBottomRightRadius: 100,
                        paddingVertical: 1,
                      }}>
                      {item.name}
                    </TextWrap>
                  </View>
                  <Image source={{uri: item.imagePath}} style={styles.image} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      {showTopBtn && (
        <Animated.View style={[styles.upBtn, {opacity: animi}]}>
          <TouchableOpacity onPress={onScrollToTop}>
            <AntDesign name="up" size={25} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  footer: {
    height: 20,
  },
  image: {
    width: screenWidth / 3,
    height: screenWidth / 3,
  },
  flatlist: {
    marginHorizontal: 10,
    marginBottom: 60,
  },
  upBtn: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: colors.blackOpacity(4),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    bottom: 20,
    zIndex: 99,
  },
  imageWrap: {
    width: screenWidth / 2 - 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
  },
});
