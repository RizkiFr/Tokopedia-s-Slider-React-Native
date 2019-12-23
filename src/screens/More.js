import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Button } from '../components/Common';

export default class More extends React.Component{
    static navigationOptions = {
        // headerTransparent: true,
        headerTintColor: '#000',
        title: 'Lainnya'
    };

    logout=async()=>{
        await AsyncStorage.clear()
        this.props.navigation.navigate('AuthStack')
    }

    render(){
        return(
            <View style={{padding: 10}}>
                <Button title ='LOGOUT' onPress={this.logout} />
            </View>
        )
    }
}