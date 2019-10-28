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
    Modal,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';
import { Card, Button } from 'react-native-elements';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import api from '../../../services/api';

import CardapioCliente from './componentes/cardapioCliente';

const NovoPedido = (props) => {
    const [marmitas, setMarmitas] = useState([]);
    const [load, setLoad] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [qtdCarnes, setQtdCarnes] = useState(1);
    const [idMarmita, setIdMarmita] = useState({});

    useEffect(() => {
        loadInfo();
    }, [modalVisible]);

    loadInfo = async () => {
        setLoad(true);
        let usuario = await find(USER_CURRENTY);
        let response = await api.get('/protegido/marmita/listar', { headers: { Authorization: usuario.token, } });
        setMarmitas(response.data);
        setLoad(false);
    }

    selectedMarmita = (qtdCarnes, idMarmita) => {
        setQtdCarnes(qtdCarnes);
        setIdMarmita(idMarmita);
        abrirModal();
    }

    renderItem = ({ item }) => {
        return <TouchableOpacity style={styles.touch} onPress={()=>{ selectedMarmita(item.carnes, item.idMarmita) }}>
            <Text style={[styles.text, {fontSize: 18, fontWeight: '500'}]}>{item.tipoMarmita}</Text>
            <Text style={[styles.text]}>Descricao: {item.descricao}</Text>
            <Text style={[styles.text]}>Quantidade de Carnes: {item.carnes}</Text>
            <Text style={[{alignSelf: 'flex-end'}]}>Valor: R$ {item.valor}</Text>
        </TouchableOpacity>
    }

    abrirModal = () => {
		setModalVisible(true);
    };

    fecharModal = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title={'Marmitas'}></MenuButton>
            <Modal
                    style = {stylesModal.modal}
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    presentationStyle={'overFullScreen'}
                    onOrientationChange={'portrait'}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <View style={stylesModal.viewModal}> 
                        <Card containerStyle={stylesModal.card}>                          
                            <CardapioCliente idMarmita={idMarmita} qtdCarnes={qtdCarnes} fecharModal={fecharModal} />
                        </Card>
                    </View>
			    </Modal>
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

const stylesModal = StyleSheet.create({
	viewModal:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		paddingBottom:'2%',
		paddingTop:'20%',
		backgroundColor:'rgba(0,0,0,0.6)',
	},
    title: {
        marginTop: 25,
        marginBottom: 25,
        fontFamily: 'Oswald-Bold',
        fontSize: 28,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        fontFamily: 'Oswald-Regular',
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 10
    },
    modal: {
        justifyContent: 'center',
		width: '97%',
		height:'100%'
		
    },
    card: {
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	}
});

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
    title: {
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 25,
        fontFamily: 'Oswald-Bold',
        fontSize: 28,
    },
    text:{
        margin: 5,
        fontFamily: 'roboto'
    },
})

export default NovoPedido;