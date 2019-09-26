import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';

const MarmitaAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Marmitas</Text>
        </View>
    )
}

MarmitaAdmin.navigationOptions = {
    drawerLabel: 'Marmitas',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='cutlery'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default MarmitaAdmin;