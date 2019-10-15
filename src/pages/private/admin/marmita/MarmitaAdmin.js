import React, { useState,useEffect,useRef} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
	Alert,
	ToastAndroid,
	ProgressBarAndroid
} from 'react-native'
import {Card,Button,Header, Input} from 'react-native-elements';

import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import {find} from '../../../../services/banco';
import {USER_CURRENTY} from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/FontAwesome';
import ModalBox from '../../../../components/ModalBox';
import { ScrollView } from 'react-native-gesture-handler';

const MarmitaAdmin = (props) => {

	const[data,setData] = useState([]);
	const modalRef = useRef();
	const [load,setLoad] = useState(false);

    useEffect(() => {
        loadRepositories();
      }, []);

    loadRepositories = async () => {
		setLoad(true);
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/marmita/listar',{ headers: {Authorization: usuario.token,}});
		setData(response.data);
		setLoad(false);
	}
	
	cadastrarMarmita = async () => {
	
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
	
	function deleteItem(id, tipo, valor) {
        Alert.alert(
            'Deletar marmita',
            `Tem certeza que deseja deletar a marmita tipo ${tipo} e valor R$ ${valor}?`,
            [
                { text: 'Não'},
                { text: 'Sim', onPress: () => loadDeleteItem(id) },
            ],
        );
    };

    async function loadDeleteItem(id) {
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
        } catch (e) {
            ToastAndroid.show(e.message)
        }
	};

	function openEditaPopUp(item) {
        modalRef.current.open('editarMarmita', item);
    };

    openCadastroPopUp = () => {
        modalRef.current.open('cadastroMarmita');
    };


    return (       
        <View style={styles.mainContainer}>
        <MenuButton navigation={props.navigation} title='Marmitas'/>
        <View style={styles.mainContainer}>
			{!load && 
			  <View style={{paddingBottom:70}}>
				<FlatList
					style={{ marginTop: 10 }}
					contentContainerStyle={styles.list}
					data={data}
					renderItem={renderItem}
					keyExtractor={item => item.idMarmita.toString()}
				/>
			</View>
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
		<ModalBox
                ref={modalRef}
                refresh={loadRepositories}
            />
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
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
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