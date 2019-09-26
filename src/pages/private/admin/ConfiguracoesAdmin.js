import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';

const ConfiguracoesAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Configurações</Text>
        </View>
    )
}

ConfiguracoesAdmin.navigationOptions = {
    drawerLabel: 'Configurações',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='cogs'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default ConfiguracoesAdmin;