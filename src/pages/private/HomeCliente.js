import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';

const HomeCliente = (props) => {
    const cliente = props.navigation.getParam('usuario');
 
    return (
        <View style = { styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>HomeCliente</Text>
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