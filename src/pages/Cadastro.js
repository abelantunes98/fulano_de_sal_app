import React, { useState } from 'react';
import { KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default Cadastro = () => {
	const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [telNumber, setTelNumber] = useState('');
    const [address, setAddress] = useState('');

   	function handleSignUp() {
   	
   	}


    return (
        <View style={styles.mainContainer}>

            <KeyboardAvoidingView style={styles.signUpForm}>
            	<Text style={styles.inputText} >Nome</Text>
	            <TextInput
	                value={name}
	                onChangeText={setName}
	                style={styles.input}
	            />

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

            	<Text style={styles.inputText} >Telefone</Text>
	            <TextInput
	                autoCapitalize='none'
	                value={telNumber}
	                onChangeText={setTelNumber}
	                style={styles.input}
	            />

            	<Text style={styles.inputText} >Endereço</Text>
	            <TextInput
	                autoCapitalize='none'
	                value={address}
	                onChangeText={setAddress}
	                style={styles.input}
	            />
	            <TouchableOpacity 
	            	style={styles.signUpButton}
	            	onPress={handleSignUp}
	            >
	               <Text>Cadastrar</Text>
	            </TouchableOpacity>
	            <TouchableOpacity style={styles.signUpCancel}>
	               <Text>Cancelar</Text>
	            </TouchableOpacity>
	        </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
	mainContainer: {

	},

	inputText: {

	},

	input: {

	},

	signUpButton: {

	},

	signUpCancel: {

	},
})