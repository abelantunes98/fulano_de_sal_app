import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

import { stylesHC } from '../../../styles/homeClienteStyle'

const HomeCliente = (props) => {
    const cliente = props.navigation.getParam('usuario');
 
    return (
        <View style = { stylesHC.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={ { fontSize: 24,
                            marginTop: 30,
                            textAlign: 'center'
                            } }>Bem Vindo</Text>

            <View style={stylesHC.containerCardapio}>
                <Text style={ stylesHC.textTitle }>Cardápio do dia:</Text>   
                <Button 
                    title='Ver'
                    buttonStyle={stylesHC.button}
                />
            </View>

            <View style={{height: 100}}>
                <Button 
                    title='Fazer Pedido'
                    buttonStyle={stylesHC.buttonPedido}
                    onPress={()=>{props.navigation.navigate('PedidosCliente')}}
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

export default HomeCliente;