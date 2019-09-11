import React, {Component} from 'react';
import { KeyboardAvoidingView,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

import { Card, Button, Input } from "react-native-elements";
import IconFont from 'react-native-vector-icons/FontAwesome';
  
class Login extends Component {

    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);   
    }

    // Funcao que verifica mudanca nos campos de texto.
    handleChange(event = {}) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;
      
        this.setState({name: value});
      }

    handleSubmit() {
        
    };

    render(){

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
                                // Passando os valores do input para um state.
                                onChangeText={(value) => {this.setState({emailLogin: value})}}
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
                                // Passando os valores do input para um state.
                                onChangeText={(value) => {this.setState({passwordLogin: value})}}
                            />    
                            <View style={styles.forgotContainer}>
                                <Button 
                                    title="Entrar"
                                    buttonStyle={styles.button}
                                    // Fazer funcao que verifica se algo foi digitado em ambos os campos.
                                    // Determina o que fazer apos precionar o botao "Entrar".
                                    //onPress={()=>{alert(this.state.passwordLogin)}} 
                                />
                                <Button 
                                    title="Cadastrar-se"
                                    buttonStyle={styles.button}
                                    onPress={()=>{this.props.navigation.navigate('Cadastro')}}
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
    }
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