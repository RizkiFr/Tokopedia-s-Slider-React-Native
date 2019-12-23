import React from 'react';
import { View, ScrollView, Text, StatusBar, StyleSheet, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Alert, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { color } from '../styles';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import conf from '../assets/fonts/selection.json';
import moment from 'moment';
import axios from 'axios';
import { BarIndicator } from 'react-native-indicators';
import "moment/min/locales";


const Icon = createIconSetFromIcoMoon(conf);

export default class Auth extends React.Component {
    constructor(props) {
        super(props),
            this.state = {
                time: '',
                day: '',
                login: true,
                name: '',
                email: '',
                password: '',
                whatsapp: '',
                loading: false
            }
    }

    componentDidMount() {
        const time = moment().format('HH:mm')
        const day = moment().locale('id').format('dddd, DD MMM YYYY')
        this.setState({ time, day })
    }

    login = async () => {
        this.setState({ loading: true })
        const state = this.state
        await axios.post('/api/auth/login', {
            email: state.email,
            password: state.password,
            remember_me: true
        }).then(res => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
            AsyncStorage.setItem('access_token', res.data.access_token)
            this.props.navigation.navigate('Home')

        }).catch(err => {
            Alert.alert('Gagal Login', 'email atau password salah atau belum terdaftar')
        })
        this.setState({ loading: false })
    }

    register = () => {
        this.setState({ loading: true })
        const state = this.state
        axios.post('/api/auth/signup',
            {
                name: state.name,
                email: state.email,
                password: state.password,
                password_confirmation: state.password,
                whatsapp: state.whatsapp
            }).then(res => {
                console.log(res)
                this.setState({ login: true })
                Alert.alert('Berhasil', 'Silahkan login')
                this.setState({ loading: false })
            }).catch(err => {
                console.log(err.response.data)
                Alert.alert('Gagal', 'Mohon maaf ada kesalahan teknis')
                this.setState({ loading: false })
            })
    }

    renderQuestion() {
        return (
            <>
                <Text style={{ color: '#fff' }}>{this.state.login ? 'Belum' : 'Sudah'} punya akun? </Text>
                <TouchableOpacity onPress={() => this.setState({ login: !this.state.login })}>
                    <Text style={{ color: color.primary, fontWeight: 'bold' }}>{this.state.login ? 'Daftar' : 'Masuk'}</Text>
                </TouchableOpacity>
            </>
        )
    }

    render() {
        return (
            <>
                <StatusBar hidden />
                <ImageBackground source={require('../assets/backgrnd.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={10}>
                            <Text style={styles.time}>{this.state.time}</Text>
                            <Text style={styles.day}>{this.state.day}</Text>
                            <Input
                                placeholder='Email'
                                placeholderTextColor={color.g500}
                                leftIcon={
                                    <Ionicons name='ios-mail' size={26} color={color.g500} />
                                }
                                leftIconContainerStyle={styles.leftIcon}
                                inputContainerStyle={[styles.input, styles.shadow]}
                                containerStyle={{ marginBottom: 10 }}
                                keyboardType='email-address'
                                onChangeText={(email) => this.setState({ email })}
                                autoCapitalize='none'
                            />
                            <Input
                                placeholder='Kata Sandi'
                                placeholderTextColor={color.g500}
                                leftIcon={
                                    <Ionicons name='ios-unlock' size={26} color={color.g500} />
                                }
                                leftIconContainerStyle={styles.leftIcon}
                                inputContainerStyle={[styles.input, styles.shadow]}
                                containerStyle={{ marginBottom: 10 }}
                                secureTextEntry
                                onChangeText={(password) => this.setState({ password })}

                            />
                            {
                                this.state.login ? null :
                                    <Input
                                        placeholder='Nama Lengkap'
                                        placeholderTextColor={color.g500}
                                        leftIcon={
                                            <Icon name='profile' size={20} color={color.g500} />
                                        }
                                        leftIconContainerStyle={styles.leftIcon}
                                        inputContainerStyle={[styles.input, styles.shadow]}
                                        containerStyle={{ marginBottom: 10 }}
                                        onChangeText={(name) => this.setState({ name })}

                                    />
                            }
                            {
                                this.state.login ? null :
                                    <Input
                                        placeholder='Nomor Whatsapp'
                                        placeholderTextColor={color.g500}
                                        leftIcon={
                                            <Ionicons name='ios-call' size={26} color={color.g500} />
                                        }
                                        leftIconContainerStyle={styles.leftIcon}
                                        inputContainerStyle={[styles.input, styles.shadow]}
                                        containerStyle={{ marginBottom: 10 }}
                                        keyboardType='number-pad'
                                        onChangeText={(whatsapp) => this.setState({ whatsapp })}

                                    />
                            }
                            <TouchableOpacity style={[styles.btn, styles.shadow]} onPress={this.state.login ? this.login : this.register}>
                                {
                                    this.state.loading ?
                                        <BarIndicator color={'#fff'} count={5} size={20} /> :
                                        <Text style={styles.textBtn}>{this.state.login ? 'MASUK' : 'DAFTAR'}</Text>
                                }
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
    container: {
        // justifyContent: 'center',
        flex: 1,
        padding: 20,
        paddingTop: 100
    },
    leftIcon: {
        marginRight: 10,
        marginLeft: 10,
        width: 20
    },
    input: {
        borderBottomWidth: 0,
        borderColor: color.g500,
        // borderRadius: 10,
        backgroundColor: '#fff'
    },
    btn: {
        backgroundColor: color.primary,
        marginHorizontal: 10,
        // padding: 10,
        height: 35,
        alignItems: 'center',
        // borderWidth: 2,
        // borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    textBtn: {
        color: '#fff',
        fontWeight: 'bold'
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        elevation: 1,
    },
    time: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 90,
    },
    day: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 24,
        marginTop: -20,
        marginBottom: 50
    },
    question: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'center'
    }
})