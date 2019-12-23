import React from 'react';
import { View, Dimensions, StyleSheet, Image, Text, Platform } from 'react-native';

export class CardName extends React.Component{
    render(){
        return(
            <View style={styles.cardName}>
                <Image source={{uri: 'https://avatars0.githubusercontent.com/u/33630790?s=400&v=4'}} style={styles.ava} />
                <View style={styles.texts}>
                    <Text style={{fontWeight: 'bold', color: '#616161'}}>Hi, Rizki Fr</Text>
                    {/* <Text style={{fontSize: 12, color: '#616161'}}>Ngopi dimana hari ini? </Text> */}
                </View>
                <View style={styles.progress}>
                    <View style={{padding: 5}}>
                        {/* <Text style={{fontSize: 10, color: '#616161'}}>Wallet</Text> */}
                        {/* <Text style={{fontWeight: 'bold', fontSize: 18, color: '#2196F3'}}>72K</Text> */}
                    </View>
                    {/* <Ionicons name='ios-rocket' size={25} color='#616161' /> */}
                </View>
            </View>
        )
    }
}

const widthScreen = Dimensions.get('screen').width

const styles = StyleSheet.create({
    cardName:{
        height: 50,
        width: widthScreen-20,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 2,
        padding: 5,
        flexDirection: 'row',
        marginTop: Platform.OS == 'ios'? -50 : -30
    },
    ava:{
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#eee',
        flex: 0
    },
    texts:{
        flex: 2,
        marginLeft: 10,
        justifyContent: 'center'
    },
    progress:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 10
    }
})