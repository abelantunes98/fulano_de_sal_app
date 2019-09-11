import React, {useState} from 'react';
import { KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native';

import { Card, Button, Input } from "react-native-elements";
import IconFont from 'react-native-vector-icons/FontAwesome';
  
const Login = (props)=>{
    const [email, setEmail]= useState('');
    const [senha, setSenha]= useState('');

    function handler_entrar(){
        ToastAndroid.show("Email: " + email + " Senha: " + senha, ToastAndroid.SHORT);
    }
        
    return (
        <ScrollView contentContainerStyle={ styles.mainContainer }>
            <KeyboardAvoidingView>
                <View style={ styles.infoContainer }>
                    <Card containerStyle={ styles.inforCard }>
                        <Text style={{ textAlign: "center", fontSize: 28 }}>Entrar</Text>
                        <Text style={styles.text} >Email</Text>
                        <Input
                            leftIcon={
                                <IconFont
                                     name='envelope'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder="Digite seu email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={(email)=>{setEmail(email)}}
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
                            placeholder="Digite sua senha"
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            value={senha}
                            onChangeText={(senha)=>{setSenha(senha)}}
                        />    
                        <View style={styles.forgotContainer}>
                            <Button 
                                title="Entrar"
                                buttonStyle={styles.button}
                                onPress={handler_entrar}                         
                            />
                            <Button
                                title="Cadastrar-se"
                                buttonStyle={styles.button}
                                onPress={()=>{props.navigation.navigate('Cadastro')}}
                            />
                        </View>
                        <Button 
                            title="Esqueceu a senha ?"
                            type="clear"
                            buttonStyle={styles.btnEsqueceuSenha}
                        />
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow : 1, 
        justifyContent : 'center',
    },
    infoContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	inforCard: {
        width: "97%",
	},
    loginForm: {
    },
    input: {
    },
    text: {
        paddingTop: 10,
        fontSize: 16,
    },
    forgotContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    button: {
        marginTop: 10,
        backgroundColor: "#0f6124",
        width: 115,
    },
    btnEsqueceuSenha: {
        marginTop: 10,
    },
    icons: {
        paddingRight: 10,
    },
    forgotButton: {
    },
});