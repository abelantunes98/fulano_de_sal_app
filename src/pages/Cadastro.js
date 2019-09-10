import React, {Component} from 'react';
import { KeyboardAvoidingView,
    StyleSheet,
    Text,
	View,
	ScrollView
} from 'react-native';

import { Card, Button, Input } from "react-native-elements";
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";

class Cadastro extends Component {
   constructor(props){
	   super(props);
   }

   render(){
		return (
			<ScrollView contentContainerStyle={ styles.mainContainer }>
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
									buttonStyle={styles.buttonCancel}
									onPress={()=>{this.props.navigation.navigate('Login')}}
								/>
							</View>
						</Card>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
};
export default Cadastro;

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
		width: "97%"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
	button: {
		marginTop: 10,
        backgroundColor: "#0f6124",
        width: 115,
	},
	buttonCancel: {
		marginTop: 10,
        backgroundColor: "#82080a",
        width: 115,
	},
	text: {
		paddingTop: 10
	},
	input: {
	},
	icons: {
		paddingRight: 10
	},
})