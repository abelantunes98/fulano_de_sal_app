import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const PedidosAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }> 
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Pedidos</Text>
        </View>
    )
}


PedidosAdmin.navigationOptions = {
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

export default PedidosAdmin;