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
import ModalBox from '../../../components/ModalBox';

const CategoriasAdmin = (props) => {
    const [data, setData] = useState([]);
    const modalRef = useRef();
    const [load,setLoad] = useState(false);

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
                { text: 'Não'},
                { text: 'Sim', onPress: () => loadDeleteItem(id) },
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
            <MenuButton navigation={props.navigation} title="Categorias" />
            <View style={styles.mainContainer}>
                <View style={{paddingBottom:70}}>
                    {!load &&      
                        <FlatList
                            style={{ marginTop: 10,marginBottom:10 }}
                            contentContainerStyle={styles.list}
                            data={data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                        />}{load && <ProgressBarAndroid/>
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
        fontWeight:'bold',
		fontSize:16
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
		borderColor:'#000'
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

export default CategoriasAdmin;