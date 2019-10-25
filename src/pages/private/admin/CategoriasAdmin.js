import React, { useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ProgressBarAndroid,
    ScrollView,
    ToastAndroid,
    Modal
} from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';
import IconButton from 'react-native-vector-icons/FontAwesome';

const CategoriasAdmin = (props) => {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(false);
    const [cadastrando, setCadastrando] = useState(false);
    const [loadModal, setLoadModal] = useState(false);
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        preLoad();
    }, [modalVisible]);

    preLoad = async () => {
        setLoad(true);
        await loadRepositories();
        setLoad(false);
    }

    loadRepositories = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/listar',
            { headers: { Authorization: usuario.token } });
        setData(response.data);
    }


    openCadastroPopUpCategoria = () => {
        setNomeCategoria('');
        setCadastrando(true);
        setModalVisible(true);
    };

    openEditaPopUpCategoria = (item) => {
        setIdCategoria(item.id);
        setNomeCategoria(item.descricao);
        setCadastrando(false);
        setModalVisible(true);
    };

    openDeletePopUpCategoria = (item) => {
        Alert.alert(
            `Deletar '${item.descricao}'`,
            'Tem certeza que deseja deletar essa categoria?',
            [
                { text: 'Não' },
                { text: 'Sim', onPress: () => handle_delete(item.id) },
            ],
        );
    };

    handle_cadastro = async () => {
        try {
            setLoadModal(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/',
                { 'descricao': nomeCategoria },
                {
                    headers: { Authorization: usuario.token }
                });
            ToastAndroid.show('Categoria cadastrada com sucesso', ToastAndroid.SHORT);
            setLoadModal(false);
            setModalVisible(false);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        }
    };

    handle_editar = async () => {
        try {
            setLoadModal(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/atualizar',
                {
                    'descricao': nomeCategoria,
                    'id': idCategoria
                },
                {
                    headers: { Authorization: usuario.token }
                });
                
            ToastAndroid.show("Categoria editada com sucesso", ToastAndroid.SHORT);
            setLoadModal(false);
            setModalVisible(false);

        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        }
    };

    handle_delete = async (id) => {
        try {
            let usuario = await find(USER_CURRENTY);
            await api.delete('/protegido/categoria/remover',
                {
                    headers: { Authorization: usuario.token },
                    params: { 'id': parseInt(id) }
                }
            );
            ToastAndroid.show("Deletado com sucesso", ToastAndroid.SHORT);
            preLoad();
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        }
    };


    renderItem = ({ item }) => (
        <View>
            <Card containerStyle={styles.listItem}>
                <View>
                    <View style={styles.buttons}>
                        <Button
                            buttonStyle={styles.button}
                            icon={
                                <IconButton
                                    name='pencil'
                                    size={15}
                                    color='#000000'
                                    style={styles.iconsDrawer}
                                />
                            }
                            onPress={() => openEditaPopUpCategoria(item)}
                        />
                        <Button
                            buttonStyle={styles.button}
                            icon={
                                <IconButton
                                    name='trash-o'
                                    size={15}
                                    color='#000000'
                                    style={styles.iconsDrawer}
                                />
                            }
                            onPress={() => openDeletePopUpCategoria(item)}
                        />
                    </View>
                    <View>
                        <Text style={styles.nome}>{item.descricao}</Text>
                    </View>
                </View>
            </Card>
        </View>
    );


    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title="Categorias" />
            <View style={styles.mainContainer}>
                    {!load &&
                        <FlatList
                            style={{ marginTop: 10, marginBottom: 10 }}
                            contentContainerStyle={styles.list}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={View}
					        ListFooterComponentStyle={{height:100}}
                        />}{load && <ProgressBarAndroid />}
                <TouchableOpacity style={styles.floatButton} onPress={openCadastroPopUpCategoria}>
                    <IconButton
                        name='plus'
                        size={20}
                        color='#ffffff'
                        style={styles.iconsDrawer}
                    />
                </TouchableOpacity>
            </View>
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
                    <ScrollView>
                        <Card containerStyle={stylesModal.card}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {!cadastrando && <Text style={stylesModal.title}>Editar Categoria</Text>}
                                {cadastrando && <Text style={stylesModal.title}>Cadastrar Categoria</Text>}
                                <Input
                                    placeholder='Nome da categoria'
                                    value={nomeCategoria}
                                    onChangeText={setNomeCategoria}
                                />
                                <View style={stylesModal.buttonContainer}>
                                    <Button
                                        title='Cancelar'
                                        buttonStyle={stylesModal.button}
                                        onPress={() => {
                                            setModalVisible(false);
                                            setLoadModal(false);
                                        }}
                                    />
                                    {cadastrando &&
                                        <Button
                                            title='Cadastrar'
                                            buttonStyle={stylesModal.button}
                                            onPress={handle_cadastro}
                                            loading={loadModal}
                                        />}
                                    {!cadastrando &&
                                        <Button
                                            title='Editar'
                                            buttonStyle={stylesModal.button}
                                            onPress={handle_editar}
                                            loading={loadModal}
                                        />
                                    }
                                </View>
                            </View>
                        </Card>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

CategoriasAdmin.navigationOptions = {
    drawerLabel: 'Categorias',
    drawerIcon: ({ focused, tintColor }) => (
        <IconMaterial
            name='tags'
            size={20}
            color='black'
            style={styles.iconsDrawer}
        />
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 16
    },

    list: {
        paddingTop: 10,
        paddingHorizontal: 16
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
        justifyContent: 'flex-end'
    },
    listItem: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderColor: '#000'
    },
    iconsDrawer: {
        paddingRight: 2
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
    }
});

const stylesModal = StyleSheet.create({
    viewModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '2%',
        paddingTop: '20%',
        backgroundColor: 'rgba(0,0,0,0.6)',
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
        height: '100%'

    },
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderColor: '#000'
    }
});

export default CategoriasAdmin;