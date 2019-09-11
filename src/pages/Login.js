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
        
    }

    handleSubmit() {
        
    };

    

    render(){

        return (
            <ScrollView contentContainerStyle={ styles.mainContainer }>
                <KeyboardAvoidingView>
                    <View style={ styles.infoContainer }>
                        <Card containerStyle={ styles.inforCard }>
                            <Text style={{ 
                                fontFamily: "Oswald-Bold",
                                textAlign: "center", 
                                fontSize: 28 
                                }}>Entrar</Text>
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
                            />    
                            <View style={styles.forgotContainer}>
                                <Button 
                                    title="Entrar"
                                    textStyle={{ fontFamily: "Roboto-BlackItalic" }}
                                    buttonStyle={styles.button}
                                />
                                <Button 
                                    title="Cadastrar-se"
                                    textStyle={{ fontFamily: "Roboto-BlackItalic" }}
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
        fontFamily: "Oswald-Regular",
        paddingTop: 10,
        fontSize: 18,
        marginLeft: 5,
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
    }
});