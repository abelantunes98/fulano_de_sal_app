import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { styles } from '../../styles/styles';
import MenuButton from './MenuButton';

const LogoutCliente = (props) => {
    return (
        <View style = { styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>LogoutCliente</Text>
        </View>
    )
}

export default LogoutCliente;