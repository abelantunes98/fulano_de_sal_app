
import React, { useState } from 'react';
import { KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';


export default Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        
    };

    return (
        <View style={styles.mainContainer}>

            {
                //<Image src={logo}></Image>
            }            

            <KeyboardAvoidingView style={styles.loginForm}>
                <Text style={styles.inputText} >Email</Text>
                <TextInput
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <Text style={styles.inputText} >Senha</Text>
                <TextInput
                    autoCapitalize='none'
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={handleSubmit}
                >
                   <Text>Entrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <View style={styles.forgotContainer}>
               <TouchableOpacity style={styles.forgotButton}>
               <Text>Esqueci a senha</Text>
               </TouchableOpacity> 
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    mainContainer: {

    },
    loginForm: {

    },
    input: {

    },
    loginButton: {

    },
    forgotContainer: {

    },
    forgotButton: {

    },
});