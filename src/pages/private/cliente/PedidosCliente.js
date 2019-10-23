import React, { useState, useEffect } from 'react';
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
import { Card, Button } from 'react-native-elements';

const PedidosCliente = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
		loadRepositories();
    }, []);
    
    loadRepositories = async () => {
        let dat = [{data: '07/10/2019', idProduto: 'test', preco: 5.0, status: 'ok'}, 
        {data: '08/10/2019', idProduto: 'test2', preco: 5.0, status: 'pendente'},
        {data: '08/10/2019', idProduto: 'test3', preco: 5.0, status: 'erro'}];
        setData(dat);
	};

    function defineIconeStatus(status) {
        if(status == 'ok') {
            return 'check-circle-o';
        } else if(status == 'pendente'){
            return 'question-circle';
        } else {
            return 'exclamation-circle';
        }
    }

    function defineCorStatus(status) {
        if(status == 'ok') {
            return '#32CD32';
        } else if(status == 'pendente'){
            return '#FFFF00';
        } else {
            return '#8B0000';
        }
    }

    renderItem = ({ item }) => (
		<Card containerStyle={styles.listItem}>
			<View>
				<View style={styles.buttons}>
					<Button 
						buttonStyle={styles.button}
						icon={
							<IconButton
								name='expand'
								size={15}
								color='#000'
								style={styles.iconsDrawer}
							/>
						}
					/>
				</View>
                <View style={styles.statusPosition}>
                    <Button 
						buttonStyle={styles.status}
						icon={
							<IconButton
								name={defineIconeStatus(item.status)} 
								size={70}
								color={defineCorStatus(item.status)}
								style={styles.iconsDrawer}
							/>
						}
					/>
                </View>
				<View>
					<Text  style={styles.dados}>{item.data}</Text>
                    <Text  style={styles.dados}>Valor: R$ {item.preco}</Text>
				</View>
			</View>
		</Card>
	);

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Pedidos' />
            <View style={{paddingBottom:70}}>
                <FlatList
               	   	style={{ marginTop: 10 }}
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.idProduto.toString()}
                />
            </View>
                <TouchableOpacity 
                    style={styles.floatButton}
                    onPress={()=>{props.navigation.navigate('Novo')}}
                >
                    <IconButton
                        name='plus'
                        size={20}
                        color='#ffffff'
                        style={ styles.iconsDrawer }
                    />
                </TouchableOpacity>
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
    list: {
		paddingTop: 10,
		paddingHorizontal: 16
    },
    dados: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
	button: {
		backgroundColor: '#FFF',
		borderRadius: 100,
		height: 30,
		width: 30,
		marginLeft: 18,
		alignItems: 'center',
		justifyContent: 'center',
    },
	buttons: {
		flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    status: {
        flex: 1,
		height: 70,
		width: 80,
        backgroundColor: '#FFF'
    },
    statusPosition: {
        marginRight: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
	listItem: {
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	},
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    floatButton: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		position: 'absolute',
		bottom: 10,
		right: 25,
		height: 70,
		backgroundColor: '#0f6124',
		borderRadius: 100
	},
    iconsDrawer: {
		paddingRight: 2
    }
});

export default PedidosCliente;