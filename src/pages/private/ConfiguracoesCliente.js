import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';

const ConfiguracoesCliente = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>ConfiguraçõesCliente</Text>
        </View>
    )
}

export default ConfiguracoesCliente;