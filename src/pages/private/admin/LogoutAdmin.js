import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Sair</Text>
        </View>
    )
}

LogoutAdmin.navigationOptions = {
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

export default LogoutAdmin;