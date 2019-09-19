import React from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native'

import styles from '../../styles/styles';

const HomeAdmin = () => {
    return (
        <ScrollView style={ styles.mainContainer }>
            <Text>Pedidos</Text>
            <Text>Hello, admin!</Text>
        </ScrollView>
    )
}

export default HomeAdmin;