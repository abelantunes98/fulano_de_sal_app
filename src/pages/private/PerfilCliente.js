import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';

const PerfilCliente = (props) => {
    return (
        <View style = {styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>PerfilCliente</Text>
        </View>
    )
}

export default PerfilCliente;