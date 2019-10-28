import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet
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
    const [selectedItem, setSelectedItem] = useState({});
    const [load, setLoad] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loadModal, setLoadModal] = useState(false);

    useEffect(() => {
        loadRepositories();
    }, []);

    loadRepositories = async () => {
        // Para não listar nada caso não tenha pedidos.
        let dat = [];
        try {
            let userDados = await find(USER_CURRENTY);
            const response = await api.get('/protegido/pedido/listarCliente/',
                {
                    headers: { Authorization: userDados.token },
                    params: { email: userDados.email }
                });

            if (response.status == 200) {
                dat = response.data.pedidos;
            }
        } catch {
            ToastAndroid.show('Não foi possível carregar seus pedidos!', ToastAndroid.SHORT);
        }
        setData(dat);
    };

    // O parâmetro status vem com o pedido da API: pedido.confirmado
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
    
    retornaStatusMsg = (status) => {   
        let statusMsg = 'Pendente';
        if (status) {
            statusMsg = 'Confirmado';
        }
        ToastAndroid.show('Status do pedido: ' + statusMsg + "!", ToastAndroid.SHORT);
    }

    openItemModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };


    preLoad = async () => {
        setLoad(true);
        await loadRepositories();
        setLoad(false);
    };

    closeItemModal = () => {
        setModalVisible(false);
        setLoadModal(false);
        setSelectedItem({});
        preLoad();
    };

    renderProduto = ({ item }) => {
        return (
            <>
                <Text style={{ ...stylesModal.fieldContent, fontWeight: 'bold' }}>{item}:</Text>
                <View style={{ marginLeft: 10 }}>
                    <FlatList
                        data={selectedItem.produtos[item]}
                        renderItem={({ item }) => <Text style={stylesModal.fieldContent}>{item.nome}</Text>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </>);
    };

    renderItem = ({ item }) => (
        <Card containerStyle={styles.listItem}>
            <View>
                <View style={styles.buttons}>
                    <Button
                        onPress={() => openItemModal(item)}
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
                        onPress={() => {retornaStatusMsg(item.confirmado)}}
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

            <Modal
                style={stylesModal.modal}
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                presentationStyle={'overFullScreen'}
                onOrientationChange={'portrait'}
                onRequestClose={() => {
                    setModalVisible(false);
                }}>
                <View style={stylesModal.viewModal}>
                    <ScrollView style={{ width: '90%' }}>
                        <Card containerStyle={stylesModal.card}>
                            <Text style={stylesModal.title}>Pedido</Text>

                            {modalVisible &&
                                <View>

                                    <Text style={stylesModal.fieldTitle}>Produtos selecionados:</Text>

                                    <FlatList
                                        data={Object.getOwnPropertyNames(selectedItem.produtos)}
                                        renderItem={renderProduto}
                                        keyExtractor={item => item.toString()}
                                    />

                                    <Text style={stylesModal.fieldTitle}>Valor:</Text>
                                    <Text style={stylesModal.fieldContent}>R$ {selectedItem.marmita.valor},00</Text>

                                    <Text style={stylesModal.fieldTitle}>Tipo do pagamento:</Text>
                                    <Text style={stylesModal.fieldContent}>{selectedItem.tipoPagamento}</Text>

                                    <Text style={stylesModal.fieldTitle}>Descrição:</Text>
                                    <Text style={stylesModal.fieldContent}>{selectedItem.marmita.descricao}</Text>

                                    <Text style={stylesModal.fieldTitle}>Tipo:</Text>
                                    <Text style={stylesModal.fieldContent}>{selectedItem.marmita.tipoMarmita}</Text>

                                    <Text style={stylesModal.fieldTitle}>Qnt. de carnes:</Text>
                                    <Text style={stylesModal.fieldContent}>{selectedItem.marmita.carnes}</Text>

                                    <Text style={stylesModal.fieldTitle}>Observações:</Text>
                                    <Text style={stylesModal.fieldContent}>{selectedItem.observacoes}</Text>

                                    <Text style={stylesModal.fieldTitle}>Data e hora:</Text>
                                    <Text style={stylesModal.fieldContent}>{selectedItem.data}</Text>

                                    <Text style={stylesModal.fieldTitle}>Confirmado:</Text>
                                    <Text style={{ ...stylesModal.fieldContent, color: selectedItem.confirmado ? 'green' : 'red' }}>{selectedItem.confirmado ? 'SIM' : 'NÃO'}</Text>

                                    <View style={stylesModal.buttonContainer}>
                                        <Button
                                            title='Fechar'
                                            buttonStyle={stylesModal.button}
                                            onPress={() => closeItemModal()}
                                        />
                                    </View>
                                </View>
                            }
                        </Card>
                    </ScrollView>
                </View>
            </Modal>
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

const stylesModal = StyleSheet.create({
    modal: {
        justifyContent: 'center',
    },
    viewModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingTop: '20%',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderColor: '#000'
    },
    title: {
        marginTop: 25,
        marginBottom: 25,
        fontFamily: 'Oswald-Bold',
        fontSize: 28,
        alignSelf: 'center',
    },
    sectionTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Oswald-Bold',
        fontSize: 20,
        alignSelf: 'center',
    },
    fieldTitle: {
        alignSelf: 'flex-start',
        fontFamily: 'Oswald-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 10,
        paddingLeft: 10
    },
    fieldContent: {
        alignSelf: 'flex-start',
        fontFamily: 'Oswald-Regular',
        fontSize: 14,
        paddingTop: 10,
        paddingLeft: 10
    },
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    buttonContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default PedidosCliente;