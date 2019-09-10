import React, { useState } from 'react';
import { KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';

import { Card, Button, Input } from "react-native-elements";
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";

export default Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        
    };

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
                            placeholder="Digite sua senha"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                        />    
                        <View style={styles.forgotContainer}>
                            <Button 
                                title="Entrar"
                                onPress={handleSubmit}
                                buttonStyle={styles.button}
                            />
                            <Button 
                                title="Cadastrar-se"
                                buttonStyle={styles.button}
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
		width: 400,
		paddingTop: 10,
        marginBottom: 20,
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
        backgroundColor: "#76DC4E",
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