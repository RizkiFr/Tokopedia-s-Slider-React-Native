import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { color } from '../styles';

class Menu extends React.Component{
    render(){
        const menus =[
            {
                icon: require('../assets/icons/tryout.png'),
                title: 'Simulasi'
            },
            {
                icon: require('../assets/icons/study.png'),
                title: 'E-Learning'
            },
            {
                icon: require('../assets/icons/brain.png'),
                title: 'Psikotes'
            },
            {
                icon: require('../assets/icons/book.png'),
                title: 'Bank Soal'
            },
            {
                icon: require('../assets/icons/univ.png'),
                title: 'Info Jurusan'
            },
            {
                icon: require('../assets/icons/beasiswa.png'),
                title: 'Info Beasiswa'
            },
            {
                icon: require('../assets/icons/switch.png'),
                title: 'Ganti Topik'
            },
        ]
        return(
            <>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>SBMPTN - Saintek</Text>
                </View>
                <View style={styles.container}>
                    {
                        menus.map((data, index)=>
                        <TouchableOpacity key={index} style={styles.iconWrap}>
                                <Image source={data.icon} style={styles.icon}/>
                                <Text style={styles.subTitle}>{data.title}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </>
        )
    }
}

export default Menu

const widthIcon = (Dimensions.get('screen').width-10)/5
const iconWrap = (Dimensions.get('screen').width-10)/4

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        flexWrap: 'wrap'
    },
    iconWrap:{
        width: iconWrap,
        alignItems: 'center',
        padding: 5
    },
    icon:{
        width: widthIcon-25,
        height: widthIcon-25
    },
    subTitle:{
        fontSize: 10,
        color: color.g700
    },
    containerTitle:{
        paddingLeft: iconWrap/4,
        paddingBottom: 5
    },
    title:{
        fontWeight: 'bold',
        color: color.g700
    }
})