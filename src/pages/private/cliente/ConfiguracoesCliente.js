import React, { useEffect, useState } from 'react';
import {
    View,
    ToastAndroid,
    StyleSheet,
    KeyboardAvoidingView,
    Text,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { save, find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import { Button, Input, Card } from 'react-native-elements';
import api from '../../../services/api';

const ConfiguracoesCliente = (props) => {

    const [userDados, setUserDados] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    useEffect(() => {
        carregarDados();
    }, []);

    carregarDados = async () => {
        let userDadosRet = await find(USER_CURRENTY);
        setUserDados(userDadosRet);
    }

    enviaDados = async () => {
        /*
         O usuario pode alterar quantos dados quiser, exceto o E-mail, caso ele
         decida alterar só um, como o nome, os outros parâmetros são preenchidos
         pelos dados de usuário salvos.
        */
        let nomeEnviar;
        let enderecoEnviar;
        let telefoneEnviar;
        let emailEnviar = userDados.email;
        let senhaEnviar = userDados.senha;
        if (telefone == '') {
            telefoneEnviar = userDados.telefone;
        } else {
            telefoneEnviar = telefone;
        }
        if (endereco == '') {
            enderecoEnviar = userDados.endereco;
        } else {
            enderecoEnviar = endereco;
        }
        if (nome == '') {
            nomeEnviar = userDados.nome;
        } else {
            nomeEnviar = nome;
        }

        // Verifica se algum dado foi digitado.
        if (telefone != '' || nome != '' || endereco != '') {

            try {
                const response = await api.post('/protegido/cliente/atualizar',
                    {
                        email: emailEnviar,
                        senha: senhaEnviar,
                        endereco: enderecoEnviar,
                        telefone: telefoneEnviar,
                        nome: nomeEnviar
                    },
                    { headers: { Authorization: userDados.token } }
                );

                if (response.status == 200) {
                    let data = response.data
                    userDados.nome = data.nome;
                    userDados.endereco = data.endereco;
                    userDados.telefone = data.telefone;

                    // Altera os dados salvos.
                    save(USER_CURRENTY, userDados);
                    // Limpa os campos onde o usuario digitou.
                    setEndereco('');
                    setNome('');
                    setTelefone('');

                    ToastAndroid.show('Dados atualizados com sucesso!', ToastAndroid.SHORT);
                }
            } catch (error) {
                ToastAndroid.show('Erro, tente novamente mais tarde!', ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('Insira algum dado para alterar!', ToastAndroid.SHORT);
        }
    }
    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Configurações' />
            <View style={styles.mainContainer}>
                <KeyboardAvoidingView>
                    <Card containerStyle={styles.card}>
                        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <IconMaterial
                                name='user-circle-o'
                                size={100}
                                color='black'
                                style={styles.icon_user}
                            />
                            <Text style={styles.text} >{userDados.email}</Text>
                            <Input
                                leftIcon={
                                    <IconFont
                                        name='user'
                                        size={15}
                                        color='black'
                                        style={styles.icons}
                                    />
                                }
                                placeholder={userDados.nome}
                                autoCapitalize='words'
                                value={nome}
                                onChangeText={setNome}
                                containerStyle={styles.input}
                            />
                            
                            <Input
                                leftIcon={
                                    <IconFont
                                        name='phone'
                                        size={15}
                                        color='black'
                                        style={styles.icons}
                                    />
                                }
                                placeholder={userDados.telefone}
                                keyboardType='phone-pad'
                                value={telefone}
                                onChangeText={setTelefone}
                                containerStyle={styles.input}
                            />
                            <Input
                                leftIcon={
                                    <IconFont
                                        name='address-card'
                                        size={15}
                                        color='black'
                                        style={styles.icons}
                                    />
                                }
                                placeholder={userDados.endereco}
                                autoCapitalize='words'
                                value={endereco}
                                onChangeText={setEndereco}
                                containerStyle={styles.input}

                            />
                            <View style={styles.forgotContainer}>
                                <Button
                                    buttonStyle={styles.button}
                                    title='Alterar senha'
                                    onPress={_ => { props.navigation.navigate('AlterarSenha') }}
                                    titleStyle={styles.titleStyle}
                                />
                                <Button
                                    buttonStyle={styles.button}
                                    title='Salvar Configurações'
                                    onPress={enviaDados}
                                    titleStyle={styles.titleStyle}
                                />

                            </View>
                        </View>
                    </Card>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

ConfiguracoesCliente.navigationOptions = {
    drawerLabel: 'Configurações',
    drawerIcon: ({ focused, tintColor }) => (
        <IconFont
            name='cogs'
            size={20}
            color='black'
            style={styles.iconsDrawer}
        />
    )
}

const styles = StyleSheet.create({

    card: {
        width: '93%',
        borderRadius: 10,
        backgroundColor: '#FFF',

    },
    mainContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    text: {
        textAlign: 'center',
        marginBottom: 10,
    },
    forgotContainer: {
        marginTop: 10,
    },
    button: {
        width: 150,
        marginTop: 10,
        backgroundColor: '#0f6124',
    },
    titleStyle: {
        fontFamily: 'Roboto-Thin',
    },
    icon_user: {
        paddingBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    icons:{
        marginRight: 5,
        paddingRight: 5,
    }
});

export default ConfiguracoesCliente;