
import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';

const ProdutosAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text>Produtos</Text>
            <View>
                {
                    //Implentar as funcionalidades da página produtos
                }
            </View>
        </View>
    )
}

export default ProdutosAdmin;