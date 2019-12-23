import React from 'react';
import { View, ScrollView, Text, ImageBackground, StyleSheet, Image, StatusBar, Platform, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import Slider from '../components/Slider';
import { CardName } from '../components/CardName';
import SearchBox from '../components/SearcBox';
import { Header } from 'react-navigation';
import { Divider, Loading, nonRp } from '../components/Common';
import { LelangNow, LeleangTumorrow } from '../components/Lelang';
import Axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';

export default class Home extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        }
    }
    constructor(props) {
        super(props),
            this.state = {
                imgUri: 'https://blog.spiralytics.com/hubfs/Spiralytics%20Info2-Google%20Ad%20Placement-Banner.png',
                imageHeight: 165,
                marginTop: -50,
                yAxis: 0,
                userLoading: false,
                barangLoading: false,
                comingLoading: false,
                user: {},
                barang: [],
                coming: [],
                refreshing: false
            }
    }

    componentDidMount() {
        this.getUser()
        this.getBarang()
        this.getBarangComing()
    }

    getUser = async () => {
        this.setState({ userLoading: true })
        await Axios.get('/api/auth/user')
            .then(res => {
                this.setState({ user: res.data })
            }).catch(err => {
                console.log(err)
            })
        this.setState({ userLoading: false })

    }
    getBarang = async () => {
        this.setState({ barangLoading: true })
        await Axios.get('/api/auth/barang')
            .then(res => {
                this.setState({ barang: res.data })
            }).catch(err => {
                console.log(err)
            })
        this.setState({ barangLoading: false })
    }
    getBarangComing = async () => {
        this.setState({ comingLoading: true })
        await Axios.get('/api/auth/coming')
            .then(res => {
                this.setState({ coming: res.data })
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        this.setState({ comingLoading: false })

    }

    setBackground = (data) => {
        this.setState({ imgUri: data })
    }
    handleScroll = (event) => {
        // console.log(event.nativeEvent.contentOffset.y);
        const yAxis = event.nativeEvent.contentOffset.y
        if (yAxis >= 0) {
            imageHeight = 165
            this.setState({ imageHeight, marginTop: -50 })
        }
        else if (yAxis < 0) {
            imageHeight = Math.abs(yAxis) + 265
            this.setState({ imageHeight, marginTop: yAxis - 150 })
        }
        this.setState({ yAxis })
    }

    navigate = (data) => {
        this.props.navigation.navigate('BarangDetail', { data })
    }

    render() {
        let loading = this.state.userLoading && this.state.barangLoading && this.state.comingLoading
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden translucent backgroundColor='transparent' barStyle={this.state.yAxis > 30 ? 'dark-content' : 'light-content'} />
                <View style={[styles.header, this.state.yAxis > 50 ? styles.shadow : null, { backgroundColor: `rgba(255,255,255,${this.state.yAxis > 50 ? 1 : (this.state.yAxis / 50)})` }]}>
                    <SearchBox height={this.state.yAxis} />
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={()=>{
                                this.getBarang();
                                this.getBarangComing()
                                this.getUser()
                            }}
                            style={{ zIndex: 10 }}
                            progressViewOffset={100}
                        />}
                    style={styles.container} onScroll={this.handleScroll} scrollEventThrottle={8} showsVerticalScrollIndicator={false}>
                    <Image source={{ uri: this.state.imgUri }} style={[styles.imageStyle, { height: Platform.OS == 'ios' ? this.state.imageHeight : 95, marginTop: Platform.OS == 'ios' ? this.state.marginTop : 0 }]} blurRadius={30} />
                    <CardName name={this.state.user.name} addLelang={() => this.props.navigation.navigate('AddLelang')} />
                    <Slider imgUri={this.setBackground} />
                    <Divider />
                    <LelangNow data={this.state.barang} onPress={this.navigate} />
                    <Divider />
                    <LeleangTumorrow data={this.state.coming} onPress={() => console.log('press')} title={'Lelang akan datang'} />
                    <View style={{ height: 200 }}></View>
                </ScrollView>
                <Loading isActive={loading} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS == 'ios' ? -Header.HEIGHT : -(Header.HEIGHT + 8)
    },
    header: {
        height: Platform.OS == 'ios' ? Header.HEIGHT : Header.HEIGHT + 8,
        zIndex: 1,
        paddingTop: 15
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    imageStyle: {
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        transform: [{ scaleX: 1.5 }],
        width: null
    },
})