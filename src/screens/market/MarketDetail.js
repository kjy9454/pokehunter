import React, {useState, useEffect} from 'react';
import SafeLayout from '../../layouts/SafeLayout';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import TextWrap from '../../components/text-wrap/TextWrap';
import Input from '../../components/input/Input';
import Topbar from '../../components/topbar/Topbar';
import {LineChart, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import colors from '../../libs/colors';
import poketmonDatas from '../guidebook/poketmonDatas.json';
import {formatNumber3digit, screenWidth} from '../../services/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRoute} from '@react-navigation/native';
import {BarChart} from 'react-native-svg-charts';
import {clearItem, getItem, setItem} from '../../services/preference';
import moment from 'moment-timezone';
import {XAxis} from 'react-native-svg-charts';
import {YAxis} from 'react-native-svg-charts';

export default function MarketDetail() {
  const {
    params: {item, chartData},
  } = useRoute();
  const [like, setLike] = useState(false);

  useEffect(() => {
    getItem('likes')
      .then(likes => {
        if (JSON.parse(likes).includes(item.id)) {
          setLike(true);
        }
      })
      .catch(error => console.log(error));
  }, []);

  const onLike = async () => {
    try {
      const myLikes = await getItem('likes');
      setLike(!like);
      if (like) {
        setItem(
          'likes',
          JSON.stringify(JSON.parse(myLikes).filter(like => like !== item.id)),
        );
      } else {
        setItem('likes', JSON.stringify([...JSON.parse(myLikes), item.id]));
      }
    } catch (error) {
      setItem('likes', JSON.stringify([item.id]));
    }
  };

  return (
    <SafeLayout>
      <Topbar title={item.name} back showLike like={like} onLike={onLike} />
      <ScrollView>
        <View style={styles.root}>
          <TextWrap>가격</TextWrap>

          <LineChart
            style={{height: 200}}
            data={chartData}
            yAccessor={({item}) => item.price}
            contentInset={{top: 5, bottom: 5}}
            svg={{stroke: colors.yellow}}>
            <Grid />
          </LineChart>
          <XAxis
            style={{marginHorizontal: -10, marginBottom: 20}}
            data={chartData}
            formatLabel={(value, index) => index}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'black'}}
          />

          <TextWrap>거래량</TextWrap>
          <BarChart
            style={{height: 200}}
            data={chartData}
            yAccessor={({item}) => item.price}
            contentInset={{top: 20, bottom: 20}}
            curve={shape.curveNatural}
            svg={{fill: colors.yellowOpacity(6)}}>
            <Grid />
          </BarChart>
          <XAxis
            style={{marginHorizontal: -10}}
            data={chartData}
            formatLabel={(value, index) => index}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'black'}}
          />
        </View>
      </ScrollView>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  root: {
    marginHorizontal: 20,
    marginTop: 20,
  },
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
  btnWrap: {
    flexDirection: 'row',
  },
});
