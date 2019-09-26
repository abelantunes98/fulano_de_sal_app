import React, {useState, useEffect} from 'react';
import { 
    KeyboardAvoidingView,
    Text,
    View,
    ScrollView,
    ToastAndroid,
    Alert,
    ProgressBarAndroid
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/styles';
import { criptografar } from '../../services/criptografia';
import api from '../../services/api';
import { save, find } from '../../services/banco';
import { USER_CURRENTY } from '../../services/key';

const Login = (props) => {
    const [load,setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loginSave,setLoginSave] = useState(true);

    useEffect(()=>{
        loadUser();
    });

    async function loadUser(){
        let usuario = await find(USER_CURRENTY);
        if(usuario != null){
            
            const response = await api.post('/publico/usuario/login/', {
                'email':usuario.email, 
                'senha':usuario.senha
            });

            if (response.status == 200) {
                let responseData = response.data
                
                save(USER_CURRENTY, responseData);

                let usuario = await find(USER_CURRENTY);
                redireciona(usuario);
            }
        }else{
            setLoginSave(false);
        }
    }

    async function redireciona(usuario) {
        if (usuario.cadastroPendente) {
            Alert.alert(
                'Confirmação pendente',
                'Confira seu email para confirmação do cadastro.',
                    [{text:'Reenviar email',onPress:()=>{reenviarEmail(usuario.email)}},
                    {text: 'OK'},
                  ],
                {cancelable: false},
              );
        } else {          
            let paginaDestino = 'homeClienteNavigatorPage';
            if (usuario.tipo === 'ADMINISTRADOR') {
                paginaDestino = 'homeAdminNavigatorPage';
            }
            props.navigation.navigate(paginaDestino);
        }
    }

    async function reenviarEmail(email){
        try {
            const response = await api.get('/publico/usuario/reenviarEmail', {
                params: {
                    emailSender:email
                 }
            });
            ToastAndroid.show("Email enviado",ToastAndroid.SHORT);
        } catch(e) {
            ToastAndroid.show("Erro ao tentar reenviar",ToastAndroid.SHORT);
        }
    }

    async function handler_entrar() {
        setLoad(true);
        try {

            let senhaCriptografada = await criptografar(senha);
            const response = await api.post('/publico/usuario/login/', {
                'email':email, 
                'senha':senhaCriptografada
            });
            
            // O response ja eh retornado como um JSON com status, data, etc.
            if (response.status == 200) {
                let responseData = response.data
               
                save(USER_CURRENTY, responseData);

                let usuario = await find(USER_CURRENTY);
                
                redireciona(usuario);
            }
        } catch (error) {
            //Qualquer status diferente de 200 entra no catch e a api retorna a mensagem específica atraves das exceções lançadas
            ToastAndroid.show(error.response.data['message'],ToastAndroid.SHORT);
        }
    }
        
    return (
        <ScrollView contentContainerStyle={ styles.mainContainer }>
            {!loginSave && <KeyboardAvoidingView>
                <View style={ styles.infoContainer }>
                    <Card containerStyle={ styles.inforCard }>
                        <Text style={{ 
                            fontFamily: 'Oswald-Bold', 
                            textAlign: 'center', 
                            fontSize: 28 }}>Entrar</Text>
                        <Text style={
                            styles.text} >Email</Text>
                        <Input
                            leftIcon={
                                <IconFont
                                    name='envelope'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Digite seu email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                        <Text style={styles.text} >Senha</Text>
                        <Input
                            leftIcon={
                                <IconFont
                                    name='user-secret'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Digite sua senha'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={setSenha}
                        />    
                        <View style={styles.forgotContainer}>
                            <Button 
                                title='Entrar'
                                buttonStyle={styles.button}
                                onPress={handler_entrar}  
                                titleStyle={styles.titleStyle} 
                                loading={load}
                            />
                           
                            <Button
                                title='Cadastrar-se'
                                buttonStyle={styles.button}
                                onPress={_=>{props.navigation.navigate('CadastroPage')}}
                                titleStyle={styles.titleStyle}  
                            />
                        </View>
                        <Button 
                            title='Esqueceu a senha?'
                            type='clear'
                            buttonStyle={styles.btnEsqueceuSenha}
                            onPress={_=>{props.navigation.navigate('SolicitacaoRecuperacaoPage')}}
                        />
                    </Card>
                </View>
                
            </KeyboardAvoidingView>
            }
            {loginSave &&  <ProgressBarAndroid />}
        </ScrollView>
    );
};

export default Login;