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
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";

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
			<KeyboardAvoidingView>
				<View style={ styles.infoContainer }>
					<Card containerStyle={ styles.inforCard }>
						<Text style={{ textAlign: "center", fontSize: 28 }}>Cadastrar</Text>
						
						<Text style={styles.text} >Nome</Text>
						<Input
							leftIcon={
								<IconFont
									name='user'
									size={15}
									color='black'
									style={ styles.icons }
								/>
							}
							placeholder="Digite seu nome"
							autoCapitalize='words'
							value={name}
							onChangeText={setName}
							style={styles.input}
						/>

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
							style={styles.input}
						/>

						<Text style={styles.text} >Telefone</Text>
						<Input
							leftIcon={
								<IconFont
									name='phone'
									size={15}
									color='black'
									style={ styles.icons }
								/>
							}
							placeholder="Digite seu telefone"
							keyboardType="phone-pad"
							value={telNumber}
							onChangeText={setTelNumber}
							style={styles.input}
						/>

						<Text style={styles.text} >Endereço</Text>
						<Input
							leftIcon={
								<IconFont
									name='address-book'
									size={15}
									color='black'
									style={ styles.icons }
								/>
							}
							placeholder="Digite seu endereço"
							autoCapitalize='words'
							value={address}
							onChangeText={setAddress}
							style={styles.input}
						/>
						<View style={ styles.buttonContainer }>
							<Button 
								icon={
									<IconFont
										name='send'
										size={15}
										color='white'
										style={ styles.icons }
									/>
								}
								iconLeft
								// loading
								title="Cadastrar"
								buttonStyle={styles.button}
							/>
							<Button 
								icon={
									<IconMaterial 
										name='cancel'
										size={15}
										color='white'
										style={ styles.icons }
									/>
								}
								iconLeft
								title="Cancelar"
								buttonStyle={styles.button}
							/>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
    );
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingTop: 15
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

	icons: {
		paddingRight: 10
	},

	button: {
		marginTop: 10,
		backgroundColor: "#76DC4E"
	},
})