import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const PedidosCliente = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <View style = {styles.containerPedidos}>
                <FlatList
                    data={[
                        {key: 'PEDIDO 1'},
                        {key: 'PEDIDO 2'},
                        {key: 'PEDIDO 3'},
                        {key: 'PEDIDO 4'}
                    ]}
                    renderItem={({item}) => <Text style={styles.itemPedidos}>{item.key}</Text>}
                    />
            </View>
            <View>
                <TouchableOpacity style={styles.floatButton}>
                    <IconMaterial
                        name='plus'
                        size={20}
                        color='#ffffff'
                        style={ styles.iconsDrawer }
                        />
                </TouchableOpacity>
            </View>  
        </View>
    )
}

PedidosCliente.navigationOptions = {
    drawerLabel: 'Pedidos',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='food'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default PedidosCliente;