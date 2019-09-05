
import React, { useState } from 'react';
import { KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';


export default Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView style={styles.loginForm}>
            <TextInput
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.email}
                textContentType="emailAddress"
            />
            <TextInput
                autoCapitalize='none'
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                style={styles.password}
                textContentType="password"
            />
            <TouchableOpacity style={styles.loginButton}>
               <Text>Entrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    loginForm: {

    },
    email: {

    },
    password: {

    },
    loginButton: {

    },
});