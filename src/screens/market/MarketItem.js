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

export default function MarketItem({item}) {
  const navigation = useNavigation();
  const [chartData, setChartData] = useState([]);
  const [priceChange, setPriceChange] = useState();
  const [priceChangePercent, setPriceChangePercent] = useState();

  const fetchData = async () => {
    try {
      for (let i = 0; i < 24; i++) {
        chartData.push({
          time: moment(i, 'HH').tz('Asia/Seoul').format('HH'),
          price: i + Math.random() * 100000,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPriceChange(
        (
          chartData[chartData.length - 1].price -
          chartData[chartData.length - 2].price
        ).toFixed(),
      );
      setPriceChangePercent(
        (
          ((chartData[chartData.length - 1].price -
            chartData[chartData.length - 2].price) /
            chartData[chartData.length - 2].price) *
          100
        ).toFixed(2),
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('market-detail', {item, chartData});
      }}>
      <TextWrap lightGray small>{`No.${item.id}`}</TextWrap>
      <View style={styles.row}>
        <TextWrap style={styles.name}>{item.name}</TextWrap>
        <View style={styles.row}>
          {Boolean(chartData.length) && (
            <TextWrap>{`${formatNumber3digit(
              chartData[chartData.length - 1].price.toFixed(),
            )}  `}</TextWrap>
          )}
          {priceChange > 0 ? (
            <Entypo name="arrow-up" size={15} color={colors.red} />
          ) : (
            <Entypo name="arrow-down" size={15} color={colors.blue} />
          )}
          <TextWrap
            red={priceChange > 0 ? true : false}
            blue={priceChange < 0 ? true : false}>{`${formatNumber3digit(
            Math.abs(priceChange),
          )}  `}</TextWrap>

          <TextWrap
            red={priceChange > 0 ? true : false}
            blue={
              priceChange < 0 ? true : false
            }>{`${priceChangePercent}%`}</TextWrap>
        </View>
      </View>
      <LineChart
        style={{
          height: 80,
          width: screenWidth - 60,
        }}
        data={chartData}
        yAccessor={({item}) => item.price}
        contentInset={{top: 5, bottom: 5}}
        svg={{stroke: colors.yellow}}
        numberOfTicks={5}>
        <Grid />
      </LineChart>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 20,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    width: 80,
  },
});
