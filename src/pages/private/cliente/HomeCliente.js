import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from 'react-native';

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import CardapioDoDia from './componentes/cardapioDoDia';

const HomeCliente = (props) => {
    const [cliente, setCliente] = useState({});
    const [nome, setNome] = useState('');
    const saudacao = `Bem vindo ${nome}`;

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
            <Text style={styles.textTitle}>Cardápio do dia</Text>
            
            <ScrollView contentContainerStyle={styles.containerPedidos}>
                <CardapioDoDia></CardapioDoDia>
            </ScrollView>

            <View style={{ height: 100,}}>
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
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: "center",
        marginBottom: 20,
        height: 400,
    },
});

export default HomeCliente;