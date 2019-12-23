import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, StatusBar, Platform, PermissionsAndroid, Modal, Image, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { color } from '../styles';
import { Input } from 'react-native-elements';
import { Button } from '../components/Common';
import CameraRollPicker from 'react-native-camera-roll-picker';
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from 'axios';
import moment from 'moment'

class Inputs extends React.Component {
    render() {
        return (
            <Input
                labelStyle={styles.label}
                placeholderTextColor={color.g300}
                inputStyle={styles.input}
                containerStyle={styles.containerInput}
                inputContainerStyle={{ borderColor: color.g500 }}
                {...this.props}
            />
        )
    }
}

const addLelang = (props) => {

    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState([])
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [harga, setHarga] = useState('')
    const [tgl, setTgl] = useState('')
    const [waktu, setWaktu] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [datePicker, setDatePicker] = useState(false)
    const [timePicker, setTimePicker] = useState(false)

    addLelang.navigationOptions = {
        // headerTransparent: true,
        headerTintColor: '#000',
        title: 'Lelang Baru'
    };

    const openLibrary = async () => {
        if (Platform.OS = 'ios') {
            setModal(true)
        } else if (Platform.OS = 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    'title': 'Access Storage',
                    'message': 'Access Storage for the pictures'
                });
            if (granted) {
                setModal(true)
            } else {
                alert("Anda tidak dapat mengunggah foto jika akses tidak di izinkan, silahkan izinkan akses melalui pengaturan")
            }
        }
    }

    const handleDatePicker = (x) => {
        setTgl(moment(x).format('YYYY-MM-DD'))
        setDatePicker(false)
    }
    const handleTimePicker = (x) => {
        setWaktu(moment(x).format('HH:mm'))
        setTimePicker(false)
        console.log(moment(x).format('HH:mm'))
    }

    const postBarang = () => {
        setLoading(true)
        let localUri = url;
        let filename = localUri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        formData.append('url', { uri: localUri, name: filename, type });
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('harga', harga);
        formData.append('tgl_lelang', tgl);
        formData.append('waktu_lelang', waktu);
        console.log(formData)
        axios.post('/api/auth/barang', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(ress => {
            console.log(ress)
            // setLoading(false)
            props.navigation.navigate('Home')
        }).catch(err => {
            Alert.alert('Error', 'Kesalahan teknis')
            setLoading(false)
        })
    }

    return (
        <ScrollView style={styles.wrap}>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
            <Inputs valeu={name} onChangeText={(text) => setName(text)} placeholder='iPhone 6s 64GB' label='Judul' />
            <Inputs valeu={desc} onChangeText={(text) => setDesc(text)} placeholder='Fullset No Minus' label='Deskripsi' />
            <Inputs valeu={harga} onChangeText={(text) => setHarga(text)} keyboardType='number-pad' placeholder='Rp. 3.000.000' label='Harga Awal' />
            <TouchableOpacity onPress={() => setDatePicker(true)}>
                <Inputs value={tgl} editable={false} placeholder='2019-11-30' label='Tanggal Lelang' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setTimePicker(true)}>
                <Inputs editable={false} value={waktu} placeholder='10:00' label='Waktu Mulai' />
            </TouchableOpacity>
            <View style={{ padding: 10, alignItems: 'center' }}>
                <Image source={{ uri: (url) }} style={{ width: 100, height: 100 }} />
            </View>
            <Button title={'Upload Gambar'} style={{ backgroundColor: '#fff', borderWidth: 2, borderColor: color.primary }} textStyle={{ color: color.primary }} onPress={() => openLibrary()} />
            <Button loading={loading} disabled={loading} title={'Simpan'} onPress={() => openLibrary()} onPress={() => postBarang()} />

            <DateTimePicker
                isVisible={datePicker}
                onConfirm={handleDatePicker}
                onCancel={() => setDatePicker(false)}
                mode='date'
            />
            <DateTimePicker
                isVisible={timePicker}
                onConfirm={handleTimePicker}
                onCancel={() => setTimePicker(false)}
                mode='time'
                is24Hour={true}
            />

            <Modal
                animationType="slide"
                transparent={false}
                visible={modal}
                onRequestClose={() => {
                    console.log('close')
                }}>
                <CameraRollPicker selected={selected} callback={(foto) => setUrl(foto[0].uri)} selectSingleItem />
                <View style={{ padding: 10 }}>
                    <Button title="Pilih" onPress={() => { setModal(false); setSelected([]) }} />
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: 'normal',
        color: color.g500
    },
    wrap: {
        padding: 10
    }
})

export default addLelang;