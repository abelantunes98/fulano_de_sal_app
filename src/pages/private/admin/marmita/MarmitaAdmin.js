import React, { useState,useEffect,useRef} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
	Alert,
	ToastAndroid,
	ProgressBarAndroid,
	Modal,
	ScrollView,
	Picker
} from 'react-native'
import {Card,Button,Header, Input} from 'react-native-elements';

import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import {find} from '../../../../services/banco';
import {USER_CURRENTY} from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/FontAwesome';


const MarmitaAdmin = (props) => {

	const[data,setData] = useState([]);
	const modalRef = useRef();
	const [load,setLoad] = useState(false);
	const [modalVisible,setModalVisible] = useState(false);

	//dados do modal
	const [idMarmita,setIdMarmita] = useState('');
	const [loadModal, setLoadModal] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [tipoMarmita, setTipoMarmita] = useState('TRADICIONAL');
    const [valor, setValor] = useState('');
	const [tipos, setTipos] = useState([]);
	const [cadastrando,setCadastrando] = useState(false);
	const [carnes,setCarnes] = useState('');

    useEffect(() => {
		loadRepositories();
		setTipos([{ label: 'Tradicional', value: 'TRADICIONAL' }, { label: 'Com divisórias', value: 'DIVISORIA' }]);
	  }, [modalVisible]);

	handle_cadastro = async () => {
        try {
            setLoadModal(true);
            let usuario = await find(USER_CURRENTY);
            let marmita = {
                'descricao': descricao,
                'tipo': tipoMarmita,
				'valor': valor,
				'carnes':carnes
            }
            await api.post('/protegido/marmita/',
                marmita,
                {
                    headers: { Authorization: usuario.token }
                });
            ToastAndroid.show("Marmita cadastrada com sucesso", ToastAndroid.SHORT);
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

            let marmitaSave = {
                'idMarmita': idMarmita,
                'descricao': descricao,
                'tipoMarmita': tipoMarmita,
				'valor': valor,
				'carnes':carnes
            }
            await api.post('/protegido/marmita/atualizar',
                marmitaSave,
                {
                    headers: { Authorization: usuario.token }
                });
            ToastAndroid.show("Marmita editada com sucesso", ToastAndroid.SHORT);
			setLoadModal(false);
			setModalVisible(false);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } 
    }

    loadRepositories = async () => {
		setLoad(true);
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/marmita/listar',{ headers: {Authorization: usuario.token,}});
		setData(response.data);
		setLoad(false);
	}
	  
    renderItem = ({ item }) => (
         <View >
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
							onPress={() => openEditaPopUp(item)}
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
							onPress={() => deleteItem(item.idMarmita, item.tipoMarmita, item.valor)}
						/>
					</View>
					<View>
                        <Text style={{fontWeight:'bold',fontSize:16}}>{item.tipoMarmita}</Text>
						<View></View>
						<Text style={{fontWeight:'bold',fontSize:10}}> R$ {item.valor},00</Text>
					</View>
				</View>
			</Card>
      </View>
	);
	
	deleteItem = (id, tipo, valor) => {
        Alert.alert(
            'Deletar marmita',
            `Tem certeza que deseja deletar a marmita tipo ${tipo} e valor R$ ${valor}?`,
            [
                { text: 'Não'},
                { text: 'Sim', onPress: () => loadDeleteItem(id) },
            ],
        );
    };

	loadDeleteItem = async (id) => {
        try {
            let usuario = await find(USER_CURRENTY);
            await api.delete('/protegido/marmita/remover',
                {
                    headers: { Authorization: usuario.token },
                    params: { 'id': parseInt(id) }
                }
			);
			ToastAndroid.show('Deletado com Sucesso!',ToastAndroid.show);
            loadRepositories();
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        }
	};

	openEditaPopUp = (marmita) => {
		setIdMarmita(marmita.idMarmita);
		setDescricao(marmita.descricao);
		setTipoMarmita(marmita.tipoMarmita);
		setValor(marmita.valor.toString());
		setTipos([{ label: 'Tradicional', value: 'TRADICIONAL' }, { label: 'Com divisórias', value: 'DIVISORIA' }]);
		setCarnes(marmita.carnes.toString());

		setCadastrando(false);
		setModalVisible(true);
    };

    openCadastroPopUp = () => {
		setCarnes('');
		setDescricao('');
		setTipoMarmita('TRADICIONAL');
		setValor('');
		setTipos([{ label: 'Tradicional', value: 'TRADICIONAL' }, { label: 'Com divisórias', value: 'DIVISORIA' }]);

		setCadastrando(true);
		setModalVisible(true);
    };


    return (       
        <View style={styles.mainContainer}>
        <MenuButton navigation={props.navigation} title='Marmitas'/>
        <View style={styles.mainContainer}>
			
			<Modal
				style = {stylesModal.modal}
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
								<View style={{justifyContent:'center',alignItems:'center'}}>
								<Text style={stylesModal.title}>Cadastrar Marmita</Text>
								<Text style={stylesModal.inputTitle}>Tipo</Text>
								<Picker
									selectedValue={tipoMarmita}
									style={{ height: 50, width: 300 }}
									onValueChange={(tipo)=>{setTipoMarmita(tipo)}}>
									{tipos.map(v => {
										return (<Picker.Item key={v} label={v.label} value={v.value} />);
									})}
								</Picker>

								<Text style={stylesModal.inputTitle}>Descrição</Text>
								<Input
									placeholder='Descricao'
									value={descricao}
									onChangeText={setDescricao}
									multiline={true}
								/>

								<Text style={stylesModal.inputTitle}>Valor</Text>
								<Input
									placeholder='Valor'
									value={valor}
									onChangeText={setValor}
									keyboardType={'numeric'}

								/>

								<Text style={stylesModal.inputTitle}>Quantidade de Carnes</Text>
								<Input
									placeholder='Carnes'
									value={carnes}
									onChangeText={setCarnes}
									keyboardType={'numeric'}

								/>

								<View style={stylesModal.buttonContainer}>
									<Button
										title='Cancelar'
										buttonStyle={stylesModal.button}
										onPress={()=>{
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
					keyExtractor={item => item.idMarmita.toString()}
					ListFooterComponent={View}
					ListFooterComponentStyle={{height:100}}
				/>
			}{load &&<ProgressBarAndroid />}
            <TouchableOpacity style={styles.floatButton} onPress={openCadastroPopUp}>
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
}

MarmitaAdmin.navigationOptions = {
    drawerLabel: 'Marmitas',
    drawerIcon:() => (
        <IconMaterial
            name='cutlery'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}
const stylesModal = StyleSheet.create({
	viewModal:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		alignItems:'center',
		paddingBottom:'2%',
		paddingTop:'20%',
		backgroundColor:'rgba(0,0,0,0.6)',
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
		height:'100%'
		
    },
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    content: {
		flex:1,
		flexDirection:'column',
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
		borderColor:'#000'
	}
});

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FEFEFE'
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
	list: {
		paddingTop: 10,
		paddingHorizontal: 16
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
	},
	header:{
		backgroundColor: '#0f6124',
		justifyContent: 'space-around',
		height:56
	},
	tileHeader:{
		color: '#FFF',
		fontFamily: 'Roboto-Thin',
		fontSize:20,
		marginBottom:25
	}
});
	
export default MarmitaAdmin;