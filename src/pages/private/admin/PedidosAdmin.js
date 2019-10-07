import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const PedidosAdmin = (props) => {
    return (
        <View style={{ flexGrow: 1, backgroundColor: '#ffffff'}}>
            <MenuButton navigation={props.navigation} title="Pedidos" />
            <View style={ styles.mainContainer }> 
                <Text style={{alignSelf: 'center'}}>Pedidos</Text>
            </View>
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

const styles = StyleSheet.create({
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
});

export default PedidosAdmin;