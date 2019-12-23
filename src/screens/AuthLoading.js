import React, { useState, useEffect } from "react";
import { View, AsyncStorage, Text } from 'react-native';
import styless, { color } from '../styles';
import { BarIndicator } from 'react-native-indicators';


// import AsyncStorage from '@react-native-community/async-storage';

const AuthLoading = (props) => {
    useEffect(() => {
        cek()
    })

    const cek = async () => {
        isLogin = await AsyncStorage.getItem('access_token')
        props.navigation.navigate(isLogin ? 'BottomTab' : 'AuthStack')
        console.log(isLogin)
    }

    return (
        <View style={{ flex: 1, backgroundColor: color.primary, alignItems: 'center', justifyContent: 'center', padding: 100 }}>
            <BarIndicator  color={'#fff'} count={5} size={20} style={{flex: 0}}/>
            <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>Lelangku</Text>
        </View>
    )
}

export default AuthLoading