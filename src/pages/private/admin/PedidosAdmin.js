import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    ProgressBarAndroid,
    TouchableOpacity,
} from 'react-native'

import { Card, Button } from 'react-native-elements';


import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';

const EXAMPLE_DATA = {
    pedidos: [
        {
            id: 0,
            cliente: "Matheus",
            data: "10:30",
            valor: "R$ 5,00"
        },
        {
            id: 1,
            cliente: "Rick",
            data: "10:45",
            valor: "R$ 5,00"
        },
        {
            id: 2,
            cliente: "Eduardo",
            data: "10:46",
            valor: "R$ 5,00"
        },
        {
            id: 3,
            cliente: "Samuel",
            data: "10:47",
            valor: "R$ 5,00"
        },
        {
            id: 4,
            cliente: "Vinícius",
            data: "10:48",
            valor: "R$ 5,00"
        },
        {
            id: 5,
            cliente: "Hércules",
            data: "10:49",
            valor: "R$ 5,00"
        },
        {
            id: 6,
            cliente: "Hércules",
            data: "10:49",
            valor: "R$ 5,00"
        },
        {
            id: 7,
            cliente: "Hércules",
            data: "10:49",
            valor: "R$ 5,00"
        },
        {
            id: 8,
            cliente: "Hércules",
            data: "10:49",
            valor: "R$ 5,00"
        },
    ]
};

const PedidosAdmin = (props) => {

    const [data, setData] = useState(EXAMPLE_DATA.pedidos);
    const [load, setLoad] = useState(false);


    useEffect(() => {
        setData(EXAMPLE_DATA.pedidos);
    }, []);

    preLoad = async () => {
        setLoad(true);
        await loadRepositories();
        setLoad(false);
    };

    loadRepositories = async () => {
        /*   let usuario = await find(USER_CURRENTY);
          const response = await api.get('/protegido/pedido/listarAdmin',
              { headers: { Authorization: usuario.token } }); */
        setData(EXAMPLE_DATA.pedidos);
    };

    renderItem = ({ item }) => {
        return (
            <Card containerStyle={styles.card}>
                <View style={styles.cardContent}>
                    <View style={{ flexGrow: 5 }}>
                        <Text style={styles.nome}>{item.cliente}</Text>
                        <View></View>
                        <Text style={{ fontSize: 12 }}>{item.valor}</Text>
                        <View></View>
                        <Text style={{ fontSize: 10, marginTop: 5 }}>{item.data}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            buttonStyle={styles.button}
                            icon={
                                <IconButton
                                    name='chevron-right'
                                    size={20}
                                    color='#000000'
                                    style={styles.iconsDrawer}
                                />
                            }
                        />
                    </View>
                </View>
            </Card>
        );
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <MenuButton navigation={props.navigation} title="Pedidos" />
            <View style={styles.mainContainer}>
                <View style={{}}>
                    {!load &&
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={View}
                            ListFooterComponentStyle={{height:100}}
                        />}{load && <ProgressBarAndroid />}
                </View>
                    <TouchableOpacity style={styles.floatButton}>
                        <IconButton
                            name='refresh'
                            size={20}
                            color='#ffffff'
                            style={styles.iconsDrawer}
                        />
                    </TouchableOpacity>
            </View>

        </View>
    )
}


PedidosAdmin.navigationOptions = {
    drawerLabel: 'Pedidos',
    drawerIcon: ({ focused, tintColor }) => (
        <IconMaterial
            name='format-list-checks'
            size={20}
            color='black'
            style={styles.iconsDrawer}
        />
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: '#FFF',
        borderRadius: 100,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subtexto: {
        fontWeight: 'bold',
        fontSize: 10
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
    /*
   
    list: {
        padding: 0,
    },
    listItem: {
        backgroundColor: '#FFF',
        borderColor: '#ccd2db',
    },

         ,
    iconsDrawer: {
        paddingRight: 2
    },
    */
});
export default PedidosAdmin;