import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    ToastAndroid,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { save, find } from '../../../services/banco';
import { criptografar } from '../../../services/criptografia';
import { USER_CURRENTY } from '../../../services/key';
import { Button, Input } from 'react-native-elements';
import api from '../../../services/api';

const AlterarSenhaCliente = (props) => {

    const [userDados, setUserDados] = useState([]);
    const [novaSenha, setNovaSenha] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha2, setNovaSenha2] = useState('');

    useEffect(() => {
        carregarDados();
        setNovaSenha2('');
        setNovaSenha('');
        setSenhaAtual('');
    }, []);

    carregarDados = async () => {
        let userDadosRet = await find(USER_CURRENTY);
        setUserDados(userDadosRet);
    }

    enviaDados = async () => {
        let nomeEnviar = userDados.nome;
        let enderecoEnviar = userDados.endereco;
        let telefoneEnviar = userDados.telefone;
        let emailEnviar = userDados.email;
        let senhaEnviar = userDados.senha;

        /*
         Verificando se a senha digitada está correta e se as novas senhas digitadas são iguais, caso tudo
         ocorra bem, efetua a troca.
        */
        let senhaCriptografada = await criptografar(senhaAtual);
        if (senhaAtual == '' && novaSenha == '' && novaSenha2 == '') {
            ToastAndroid.show('Informe os dados!', ToastAndroid.SHORT);
        }
        else if (senhaCriptografada != userDados.senha) {
            ToastAndroid.show('A senha informada está incorreta!', ToastAndroid.SHORT);
        } else if (novaSenha != novaSenha2) {
            ToastAndroid.show('As senhas informadas não conferem!', ToastAndroid.SHORT);
        } else {

            // Trocando a senha.
            senhaEnviar = await criptografar(novaSenha);
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

                    save(USER_CURRENTY, userDados);
                    // Limpando os campos.
                    setNovaSenha2('');
                    setNovaSenha('');
                    setSenhaAtual('');

                    ToastAndroid.show('Senha atualizada com sucesso!', ToastAndroid.SHORT);
                }
            } catch (error) {
                // Erro no servidor.
                ToastAndroid.show('Erro, tente novamente mais tarde!', ToastAndroid.SHORT);
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Alterar Senha' />
            <View style={styles.childContainerThree}>
                <Input
                    leftIcon={
                        <IconFont
                            name='user-secret'
                            size={15}
                            color='black'
                            style={styles.icons}
                        />
                    }
                    placeholder='Senha atual'
                    secureTextEntry={true}
                    containerStyle={styles.input}
                    secureTextEntry={true}
                    value={senhaAtual}
                    onChangeText={setSenhaAtual}
                />

                <Input
                    leftIcon={
                        <IconFont
                            name='user-secret'
                            size={15}
                            color='black'
                            style={styles.icons}
                        />
                    }
                    placeholder='Nova senha'
                    secureTextEntry={true}
                    containerStyle={styles.input}
                    secureTextEntry={true}
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                />

                <Input
                    leftIcon={
                        <IconFont
                            name='user-secret'
                            size={15}
                            color='black'
                            style={styles.icons}
                        />
                    }
                    placeholder='Confirme a nova senha'
                    secureTextEntry={true}
                    containerStyle={styles.input}
                    secureTextEntry={true}
                    value={novaSenha2}
                    onChangeText={setNovaSenha2}
                />
            </View>
            <View style={styles.forgotContainer}>
                <Button
                    title='Confirmar'
                    buttonStyle={styles.button}
                    onPress={enviaDados}
                    titleStyle={styles.titleStyle}
                />
                <Button
                    icon={
                        <IconMaterial
                            name='cancel'
                            size={15}
                            color='white'
                            style={styles.icons}
                        />
                    }
                    iconLeft
                    title='Cancelar'
                    buttonStyle={styles.buttonCancel}
                    onPress={_ => { props.navigation.navigate('Configuracoes') }}
                    titleStyle={styles.titleStyle}
                />
            </View>
        </View>
    )
}


AlterarSenhaCliente.navigationOptions = {
    // Linha mágica que removeu a rota do Drawer navigation.
    drawerLabel: () => null
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    // imagem
    childContainerTwo: {
        height: '25%',
        alignItems: "center",
        justifyContent: "center",
    },
    // informações
    childContainerThree: {
        height: '40%',
        width: '100%',
    },
    button: {
        marginTop: 10,
        marginRight: '20%',
        backgroundColor: '#0f6124',
        width: 115,
    },
    buttonCancel: {
        marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        height: '25%'
    },
    imgHeader: {
        width: 100,
        height: 50,
    },
    imgMain: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    iconsDrawer: {
        paddingRight: 2
    },
});

export default AlterarSenhaCliente;