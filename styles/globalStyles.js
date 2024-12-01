import { StyleSheet, Dimensions } from 'react-native';

const { width, } = Dimensions.get('window');

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        marginTop: 50,
    },
    mapContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    logoContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginTop: 0,
    },
    logo: {
        width: width * 0.5,
        height: width * 0.2,
        marginRight: 10,
    },
    titleText: {
        fontWeight: 'bold',
        color: '#000',
    },
    title: {
        fontSize: 24,
    },
    formContainer: {
        padding: 10,
        marginTop: 20,
        width: '100%',
    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
    },
    input: {
        color: '#FFFFFF',
    },
});

export default globalStyles;
