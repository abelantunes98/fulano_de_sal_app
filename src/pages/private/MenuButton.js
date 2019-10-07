import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuButton = (props) => {
    return (
        <Header
            leftComponent= { 
                <Ionicons 
                    name='md-menu'
                    style={styles.menu}
                    size={24}
                    onPress={() => {props.navigation.toggleDrawer();}}
                />
            }
            centerComponent={{ text: props.title, style: styles.tileHeader }}
            containerStyle={styles.header}
        />
    );
};

const styles = StyleSheet.create({
    header:{
		backgroundColor: '#0f6124',
		justifyContent: 'space-around',
    },
    tileHeader:{
		color: '#FFF',
		fontFamily: 'Roboto-Thin',
		fontSize: 20,
	}
});

export default MenuButton;