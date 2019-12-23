import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TextInput, Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { Input } from 'react-native-elements';
import { color } from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export class PhotoProfile extends React.Component{
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
                    inputContainerStyle={{borderColor: color.g500}}
                    {...this.props}
                    />
        )
    }
}

class Picker extends React.Component{
    render(){
        return(
            <View style={styles.pickerWrap}>
                <Text style={styles.label}>{this.props.label}</Text>
                <TouchableOpacity style={styles.picker} onPress={this.props.onPress}>
                    <Text style={styles.textField}>{this.props.value || '-'}</Text>
                    <Ionicons name='ios-arrow-forward' size={20} color={color.g700} />
                </TouchableOpacity>
            </View>
        )
    }
}

export class ProfileData extends React.Component{
    constructor(props){
        super(props),
        this.state={
            gender: ''
        }
    }

    toNavigate=async(type)=>{
        await this.props.type(type)
    }

    selected(data){
        this.setState({gender: data})
    }

    render(){
        return(
            <View style={styles.filedContainer}>
                <Inputs placeholder='Nama Lengkap' label='Nama Lengkap' />
                <Picker value={this.state.gender} label='Laki' onPress={()=>this.toNavigate('ProfilePicker')} />
                <Inputs placeholder='Bandung' label='Tempat Lahir' />
                <Inputs placeholder='04-02-1997' label='Tanggal Lahir' />
                <Inputs placeholder='Asal Sekolah' label='Asal Sekolah' />
                <Inputs placeholder='Kelas' label='Kelas' />
                <Inputs placeholder='Jurusan' label='Jurusan' />
                <Inputs placeholder='Nama Orangtua' label='Nama Orangtua' />
                <Inputs placeholder='Nomor Ponsel Orangtua' label='Nomor Ponsel Orangtua' />
            </View>
        )
    }
}

export class FullAddress extends React.Component{
    render(){
        return(
            <View style={styles.filedContainer}>
                <Inputs placeholder='Provinsi' label='Provinsi' />
                <Inputs placeholder='Kota/Kabupaten' label='Kota/Kabupaten' />
                <Inputs placeholder='Kecamatan' label='Kecamatan' />
                <Inputs placeholder='Alamat Lengkap' label='Alamat Lengkat' multiline={true} />
                <Inputs placeholder='Kode POS' label='Kode POS' />
            </View>
        )
    }
}

export default class ProfilePicker extends React.Component{
    static navigationOptions=({navigation})=>{
        return{
            title: navigation.getParam('title')
        }
    }
    constructor(props){
        super(props),
        profile = new ProfileData()
        this.state={
            gender:[
                {
                    id: '1',
                    label: 'Laki-Laki'
                },
                {
                    id: '2',
                    label: 'Perempuan'
                }
            ],
        }
    }

    onSelect(data){
        profile.selected(data)
        this.props.navigation.navigate('Profile')
    }

    renderList=({item})=>{
        return(
            <TouchableOpacity style={styles.option} onPress={()=>this.onSelect(item.label)}>
                <Text style={{color: color.g700}}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
    }
    render(){
        return(
            <View style={{backgroundColor: color.g100, flex: 1}}>
                <FlatList
                    data={this.state.gender}
                    renderItem={this.renderList}
                    keyExtractor={item=>item.id}
                    />
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
        fontWeight: 'normal',
        color: color.g500
    },
    input:{
        minHeight: 30,
        color: color.g700
    },
    containerInput:{
        marginBottom: 10,
        marginHorizontal: 0,
        paddingHorizontal: 0,
    },
    pickerWrap:{
        borderBottomWidth: 1,
        height: 48,
        marginBottom: 10,
        borderColor: color.g500
    },
    picker:{
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textField:{
        fontSize: 18,
        color: color.g700
    },
    option:{
        padding: 10,
        borderBottomWidth: 2,
        borderColor: color.g100,
        backgroundColor: '#fff'
    }
})