import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

export const color = {
    primary : '#FF5722',
    p100: '#FFCCBC',
    p200: '#FFAB91',
    p300: '#FF8A65',
    p400: '#FF7043',
    p500: '#FF5722',
    p600: '#F4511E',
    p700: '#E64A19',
    p800: '#D84315',
    p900: '#BF360C',
    secondary: '#2196F3',
    s100: '#BBDEFB',
    s200: '#90CAF9',
    s300: '#64B5F6',
    s400: '#42A5F5',
    s500: '#2196F3',
    s600: '#1E88E5',
    s700: '#1976D2',
    s800: '#1565C0',
    s900: '#0D47A1',
    grey: '#9E9E9E',
    g100: '#F5F5F5',
    g200: '#EEEEEE',
    g300: '#E0E0E0',
    g400: '#BDBDBD',
    g500: '#9E9E9E',
    g600: '#757575',
    g700: '#616161',
    g800: '#424242',
    g900: '#212121'
};

export const height = Dimensions.get('window').height-(80);

export default StyleSheet.create({
    bottom:{
        flex: 0,
        position: 'absolute',
        height: 80,
        bottom: 0,
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#fff',
        padding: 10
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 1,  
        elevation: 1,
    },
    shadows:{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 2,
    },
})