import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';

const HomeCliente = (props) => {
    const cliente = props.navigation.getParam('usuario');
   
    return (
        <View>
            <Text >Hello {cliente.nome}!</Text>
        </View>
    )
}

export default HomeCliente;