import React, {useState, useEffect, useRef} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Input from '../../components/input/Input';
import Topbar from '../../components/topbar/Topbar';
import poketmonDatas from './poketmonDatas.json';
import {formatId, screenWidth, screenHeight} from '../../services/utils';
import colors from '../../libs/colors';
import {useRoute} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Divider from '../../components/divider/Divider';
import {
  Female,
  Male,
  Grass,
  Poison,
  Fire,
  Ghost,
  Rock,
  Esp,
  Fight,
  Ice,
  Earth,
  Electric,
  Steel,
  Nomal,
  Water,
  Insect,
  Dragon,
  Flying,
  Kkk,
} from '../../libs/images';

export default function GuidebookDetail() {
  const {
    params: {item},
  } = useRoute();
  const scrollRef = useRef();
  const scrollViewRef = useRef();

  let animi = useRef(new Animated.Value(0)).current;
  const [poketmonData, setPoketmonData] = useState(item);
  const [evolutionDatas, setEvolutionDatas] = useState([{}, {}, {}]);
  const [showBtn, setShowBtn] = useState(false);

  if (Boolean(poketmonData.evolutionIds)) {
    poketmonData.evolutionIds.map((id, index) => {
      poketmonDatas.map(data => {
        if (id === data.id) {
          evolutionDatas[index] = data;
        }
      });
    });
  }

  const onPressPoketmon = item => {
    setPoketmonData(item);
  };

  const onPressLeft = () => {
    if (poketmonData.id > 1) {
      const leftPoketmon = poketmonDatas.filter(
        d => d.id === poketmonData.id - 1,
      );
      setPoketmonData(leftPoketmon[0]);
      scrollRef.current?.scrollTo({
        animated: true,
        y: 0,
      });
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: 0,
      });
    }
  };

  const onPressRight = () => {
    if (poketmonData.id !== poketmonDatas.length) {
      const rightPoketmon = poketmonDatas.filter(
        d => d.id === poketmonData.id + 1,
      );
      setPoketmonData(rightPoketmon[0]);
      scrollRef.current?.scrollTo({
        animated: true,
        y: 0,
      });
      scrollViewRef.current?.scrollTo({
        animated: true,
        x: 0,
      });
    }
  };

  useEffect(() => {
    if (showBtn) {
      Animated.timing(animi, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animi, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [showBtn]);

  const handleScroll = () => {
    setShowBtn(false);
  };

  return (
    <SafeLayout>
      <Topbar title="상세정보" back />
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={0}>
        <TouchableWithoutFeedback onPress={() => setShowBtn(!showBtn)}>
          <View>
            <View>
              <Image
                source={{uri: poketmonData.imagePath}}
                style={styles.image}
              />
              <View style={styles.content}>
                <TextWrap lightGray>{`No. ${formatId(
                  poketmonData.id,
                )}`}</TextWrap>
                <TextWrap style={styles.name} name bold>
                  {poketmonData.name}
                </TextWrap>
                <TextWrap style={styles.desc}>{poketmonData.desc}</TextWrap>
                <View style={styles.infoWrap}>
                  <View style={styles.infoRow}>
                    <View style={styles.rowWrap}>
                      <TextWrap style={styles.infoText} gray>
                        타입
                      </TextWrap>
                      <View style={styles.row}>
                        {poketmonData.type.map((x, i) => {
                          switch (x) {
                            case 'grass': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Grass} style={styles.type} />
                                  <TextWrap small>풀</TextWrap>
                                </View>
                              );
                            }
                            case 'poison': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Poison} style={styles.type} />
                                  <TextWrap small>독</TextWrap>
                                </View>
                              );
                            }
                            case 'fire': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Fire} style={styles.type} />
                                  <TextWrap small>불꽃</TextWrap>
                                </View>
                              );
                            }
                            case 'ghost': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Ghost} style={styles.type} />
                                  <TextWrap small>고스트</TextWrap>
                                </View>
                              );
                            }
                            case 'rock': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Rock} style={styles.type} />
                                  <TextWrap>바위</TextWrap>
                                </View>
                              );
                            }
                            case 'esp': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Esp} style={styles.type} />
                                  <TextWrap small>에스퍼</TextWrap>
                                </View>
                              );
                            }
                            case 'fight': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Fight} style={styles.type} />
                                  <TextWrap small>격투</TextWrap>
                                </View>
                              );
                            }
                            case 'ice': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Ice} style={styles.type} />
                                  <TextWrap small>얼음</TextWrap>
                                </View>
                              );
                            }
                            case 'earth': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Earth} style={styles.type} />
                                  <TextWrap small>땅</TextWrap>
                                </View>
                              );
                            }
                            case 'electric': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image
                                    source={Electric}
                                    style={styles.type}
                                  />
                                  <TextWrap small>전기</TextWrap>
                                </View>
                              );
                            }
                            case 'steel': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Steel} style={styles.type} />
                                  <TextWrap small>강철</TextWrap>
                                </View>
                              );
                            }
                            case 'nomal': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Nomal} style={styles.type} />
                                  <TextWrap small>노말</TextWrap>
                                </View>
                              );
                            }
                            case 'water': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Water} style={styles.type} />
                                  <TextWrap small>물</TextWrap>
                                </View>
                              );
                            }
                            case 'insect': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Insect} style={styles.type} />
                                  <TextWrap small>벌레</TextWrap>
                                </View>
                              );
                            }
                            case 'dragon': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Dragon} style={styles.type} />
                                  <TextWrap small>드래곤</TextWrap>
                                </View>
                              );
                            }
                            case 'flying': {
                              return (
                                <View
                                  key={i.toString()}
                                  style={styles.typeWrap}>
                                  <Image source={Flying} style={styles.type} />
                                  <TextWrap small>비행</TextWrap>
                                </View>
                              );
                            }
                          }
                        })}
                      </View>
                    </View>
                    <View style={styles.rowWrap}>
                      <TextWrap style={styles.infoText} gray>
                        성별
                      </TextWrap>
                      <View style={styles.row}>
                        {poketmonData.gender.map(x => {
                          if (x === 'male') {
                            return (
                              <Image
                                key={x}
                                source={Male}
                                style={styles.gender}
                              />
                            );
                          } else if (x === 'female') {
                            return (
                              <Image
                                key={x}
                                source={Female}
                                style={styles.gender}
                              />
                            );
                          } else {
                            return (
                              <TextWrap style={{marginTop: 10}} key={x}>
                                불명
                              </TextWrap>
                            );
                          }
                        })}
                      </View>
                    </View>
                  </View>
                  <Divider margin height={1} />
                  <View style={styles.infoRow}>
                    <View style={styles.rowWrap}>
                      <TextWrap style={styles.infoText} gray>
                        키
                      </TextWrap>
                      <TextWrap>{poketmonData.height}m</TextWrap>
                    </View>
                    <View style={styles.rowWrap}>
                      <TextWrap style={styles.infoText} gray>
                        몸무게
                      </TextWrap>
                      <TextWrap>{poketmonData.weight}kg</TextWrap>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {Boolean(poketmonData.evolutionIds) && (
          <>
            <View>
              <TextWrap style={{marginLeft: 20}} gray>
                진화
              </TextWrap>
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}>
                <View style={styles.row}>
                  {evolutionDatas.map((data, i) => {
                    if (Boolean(data.name)) {
                      return (
                        <View
                          key={i.toString()}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                          }}>
                          {i !== 0 && <AntDesign name="right" size={20} />}
                          <TouchableOpacity
                            disabled={poketmonData.id === data.id}
                            onPress={() => {
                              if (poketmonData.id !== data.id) {
                                onPressPoketmon(data);
                                scrollRef.current?.scrollTo({
                                  animated: true,
                                  y: 0,
                                });
                                scrollViewRef.current?.scrollTo({
                                  animated: true,
                                  x: 0,
                                });
                              }
                            }}
                            style={{
                              width: screenWidth / 2 - 25,
                              alignItems: 'center',
                              borderWidth: 1,
                              borderColor: colors.border,
                              marginLeft: 10,
                              marginTop: 10,
                              borderRadius: 10,
                              padding: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-start',
                              }}>
                              <TextWrap
                                style={{
                                  backgroundColor: colors[`${data.type[0]}`],
                                  borderRadius: 100,
                                  paddingHorizontal: 7,
                                  paddingVertical: 1,
                                  zIndex: 2,
                                }}>
                                {formatId(data.id)}
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
                                {data.name}
                              </TextWrap>
                            </View>
                            <Image
                              source={{uri: data.imagePath}}
                              style={styles.evolutionImage}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    }
                  })}
                </View>
                <View style={{width: 20}} />
              </ScrollView>
            </View>
            <View style={{height: 40}} />
          </>
        )}
      </ScrollView>
      <>
        <Animated.View style={[styles.leftBtn, {opacity: animi}]}>
          <TouchableOpacity onPress={onPressLeft}>
            <AntDesign
              name="left"
              size={30}
              color="#fff"
              style={{marginRight: 5}}
            />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.rightBtn, {opacity: animi}]}>
          <TouchableOpacity onPress={onPressRight} disabled={!showBtn}>
            <AntDesign
              name="right"
              size={30}
              color="#fff"
              style={{marginLeft: 5}}
            />
          </TouchableOpacity>
        </Animated.View>
      </>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
  },
  flatlist: {
    marginBottom: 80,
  },
  image: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
  },
  evolutionImage: {
    width: screenWidth / 3,
    height: screenWidth / 3,
  },
  content: {
    marginHorizontal: 20,
  },
  gender: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 10,
    marginRight: 10,
  },
  type: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    borderRadius: 100,
    marginBottom: 4,
  },
  typeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  infoWrap: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 20,
    borderColor: colors.border,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowWrap: {
    width: (screenWidth - 40) / 2,
    paddingLeft: 30,
    paddingVertical: 10,
  },
  infoText: {
    marginBottom: 10,
  },
  desc: {
    marginTop: 20,
  },
  name: {marginTop: 5},
  leftBtn: {
    width: 60,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.blackOpacity(4),
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    left: -25,
    top: (screenHeight - 50) / 2,
    zIndex: 99,
  },
  rightBtn: {
    width: 60,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.blackOpacity(4),
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    right: -25,
    top: (screenHeight - 50) / 2,
    zIndex: 99,
  },
});
