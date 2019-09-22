import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';

const CardapioAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text>Cardápio</Text>
            <View>
                {
                    //Implentar as funcionalidades da página cardápio
                }
            </View>
        </View>
    )
}

export default CardapioAdmin;