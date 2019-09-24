import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';

const PedidosCliente = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>PedidosCliente</Text>
        </View>
    )
}

export default PedidosCliente;