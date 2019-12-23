import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import { color } from '../styles';
import Home from '../screens/Home';
import Purchase from '../screens/Purchase';
import Profile from '../screens/Profile';
import More from '../screens/More';
import Auth from '../screens/Auth';
import Clue from '../screens/Clue';
import TryoutOptions from '../screens/TryoutOptions';
import TryOut from '../screens/TryOut';
import ProfilePicker from '../components/ProfileComponents';
import AuthLoading from '../screens/AuthLoading';
import BarangDetail from '../screens/BarangDetail';
import AddLelang from '../screens/AddLelang';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import conf from '../assets/fonts/selection.json'

const Icon = createIconSetFromIcoMoon(conf);

const HomeStack = createStackNavigator({
    Home,
    BarangDetail,
    AddLelang,
    Clue,
    TryoutOptions,
    TryOut
})

HomeStack.navigationOptions=({navigation})=>{
  let tabBarVisible = true;
  if(navigation.state.index>0){
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}

const PurchaseStack = createStackNavigator({
    Purchase,
    BarangDetail,
})

PurchaseStack.navigationOptions=({navigation})=>{
  let tabBarVisible = true;
  if(navigation.state.index>0){
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}

const ProfileStack = createStackNavigator({
    Profile,
    ProfilePicker,
    BarangDetail,

})

ProfileStack.navigationOptions=({navigation})=>{
  let tabBarVisible = true;
  if(navigation.state.index>0){
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  }
}

const MoreStack = createStackNavigator({
    More
})

const AuthStack =createStackNavigator({
  Auth
},
{
  headerMode: 'none'
})

const BottomTab = createBottomTabNavigator({
    Home: HomeStack,
    Riwayat: PurchaseStack,
    Profile: ProfileStack,
    Lainnya: MoreStack
},
{
    defaultNavigationOptions: ({navigation}) =>({
      tabBarIcon: ({focused, tintColor})=>{
        const {routeName} = navigation.state;
        let iconName;
        if(routeName == 'Home'){
          iconName = `home`;
        }else if (routeName == 'Riwayat'){
          iconName = `message`;
        }else if (routeName == 'Profile'){
          iconName = `profile`;
        }else if (routeName == 'Lainnya'){
          iconName = `more-horizontal`;
        }
        return <Icon name={iconName} size={routeName == 'Lainnya'? 35 : 25} color={tintColor} />
        // return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions:{
      activeTintColor: color.primary,
      inactiveTintColor: color.g400
    }
})

const AppContainer = createAppContainer(createSwitchNavigator({
        BottomTab,
        AuthStack,
        AuthLoading
    },
    {
        initialRouteName: 'AuthLoading'
    })
);

export default AppContainer