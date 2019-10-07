import React, { forwardRef, useState, createRef, useImperativeHandle, useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    ScrollView,
    Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import api from '../services/api';
import { USER_CURRENTY } from '../services/key';
import { find } from '../services/banco';


const ModalBox = forwardRef((props, ref) => {

    const modalRef = useRef();
    const [content, setContent] = useState(<Text>None</Text>);

    useImperativeHandle(ref, () => ({
        open: (event, nomeCategoria='', idCategoria='') => {
            contentModal(event, nomeCategoria, idCategoria);
            modalRef.current.open();
        },
    }));

    closeModal = () => {
        modalRef.current.close();
    };

    function contentModal(event, nomeCategoria='', idCategoria='') {
        let r;
        switch (event) {
            case 'cadastroCategoria':
                r = (<CadastroCategorias close={closeModal} />);
                break;
            case 'editarCategoria':
                r = (
                <EditaCategoria
                    close={closeModal}
                    nome={nomeCategoria}
                    id={idCategoria}
                />);
                break;
            default:
                r = <Text>None</Text>;
            break;
        }
        setContent(r);
    };


    return (
        <Modal
            style={styles.modal}
            ref={modalRef}
            onClosed={props.refresh}>
            {content}
        </Modal>
    );
});

const CadastroCategorias = ({ close }) => {

    const [descricao, setDescricao] = useState('');

    handle_cadastro = async () => {
        try {
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/',
                { 'descricao': descricao },
                {
                    headers: { Authorization: usuario.token }
                });
        } catch (e) {
            ToastAndroid.show('Categoria não foi cadastrada')
        } finally {
            close();
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
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
                />
            </View>
        </ScrollView>
    );
};

const EditaCategoria = (props) => {

    const [descricao, setDescricao] = useState(props.nome);
    const id = props.id;

    handle_edicao = async () => {
            try {
                let usuario = await find(USER_CURRENTY);
                await api.post('/protegido/categoria/atualizar',
                    { 
                        'descricao': descricao, 
                        'id': id
                    },
                    {
                        headers: { Authorization: usuario.token }
                    });
            } catch (e) {
                ToastAndroid.show('Categoria não foi editada')
            } finally {
                props.close();
            }    
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar categoria</Text>
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
                onPress={props.close}
            />
            <Button
                title='Editar'
                buttonStyle={styles.button}
                onPress={handle_edicao}
            />
        </View>
    </ScrollView>
    );
};


const styles = StyleSheet.create({
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
        height: 400,
        width: '97%'
    },
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});


export default ModalBox;