/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  AsyncStorage,
} from 'react-native';
import AppContainer from './src/navigations';
import axios from 'axios';

AsyncStorage.getItem('access_token').then(val => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + val;
})
axios.defaults.baseURL = 'https://xii.pajajarantrans.co.id/public';


const App: () => React$Node = () => {
  return (
    <>
      {/* <SafeAreaView> */}
        <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
        <AppContainer />
      {/* </SafeAreaView> */}
    </>
  );
};

export default App;