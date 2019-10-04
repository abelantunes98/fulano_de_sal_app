import {StyleSheet}from   'react-native';

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
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	buttonPedido: {
		borderRadius: 50,
		width: 60,
		height: 60,
		backgroundColor: '#32CD32',
		alignSelf: "center",
		marginRight: 10,
		marginBottom: 20,
	},
	titleButtonStyle: {
		fontSize: 25,
		textAlign: "center",
		color: '#ffffff'
	},

	button: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
	},
	buttonCancel: {
		marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
    },
    btnEsqueceuSenha: {
        marginTop: 10,
	},
	containerPedidos: {
		flexGrow: 5,
		marginTop: 100,
		alignItems: "center",
		justifyContent: "center"
	},
	itemPedidos: {
		padding: 5,
		textAlign: "center",
		backgroundColor: '#228B22',
		alignSelf: "center",
		fontSize: 18,
		color: '#F0F8FF',
		height: 44,
		marginVertical: 8,
		width: 200,
		borderRadius: 5,
		marginHorizontal: 10
	},
	text: {
		fontFamily: 'Oswald-Regular',
		fontSize: 16,
		paddingTop: 10
	},
	icons: {
		paddingRight: 10
	},
	iconsDrawer: {
		paddingRight: 2
	},
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    titleStyle:{
        fontFamily: 'Roboto-Thin'
	},
	listItem: {
		backgroundColor: '#EEE',
		marginTop: 20,
		padding: 30
	},
	list: {
		paddingHorizontal: 20,
	},
	floatButton:{
		borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 25,                                                    
        right: 25,
        height:70,
        backgroundColor:'#0f6124',
        borderRadius:100,
	}
});

export {styles};