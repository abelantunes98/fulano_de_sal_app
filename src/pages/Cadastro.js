import React, { useState } from 'react';
import { KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
	View,
	ScrollView
} from 'react-native';

import { Card, Button, Input } from "react-native-elements";

export default Cadastro = () => {
	const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [telNumber, setTelNumber] = useState('');
    const [address, setAddress] = useState('');

   	function handleSignUp() {
   	
   	}

    return (
		<ScrollView style={styles.mainContainer}>
			<View style={ styles.infoContainer }>
				<Card containerStyle={ styles.inforCard }>
					<Text style={{ textAlign: "center", fontSize: 28 }}>Cadastrar</Text>
					
					<Text style={styles.text} >Nome</Text>
					<Input
                        placeholder="Digite seu nome"
                        autoCapitalize='none'
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
					/>

					<Text style={styles.text} >Email</Text>
					<Input
                        placeholder="Digite seu email"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
					/>

					<Text style={styles.text} >Senha</Text>
					<Input
                        placeholder="Digite sua senha"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                    />

					<Text style={styles.text} >Telefone</Text>
					<Input
                        placeholder="Digite seu telefone"
                        autoCapitalize='none'
                        value={telNumber}
                        onChangeText={setTelNumber}
                        style={styles.input}
                    />

					<Text style={styles.text} >Endereço</Text>
					<Input
                        placeholder="Digite seu endereço"
                        autoCapitalize='none'
                        value={address}
                        onChangeText={setAddress}
                        style={styles.input}
					/>
					<View style={ styles.buttonContainer }>
						<Button 
							title="Cadastrar"
							buttonStyle={styles.button}
						/>
						<Button 
							title="Cancelar"
							buttonStyle={styles.button}
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
	buttonContainer: {
		marginTop: 10,
	},
	text: {
		paddingTop: 10
	},

	input: {
	},

	button: {
		marginTop: 10
	},
})