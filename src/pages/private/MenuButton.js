import React from 'react';
import { StyleSheets, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuButton = (props) => {

    return(
        <Ionicons 
            name='md-menu'
            style={styles.menu}
            size={24}
            onPress={() => {props.navigation.toggleDrawer();}}
        />
    );

};

const styles = StyleSheet.create(
    {
        menu: {
            zIndex: 9,
            position: 'absolute',
            top: 20,
            left: 20
        }
    }
)

export default MenuButton;