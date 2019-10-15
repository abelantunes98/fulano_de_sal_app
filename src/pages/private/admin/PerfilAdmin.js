import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ToastAndroid,
    StyleSheet,
    ProgressBarAndroid,
    KeyboardAvoidingView,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import IconMaterial5 from 'react-native-vector-icons/Feather';
import Icon from "react-native-vector-icons/AntDesign";
import IconVerify from "react-native-vector-icons/MaterialIcons";
import { Button, Input, Card } from 'react-native-elements';

import { find, save } from '../../../services/banco';
import { criptografar } from '../../../services/criptografia';
import { USER_CURRENTY } from '../../../services/key';
import api from "../../../services/api";

const PerfilAdmin = (props) => {
    const [admin, setAdmin] = useState({});
    const [nome, setNome] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenhaConf, setNovaSenhaConf] = useState('');
    const [loading, setLoadind] = useState(false);
    const [load,setLoad] = useState(false);

    useEffect(() => {
        loadAdmin();
    }, []);

    loadAdmin = async () => {
        setLoadind(true);
        let usuario = await find(USER_CURRENTY);

        setAdmin(usuario);
        setNome(usuario.nome);
        setLoadind(false);
    }

    limparCampos = () => {
        setSenhaAtual('');
        setNovaSenha('');
        setNovaSenhaConf('');
    }

    function SenhaIncorreta(message) {
        this.message = message;
        this.name = "UserException";
     }

    validarSenha = (senhaCript) => {
        let saida = false;
        if (senhaAtual !== '') {
            if (novaSenha !== '' && novaSenhaConf !== '') {
                if (admin.senha === senhaCript && novaSenha === novaSenhaConf) { 
                    saida = true;
                } else {
                    throw new SenhaIncorreta("Senha atual incorreta ou a nova senha não confere!");
                }
            }
        }

        return saida;
    }

    atualizarAdmin = async ( admin_atualizado ) => {
        const response = await api.post(
            '/protegido/administrador/atualizar', 
            admin_atualizado,
            { 
                headers: {
                    Authorization: admin.token
                }
            }
        );
        setAdmin(response.data);
        const response_login = await api.post('/publico/usuario/login/', {
            'email': response.data.email, 
            'senha': response.data.senha
        });
        await save(USER_CURRENTY, response_login.data);
        setAdmin(response_login.data);
    }

    alterarDados = async () => {
        setLoad(true);
        try {
            const admin_atualizado = {
                nome: nome,
                email: admin.email,
                senha: admin.senha
            };
            const senhaCript = await criptografar(senhaAtual);
            if (validarSenha(senhaCript)) {
                const nova_senha = await criptografar(novaSenha);
                admin_atualizado.senha = nova_senha;
            }
            await atualizarAdmin(admin_atualizado);
            ToastAndroid.show("Dados atualizados com sucesso!", ToastAndroid.SHORT);

            limparCampos();
        } catch (error) {
            if (error instanceof SenhaIncorreta) {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
            }
        }
        setLoad(false);
    }

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Perfil'/>
            <View style={ styles.mainContainer }>
            <KeyboardAvoidingView>
                {!loading &&
                 <Card containerStyle={styles.card}>
                     <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <IconMaterial 
                            name='user-circle-o'
                            size={100}
                            color='black'
                            style={ styles.icon_user }
                        />
                        <Text style={styles.text} >{ admin.email }</Text>
                        <Input
                            leftIcon={
                                <Icon
                                    name='user'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            containerStyle={styles.input}
                            value={nome}
                            onChangeText={setNome}
                        />
                        <Input
                            leftIcon={
                                <IconMaterial5
                                    name='user-check'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Digite sua senha atual'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            value={senhaAtual}
                            onChangeText={setSenhaAtual}
                        />
                        <Input
                            leftIcon={
                                <IconMaterial
                                    name='user-secret'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Digite sua nova senha'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                        />
                        <Input
                            leftIcon={
                                <IconVerify
                                    name='verified-user'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Repita sua nova senha'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            value={novaSenhaConf}
                            onChangeText={setNovaSenhaConf}
                        />
                        <View style={styles.forgotContainer}>
                            <Button title='Atualizar dados' buttonStyle={styles.button} titleStyle={styles.titleStyle} onPress={alterarDados} loading={load}/>
                        </View>
                    </View>
                </Card>
                }{loading && <ProgressBarAndroid />}
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

PerfilAdmin.navigationOptions = {
    drawerLabel: 'Perfil',
    drawerIcon:({focused, tintColor}) => (
        <IconVerify
            name='person'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

const styles = StyleSheet.create({
    card: {
        width:'93%',
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'

	},
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff',
    },
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignContent: 'center',
        alignItems: 'center', 
    },
	text: {
        textAlign: 'center',
        marginBottom: 10,
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        width:150,
		marginTop: 10,
        backgroundColor: '#0f6124',
    },
    titleStyle:{
        fontFamily: 'Roboto-Thin',
    },
    icon_user: {
        paddingBottom: 20,
    },
    input: {
        marginBottom: 10,
    }
});

export default PerfilAdmin;
