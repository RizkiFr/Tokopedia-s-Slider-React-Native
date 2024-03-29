import React from 'react';
import { View, Dimensions, StyleSheet, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import styless, { color } from '../styles';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export class Divider extends React.Component{
    render(){
        const widthScreen = Dimensions.get('screen').width
        return(
            <View style={{height: 5, width: widthScreen, backgroundColor: color.g300}}>

            </View>
        )
    }
}

export class Clues extends React.Component{
    render(){
        return(
            <View style={styles.wrapClues}>
                <Image source={this.props.icon} style={styles.icon} />
                <Text style={styles.clue}>{this.props.text}</Text>
            </View>
        )
    }
}

export class Options extends React.Component{

    renderOption=({item})=>{
        return(
            <TouchableOpacity style={[styles.option, styless.shadow]} onPress={()=>this.props.navigate(item)} >
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={styles.wrapTitle}>
                    <Text style={styles.titleOption}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        return(
            <View style={styles.wrapOptions}>
            <FlatList 
                data={this.props.data}
                renderItem={this.renderOption}
                keyExtractor={(item, index)=>index}
                numColumns={3}
            />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapClues:{
        padding: 10,
    },
    wrapOptions:{
        flex: 1
    },
    clue:{
        fontSize: 16,
        color: color.g700,
        textAlign: 'justify'
    },
    icon:{
        height: 70,
        width: 70,
        margin: 10,
        alignSelf: 'center'
    },
    image:{
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    option:{
        backgroundColor: color.g700,
        width: (width-40)/3,
        height: width/3,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'flex-end',
    },
    titleOption:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    wrapTitle:{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        width: '100%',
        alignItems: 'center',
        padding: 2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})