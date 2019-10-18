import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ProgressBarAndroid,
    Text,
} from 'react-native'
import { Button, Card } from 'react-native-elements';

import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Cardapio from './componentes/Cardapio';

const CardapioMain = (props) => {
    const [data, setData] = useState(Date);
    const [cardapioDoDia, setCardapioDoDia] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        load();
    }, [])

    load = async () => {
        setLoading(true);
        let usuario = await find(USER_CURRENTY);

        const response = await api.get('/protegido/cardapio/ultimo', {
            headers: { Authorization: usuario.token }
        });
        console.log(response.data.categorias);
        setData(response.data.data);
        setCardapioDoDia(response.data.categorias);
        setLoading(false);
    }

    renderItem = ({ item }) => (
        <Cardapio title={item.nome} produtos={item.produtos} />
    )

    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation} title='Cardápio'/>
            <View style={ styles.mainContainer }>
                {!loading && 
                <ScrollView style={{marginBottom:40}}>
                    <FlatList
                        style={{ marginTop: 50 }}
                        contentContainerStyle={styles.list}
                        data={cardapioDoDia}
                        renderItem={renderItem}
                        keyExtractor={c => c.nome.toString()}
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
                            title='Cadastrar Cardápio'
                            onPress={() => {}}
                        />
                    </View>
                </ScrollView>
                }{loading && <ProgressBarAndroid />}
            </View>
            <TouchableOpacity style={styles.floatButton}>
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
});

export default CardapioMain;