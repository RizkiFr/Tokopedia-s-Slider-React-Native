import React from 'react';
import { ScrollView, StatusBar, Alert, RefreshControl } from 'react-native';
import { PhotoProfile, ProfileData, FullAddress } from '../components/ProfileComponents';
import { Divider, Loading, Button, nonRp } from '../components/Common';
import { LelangNow, LeleangTumorrow } from '../components/Lelang';
import Axios from 'axios';


export default class Profile extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props),
            this.state = {
                data: [],
                profile: {},
                loading: false,
                refreshing: false
            }
    }

    toNavigate = (type) => {
        this.props.navigation.navigate(type, { title: 'naon' })
    }

    componentDidMount() {
        this.getMyBarang()
        this.getProfile()
    }

    getMyBarang = () => {
        this.setState({ loading: true })
        Axios.get('/api/auth/mybarang')
            .then(res => {
                this.setState({ data: res.data })
                this.setState({ loading: false })
            }).catch(err => {
                Alert.alert('Error', err)
                this.setState({ loading: false })
            })
    }

    getProfile = () => {
        Axios.get('/api/auth/user')
            .then(res => {
                this.setState({ profile: res.data })
            }).catch(err => {
                Alert.alert('Error', err)
            })
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.getProfile();
                            this.getMyBarang()
                        }}
                        style={{ zIndex: 10 }}
                        // progressViewOffset={100}
                    />}>
                <Loading isActive={this.state.loading} />
                <PhotoProfile />
                <ProfileData type={this.toNavigate} data={this.state.profile} />
                <Divider />
                <LeleangTumorrow data={this.state.data} title='Lelang Saya' onPress={(data) => this.props.navigation.navigate('BarangDetail', { data: data })} />
            </ScrollView>
        )
    }
}