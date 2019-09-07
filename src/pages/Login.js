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

export default Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={ styles.infoContainer }>
                <Card containerStyle={ styles.inforCard }>
                    <Text style={{ textAlign: "center", fontSize: 28 }}>Login</Text>
                    <Text style={styles.text} >Email</Text>
                    <Input
                        placeholder="Digite seu Email"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <Text style={styles.text} >Senha</Text>
                    <Input
                        placeholder="Digite sua Senha"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={setPassword}
                        containerStyle={styles.input}
                        secureTextEntry={true}
                    />    
                    <View style={styles.forgotContainer}>
                        <Button 
                            title="Entrar"
                            onPress={handleSubmit}
                            buttonStyle={styles.btnEntrar}
                        />
                        <Button 
                            title="Esqueci a senha"
                            buttonStyle={styles.btnEntrar}
                        />
                        <Button 
                            title="Cadastrar-se"
                            buttonStyle={styles.btnEntrar}
                        />
                        <Button 
                            title="Entrar com Google"
                            buttonStyle={styles.btnEntrar}
                        />
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20
    },
    infoContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	inforCard: {
		width: 300,
		paddingTop: 10,
		marginBottom: 20,
	},
    loginForm: {
    },
    input: {
    },
    text: {
        paddingTop: 10,
        fontSize: 16
    },
    btnEntrar: {
        marginTop: 10
    },
    forgotContainer: {
        marginTop: 10
    },
    forgotButton: {
    },
});