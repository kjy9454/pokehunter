import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import TextWrap from '../../components/text-wrap/TextWrap';
import SafeLayout from '../../layouts/SafeLayout';
import {isIos, screenWidth} from '../../services/utils';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StockMarker from './StockMarker';
import colors from '../../libs/colors';

export default function Map() {
  const mapRef = useRef();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [latitudeDelta, setLatitudeDelta] = useState(0.005);
  const [longitudeDelta, setLongitudeDelta] = useState(0.005);

  const openLink = async path => {
    Linking.openURL(path).catch(e => console.log(e));
  };

  const onZoomOut = () => {
    setLatitudeDelta(latitudeDelta + 0.001);
    setLongitudeDelta(longitudeDelta + 0.001);
  };

  const onZoomIn = () => {
    if (latitudeDelta > 0) {
      setLatitudeDelta(latitudeDelta - 0.001);
      setLongitudeDelta(longitudeDelta - 0.001);
    }
  };

  const navigateMyLocation = () => {
    let permissions = isIos
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    check(permissions)
      .then(async result => {
        if (result !== 'granted') {
          result = await request(permissions);
        }
        if (result !== 'granted') {
          throw '위치 권한을 허용해주세요.';
        }

        Geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords;
          setLatitudeDelta(0.005);
          setLongitudeDelta(0.005);
          setLat(latitude);
          setLng(longitude);
          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude,
                longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              },
              500,
            );
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    navigateMyLocation();
  }, []);

  return (
    <SafeLayout>
      {Boolean(lat) && Boolean(lng) && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}>
          <Marker
            zIndex={1}
            coordinate={{
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
            }}>
            <View style={styles.ball}>
              <MaterialCommunityIcons
                name="pokeball"
                size={20}
                color={colors.blue}
              />
            </View>
          </Marker>
          <StockMarker lat={lat} lng={lng} stock={2} />
          <StockMarker lat={lat} lng={lng} second stock={100} />
        </MapView>
      )}
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: screenWidth - 40,
          height: (screenWidth - 40) / 5,
          borderRadius: 10,
          backgroundColor: 'white',
          top: 20,
          left: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => openLink('https://github.com/kjy9454')}>
        <TextWrap>광고 환영</TextWrap>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateMyLocation} style={styles.myLocation}>
        <Icon name="my-location" size={20} color={colors.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onZoomIn}
        style={[styles.myLocation, styles.plus]}>
        <AntDesign name="plus" size={20} color={colors.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onZoomOut}
        style={[styles.myLocation, styles.minus]}>
        <AntDesign name="minus" size={20} color={colors.icon} />
      </TouchableOpacity>
    </SafeLayout>
  );
}
const styles = StyleSheet.create({
  myLocation: {
    backgroundColor: 'white',
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: (screenWidth - 40) / 5 + 50,
    right: 20,
    borderRadius: 100,
    shadowColor: '#333',
    width: 40,
    height: 40,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  plus: {
    top: (screenWidth - 40) / 5 + 100,
  },
  minus: {
    top: (screenWidth - 40) / 5 + 150,
  },
  ball: {
    backgroundColor: 'rgba(26, 115, 232, 0.3)',
    width: 35,
    height: 35,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
