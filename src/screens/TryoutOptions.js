import React from 'react';
import { View, Text } from 'react-native';
import { color } from '../styles';
import { CardOptions } from '../components/SimulasiComponent';

export default class TryoutOption extends React.Component{
    static navigationOptions=({navigation})=>{
        return{
            title: navigation.getParam('params').title,
            headerTintColor: color.primary,
            headerStyle:{
                backgroundColor: '#fff'
            }
        }
    }
    render(){
        const data = [
            {
                id: '1',
                title: 'Judul Ujian Ini Adalah',
                question: '10',
                time: '10',
                score: '-'
            },
            {
                id: '2',
                title: 'Judul Ujian Ini Adalah',
                question: '10',
                time: '10',
                score: '-'
            },
        ]
        return(
            <View style={{paddingHorizontal: 5, flex: 1}}>
                <CardOptions data={data} onPress={()=>this.props.navigation.navigate('TryOut')} />
            </View>
        )
    }
}