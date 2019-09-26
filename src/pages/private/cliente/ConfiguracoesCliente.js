import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';

const ConfiguracoesCliente = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>ConfiguraçõesCliente</Text>
        </View>
    )
}

ConfiguracoesCliente.navigationOptions = {
    drawerLabel: 'Configurações',
    drawerIcon:({focused, tintColor}) => (
        <IconFont
            name='cogs'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default ConfiguracoesCliente;