import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';

export default class TryOut extends React.Component{
    constructor(props){
        super(props),
        this.state={
            indexQuestion: 0
        }
    }

    renderQuestion=({item, index})=>{
        return(
            <View style={{height: 100, width: Dimensions.get('screen').width, borderWidth: 1}}>
                <Text>{item.question}</Text>
            </View>
        )
    }
    navIndex=({item, index})=>{
        return(
            <TouchableOpacity onPress={()=>this.FlatlistRef.scrollToIndex({index: index})} style={{width: 50, height: 30, backgroundColor: this.state.indexQuestion == index? 'green' : 'red', borderWidth: 1, borderColor: '#fff'}}>
                <Text>{index}</Text>
            </TouchableOpacity>
        )
    }

    onView=({viewableItems, changed})=>{
        this.setState({indexQuestion: viewableItems[0].index})
    }

    goToIndex=()=>{
        this.FlatlistRef.scrollToIndex({ index: this.state.indexQuestion+1 })
    }

    render(){
        data=[
            {
                question: 'Soal 1'
            },
            {
                question: 'Soal 2'
            },
            {
                question: 'Soal 3'
            },
            {
                question: 'Soal 4'
            },
            {
                question: 'Soal 5'
            },
        ]
        return(
            <View>
                <FlatList
                    data={data}
                    renderItem={this.navIndex}
                    horizontal
                    keyExtractor={(item)=>item.question}
                />
                <FlatList
                    data={data}
                    renderItem={this.renderQuestion}
                    horizontal
                    ref={(ref)=>{this.FlatlistRef = ref;}}
                    scrollEnabled={false}
                    keyExtractor={(item)=>item.question}
                    onViewableItemsChanged={this.onView}
                />
                <TouchableOpacity style={{padding: 10, backgroundColor: 'red'}} onPress={()=>this.goToIndex()}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}