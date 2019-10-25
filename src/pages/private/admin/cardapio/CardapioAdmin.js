import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ProgressBarAndroid,
    ToastAndroid,
    Alert,
} from 'react-native'
import { Button } from 'react-native-elements';

import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'

import Categoria from './componentes/Categoria';

const CardapioAdmin = (props) => {
    const [categorias, setCategorias] = useState([])
    const [produtosSelecionados, setProdutosSelecionados] = useState([])
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        preLoad();
    }, [])

    preLoad = async () =>{
        setLoading(true);
        await loadCategorias();
        setLoading(false);
    }

    loadCategorias = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/listar',{ headers: {Authorization: usuario.token,}});
        setCategorias(response.data);
        setUser(usuario);
        setLoading(false);
    }

    itemJaExiste = ( item ) => {
        // console.log(item);
        let saida = false;
        produtosSelecionados.forEach(element => {
            if (element.value === item.value) {
                saida = true;
            }
        });
        return saida;
    }

    onProdutosSelecionados = ( item ) => {
        if (itemJaExiste(item)) {
            const p = produtosSelecionados.filter((e) => { return e.value !== item.value });
            setProdutosSelecionados(p);
        } else {
            const p = [...produtosSelecionados, item];
            setProdutosSelecionados(p);
        }
    }

    renderItem = ({ item }) => {
        console.log(item);
        return (<Categoria item={item} produtosSelecionados={onProdutosSelecionados} />);
    }

    handlerSubmit = () => {
        const ids_produtos = []
        produtosSelecionados.map((produto) => ids_produtos.push(produto.value));
        cadastrarCardapio(ids_produtos);
    }

    cadastrarCardapio = async (ids) => {
        try {
            const response = await api.post('/protegido/cardapio/',
                {
                    idProdutos: ids
                },
                {
                    headers: {
                        Authorization: user.token
                    }
                }
            );

            ToastAndroid.show("Cardápio cadastrado!", ToastAndroid.SHORT);
            props.fecharModal();
        } catch(error) {
            ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        }
    }

    cancelar = () => {
        props.fecharModal();
    }

    return (
        <View style={ styles.mainContainer }>
            <View style={ styles.mainContainer }>
                {!loading && 
                <ScrollView style={{marginBottom:40}}>
                    <FlatList
                        style={{ marginTop: 50 }}
                        contentContainerStyle={styles.list}
                        data={categorias}
                        renderItem={({ item }) => <Categoria item={item} produtosSelecionados={onProdutosSelecionados} />}
                        keyExtractor={categoria => categoria.id.toString()}
                        
                    />
                    <View style={styles.forgotContainer}>
                        <Button 
                            buttonStyle={{
                                marginTop: 10,
                                marginBottom: 10,
                                backgroundColor: '#0f6124',
                                width: 115,
                            }}
                            titleStyle={styles.titleStyle}
                            title='Cancelar'
                            onPress={cancelar}
                        />
                        <Button 
                            buttonStyle={{
                                marginTop: 10,
                                marginBottom: 10,
                                backgroundColor: '#0f6124',
                                width: 115,
                            }}
                            titleStyle={styles.titleStyle}
                            title='Cadastrar'
                            onPress={handlerSubmit}
                        />
                    </View>
                </ScrollView>
                }{loading && <ProgressBarAndroid />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
		flex : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
    listItem: {
		backgroundColor: '#EEE',
		marginTop: 10,
		padding: 30
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
    }
});

export default CardapioAdmin;