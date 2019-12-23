import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TextInput, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { color } from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styless from '../styles';

export class CardOptions extends React.Component{

    renderOptions=({item})=>{
        return(
            <View style={[styles.card, styless.shadows]}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={[styles.section, {borderBottomWidth: 1}]}>
                    <Text style={styles.text}>{item.question} soal</Text>
                    <Text style={styles.text}>{item.time} menit</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>Skor: {item.score}</Text>
                    <TouchableOpacity style={styles.btn} onPress={this.props.onPress}>
                        <Text style={styles.btnText}>MULAI</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <FlatList 
                    data={this.props.data}
                    renderItem={this.renderOptions}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 5
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: color.g600,
        marginHorizontal: 10,
        marginTop: 5
    },
    section:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: color.g300,
        alignItems: 'center'
    },
    btn:{
        backgroundColor: color.primary,
        padding: 5,
        borderRadius: 5,
        width: 60,
        alignItems: 'center'
    },
    btnText:{
        color: '#fff',
        fontWeight: 'bold'
    },
    text:{
        color: color.g700
    }
})