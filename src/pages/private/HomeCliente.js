import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

const HomeCliente = (props) => {
    const cliente = props.navigation.getParam('usuario');
 
    return (
        <View style = { styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Bem Vindo, Fulano</Text>

            <View>
                <Text style={{alignSelf: 'center'}}>Cardápio do dia:</Text>   
                <Button 
                    title='Ver'
                    buttonStyle={styles.button}
                />
            </View>

            <View>
                <Button 
                    title='+'
                    buttonStyle={styles.buttonPedido}
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