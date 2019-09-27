import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Alert,
} from 'react-native';

import { styles } from '../../../styles/styles';
import { logout } from '../../../services/banco'
import { USER_CURRENTY } from '../../../services/key'
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutCliente = (props) => {
    
    useEffect(() => {
        Alert.alert(
            'Sair',
            'Desejar realmente sair ?',
            [
                {
                    text: 'Sair', onPress: async () => {
                        await logout(USER_CURRENTY);
                        props.navigation.navigate('initNavigatorPage');
                    }
                },
                {
                    text: 'Cancelar'
                },
            ],
            {
                cancelable: false
            }
        )
    })

    return (
        <View style = { styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>LogoutCliente</Text>
        </View>
    )
}

LogoutCliente.navigationOptions = {
    drawerLabel: 'Sair',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='exit-to-app'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default LogoutCliente;