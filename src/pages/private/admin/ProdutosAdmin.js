import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet, ToastAndroid,
	ScrollView, Alert, ProgressBarAndroid, Modal, Picker
} from 'react-native';
import { Card, Button, Input } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';
import IconButton from 'react-native-vector-icons/FontAwesome';


const ProdutosAdmin = (props) => {

	const [load, setLoad] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [cadastrando, setCadastrando] = useState(false);

	const [loadModal, setLoadModal] = useState(false);
	const [nome, setNome] = useState('');
	const [idProduto, setIdProduto] = useState('');
	const [categoriaSelecionada, setCategoriaSelecionada] = useState('');


	useEffect(() => {
		preLoad();
	}, [modalVisible]);

	preLoad = async () => {
		setLoad(true);
		await loadRepositories();
		await loadCategorias();
		setLoad(false);
	}

	loadRepositories = async () => {
		let usuario = await find(USER_CURRENTY);
		const response = await api.get('/protegido/produto/listar', {
			headers: { Authorization: usuario.token }
		});
		setData(response.data);
	};

	loadCategorias = async () => {
		let usuario = await find(USER_CURRENTY);
		const response = await api.get('/protegido/categoria/listar', {
			headers: { Authorization: usuario.token }
		});
		setCategorias(response.data);
	};

	function pickerChange(index) {
		categorias.map((v, i) => {
			if (index === i) {
				setCategoriaSelecionada({ id: v.id, descricao: v.descricao });
			}
		})
	};

	handle_cadastro = async () => {

		try {
			setLoadModal(true);
			let usuario = await find(USER_CURRENTY);
			await api.post('/protegido/produto/',
				{ 'idCategoria': categoriaSelecionada.id, 'nome': nome },
				{
					headers: { Authorization: usuario.token }
				});
			ToastAndroid.show("Produto cadastrado com sucesso", ToastAndroid.SHORT);
			setLoadModal(false);
			setModalVisible(false);

		} catch (error) {
			ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
		}


	}
	handle_editar = async () => {
		try {
			setLoadModal(true);
			let usuario = await find(USER_CURRENTY);
			await api.post('/protegido/produto/atualizar',
				{
					'categoria': {
						'descricao': categoriaSelecionada.descricao,
						'id': categoriaSelecionada.id
					},
					'nome': nome,
					'idProduto': idProduto
				},
				{
					headers: { Authorization: usuario.token }
				});
			setLoadModal(false);
			setModalVisible(false);

			ToastAndroid.show('Produto editado com sucesso', ToastAndroid.SHORT)
		} catch (error) {
			ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
		}
	};

	renderItem = ({ item }) => (
		//Eduardo: melhorei, como é só uma estilização, deixei aqui mesmo
		//Se achar melhor, coloca lá em styles. Só mudar o num ae
		<View style={{ marginBottom: 20 }}>
			<Card containerStyle={styles.listItem}>
				<View style = {styles.items}>
					<View style={styles.buttons}>
						<Button
							buttonStyle={styles.button}
							icon={
								<IconButton
									name='pencil'
									size={15}
									color='#000000'
									style={styles.iconsDrawer}
								/>
							}
							onPress={() => openEditaPopUpProduto(item)}

						/>
						<Button
							buttonStyle={styles.button}
							icon={
								<IconButton
									name='trash-o'
									size={15}
									color='#000000'
									style={styles.iconsDrawer}
								/>
							}
							onPress={() => deleteProduto(item.idProduto, item.nome)}

						/>
					</View>
					<View style = {styles.texto}>
						<Text style={styles.nome}>{item.nome}</Text>
						<Text style={styles.categoria}>{item.categoria.descricao}</Text>
					</View>
				</View>
			</Card>
		</View>
	);

	function deleteProduto(id, nome) {
		Alert.alert(
			`Deletar '${nome}'`,
			'Tem certeza que deseja deletar esse produto?',
			[
				{ text: 'Não' },
				{ text: 'Sim', onPress: () => loadDeleteProduto(id) },
			],
		);
	};
	async function loadDeleteProduto(id) {
		try {
			let usuario = await find(USER_CURRENTY);
			await api.delete('/protegido/produto/remover',
				{
					headers: { Authorization: usuario.token },
					params: { 'id': parseInt(id) }
				}
			);
			ToastAndroid.show("Deletado com sucesso", ToastAndroid.show);
			preLoad();
		} catch (e) {
			ToastAndroid.show(e.response.data['message'],ToastAndroid.SHORT)
		}
	};

	openCadastroPopUpProduto = () => {
		setCategoriaSelecionada(categorias[0]);
		setNome('');

		setCadastrando(true);
		setModalVisible(true);

	};

	openEditaPopUpProduto = (item) => {
		setIdProduto(item.idProduto);
		setNome(item.nome);
		setCategoriaSelecionada(item.categoria);

		setCadastrando(false);
		setModalVisible(true);

	};

	return (
		<View style={styles.mainContainer}>
			<MenuButton navigation={props.navigation} title='Produtos' />
			<View style={styles.mainContainer}>

				<Modal
					style={stylesModal.modal}
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					presentationStyle={'overFullScreen'}
					onOrientationChange={'portrait'}
					onRequestClose={() => {
						setModalVisible(false);
					}}>
					<View style={stylesModal.viewModal}>
						<ScrollView>
							<Card containerStyle={stylesModal.card}>
								<View style={{ justifyContent: 'center', alignItems: 'center' }}>
									{!cadastrando && <Text style={stylesModal.title}>Editar Produto</Text>}
									{cadastrando && <Text style={stylesModal.title}>Cadastrar Produto</Text>}
									<Input
										placeholder='Nome do produto'
										value={nome}
										onChangeText={setNome}
									/>
									<Text style={stylesModal.inputTitle}>Categoria</Text>
									<Picker
										selectedValue={categoriaSelecionada.descricao}
										style={{ height: 50, width: 300 }}
										onValueChange={(itemValue, itemIndex) => {
											pickerChange(itemIndex);
										}}>
										{categorias.map(v => {
											return (<Picker.Item key={v.id} label={v.descricao} value={v.descricao} />);
										})}
									</Picker>
									<View style={stylesModal.buttonContainer}>
										<Button
											title='Cancelar'
											buttonStyle={stylesModal.button}
											onPress={() => {
												setModalVisible(false);
												setLoadModal(false);
											}}
										/>
										{cadastrando &&
											<Button
												title='Cadastrar'
												buttonStyle={stylesModal.button}
												onPress={handle_cadastro}
												loading={loadModal}
											/>}
										{!cadastrando &&
											<Button
												title='Editar'
												buttonStyle={stylesModal.button}
												onPress={handle_editar}
												loading={loadModal}
											/>
										}
									</View>
								</View>
							</Card>
						</ScrollView>
					</View>
				</Modal>
				{!load &&
						<FlatList
							style={{ marginTop: 10 }}
							contentContainerStyle={styles.list}
							data={data}
							renderItem={renderItem}
							keyExtractor={item => item.idProduto.toString()}
							ListFooterComponent={View}
							ListFooterComponentStyle={{height:100}}
						/>
				}{load && <ProgressBarAndroid />}
				<TouchableOpacity style={styles.floatButton} onPress={openCadastroPopUpProduto}>
					<IconButton
						name='plus'
						size={20}
						color='#ffffff'
						style={styles.iconsDrawer}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

ProdutosAdmin.navigationOptions = {
	drawerLabel: 'Produtos',
	drawerIcon: ({ focused, tintColor }) => (
		<IconMaterial
			name='tags'
			size={20}
			color='black'
			style={styles.iconsDrawer}
		/>
	)
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: "#FEFEFE"
	},
	nome: {
		fontWeight: 'bold',
		fontSize: 16
	},
	categoria: {
		color: '#FFFFFF',
		borderRadius:4,
		backgroundColor: "green",
		fontWeight: 'bold',
		fontSize: 10,
		padding:3,
		marginTop:6
	},
	list: {
		paddingTop: 10,
		paddingHorizontal: 16,
		
	},
	items:{
		flexDirection:'row-reverse',
		width:'100%',
		aspectRatio: 4/1
	},
	texto:
	{	alignItems:'flex-start',
		flexDirection:'column',
		justifyContent:'flex-end',
		width: '70%'
	},
	button: {
		backgroundColor: '#FFF',
		borderRadius: 100,
		height: 30,
		width: 30,
		marginLeft: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		width: '30%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingRight: 3
	},
	listItem: {
		backgroundColor: '#FFF',
		borderColor: '#FFF',
		elevation:6,
		shadowOffset: { width: 5, height: 5 },
		shadowColor: "black",
		shadowOpacity: 0.5,
		shadowRadius: 10
	},
	iconsDrawer: {
		paddingRight: 2
	},
	floatButton: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		position: 'absolute',
		bottom: 10,
		right: 25,
		height: 70,
		backgroundColor: '#0f6124',
		borderRadius: 100
	}
});
const stylesModal = StyleSheet.create({
	viewModal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: '2%',
		paddingTop: '20%',
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	title: {
		marginTop: 25,
		marginBottom: 25,
		fontFamily: 'Oswald-Bold',
		fontSize: 28,
	},
	inputTitle: {
		alignSelf: 'flex-start',
		fontFamily: 'Oswald-Regular',
		fontSize: 16,
		paddingTop: 10,
		paddingLeft: 10
	},
	modal: {
		justifyContent: 'center',
		width: '97%',
		height: '100%'

	},
	button: {
		marginRight: 10,
		backgroundColor: '#0f6124',
		width: 115,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		marginTop: 25,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	card: {
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor: '#000'
	}
});

export default ProdutosAdmin;
