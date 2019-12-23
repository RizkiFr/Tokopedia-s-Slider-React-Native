import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import styless, { color } from '../styles';
import 'moment/locale/id';
import CountDown from 'react-native-countdown-component';
import { Divider, Loading, nonRp } from '../components/Common';


export class LelangNow extends React.Component {

    renderItem = ({ item }) => {
        const width = Dimensions.get('window').width - 10
        const now = moment()
        const until = item.tgl_lelang.toString()+' '+item.waktu_lelang.toString()
        const count = moment(until).diff(now, 'second')
        return (
            <TouchableOpacity style={{ width: width / 3, padding: 5 }} onPress={()=>this.props.onPress(item)}>
                <View style={styles.card}>
                    <Image source={{ uri: item.url }} style={styles.image} />
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{item.name}</Text>
                        <Text style={{ color: '#FF5722', fontWeight: 'bold', fontSize: 12 }}>Rp. {nonRp(item.harga)}</Text>
                    </View>
                    <View style={{ padding: 5 }}>
                        <CountDown until={count} size={10} timeToShow={['H', 'M', 'S']}  digitTxtStyle={{color: color.g700}} digitStyle={{}} showSeparator />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 5 }}>Lelang berjalan</Text>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
                {/* <TouchableOpacity style={{alignItems: 'center'}}>
                    <Ionicons name='ios-arrow-down' size={30} color='#2196F3' />
                </TouchableOpacity> */}
            </View>
        )
    }
}

export class LeleangTumorrow extends React.Component {

    renderItem = ({ item }) => {
        const width = Dimensions.get('window').width - 10
        return (
            <TouchableOpacity style={{ width: width / 3, padding: 5 }} onPress={()=>this.props.onPress(item)} >
                <View style={styles.card}>
                    <Image source={{ uri: item.url }} style={styles.image} />
                    <View style={{ padding: 5 }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ color: '#FF5722', fontWeight: 'bold', fontSize: 12 }}>Rp. {nonRp(item.harga)}</Text>
                        <Text style={{ fontSize: 10, color: '#616161' }}>{moment().locale('id').to(`${item.tgl_lelang} ${item.waktu_lelang}`)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', margin: 5 }}>{this.props.title}</Text>
                <FlatList
                    data={this.props.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                />
                {/* <TouchableOpacity style={{alignItems: 'center'}}>
                    <Ionicons name='ios-arrow-down' size={30} color='#2196F3' />
                </TouchableOpacity> */}
            </View>
        )
    }
}

const width = Dimensions.get('window').width - 10

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    card: {
        width: (width / 3) - 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 5,
        borderRadius: 5,
        backgroundColor: '#fff'
    },
    image: {
        width: (width / 3) - 10,
        height: ((width / 3) - 10) / 1.5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    }
})

const DATA = [
    {
        id: '1',
        title: 'Coffeemate Signature',
        price: '12.0000',
        shop: 'Coffeemate Shop',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuT2lJXQKYpDZTbuibWvxGBiDhkvIeGbxhtmQBmTtZzmlIvhk9A'
    },
    {
        id: '2',
        title: 'Double Espresso',
        price: '15.0000',
        shop: 'Spesies Coffee',
        uri: 'https://wallpapersite.com/images/pages/pic_w/2488.jpg'
    },
    {
        id: '3',
        title: 'Coffee Late',
        price: '13.0000',
        shop: 'Waroeng Bako',
        uri: 'http://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9'
    },
    {
        id: '4',
        title: 'Coffee Late',
        price: '13.0000',
        shop: 'Waroeng Bako',
        uri: 'http://images.unsplash.com/photo-1525629545813-e4e7ba89e506?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9'
    },
];

const DATASHOP = [
    {
        id: '1',
        title: 'Coffeemate Shop',
        address: 'Cibiru, Bandung',
        uri: 'https://image.dhgate.com/0x0s/f2-albu-g3-M00-8D-71-rBVaHVn6wz-ABzLkAALq-rnHDsk096.jpg/coffee-letters-wallpaper-custom-3d-wall-mural.jpg'
    },
    {
        id: '2',
        title: 'Spesies Coffee',
        address: 'Cibiru, Bandung',
        uri: 'https://ae01.alicdn.com/kf/HTB1LtDfboLrK1Rjy1zbq6AenFXaE/beibehang-Custom-wallpaper-3D-mural-hand-painted-European-and-American-coffee-shop-background-wall-living-room.jpg'
    },
    {
        id: '3',
        title: 'Waroeng Bako',
        address: 'Cibiru, Bandung',
        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ817ybAl87-1jDYb_obzFp2XKN6IVmCTB2wCAeXlBdl1AX15Rb-w'
    },
];