import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { color } from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Profile extends React.Component{
    static navigationOptions={
        header: null
    }
    render(){
        return(
            <ScrollView>
                <PhotoProfile />
                <ProfileField />
            </ScrollView>
        )
    }
}

class PhotoProfile extends React.Component{
    render(){
        return(
            <View style={styles.headerContainer}>
                <View style={styles.backgroundContainer}>
                    <Image source={{uri: 'https://avatars0.githubusercontent.com/u/33630790?s=400&v=4'}} blurRadius={20} style={{height: 100, width: '100%'}} />
                </View>
                <Image source={{uri: 'https://avatars0.githubusercontent.com/u/33630790?s=400&v=4'}} style={[styles.ava]} />
            </View>
        )
    }
}

class Inputs extends React.Component{
    render(){
        return(
            <Input
                    labelStyle={styles.label}
                    placeholderTextColor={color.g300}
                    inputStyle={styles.input}
                    containerStyle={styles.containerInput}
                    {...this.props}
                    />
        )
    }
}

class ProfileField extends React.Component{
    render(){
        return(
            <View style={styles.filedContainer}>
                <Inputs placeholder='Nama Lengkap' label='Nama Lengkap' />
                <Inputs placeholder='Jenis Kelamin' label='Jenis Kelamin' />
                <Inputs placeholder='Bandung' label='Tempat Lahir' />
                <Inputs placeholder='04-02-1997' label='Tanggal Lahir' />
                <Inputs placeholder='Alamat Lengkap' label='Alamat Lengkap' />
                <Inputs placeholder='Asal Sekolah' label='Asal Sekolah' />
                <Inputs placeholder='Kelas' label='Kelas' />
                <Inputs placeholder='Jurusan' label='Jurusan' />
                <Inputs placeholder='Nama Orangtua' label='Nama Orangtua' />
                <Inputs placeholder='Nomor Ponsel Orangtua' label='Nomor Ponsel Orangtua' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer:{
        alignItems: 'center'
    },
    backgroundContainer:{
        height: 100,
        width: '100%',
        backgroundColor: color.g100
    },
    ava:{
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: color.g300,
        marginTop: -50,
    },
    filedContainer:{
        padding: 20
    },
    leftIconStyle:{
        marginLeft: 0,
        marginRight: 10
    },
    label:{
        fontSize: 14,
        fontWeight: 'normal'
    },
    input:{
        minHeight: 30
    },
    containerInput:{
        marginBottom: 10,
        marginHorizontal: 0,
        paddingHorizontal: 0
    }
})