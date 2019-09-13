import React, {useState} from 'react';
import { 
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/styles';

import api from '../../services/api'

const Login = (props) => {
    const [email, setEmail]= useState('');
    const [senha, setSenha]= useState('');

    async function handler_entrar(){
        try {
            const response = await api.post('/usuario/login/', {email, senha});
            
            // O response ja eh retornado como um JSON com status, data, etc.
            if (response.status == 200) {
                const responseData = response.data;
                ToastAndroid.show('Login efetuado!\nOlá ' + responseData.nome + '!', ToastAndroid.SHORT);
            }

            else {
                ToastAndroid.show(`Erro, tente novamente mais tarde.`, ToastAndroid.SHORT);
            }
            
        } catch (error) {
            // error.response tambem eh um JSON com status, data, etc.
            if (error.response) {

                responseError = error.response;
                if (responseError.status == 403) {
                    ToastAndroid.show(`A senha inserida está incorreta.`, ToastAndroid.SHORT);
                }
            
                else if (responseError.status == 404) {
                    ToastAndroid.show(`O E-mail inserido não está cadastrado.`, ToastAndroid.SHORT);
                }

                // Eh feito o request mas recebe um erro desconhecido.
                else {
                    ToastAndroid.show(`Desculpe, estamos com problemas no servidor.`, ToastAndroid.SHORT);
                }
            }
            
            // Nao consegue efetuar o request.
            else {
                ToastAndroid.show(`Erro ao contatar o servidor.`, ToastAndroid.SHORT);
            }
        }  
    }
        
    return (
        <ScrollView contentContainerStyle={ styles.mainContainer }>
            <KeyboardAvoidingView>
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
        </ScrollView>
    );
};

export default Login;