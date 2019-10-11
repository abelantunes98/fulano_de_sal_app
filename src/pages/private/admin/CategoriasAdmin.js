import React, { useState, useEffect, useRef, createRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Card, Button } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';
import IconButton from 'react-native-vector-icons/FontAwesome';
import ModalBox from '../../../components/ModalBox';

const CategoriasAdmin = (props) => {
    const [data, setData] = useState([]);
    const modalRef = useRef();

    useEffect(() => {
        loadRepositories();
    }, []);

    loadRepositories = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/listar', { headers: { Authorization: usuario.token } });
        setData(response.data);
    }


    renderItem = ({ item }) => (
        <View>
            <Card style={styles.listItem}>
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
                            onPress={() => openEditaPopUp(item)}
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
                            onPress={() => deleteItem(item.id, item.descricao)}
                        />
                    </View>
                    <View>
                        <Text style={styles.nome}>{item.descricao}</Text>
                    </View>
                </View>
            </Card>
        </View>
    );

    function deleteItem(id, name) {
        Alert.alert(
            `Deletar '${name}'`,
            'Tem certeza que deseja deletar essa categoria?',
            [
                { text: 'NO', onPress: () => Alert.alert('Cancel'), style: 'cancel' },
                { text: 'YES', onPress: () => loadDeleteItem(id) },
            ],
        );
    };

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

    function openEditaPopUp(item) {
        modalRef.current.open('editarCategoria', item);
    };

    openCadastroPopUp = () => {
        modalRef.current.open('cadastroCategoria');
    };

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title="Categorias"/>
            <View style={styles.mainContainer}>
                <FlatList
                    style={{ marginTop: 50 }}
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                <TouchableOpacity style={styles.floatButton} onPress={openCadastroPopUp}>
                    <IconButton
                        name='plus'
                        size={20}
                        color='#ffffff'
                        style={styles.iconsDrawer}
                    />
                </TouchableOpacity>
            </View>
            <ModalBox
                ref={modalRef}
                refresh={loadRepositories}
            />
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
        color: '#000000',
        fontSize: 18,
        marginBottom: 15
    },
    categoria: {
        color: '#000000',
        fontSize: 9
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
        marginTop: 20,
        paddingTop: 10,
        paddingBottom: 50,
        paddingEnd: 10,
        padding: 30,
        borderRadius: 10,
        backgroundColor: '#EEE'
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
        bottom: 25,
        right: 25,
        height: 70,
        backgroundColor: '#0f6124',
        borderRadius: 100
    }
});

export default CategoriasAdmin;