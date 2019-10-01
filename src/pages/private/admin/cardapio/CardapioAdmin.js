import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Card, CheckBox, Button} from 'react-native-elements';

import { styles } from '../../../../styles/styles';
import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Categoria from './componentes/Categoria';

const CardapioAdmin = (props) => {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        loadCategorias();
    }, [])

    loadCategorias = async () => {
        // let usuario = await find(USER_CURRENTY);
        // const response = await api.get('/protegido/categoria/lista',{ headers: {Authorization: usuario.token,}});
        setCategorias([{descricao: 'Arroz', id: 1}, {descricao: 'Feijão', id: 2}, {descricao: 'Macarrão', id: 3}, {descricao: 'Carne', id: 4}]);
    }

    renderItem = ({ item }) => (
        <Categoria item={item} />
    )

    handlerSubmit = () => {
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
                            onPress={() => handlerSubmit}
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

export default CardapioAdmin;