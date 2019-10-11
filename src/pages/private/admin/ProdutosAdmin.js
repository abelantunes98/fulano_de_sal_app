import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	ScrollView, Alert
} from 'react-native';
import { Card, Button } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';
import IconButton from 'react-native-vector-icons/FontAwesome';
import ModalBox from '../../../components/ModalBox';

const ProdutosAdmin = (props) => {
	const [data, setData] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const modalRef = useRef();

	useEffect(() => {
		loadRepositories();
		loadCategorias();
	}, []);


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


	renderItem = ({ item }) => (
		<View>
			<Card containerStyle={styles.listItem}>
				<View>
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
							onPress={() => openEditaPopUp(item, categorias)}

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
					<View>
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
				{ text: 'NO', onPress: () => Alert.alert('Cancel'), style: 'cancel' },
				{ text: 'YES', onPress: () => loadDeleteProduto(id) },
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
			loadRepositories();
		} catch (e) {
			ToastAndroid.show(e.message)
		}
	};

	openCadastroPopUp = (item) => {
		modalRef.current.open('cadastroProduto', item);
	};
	function openEditaPopUp(item, categorias) {

		modalRef.current.open('editarProduto', { item, categorias });
	};

	return (
		<View style={styles.mainContainer}>
			<MenuButton navigation={props.navigation} title="Produtos" />
			<View style={styles.mainContainer}>
				<FlatList
					style={{ marginTop: 50 }}
					contentContainerStyle={styles.list}
					data={data}
					renderItem={renderItem}
					keyExtractor={item => item.idProduto.toString()}
				/>
				<TouchableOpacity style={styles.floatButton} onPress={() => openCadastroPopUp(categorias)}>
					<IconButton
						name='plus'
						size={20}
						color='#ffffff'
						style={styles.iconsDrawer}
					/>
				</TouchableOpacity>
			</View>
			<ModalBox
				ref={modalRef}
				refresh={loadRepositories}
			/>
		</View>
	)
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
		backgroundColor: '#ffffff'
	},
	nome: {
		color: '#000000',
		fontSize: 18,
		marginBottom: 15
	},
	categoria: {
		color: '#000000',
		fontSize: 9
	},
	list: {
		paddingTop: 10,
		paddingHorizontal: 16
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
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	listItem: {
		marginTop: 20,
		paddingTop: 10,
		paddingBottom: 50,
		paddingEnd: 10,
		padding: 30,
		borderRadius: 10,
		backgroundColor: '#FFF',
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
		bottom: 25,
		right: 25,
		height: 70,
		backgroundColor: '#0f6124',
		borderRadius: 100
	}
});

export default ProdutosAdmin;
