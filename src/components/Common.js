import React from 'react';
import { View, Dimensions, StyleSheet, Image, Text } from 'react-native';
import { color } from '../styles';

export class Divider extends React.Component{
    render(){
        const widthScreen = Dimensions.get('screen').width
        return(
            <View style={{height: 5, width: widthScreen, backgroundColor: color.g300}}>

            </View>
        )
    }
}