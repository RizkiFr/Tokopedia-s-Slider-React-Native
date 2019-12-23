import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../styles';
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation';

class SearchBox extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <TextInput placeholder='Cari barang impian kamu...' style={styles.input} placeholderTextColor={color.g300} />
                <View style={styles.btn}>
                    <TouchableOpacity>
                        <Ionicons name='ios-search' color={this.props.height>30?color.g300:color.g100} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
    },
    input:{
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        height: 30,
        padding: 5,
        margin: 10,
        color: 'grey',
        borderColor: color.g100,
        backgroundColor: color.g100
    },
    btn:{
        flex: 0,
        margin: 10,
        marginLeft: 0,
    }
})

// const mapStateToProps = state => {
//     return {
//         todo: state.todolist.todo
//     }
// }

// export default withNavigation(connect(mapStateToProps))
export default SearchBox