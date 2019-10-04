import React, { useEffect } from 'react';
import {
    View,
    Alert,
    StyleSheet,
} from 'react-native';

import { logout } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const LogoutAdmin = (props) => {
    useEffect(() => {
        Alert.alert(
            'Sair',
            'Desejar realmente sair ?',
            [
                {
                    text: 'Sair', onPress: async () => {
                        await logout(USER_CURRENTY);
                        props.navigation.navigate('initNavigatorPage');
                    }
                },
                {
                    text: 'Cancelar', onPress: async () => {
                        props.navigation.navigate("initNavigatorPage");
                    }
                },
            ],
            {
                cancelable: false
            }
        );
    })

    return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
        </View>
    )
}

LogoutAdmin.navigationOptions = {
    drawerLabel: 'Sair',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='exit-to-app'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

const styles = StyleSheet.create({
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
});

export default LogoutAdmin;