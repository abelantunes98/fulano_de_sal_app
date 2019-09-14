import React, {useState} from 'react';
import { 
    KeyboardAvoidingView,
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../styles/styles';
import { criptografar } from '../../services/criptografia';

import api from '../../services/api'

const Login = (props) => {
    const [load,setLoad] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    handler_entrar = async () => {
        setLoad(true);
        try {
            let senhaCriptografada = criptografar(senha);
            const response = await api.post('/usuario/login/', {
                "email":email, 
                "senha":senhaCriptografada
            });
            
            // O response ja eh retornado como um JSON com status, data, etc.
            if (response.status == 200) {
                const responseData = response.data;
                ToastAndroid.show('Login efetuado!\nOlá ' + responseData.nome + '!', ToastAndroid.SHORT);
            }
        } catch (error) {
            //Qualquer status diferente de 200 entra no catch e a api retorna a mensagem específica atraves das exceções lançadas
            ToastAndroid.show(error.response.data['message'],ToastAndroid.SHORT);
        } 
        setLoad(false); 
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
        </ScrollView>
    );
};

export default Login;