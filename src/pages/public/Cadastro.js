import React, { useState } from 'react';
import { 
	KeyboardAvoidingView,
    Text,
	View,
	ScrollView,
	ToastAndroid,
	Alert,
	StyleSheet,
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';
import { criptografar } from '../../services/criptografia';

const Cadastro = (props) => {
	const[nome, setNome] = useState('');
	const[email, setEmail] = useState('');
	const[senha, setSenha] = useState('');
	const[senhaConfirm, setSenhaConfirm] = useState('');
	const[telefone, setTelefone] = useState('');
	const[endereco, setEndereco] = useState('');
	const[load, setLoad] = useState(false);

	handler_cadastrar = async () => {
		setLoad(true);
		
		let cliente = {
			'email': email,
			'endereco': endereco,
			'nome': nome,
			'senha': await criptografar(senha),
			'telefone': telefone
		}

		try {
			await api.post('/publico/cliente/', cliente);
			Alert.alert(
				'Cadastro Realizado',
				'Confira seu email para confirmação do cadastro.',
				[
					{text: 'OK', onPress: () => props.navigation.navigate('LoginPage')},,
				],
				{
					cancelable: false
				},
			);
		} catch(error) {
			// alguma informacao incorreta, a api devolve a msg de erro.
			ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
		}

		setLoad(false);
	}

	return (
		<ScrollView contentContainerStyle={ styles.mainContainer }>
			<KeyboardAvoidingView>
				<View style={ styles.infoContainer }>
					<Card containerStyle={ styles.inforCard }>
						<Text style={{ 
							fontFamily: 'Oswald-Bold', 
							textAlign: 'center', 
							fontSize: 28 }}>Cadastrar
						</Text>

						<Text style={styles.text}>Nome</Text>
						<Input
							leftIcon={
								<IconFont
									name='user'
									size={15}
									color='black'
									style={ styles.icons }
								/>
							}
							placeholder='Digite seu nome'
							autoCapitalize='words'
							style={styles.input}
							value={nome}
							onChangeText={setNome}
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
							placeholder='Digite seu email'
							autoCapitalize='none'
							keyboardType='email-address'
							style={styles.input}
							value={email}
							onChangeText={setEmail}
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
							placeholder='Digite seu telefone'
							keyboardType='phone-pad'
							style={styles.input}
							value={telefone}
							onChangeText={setTelefone}
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
							placeholder='Digite seu endereço'
							autoCapitalize='words'
							style={styles.input}
							value={endereco}
							onChangeText={setEndereco}
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
							placeholder='Digite sua senha'
							secureTextEntry={true}
							style={styles.input}
							value={senha}
							onChangeText={setSenha}
						/>

						<Text style={styles.text} >Confirme a senha</Text>
						<Input
							leftIcon={
								<IconFont
									name='user-secret'
									size={15}
									color='black'
									style={ styles.icons }
								/>
							}
							placeholder='Digite novamente sua senha'
							secureTextEntry={true}
							style={styles.input}
							value={senhaConfirm}
							onChangeText={setSenhaConfirm}
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
								title='Cadastrar'
								buttonStyle={styles.button}
								onPress={()=>{
									if(senha===senhaConfirm){
										handler_cadastrar();
									}else{
										ToastAndroid.show("As senhas não correspondem.",ToastAndroid.SHORT);
									}
								}}
								titleStyle={styles.titleStyle} 
								loading={load} 
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
								title='Cancelar'
								buttonStyle={styles.buttonCancel}
								onPress={()=>{props.navigation.navigate('LoginPage')}}
								titleStyle={styles.titleStyle}  
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
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
	},
	infoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	inforCard: {
		width: '93%',
        borderRadius: 10
	},
	text: {
		fontFamily: 'Oswald-Regular',
		fontSize: 16,
		paddingTop: 10
	},
	icons: {
		paddingRight: 10
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	button: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
	},
	titleStyle:{
        fontFamily: 'Roboto-Thin'
	},
	buttonCancel: {
		marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
    },
});

export default Cadastro;