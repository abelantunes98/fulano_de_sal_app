import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';

const QuentinhaAdmin = (props) => {
    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text>Quentinhas</Text>
            <View>
                {
                    //Implentar as funcionalidades da página quentinha
                }
            </View>
        </View>
    )
}

export default QuentinhaAdmin;