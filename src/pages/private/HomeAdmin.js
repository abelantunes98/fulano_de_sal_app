import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import styles from '../../styles/styles';

const HomeAdmin = (props) => {
    const administrador = props.navigation.getParam('usuario');
    return (
        <ScrollView style={ styles.mainContainer }>
            <Text>Pedidos</Text>
            <Text>Hello, {administrador.nome}!</Text>
        </ScrollView>
    )
}

export default HomeAdmin;