import { StyleSheet, Dimensions } from 'react-native';
import { Header } from 'react-navigation';

export const color = {
    primary : '#2196F3',
    p100: '#BBDEFB',
    p200: '#90CAF9',
    p300: '#64B5F6',
    p400: '#42A5F5',
    p500: '#2196F3',
    p600: '#1E88E5',
    p700: '#1976D2',
    p800: '#1565C0',
    p900: '#0D47A1',
    secondary: '#FF5722',
    s100: '#FFCCBC',
    s200: '#FFAB91',
    s300: '#FF8A65',
    s400: '#FF7043',
    s500: '#FF5722',
    s600: '#F4511E',
    s700: '#E64A19',
    s800: '#D84315',
    s900: '#BF360C',
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