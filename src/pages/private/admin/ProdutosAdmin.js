
import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const ProdutosAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>Produtos</Text>
        </View>
    )
}

ProdutosAdmin.navigationOptions = {
    drawerLabel: 'Produtos',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='food-variant'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default ProdutosAdmin;