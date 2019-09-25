import React from 'react';
import {
    View,
    Text,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const CardapioAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Cardápio</Text>
        </View>
    )
}

CardapioAdmin.navigationOptions = {
    drawerLabel: 'Cardápio',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='restaurant-menu'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default CardapioAdmin;