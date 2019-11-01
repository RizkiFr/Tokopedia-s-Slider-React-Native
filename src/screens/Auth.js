import React from 'react';
import { View, ScrollView,Text, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { color } from '../styles';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import conf from '../assets/fonts/selection.json';
import moment from 'moment';
import "moment/min/locales";

const Icon = createIconSetFromIcoMoon(conf);

export default class Auth extends React.Component{
    constructor(props){
        super(props),
        this.state={
            time: '',
            day: '',
            login: true
        }
    }

    componentDidMount(){
        const time = moment().format('HH:mm')
        const day = moment().locale('id').format('dddd, DD MMM YYYY')
        this.setState({time, day})
    }

    renderQuestion(){
        return(
            <>
                <Text style={{color: '#fff'}}>{this.state.login? 'Belum' : 'Sudah'} punya akun? </Text>
                <TouchableOpacity onPress={()=>this.setState({login: !this.state.login})}>
                    <Text style={{color: color.primary, fontWeight: 'bold'}}>{this.state.login? 'Daftar' : 'Masuk'}</Text>
                </TouchableOpacity>
            </>
        )
    }

    render(){
        return(
            <>
            <StatusBar hidden />
            <ImageBackground source={require('../assets/backgrnd.png')} style={{width: '100%', height: '100%'}}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={10}>
                        <Text style={styles.time}>{this.state.time}</Text>
                        <Text style={styles.day}>{this.state.day}</Text>
                        <Input
                            placeholder='Nomor Posel'
                            placeholderTextColor={color.g500}
                            leftIcon={
                                <Ionicons name='ios-call' size={26} color={color.g500} />
                            }
                            leftIconContainerStyle={styles.leftIcon}
                            inputContainerStyle={[styles.input, styles.shadow]}
                            containerStyle={{marginBottom: 10}}
                            keyboardType='number-pad'
                            />
                        <Input
                            placeholder='Kata Sandi'
                            placeholderTextColor={color.g500}
                            leftIcon={
                                <Ionicons name='ios-unlock' size={26} color={color.g500} />
                            }
                            leftIconContainerStyle={styles.leftIcon}
                            inputContainerStyle={[styles.input, styles.shadow]}
                            containerStyle={{marginBottom: 10}}
                            secureTextEntry
                            />
                        {
                            this.state.login? null :
                            <Input
                                placeholder='Nama Lengkap'
                                placeholderTextColor={color.g500}
                                leftIcon={
                                    <Icon name='profile' size={20} color={color.g500} />
                                }
                                leftIconContainerStyle={styles.leftIcon}
                                inputContainerStyle={[styles.input, styles.shadow]}
                                containerStyle={{marginBottom: 10}}
                                />
                        }
                        {
                            this.state.login? null :
                            <Input
                                placeholder='Kode Refferal (Opsional)'
                                placeholderTextColor={color.g500}
                                leftIcon={
                                    <Ionicons name='ios-people' size={26} color={color.g500} />
                                }
                                leftIconContainerStyle={styles.leftIcon}
                                inputContainerStyle={[styles.input, styles.shadow]}
                                containerStyle={{marginBottom: 10}}
                                />
                        }
                        <TouchableOpacity style={[styles.btn, styles.shadow]}>
                            <Text style={styles.textBtn}>{this.state.login? 'MASUK' : 'DAFTAR'}</Text>
                        </TouchableOpacity>
                        <View style={styles.question}>
                            {this.renderQuestion()}
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'center',
        flex: 1,
        padding: 20,
        paddingTop: 100
    },
    leftIcon:{
        marginRight: 10,
        marginLeft: 10,
        width: 20
    },
    input:{
        borderBottomWidth: 0,
        borderColor: color.g500,
        // borderRadius: 10,
        backgroundColor: '#fff'
    },
    btn:{
        backgroundColor: color.primary,
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: '#fff',

    },
    textBtn:{
        color: '#fff',
        fontWeight: 'bold'
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,  
        elevation: 1,
    },
    time:{
        alignSelf: 'center',
        color: '#fff',
        fontSize: 90,
    },
    day:{
        alignSelf: 'center',
        color: '#fff',
        fontSize: 24,
        marginTop: -20,
        marginBottom: 50
    },
    question:{
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center'
    }
})