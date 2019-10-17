import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ProgressBarAndroid,
} from 'react-native';
import { Card, Button } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';
import IconButton from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

const CategoriasAdmin = (props) => {
    const [data, setData] = useState([]);
    const modalRef = useRef();
    const [load, setLoad] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [contentModal, setContentModal] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    const MODAL_CONTENT = {
        'cadastrar': <CadastrarModalContent close={closeModal}></CadastrarModalContent>,
        'editar': <EditarModalContent close={closeModal} item={selectedItem}></EditarModalContent>
    }

    useEffect(() => {
        loadRepositories();
    }, []);

    loadRepositories = async () => {
        setLoad(true);
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/listar', { headers: { Authorization: usuario.token } });
        setData(response.data);
        setLoad(false);
    }


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
                            onPress={() => handle_editar(item)}
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
                            onPress={() => handle_delete(item)}
                        />
                    </View>
                    <View>
                        <Text style={styles.nome}>{item.descricao}</Text>
                    </View>
                </View>
            </Card>
        </View>
    );

    function handle_delete(item) {
        Alert.alert(
            `Deletar '${item.name}'`,
            'Tem certeza que deseja deletar essa categoria?',
            [
                { text: 'Não' },
                { text: 'Sim', onPress: () => loadDeleteItem(item.id) },
            ],
        );
    };

    function handle_editar(item) {
        setSelectedItem(item);
        setContentModal(MODAL_CONTENT['editar']);
        openModal();
    }

    async function loadDeleteItem(id) {
        try {
            let usuario = await find(USER_CURRENTY);
            await api.delete('/protegido/categoria/remover',
                {
                    headers: { Authorization: usuario.token },
                    params: { 'id': parseInt(id) }
                }
            );
            loadRepositories();
        } catch (e) {
            ToastAndroid.show(e.message)
        }
    };

    openModal = () => {
        setModalVisible(true);
    };

    closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title="Categorias" />
            <View style={styles.mainContainer}>
                <View style={{ paddingBottom: 70 }}>
                    {!load &&
                        <FlatList
                            style={{ marginTop: 10, marginBottom: 10 }}
                            contentContainerStyle={styles.list}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                        />}{load && <ProgressBarAndroid />
                    }
                </View>
                <TouchableOpacity style={styles.floatButton} onPress={openCadastroPopUp}>
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
                {contentModal}
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

const CadastrarModalContent = ({ close }) => {

    const [descricao, setDescricao] = useState('');
    const [load, setLoad] = useState(false);

    handle_cadastro = async () => {
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/',
                { 'descricao': descricao },
                {
                    headers: { Authorization: usuario.token }
                });
            setLoad(false);
            ToastAndroid.show('Categoria cadastrada com sucesso', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            close();
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style={styles.content}>
                    <Text style={styles.title}>Cadastrar categoria</Text>
                    <Text style={styles.inputTitle}>Descrição</Text>
                    <Input
                        placeholder='Nome da categoria'
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title='Cancelar'
                            buttonStyle={styles.button}
                            onPress={close}
                        />
                        <Button
                            title='Cadastrar'
                            buttonStyle={styles.button}
                            onPress={handle_cadastro}
                            loading={load}
                        />
                    </View>
                </View>
            </Card>
        </ScrollView>
    );
};

const EditarModalContent = ({ item, close }) => {

    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState('');
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setDescricao(item.descricao);
        setId(item.id);
    }, []);

    requestEditar = async () => {
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/atualizar',
                {
                    'descricao': descricao,
                    'id': id
                },
                {
                    headers: { Authorization: usuario.token }
                });
            setLoad(false);
            ToastAndroid.show("Categoria editada com sucesso", ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            close();
        }
    };

    return (
        <View style={stylesModal.viewModal}>
        <ScrollView>
            <Card containerStyle={stylesModal.card}>
                <View style={stylesModal.content}>
                    <Text style={styles.title}>Editar categoria</Text>
                    <Text style={styles.inputTitle}>Descrição</Text>
                    <Input
                        placeholder='Nome da categoria'
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                    <View style={stylesModal.buttonContainer}>
                        <Button
                            title='Cancelar'
                            buttonStyle={stylesModal.button}
                            onPress={close}
                        />
                        <Button
                            title='Editar'
                            buttonStyle={stylesModal.button}
                            onPress={requestEditar}
                            loading={load}
                        />
                    </View>
                </View>
            </Card>
        </ScrollView>
        </View>
    );
};

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
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    content: {
        justifyContent:'center',
        alignItems:'center'
    },
    buttonContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	}
});

export default CategoriasAdmin;