import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';

const PedidosCliente = (props) => {
    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Pedidos' />
            <View style={styles.containerPedidos}>
                <FlatList
                    data={[
                        {key: 'PEDIDO 1'},
                        {key: 'PEDIDO 2'},
                        {key: 'PEDIDO 3'},
                        {key: 'PEDIDO 4'}
                    ]}
                    renderItem={({ item }) => <Text style={styles.itemPedidos}>{item.key}</Text>}
                    />
            </View>
            <View>
                <TouchableOpacity style={styles.floatButton}>
                    <IconButton
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

const styles = StyleSheet.create({
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
    containerPedidos: {
		flexGrow: 5,
		marginTop: 100,
		alignItems: 'center',
		justifyContent: 'center'
    },
    itemPedidos: {
		padding: 5,
		textAlign: 'center',
		backgroundColor: '#228B22',
		alignSelf: 'center',
		fontSize: 18,
		color: '#F0F8FF',
		height: 44,
		marginVertical: 8,
		width: 200,
		borderRadius: 5,
		marginHorizontal: 10
    },
    floatButton:{
		borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 25,                                                    
        right: 25,
        height:70,
        backgroundColor:'#0f6124',
        borderRadius:100,
    },
    iconsDrawer: {
		paddingRight: 2
	}
});

export default PedidosCliente;