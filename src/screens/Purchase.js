import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, FlatList, StatusBar, Alert, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { Divider, Loading, Button, nonRp } from '../components/Common';
import styless, { color } from '../styles';
import Axios from 'axios';

const Purchase = (props) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    Purchase.navigationOptions = {
        // headerTransparent: true,
        headerTintColor: '#000',
        title: 'Riwayat'
    }

    renderData = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.list, styless.shadows]} onPress={() => props.navigation.navigate('BarangDetail', { data: item })}>
                <Text style={{ fontWeight: 'bold', color: color.g700 }}>{item.name}</Text>
                <Text style={{ fontWeight: 'bold', color: color.secondary }}>Rp. {nonRp(item.bid)}</Text>
            </TouchableOpacity>
        )
    }

    const getData=()=>{
        setLoading(true)
        Axios.get('/api/auth/bidme')
            .then(res => {
                setData(res.data)
                setLoading(false)
            }).catch(err => {
                Alert.alert('Error', 'Gagal mengambil data')
                setLoading(false)
            })
    }

    useEffect(function getData() {
        setLoading(true)
        Axios.get('/api/auth/bidme')
            .then(res => {
                setData(res.data)
                setLoading(false)
            }).catch(err => {
                Alert.alert('Error', 'Gagal mengambil data')
                setLoading(false)
            })
    }, [])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                        getData()
                    }}
                    style={{ zIndex: 10 }}
                    // progressViewOffset={100}
                />}
            style={{ backgroundColor: color.g100, flex: 1 }}>
            <StatusBar backgroundColor={'#fff'} barStyle='dark-content' />
            <Loading isActive={loading} />
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.bid_id.toString()}
                    renderItem={renderData} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 5,
        borderLeftWidth: 4,
        borderColor: color.primary

    }
})

export default Purchase