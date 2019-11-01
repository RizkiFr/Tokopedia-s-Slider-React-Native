import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createBottomTabNavigator,
    createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../styles';
import Home from '../screens/Home';
import Purchase from '../screens/Purchase';
import Profile from '../screens/Profile';
import More from '../screens/More';
import Auth from '../screens/Auth';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import conf from '../assets/fonts/selection.json'

const Icon = createIconSetFromIcoMoon(conf);

const HomeStack = createStackNavigator({
    Home
})

const PurchaseStack = createStackNavigator({
    Purchase
})

const ProfileStack = createStackNavigator({
    Profile
})

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
    Pesan: PurchaseStack,
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
        }else if (routeName == 'Pesan'){
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
        AuthStack
    },
    {
        initialRouteName: 'BottomTab'
    })
);

export default AppContainer