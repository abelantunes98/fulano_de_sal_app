import {StyleSheet} from 'react-native';

// estilos para a Home Cliente
const stylesHC = StyleSheet.create({
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'space-between',
		backgroundColor: '#ffffff',
		flexDirection: 'column',

    },
    containerCardapio:{
        height: 50,
        justifyContent: 'space-between',

    },
    buttonPedido: {
		borderRadius: 50,
		width: 180,
        height: 60,
        fontSize: 40,
		backgroundColor: '#0f6124',
		alignSelf: 'center'
        
    },
    textTitle: {
        fontSize: 24,
        margin: 10,
        textAlign: 'center'
    },
    button: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
        alignSelf: "center"
	}

});

export {stylesHC};