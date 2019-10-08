import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ScrollView,
    Modal,
    TouchableHighlight,
    Alert,
} from 'react-native';

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';

const HomeCliente = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [cliente, setCliente] = useState({});
    const [nome, setNome] = useState('');
    const saudacao = `Bem vindo ${nome}`;

    console.log(cliente);
    useEffect(() => {
        loadCliente();
    }, [])

    loadCliente = async () => {
        let usuario = await find(USER_CURRENTY);
        setCliente(usuario);
        setNome(usuario.nome);
    }

    return (

        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title={saudacao} />
            <Text style={styles.textTitle}>Veja nosso Cardápio do dia</Text>
            <View style={styles.containerCardapio}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Clique em ok para voltar');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>
                            <Text>Varias coisas aqui serão escritas</Text>
                            <Text>Varias coisas aqui serão escritas</Text>
                            

                            <TouchableHighlight
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight
                    onPress={() => { setModalVisible(!modalVisible) }}>
                    <Text style={ styles.button }>ver</Text>
                </TouchableHighlight>
            </View>

            <ScrollView contentContainerStyle={styles.containerPedidos}>
                <Text style={styles.textTitle}>Pedidos Recentes</Text>
                <FlatList
                    style={styles.pedidosStyle}
                    data={[
                        { key: 'PEDIDO 1' },
                        { key: 'PEDIDO 2' },
                        { key: 'PEDIDO 3' },
                        { key: 'PEDIDO 4' },
                        { key: 'PEDIDO 5' },
                        { key: 'PEDIDO 6' },
                        { key: 'PEDIDO 7' },
                        { key: 'PEDIDO 8' },
                        { key: 'PEDIDO 9' },
                        { key: 'PEDIDO 10' },
                        { key: 'PEDIDO 11' },
                        { key: 'PEDIDO 12' },
                        { key: 'PEDIDO 13' },
                    ]}
                    renderItem={({ item }) => <Text style={styles.itemPedidos}>{item.key}</Text>}
                />
            </ScrollView>

            <View style={{ height: 100 }}>
                <Button
                    title='Novo Pedido'
                    titleStyle={{ fontSize: 18 }}
                    buttonStyle={styles.buttonPedido}
                    onPress={() => { props.navigation.navigate('PedidosCliente') }}
                />
            </View>
        </View>
    )

}

// usando o static no componente funcional || Propriedade estática
HomeCliente.navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ focused, tintColor }) => (
        <IconFont
            name='home'
            size={20}
            color='black'
            style={styles.iconsDrawer}
        />
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    containerCardapio: {
        height: 50,
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonPedido: {
        borderRadius: 50,
        width: 180,
        height: 60,
        backgroundColor: '#0f6124',
        alignSelf: 'center'
    },
    textTitle: {
        fontSize: 24,
        margin: 10,
        textAlign: 'center',
        marginTop: 25,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24,
        padding: 10,
        color: '#ffffff',
        borderRadius: 2,

    },
    iconsDrawer: {
        paddingRight: 2
    },
    containerPedidos: {
        flexGrow: 5,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: "center",
        width: '60%',
        maxHeight: 300,
        marginBottom: 30,
    },
    itemPedidos: {
        padding: 5,
        textAlign: 'center',
        backgroundColor: '#0f6124',
        alignSelf: 'center',
        fontSize: 18,
        color: '#FFFFFF',
        height: 50,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 15,
        width: 200,
        borderRadius: 5,
    },
    //flatlist
    pedidosStyle: {
        

        padding: 10,
    },
});

export default HomeCliente;