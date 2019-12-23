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
            <Image source={{uri: item}} style={{width: widthScreen - 60, height: 100, borderRadius: 10, backgroundColor: color.g300}} />
        );
    }
 
    render () {
        const data = [
            'https://blog.spiralytics.com/hubfs/Spiralytics%20Info2-Google%20Ad%20Placement-Banner.png',
            'http://www.downloadallwallpapers.com/ssgrouplogin/images/6357854691569060422Google_Logo_Texture_Background_Brand_Banner_Graphics_Design_Art_HD_Wallpaper_[DownloadAllWallpapers.com].jpg',
            'https://i1.wp.com/www.splendidcomms.com/wp-content/uploads/2019/01/google-wallpaper-9.jpg?quality=80&strip=all'
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