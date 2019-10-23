import React, { useEffect, useState } from 'react';
import {
    View,
    ToastAndroid,
    StyleSheet,
    KeyboardAvoidingView,
    Text,
    Modal,
    ScrollView,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { save, find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import { Button, Input, Card } from 'react-native-elements';
import api from '../../../services/api';
import { criptografar } from '../../../services/criptografia';
import {lancaNotificacao} from '../../../services/pushNotification';

const ConfiguracoesCliente = (props) => {

    const [userDados, setUserDados] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    //Dados Modal
    const [modalVisible,setModalVisible] = useState(false);
    const [loadModal,setLoadModal] = useState(false);

    const [novaSenha, setNovaSenha] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha2, setNovaSenha2] = useState('');

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
                ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show('Insira algum dado para alterar!', ToastAndroid.SHORT);
        }
    }

    enviaDados = async () => {
        setLoadModal(true);
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
            setLoadModal(false);
        }
        else if (senhaCriptografada != userDados.senha) {
            ToastAndroid.show('A senha informada está incorreta!', ToastAndroid.SHORT);
            setLoadModal(false);
        } else if (novaSenha != novaSenha2) {
            ToastAndroid.show('As senhas informadas não conferem!', ToastAndroid.SHORT);
            setLoadModal(false);
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
                    userDados.senha = data.senha;

                    save(USER_CURRENTY, userDados);
                    // Limpando os campos.
                    setNovaSenha2('');
                    setNovaSenha('');
                    setSenhaAtual('');

                    ToastAndroid.show('Senha atualizada com sucesso!', ToastAndroid.SHORT);
                    setLoadModal(false);
                    setModalVisible(false);
                }
            } catch (error) {
                // Erro no servidor.
                ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
                setLoadModal(false);
            }
        }
    }

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Configurações' />

            <Modal
				style = {stylesModal.modal}
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
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={stylesModal.title}>Alterar Senha</Text>
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
                                        title='Cancelar'
                                        titleStyle={styles.titleStyle}
										buttonStyle={stylesModal.button}
										onPress={()=>{
											setModalVisible(false);
											setLoadModal(false);
										}}
									/>
                                    <Button
                                        title='Confirmar'
                                        buttonStyle={stylesModal.button}
                                        onPress={enviaDados}
                                        titleStyle={styles.titleStyle}
                                        loading={loadModal}
                                    />
                                </View>
							</Card>
						</ScrollView> 
						</View>
			</Modal>

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
                                    onPress={_ => {lancaNotificacao('Titulo teste', 'Testando notificação', 2)}} //setModalVisible(true)
                                    titleStyle={styles.titleStyle}
                                />
                                <Button
                                    buttonStyle={styles.button}
                                    title='Atualizar'
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
		flex:1,
		flexDirection:'column',
        justifyContent: 'center',
		alignItems: 'center',
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

const styles = StyleSheet.create({

    card: {
        width: '93%',
        borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
        width: 115,
        margin: 10,
        padding:5,
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