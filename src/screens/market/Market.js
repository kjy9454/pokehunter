import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Input from '../../components/input/Input';
import Topbar from '../../components/topbar/Topbar';
import {LineChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import colors from '../../libs/colors';
import poketmonDatas from '../guidebook/poketmonDatas.json';
import {formatNumber3digit, isIos, screenWidth} from '../../services/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getItem} from '../../services/preference';
import moment from 'moment-timezone';
import {XAxis} from 'react-native-svg-charts';
import MarketItem from './MarketItem';

export default function Market() {
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [tabs, setTabs] = useState(1);
  const [likeDatas, setLikeDatas] = useState([]);
  const [reverselikeDatas, setReverseLikeDatas] = useState([]);
  const reversePoketmonDatas = [...poketmonDatas].reverse();
  const sortType = [
    {sortId: 1, sort: '도감번호 순서'},
    {sortId: 2, sort: '도감번호 반대순서'},
    // {sortId: 3, sort: '가격 높은 순서'},
    // {sortId: 4, sort: '가격 낮은 순서'},
    // {sortId: 5, sort: '거래량 높은 순서'},
    // {sortId: 6, sort: '거래량 낮은 순서'},
  ];
  const [sort, setSort] = useState({sortId: 1, sort: '도감번호 순서'});
  const [flastListData, setFlatListData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [chartData, setChartData] = useState([]);
  // const [priceChange, setPriceChange] = useState();
  // const [priceChangePercent, setPriceChangePercent] = useState();
  const fetchData = async () => {
    // try {
    //   setLoading(true);
    //   for (let i = 0; i < 24; i++) {
    //     chartData.push({
    //       time: moment(i, 'HH').tz('Asia/Seoul').format('HH'),
    //       price: i + Math.random() * 100000,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    //   setPriceChange(
    //     (
    //       chartData[chartData.length - 1].price -
    //       chartData[chartData.length - 2].price
    //     ).toFixed(),
    //   );
    // }
    // setPriceChangePercent(
    //   (
    //     ((chartData[chartData.length - 1].price -
    //       chartData[chartData.length - 2].price) /
    //       chartData[chartData.length - 2].price) *
    //     100
    //   ).toFixed(2),
    // );
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (focused) {
      getItem('likes')
        .then(likes => {
          setLikeDatas([
            ...poketmonDatas.filter(poketmon =>
              [...JSON.parse(likes)].includes(poketmon.id),
            ),
          ]);
          setReverseLikeDatas([
            ...reversePoketmonDatas.filter(poketmon =>
              [...JSON.parse(likes)].includes(poketmon.id),
            ),
          ]);
        })
        .catch(error => console.log(error));
    }
  }, [focused]);

  useEffect(() => {
    setFlatListData(
      tabs === 1
        ? Boolean(sort.sortId === 1)
          ? poketmonDatas
          : reversePoketmonDatas
        : Boolean(sort.sortId === 1)
        ? likeDatas
        : reverselikeDatas,
    );
  }, [tabs, sort]);

  if (loading) {
    return (
      <SafeLayout>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.yellow} />
        </View>
      </SafeLayout>
    );
  }
  return (
    <SafeLayout>
      <Topbar title="거래소" />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => setShowModal(!showModal)}>
          <FlatList
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              paddingVertical: 5,
              top: isIos ? 160 : 120,
              right: 20,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
            data={sortType}
            keyExtractor={(item, index) => item.sortId.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    },
                    index !== sortType.length - 1 && {
                      borderBottomWidth: 0.5,
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => {
                    setSort(item);
                    setShowModal(!showModal);
                  }}>
                  <TextWrap>{item.sort}</TextWrap>
                </TouchableOpacity>
              );
            }}
          />
        </TouchableOpacity>
      </Modal>
      <View style={styles.header}>
        <View style={styles.btnWrap}>
          <TouchableWithoutFeedback
            onPress={() => {
              setTabs(1);
            }}>
            <View style={[styles.headerBtn, tabs === 1 && styles.selected]}>
              <TextWrap>전체</TextWrap>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setTabs(2);
            }}>
            <View style={[styles.headerBtn, tabs === 2 && styles.selected]}>
              <TextWrap>관심</TextWrap>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowModal(!showModal);
            // setSort(!sort);
          }}>
          <View style={styles.row}>
            <Ionicons
              name="swap-vertical-sharp"
              size={20}
              color={colors.black}
            />
            <TextWrap>{` ${sort.sort}`}</TextWrap>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <FlatList
        ListFooterComponent={<View style={{height: 20}} />}
        data={flastListData}
        keyExtractor={(item, index) => index.toString() + item.name}
        renderItem={({item, index}) => {
          return <MarketItem item={item} />;
        }}
      />
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerBtn: {
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  selected: {
    borderBottomWidth: 2,
    borderColor: colors.yellow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnWrap: {
    flexDirection: 'row',
  },
});
