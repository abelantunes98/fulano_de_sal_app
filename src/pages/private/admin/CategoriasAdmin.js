import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';

const CategoriasAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Categorias</Text>
        </View>
    )
}

CategoriasAdmin.navigationOptions = {
    drawerLabel: 'Categorias',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='tags'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default CategoriasAdmin;