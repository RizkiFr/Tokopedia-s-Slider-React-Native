import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { PhotoProfile, ProfileData, FullAddress } from '../components/ProfileComponents'

export default class Profile extends React.Component{
    static navigationOptions={
        header: null
    }
    constructor(props){
        super(props)
    }

    toNavigate=(type)=>{
        this.props.navigation.navigate(type, {title: 'naon'})
    }

    render(){
        return(
            <ScrollView>
                <PhotoProfile />
                <ProfileData type={this.toNavigate} />
                <FullAddress />
            </ScrollView>
        )
    }
}