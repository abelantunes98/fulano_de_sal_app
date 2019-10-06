import React, {useState, useEffect} from 'react';
import { 
    KeyboardAvoidingView,
    View,
    ScrollView,
    ProgressBarAndroid,
    StyleSheet,
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';

const CadastroMarmita = (props) => {
    const [load, setLoad] = useState(false);
    return (
      <View></View>
    );
};

const styles = StyleSheet.create({
	mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
	},
	infoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	inforCard: {
		width: '97%'
	},
	text: {
		fontFamily: 'Oswald-Regular',
		fontSize: 16,
		paddingTop: 10
	},
	icons: {
		paddingRight: 10
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	button: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
	},
	titleStyle:{
        fontFamily: 'Roboto-Thin'
	},
	buttonCancel: {
		marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    btnEsqueceuSenha: {
        marginTop: 10,
	},
});

export default CadastroMarmita;