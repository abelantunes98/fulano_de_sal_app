import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';

const PedidosAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }> 
            <MenuButton navigation={props.navigation}/>
            <Text>Pedidos</Text>
            <View>
                {
                    //Inserir aqui os componentes de pedidos
                }
            </View>
        </View>
    )
}

export default PedidosAdmin;