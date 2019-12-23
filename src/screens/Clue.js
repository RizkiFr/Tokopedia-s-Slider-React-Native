import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import { color } from '../styles';
import { Divider, Clues, Options } from '../components/Common';

export default class Clue extends React.Component{
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
        const params = this.props.navigation.getParam('params')
        const data =[
            {
                id: '1',
                title: 'Saintek',
                image: 'https://www.snopes.com/tachyon/2017/12/science-stock-image.png?resize=865,452'
            },
            {
                id: '2',
                title: 'Soshum',
                image: 'https://i.dawn.com/primary/2018/11/5bdca85499445.jpg'
            }
        ]
        return(
            <View style={styles.wrap}>
                <StatusBar translucent backgroundColor='transparent' barStyle={'dark-content'} />
                <Clues icon={params.icon} text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} />
                <Divider />
                <Options data={data} navigate={(params)=>this.props.navigation.navigate('TryoutOptions', {params})} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrap:{
        flex: 1
    },
    clue:{
        fontSize: 16,
        color: color.g700
    }
})