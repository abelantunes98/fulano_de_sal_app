import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { Button} from 'react-native-elements';

import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Categoria from './componentes/Categoria';

const CardapioAdmin = (props) => {
    const [categorias, setCategorias] = useState([])
    const [produtosSelecionados, setProdutosSelecionados] = useState([])
    
    useEffect(() => {
        loadCategorias();
    }, [])

    loadCategorias = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/listar',{ headers: {Authorization: usuario.token,}});
        setCategorias(response.data);
    }

    itemJaExiste = (item) => {
        // console.log(item);
        let saida = false;
        produtosSelecionados.forEach(element => {
            if (element.value === item.value) {
                // console.log(element);
                saida = true;
            }
        });
        return saida;
    }

    onProdutosSelecionados = ( produtos, item ) => {
        if (itemJaExiste(item)) {
            const p = produtosSelecionados.filter((e) => { return e.value !== item.value });
            setProdutosSelecionados(p);
        } else {
            const p = [...produtosSelecionados, item];
            setProdutosSelecionados(p);
        }
    }

    renderItem = ({ item }) => (
        <Categoria item={item} produtosSelecionados={onProdutosSelecionados} />
    )

    handlerSubmit = () => {
        console.log(produtosSelecionados);
    }

    return (
        <View>
            <ScrollView>
                <View style={ styles.mainContainer }>
                    <MenuButton navigation={props.navigation}/>
                    <View style={ styles.mainContainer }>
                        <FlatList
                            style={{ marginTop: 50 }}
                            contentContainerStyle={styles.list}
                            data={categorias}
                            renderItem={renderItem}
                            keyExtractor={categoria => categoria.id.toString()}
                        />
                    </View>
                    <View style={styles.forgotContainer}>
                        <Button 
                            buttonStyle={{
                                marginTop: 10,
                                marginBottom: 10,
                                backgroundColor: '#0f6124',
                                width: 115,
                            }}
                            titleStyle={styles.titleStyle}
                            title='Cadastrar Cardápio'
                            onPress={handlerSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.floatButton}>
                <IconMaterial
                    name='plus'
                    size={20}
                    color='#ffffff'
                    style={ styles.iconsDrawer }
                />
            </TouchableOpacity>
        </View>
    )
}

CardapioAdmin.navigationOptions = {
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

const styles = StyleSheet.create({
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
    listItem: {
		backgroundColor: '#EEE',
		marginTop: 20,
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
        bottom: 25,                                                    
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
});

export default CardapioAdmin;