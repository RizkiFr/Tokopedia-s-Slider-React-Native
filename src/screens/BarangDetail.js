import React, { useState, useEffect } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, Platform, StatusBar, Alert, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, RefreshControl, Linking } from 'react-native';
import { Header } from 'react-navigation';
import { Divider, Loading, Button, nonRp, fromRp } from '../components/Common';
import styless, { color } from '../styles';
import Axios from 'axios';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';
import 'moment/locale/id';

renderBider = ({ item }) => {
    return (
        <TouchableOpacity
            onPress={() => toWhatsapp(item)}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                borderBottomWidth: 1,
                borderColor: color.g500
            }}>
            <Text>{item.nama_user}</Text>
            <Text>Rp. {nonRp(item.bid)}</Text>
        </TouchableOpacity>
    )
}

toWhatsapp = (data) => {
    let number = data.whatsapp
    Linking.openURL(`whatsapp://send?text=Assalamualaikum&phone=62${parseInt(number)}`)
    console.log('62'+parseInt(number))
}

const BarangDetail = (props) => {

    const [data, setData] = useState(props.navigation.getParam('data'))
    const [bided, setBided] = useState([])
    const [bid, setBid] = useState('')
    const [loading, setLoading] = useState(false)
    const [btn, setBtn] = useState(true)
    const [curentBid, setCurentBid] = useState(0)
    const [enable, setEnable] = useState(true)
    const [count, setCount] = useState(0)

    BarangDetail.navigationOptions = {
        // headerTransparent: true,
        headerTintColor: '#000',
        title: 'Lelangku'
    };

    const postBid = async () => {
        setLoading(true)
        Keyboard.dismiss()
        await Axios.post('/api/auth/bid', {
            id_barang: data.id,
            bid: bid
        }).then(res => {
            console.log(res)
            getBid(data.id)
        }).catch(err => {
            Alert('Gagal', 'Gagal bib')
        })
        setBid('')
        setLoading(false)
    }

    const getTime = (x) => {
        const now = moment()
        const until = x.tgl_lelang.toString() + ' ' + x.waktu_lelang.toString()
        const count = moment(until).diff(now, 'second')
        if (count > 0) {
            setCount(count)
        } else {
            setEnable(false)
        }
        // return count
    }

    const getBid = (id) => {
        Axios.get(`/api/auth/bid/${id}`)
            .then(res => {
                setBided(res.data)
                setCurentBid(res.data[0].bid)
                console.log(res)
            }).catch(err => {
                // Alert.alert('Error', 'Gagal mengambil data bider')
                console.log(err)
            })
    }


    useEffect(function isEnable() {
        const bids = parseInt(bid)
        const curentBids = parseInt(curentBid)
        const x = bids > curentBids
        setBtn(x)
        console.log(x)
    }, [bid])

    useEffect(() => {
        getBid(data.id)
        getTime(data)
    }, [])


    return (
        <View style={{ backgroundColor: color.g100, flex: 1 }}>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
            <Image source={{ uri: data.url }} style={styles.img} />
            <View style={styles.wrapDesc}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.title}>{data.name}</Text>
                        <Text style={styles.name}>{data.nama_user}</Text>
                    </View>
                    <View>
                        <CountDown
                            until={count}
                            onFinish={() => setEnable(false)}
                            size={15}
                            showSeparator
                            timeToShow={['H', 'M', 'S']}
                            digitTxtStyle={{ color: '#fff' }}
                            digitStyle={{ backgroundColor: color.primary, borderRadius: 5, padding: 2 }}
                        />
                    </View>
                </View>
                <Text style={styles.desc}>{data.desc}</Text>
            </View>
            <Divider />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={bided}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderBider}
                />
            </View>
            <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={10}>
                <View style={{ backgroundColor: '#fff', height: 70, padding: 10, flexDirection: 'row' }}>
                    <TextInput value={bid ? nonRp(bid) : bid} onChangeText={(text) => setBid(fromRp(text))} keyboardType='number-pad' style={styles.input} placeholder='Masukan Jumlah Bid' />
                    {
                        enable ? <Button loading={loading} disabled={!btn} onPress={postBid} title='Bid' style={{ width: 70, marginLeft: 20 }} /> : null
                    }
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
    img: {
        width: width,
        height: 200,
        // marginTop: -(Platform.OS == 'ios' ? Header.HEIGHT : Header.HEIGHT + 8)
    },
    wrapDesc: {
        padding: 10,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: color.g700
    },
    name: {
        fontWeight: 'bold',
        color: color.g700
    },
    desc: {
        color: color.g700
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        flex: 2,
        fontSize: 18,
        color: color.g700
    }
})

export default BarangDetail;