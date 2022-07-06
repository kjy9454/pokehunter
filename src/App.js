import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import Guidebook from './screens/guidebook/Guidebook';
import Splash from './screens/splash/Splash';
import Map from './screens/map/Map';
import Market from './screens/market/Market';
import Forum from './screens/forum/Forum';
import Profile from './screens/profile/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import GuidebookDetail from './screens/guidebook/GuidebookDetail';
import BottomTabBar from './components/bottom-tab-bar/BottomTabBar';
import PostDetail from './screens/forum/PostDetail';
import Login from './screens/login/Login';
import SignUp from './screens/signup/SignUp';
import store from './redux/store';
import {Provider} from 'react-redux';
import EditProfile from './screens/profile/EditProfile';
import PostAdd from './screens/forum/PostAdd';
import Notice from './screens/notice/Notice';
import NoticeDetail from './screens/notice/NoticeDetail';
import Popup from './redux-components/popup/Popup';
import MarketDetail from './screens/market/MarketDetail';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function Tabs() {
    return (
      <Tab.Navigator
        // backBehavior="none"
        initialRouteName="map"
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen
          options={{tabBarLabel: '사냥터'}}
          name="map"
          component={Map}
        />
        <Tab.Screen
          options={{tabBarLabel: '도감'}}
          name="guidebook"
          component={Guidebook}
        />
        <Tab.Screen
          options={{tabBarLabel: '거래소'}}
          name="market"
          component={Market}
        />
        <Tab.Screen
          options={{tabBarLabel: '게시판'}}
          name="forum"
          component={Forum}
        />
        <Tab.Screen
          options={{tabBarLabel: '프로필'}}
          name="profile"
          component={Profile}
        />
      </Tab.Navigator>
    );
  }

  function StackApp() {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="splash">
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="tabs" component={Tabs} />
        <Stack.Screen name="guidebook" component={Guidebook} />
        <Stack.Screen name="guidebook-detail" component={GuidebookDetail} />
        <Stack.Screen name="post-detail" component={PostDetail} />
        <Stack.Screen name="post-add" component={PostAdd} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="sign-up" component={SignUp} />
        <Stack.Screen name="edit-profile" component={EditProfile} />
        <Stack.Screen name="notice" component={Notice} />
        <Stack.Screen name="notice-detail" component={NoticeDetail} />
        <Stack.Screen name="market-detail" component={MarketDetail} />
      </Stack.Navigator>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <StackApp />
          <Popup />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
