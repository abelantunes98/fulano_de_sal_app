import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';

const HomeAdmin = (props) => {

    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <Text style={{alignSelf: 'center'}}>HomeAdmin</Text>
        </View>
    )
}

export default HomeAdmin;