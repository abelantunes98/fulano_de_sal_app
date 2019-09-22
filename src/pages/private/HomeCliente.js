import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';

const HomeCliente = (props) => {
    const cliente = props.navigation.getParam('usuario');
   
    return (
        <View style = { styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>HomeCliente</Text>
        </View>
    )
}

export default HomeCliente;