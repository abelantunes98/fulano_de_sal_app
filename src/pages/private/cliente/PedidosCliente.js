import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';
import { Card, Button } from 'react-native-elements';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import { USER_CURRENTY } from '../../../services/key';


const PedidosCliente = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        loadRepositories();
    }, []);

    loadRepositories = async () => {
        // Para não listar nada caso não tenha pedidos.
        let dat = [];
        try {
            let userDados = await find(USER_CURRENTY);
            const response = await api.get('/protegido/pedido/listarCliente/',
                { headers: { Authorization: userDados.token },
                  params:  { email: userDados.email }});

            if (response.status == 200) {
                dat = response.data.pedidos;
            }
        } catch {
            ToastAndroid.show('Não foi possível carregar seus pedidos!', ToastAndroid.SHORT);
        }
        setData(dat);
    };

    function defineIconeStatus(status) {
        if (status) {
            return 'check-circle-o';
        } else {
            return 'question-circle';
        }
    }

    function defineCorStatus(status) {
        if (status) {
            return '#32CD32';
        } else {
            return '#FFFF00';
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
                                name={defineIconeStatus(item.confirmado)}
                                size={70}
                                color={defineCorStatus(item.confirmado)}
                                style={styles.iconsDrawer}
                            />
                        }
                    />
                </View>
                <View>
                    <Text style={styles.dados}>{item.data}</Text>
                    <Text style={styles.dados}>Valor: R$ {item.marmita.valor}</Text>
                </View>
            </View>
        </Card>
    );

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Pedidos' />
            <View style={{ paddingBottom: 70 }}>
                <FlatList
                    style={{ marginTop: 10 }}
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.idPedido.toString()}
                />
            </View>
            <TouchableOpacity
                style={styles.floatButton}
                onPress={() => { props.navigation.navigate('Novo') }}
            >
                <IconButton
                    name='plus'
                    size={20}
                    color='#ffffff'
                    style={styles.iconsDrawer}
                />
            </TouchableOpacity>
        </View>
    )
}

PedidosCliente.navigationOptions = {
    drawerLabel: 'Pedidos',
    drawerIcon: ({ focused, tintColor }) => (
        <IconMaterial
            name='food'
            size={20}
            color='black'
            style={styles.iconsDrawer}
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
        marginTop: 0
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
        height: 15,
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
        borderColor: '#000',
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