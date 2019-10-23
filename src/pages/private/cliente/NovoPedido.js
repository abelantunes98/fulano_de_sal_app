import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ProgressBarAndroid,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';
import { Card, Button } from 'react-native-elements';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import api from '../../../services/api';

const NovoPedido = (props) => {
    const [marmitas, setMarmitas] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        loadInfo();
    }, []);

    loadInfo = async () => {
        setLoad(true);
        let usuario = await find(USER_CURRENTY);
        let response = await api.get('/protegido/marmita/listar', { headers: { Authorization: usuario.token, } });
        setMarmitas(response.data);
        setLoad(false);
    }

    renderItem = ({ item }) => {
        return <TouchableOpacity style={styles.touch} onPress={()=>{props.navigation.navigate('Pedido')}}>
            <Text style={[styles.text, {fontSize: 18, fontWeight: '500'}]}>{item.tipoMarmita}</Text>
            <Text style={[styles.text]}>Descricao: {item.descricao}</Text>
            <Text style={[styles.text]}>Quantidade de Carnes: {item.carnes}</Text>
            <Text style={[{alignSelf: 'flex-end'}]}>Valor: R$ {item.valor}</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title={'Marmitas'}></MenuButton>
            <Text style={styles.title}>Escolha a marmita</Text>
            <ScrollView style={styles.scroll}>
                {!load && <FlatList
                    style={{flexDirection: 'column', flex: 1}}
                    data={marmitas}
                    renderItem={renderItem}
                    keyExtractor={item => item.idMarmita.toString()}
                />
                }{load && <ProgressBarAndroid />}
            </ScrollView> 
        </View>
    );
}

NovoPedido.navigationOptions = {
    drawerLabel: 'Novo Pedido',
    drawerIcon: ({ focused, tintColor }) => (
        <IconMaterial
            name='plus-circle'
            size={20}
            color='black'
            style={{ padding: 2 }}
        />
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll:{
        marginBottom: 20,
    },
    touch:{
        width: 300,
        height: 130,
        backgroundColor: '#eeeeee',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',
    },
    title:{
        fontSize: 20,
        fontWeight: '700',
        padding: 20,
        marginTop: 10,
    },
    text:{
        margin: 5,
        fontFamily: 'roboto'
    },
})

export default NovoPedido;