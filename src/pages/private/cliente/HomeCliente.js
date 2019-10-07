import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const HomeCliente = (props) => {
    return (
        <View style = { styles.mainContainer }>
            <MenuButton navigation={props.navigation} title='Home' />
            <Text 
                style={ { fontSize: 24,
                            marginTop: 30,
                            textAlign: 'center'
                }}>
                Bem Vindo
            </Text>

            <View style={styles.containerCardapio}>
                <Text style={ styles.textTitle }>Cardápio do dia:</Text>   
                <Button 
                    title='Ver'
                    buttonStyle={styles.button}
                />
            </View>

            <View style={{height: 100}}>
                <Button 
                    title='Fazer Pedido'
                    titleStyle={{fontSize: 18}}
                    buttonStyle={styles.buttonPedido}
                    onPress={()=>{ props.navigation.navigate('PedidosCliente') }}
                />
            </View>                          
        </View>
    )

}

// usando o static no componente funcional || Propriedade estática
HomeCliente.navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon:({focused, tintColor}) => (
        <IconFont
            name='home'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

const styles = StyleSheet.create({
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
        alignSelf: 'center'
    },
    iconsDrawer: {
		paddingRight: 2
	},
});

export default HomeCliente;