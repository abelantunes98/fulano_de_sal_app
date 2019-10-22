import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ToastAndroid,
    StyleSheet,
    ProgressBarAndroid,
    KeyboardAvoidingView,
    Modal,
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
import { ScrollView } from 'react-native-gesture-handler';

const PerfilAdmin = (props) => {
    const [admin, setAdmin] = useState({});
    const [nome, setNome] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenhaConf, setNovaSenhaConf] = useState('');
    const [loading, setLoadind] = useState(false);
    const [load,setLoad] = useState(false);

    //dados Modal

    const [modalVisible,setModalVisible] = useState(false);
	const [loadModal, setLoadModal] = useState(false);
    const [cadastrando,setCadastrando] = useState(false);
    const [senhaAdmin, setSenhaAdmin] = useState('');
    const [confirmSenhaAdmin,setConfirmSenhaAdmin] = useState('');
    const [nomeAdmin, setNomeAdmin] = useState('');
    const [emailAdmin,setEmailAdmin] = useState('');


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

    handler_cadastrar = async () => {
        setLoadModal(true);

        if(senhaAdmin!='' && confirmSenhaAdmin != ''){
            if(senhaAdmin==confirmSenhaAdmin){
                let usuario = await find(USER_CURRENTY);
		
                let admin = {
                    'email': emailAdmin,
                    'nome': nomeAdmin,
                    'senha': await criptografar(senhaAdmin),
                }

                try {
                    await api.post(
                        '/protegido/administrador/', 
                        admin,
                        { 
                            headers: {
                                Authorization: usuario.token
                            }
                        }
                    );
                    ToastAndroid.show("Administrador criado!", ToastAndroid.SHORT);
                    setLoadModal(false);
                    setModalVisible(false);
                } catch(error) {
                    // alguma informacao incorreta, a api devolve a msg de erro.
                    ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
                    setLoadModal(false);
                }
            }else{
                ToastAndroid.show("Senhas não coincidem!", ToastAndroid.SHORT);
                setLoadModal(false);
            }
        }else{
            ToastAndroid.show("Senhas não informadas!", ToastAndroid.SHORT);
            setLoadModal(false);
        }       
	}

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Perfil'/>
            <View style={ styles.mainContainer }>

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
								<Text style={stylesModal.title}>Cadastrar Administrador</Text>
								
								<Text style={stylesModal.inputTitle}>Nome</Text>
								<Input
									placeholder='Nome'
									value={nomeAdmin}
									onChangeText={setNomeAdmin}
			
								/>

                                <Text style={stylesModal.inputTitle}>Email</Text>
								<Input
									placeholder='Email'
									value={emailAdmin}
									onChangeText={setEmailAdmin}
									

								/>

								<Text style={stylesModal.inputTitle}>Senha</Text>
								<Input
									placeholder='Senha'
									value={senhaAdmin}
									onChangeText={setSenhaAdmin}
									secureTextEntry={true}
								/>

								<Text style={stylesModal.inputTitle}>Confirmar Senha</Text>
								<Input
									placeholder='Confirmar Senha'
									value={confirmSenhaAdmin}
                                    onChangeText={setConfirmSenhaAdmin}
                                    secureTextEntry={true}
								/>
								<View style={stylesModal.buttonContainer}>
									<Button
										title='Cadastrar'
                                        buttonStyle={styles.button}
										onPress={handler_cadastrar}
                                        loading={loadModal}
                                        titleStyle={styles.titleStyle}  
									/>
									<Button 
                                    title='Cancelar'
                                    buttonStyle={styles.button}
                                    onPress={_=>{setModalVisible(false)}}
                                    titleStyle={styles.titleStyle}  
							      />
									
								</View>
								</View>
							</Card>
						</ScrollView> 
						</View>
			</Modal>

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
                            <Button title='Atualizar' buttonStyle={styles.button} titleStyle={styles.titleStyle} onPress={alterarDados} loading={load}/>
                            <Button title='Novo' buttonStyle={styles.button} titleStyle={styles.titleStyle} onPress={_=>{setModalVisible(true)}}/>
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
        width:115,
		margin: 10,
        backgroundColor: '#0f6124',
    },
    titleStyle:{
        fontFamily: 'Roboto-Thin',
    },

    icons: {
		paddingRight: 10
    },

    buttonCancel: {
		marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
    },
    
    icon_user: {
        paddingBottom: 20,
    },
    input: {
        marginBottom: 10,
    }
});

export default PerfilAdmin;
