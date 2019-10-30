import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { color } from '../styles';
 
const widthScreen = Dimensions.get('screen').width

export default class Slider extends React.Component {
    constructor(props){
        super(props),
        this.state={
            activeIndex: 0
        }
    }

    toParent=(uri)=>{
        this.props.imgUri(uri)
    }

    _renderItem ({item, index}) {
        return (
            <Image source={{uri: item}} style={{width: widthScreen - 60, height: 100, borderRadius: 10}} />
        );
    }
 
    render () {
        const data = [
            'https://marketing.ruangguru.com/hubfs/Hubspot%20Banner%20Web_1280x450-Ads%20RLO%20(1).jpg',
            'https://cdn2.hubspot.net/hubfs/2828691/RK_-_LifeatRuangguru_-_Agus-01.png',
            'https://i0.wp.com/wirahadie.com/wp-content/uploads/2019/09/les.png?resize=845%2C475&ssl=1'
        ]
        return (
            <>
                <View style={{marginTop: 20}}>
                    <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={data}
                            loop
                            autoplay
                            renderItem={this._renderItem}
                            sliderWidth={widthScreen}
                            itemWidth={widthScreen-60}
                            inactiveSlideOpacity={1}
                            onSnapToItem={index=>this.toParent(data[index], this.setState({activeIndex: index}))}
                        />
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={this.state.activeIndex}
                        containerStyle={{paddingVertical: 10}}
                        dotColor={color.primary}
                        inactiveDotColor={color.g300}
                        />
                </View>
            </>
        );
    }
}