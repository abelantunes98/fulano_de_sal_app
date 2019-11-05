import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    FlatList,
    ProgressBarAndroid,
    TouchableOpacity,
    Modal,
    ToastAndroid,
} from 'react-native'

import { Card, Button } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';


const PedidosAdmin = (props) => {

    const [data, setData] = useState({});
    const [load, setLoad] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [loadModal, setLoadModal] = useState(false);


    useEffect(() => {
        preLoad();
    }, []);



    preLoad = async () => {
        setLoad(true);
        await loadRepositories();
        setLoad(false);
    };

    loadRepositories = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/pedido/listarAdmin',
            { headers: { Authorization: usuario.token } });
        setData(response.data.pedidos);
    };

    confirmarPedido = async (id) => {
        try {
            setLoadModal(true);
            let usuario = await find(USER_CURRENTY);
            const response = await api.get('/protegido/pedido/confirmar',
                { 
                    headers: { Authorization: usuario.token },
                    params: { 'id': parseInt(id) }, 
                }
            );
            ToastAndroid.show('Pedido confirmado com sucesso!', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            closeItemModal();
        }
    };

    openItemModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
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
                <Text style={{ ...stylesModal.fieldContent, fontWeight: 'bold' }}>{item}</Text>
                <View style={{ marginLeft: 10 }}>
                    <FlatList
                        data={selectedItem.produtos[item]}
                        renderItem={({ item }) => <Text style={stylesModal.fieldContent}>{item.nome}</Text>}
                        keyExtractor={item => item.id}
                    />
                </View>
            </>);
    };

    renderItem = ({ item }) => {
        return (
            <Card containerStyle={styles.card}>
                <View style={styles.cardContent}>
                    <View style={{ flexGrow: 5 }}>
                        <Text style={item.confirmado ? styles.nomeConfirmado : styles.nome}>{item.cliente.nome}</Text>
                        <View></View>
                        <Text style={{ fontSize: 12 }}>R$ {item.marmita.valor},00</Text>
                        <View></View>
                        <Text style={{ fontSize: 10, marginTop: 5 }}>{item.data}</Text>
                    </View>
                    <View style={styles.buttons}>
                        <Button
                            buttonStyle={styles.button}
                            onPress={() => openItemModal(item)}
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
                            keyExtractor={item => item.idPedido.toString()}
                            ListFooterComponent={View}
                            ListFooterComponentStyle={{ height: 100 }}
                        />}{load && <ProgressBarAndroid />}
                </View>
                <TouchableOpacity style={styles.floatButton} onPress={preLoad}>
                    <IconButton
                        name='refresh'
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
                        <ScrollView style={{width: '90%'}}>
                            <Card containerStyle={stylesModal.card}>
                                <Text style={stylesModal.title}>Pedido</Text>

                                {modalVisible &&
                                    <View>
                                        <Text style={stylesModal.sectionTitle}>Cliente</Text>

                                        <Text style={stylesModal.fieldTitle}>Nome</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.cliente.nome}</Text>

                                        <Text style={stylesModal.fieldTitle}>Endereço</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.cliente.endereco}</Text>

                                        <Text style={stylesModal.fieldTitle}>Telefone</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.cliente.telefone}</Text>


                                        <Text style={stylesModal.sectionTitle}>Marmita</Text>

                                        <Text style={stylesModal.fieldTitle}>Produtos selecionados</Text>

                                        <FlatList
                                            data={Object.getOwnPropertyNames(selectedItem.produtos)}
                                            renderItem={renderProduto}
                                            keyExtractor={item => item.toString()}
                                        />

                                        <Text style={stylesModal.fieldTitle}>Valor</Text>
                                        <Text style={stylesModal.fieldContent}>R$ {selectedItem.marmita.valor},00</Text>

                                        <Text style={stylesModal.fieldTitle}>Tipo do pagamento</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.tipoPagamento}</Text>

                                        <Text style={stylesModal.fieldTitle}>Descrição</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.marmita.descricao}</Text>

                                        <Text style={stylesModal.fieldTitle}>Tipo</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.marmita.tipoMarmita}</Text>

                                        <Text style={stylesModal.fieldTitle}>Qnt. de carnes</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.marmita.carnes}</Text>

                                        <Text style={stylesModal.fieldTitle}>Observações</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.observacoes}</Text>

                                        <Text style={stylesModal.fieldTitle}>Data e hora</Text>
                                        <Text style={stylesModal.fieldContent}>{selectedItem.data}</Text>

                                        <Text style={stylesModal.fieldTitle}>Confirmado</Text>
                                        <Text style={{...stylesModal.fieldContent, color: selectedItem.confirmado ? 'green' : 'red'}}>{selectedItem.confirmado ? 'SIM' : 'NÃO'}</Text>

                                        <View style={stylesModal.buttonContainer}>
                                            <Button
                                                title='Cancelar'
                                                buttonStyle={stylesModal.button}
                                                onPress={() => closeItemModal()}
                                            />
                                            {!selectedItem.confirmado && <Button
                                                title='Confirmar'
                                                buttonStyle={stylesModal.button}
                                                loading={loadModal}
                                                onPress={() => confirmarPedido(selectedItem.idPedido)}
                                            />}
                                        </View>
                                    </View>
                                }
                            </Card>
                        </ScrollView>
                    </View>
                </Modal>
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
        backgroundColor: '#FFF',
		borderColor: '#FFF',
		elevation:6,
		shadowOffset: { width: 5, height: 5 },
		shadowColor: "black",
		shadowOpacity: 0.5,
		shadowRadius: 10
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FEFEFE',
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
    nomeConfirmado: {
        fontWeight: 'bold',
        textDecorationStyle: 'solid',
        textDecorationLine: 'line-through',
        textDecorationColor: '#C2C2D6',
        color: '#C2C2D6',
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
})

export default PedidosAdmin;