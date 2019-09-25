import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const PedidosCliente = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>PedidosCliente</Text>
        </View>
    )
}

PedidosCliente.navigationOptions = {
    drawerLabel: 'Pedidos',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='format-list-checks'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default PedidosCliente;