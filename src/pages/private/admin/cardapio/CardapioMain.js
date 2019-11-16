import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ProgressBarAndroid,
    Text,
    Modal,
    ToastAndroid,
} from 'react-native'
import { Button, Card } from 'react-native-elements';

import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Cardapio from './componentes/Cardapio';
import CardapioAdmin  from './CardapioAdmin';

const CardapioMain = (props) => {
    const [data, setData] = useState(Date);
    const [cardapioDoDia, setCardapioDoDia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [liberado,setLiberado] = useState(false);
    const [loadingLiberar, setLoadingLiberar] = useState(false);
    const [loadingBloquear,setLoadingBloquear] = useState(false);

    useEffect(() => {
        loadInit();
    }, [modalVisible])

    loadInit = async () => {
        setLoading(true);
        let usuario = await find(USER_CURRENTY);

        const response = await api.get('/protegido/cardapio/ultimoAdmin', {
            headers: { Authorization: usuario.token }
        });
        setData(response.data.data);
        setCardapioDoDia(response.data.categorias);
        setLiberado(response.data.liberado);
        setLoading(false);
    }

    abrirModal = () => {
		setModalVisible(true);
    };

    fecharModal = () => {
        setModalVisible(false);
    }

    renderItem = ({ item }) => (
        <Cardapio title={item.nome} produtos={item.produtos} />
    )

    handler_bloquear = async () => {
        setLoadingBloquear(true);
        let usuario = await find(USER_CURRENTY);

        const response = await api.get('/protegido/cardapio/bloquear', {
            headers: { Authorization: usuario.token }
        });
        setLoadingBloquear(false);
        loadInit();
        ToastAndroid.show("Cardápio bloqueado para realização de pedidos!",ToastAndroid.LONG);
    }

    handler_liberar = async () => {
        setLoadingLiberar(true);
        let usuario = await find(USER_CURRENTY);

        const response = await api.get('/protegido/cardapio/liberar', {
            headers: { Authorization: usuario.token }
        });
        setLoadingLiberar(false);
        loadInit();
        ToastAndroid.show("Cardápio liberado para realização de pedidos!",ToastAndroid.LONG);
    }
    vazio = (obj) => {
        return obj==null || Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation} title='Cardápio do dia'/>
            
            <View style={ styles.mainContainer }>
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
                        <Card containerStyle={stylesModal.card}>
                            <Text style={stylesModal.title}>Cadastrar Cardápio</Text>
                            <CardapioAdmin fecharModal={fecharModal} />
                        </Card>
                    </View>
			    </Modal>
                {!loading &&
                <ScrollView>
                    <FlatList
                        style={{ marginTop: 50 }}
                        contentContainerStyle={styles.list}
                        data={cardapioDoDia}
                        renderItem={renderItem}
                        keyExtractor={c => c.nome.toString()}
                        ListFooterComponent={View}
					    ListFooterComponentStyle={{height:60}}
                    />
                    <View style={styles.forgotContainer}>
                            {!liberado && <Button 
                                title='Liberar'
                                buttonStyle={styles.buttonLiberar}
                                onPress={handler_liberar}  
                                titleStyle={styles.titleStyle} 
                                loading={loadingLiberar}
                            />
                            }{liberado &&
                            <Button 
                                title='Bloquear'
                                buttonStyle={styles.buttonBloquear}
                                onPress={handler_bloquear}  
                                titleStyle={styles.titleStyle} 
                                loading={loadingBloquear}
                            />
                            }
                        </View>
                </ScrollView>
                }{loading && <ProgressBarAndroid />}
            </View>
            <TouchableOpacity style={styles.floatButton} onPress={abrirModal}>
                <IconMaterial
                    name='plus'
                    size={20}
                    color='#ffffff'
                    style={ styles.iconsDrawer }
                />
            </TouchableOpacity>
        </View>
    );
}

CardapioMain.navigationOptions = {
    drawerLabel: 'Cardápio',
    drawerIcon:({focused, tintColor}) => (
        <Icon
            name='restaurant-menu'
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
        textAlign: 'center',
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
    card: {
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	}
});


const styles = StyleSheet.create({
    mainContainer: {
		flex : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
    listItem: {
		backgroundColor: '#FFF',
		marginTop: 20,
        padding: 30,
        borderRadius: 10
	},
    list: {
		paddingHorizontal: 20,
    },
    floatButton:{
		borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 25,
        height:70,
        backgroundColor:'#0f6124',
        borderRadius:100,
    },
    iconsDrawer: {
		paddingRight: 2
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    titleStyle:{
        fontFamily: 'Roboto-Thin'
    },
    mainLoading: {
        flex : 1, 
        justifyContent: 'center',
		backgroundColor: '#ffffff'
    },
    listItem: {
		backgroundColor: '#FFF',
		marginTop: 20,
        padding: 30,
        borderRadius: 10
	},
    list: {
		paddingHorizontal: 20,
    },
    buttonLiberar: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
        marginBottom:50
    },
    buttonBloquear: {
		marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
        marginBottom:50
	}
});

export default CardapioMain;