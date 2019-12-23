import React from 'react';
import { View, ScrollView, Text, ImageBackground, StyleSheet, Image, StatusBar, Platform, TouchableOpacity, Linking } from 'react-native';
import Slider from '../components/Slider';
import { CardName } from '../components/CardName';
import SearchBox from '../components/SearcBox';
import { Header } from 'react-navigation';
import { Divider } from '../components/Common';
import Menu from '../components/Menu';

export default class Home extends React.Component{
    static navigationOptions = ({navigation}) => {
        return{
            header: null,
        }
      }
    constructor(props){
        super(props),
        this.state={
            imgUri: 'https://marketing.ruangguru.com/hubfs/Hubspot%20Banner%20Web_1280x450-Ads%20RLO%20(1).jpg',
            imageHeight: 165,
            marginTop: -50,
            yAxis: 0
        }
    }

    setBackground=(data)=>{
        this.setState({imgUri: data})
    }
    handleScroll=(event)=>{
        // console.log(event.nativeEvent.contentOffset.y);
        const yAxis = event.nativeEvent.contentOffset.y
        if(yAxis >= 0){
            imageHeight = 165
            this.setState({imageHeight, marginTop: -50})
        }
        else if(yAxis < 0){
            imageHeight = Math.abs(yAxis)+265
            this.setState({imageHeight, marginTop: yAxis-150})
        }
        this.setState({yAxis})
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <StatusBar translucent backgroundColor='transparent' barStyle={this.state.yAxis > 30? 'dark-content' : 'light-content'} />
                <View style={[styles.header,this.state.yAxis>50? styles.shadow: null ,{backgroundColor: `rgba(255,255,255,${this.state.yAxis>50?1:(this.state.yAxis/50)})`}]}>
                    <SearchBox height={this.state.yAxis} />
                </View>
                <ScrollView style={styles.container} onScroll={this.handleScroll} scrollEventThrottle={8} showsVerticalScrollIndicator={false}>
                    <Image source={{uri: this.state.imgUri}} style={[styles.imageStyle, {height: Platform.OS == 'ios'? this.state.imageHeight : 95, marginTop: Platform.OS == 'ios'? this.state.marginTop : 0}]} blurRadius={30} />
                    <CardName />
                    <Slider imgUri={this.setBackground}  />
                    <Menu />
                    <Divider />
                    <View style={{height: 400}}></View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: Platform.OS == 'ios'? -Header.HEIGHT : -(Header.HEIGHT+8)
    },
    header:{
        height: Platform.OS == 'ios'? Header.HEIGHT : Header.HEIGHT+8,
        zIndex: 1,
        paddingTop: 15
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 5,
    },
    imageStyle:{
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        transform: [{scaleX: 1.5}],
        width: null
    },
})