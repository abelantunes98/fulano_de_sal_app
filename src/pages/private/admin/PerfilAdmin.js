import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ToastAndroid,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import { Button } from 'react-native-elements';
import api from "../../../services/api";

const PerfilAdmin = (props) => {
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        loadAdmin();
    }, []);

    loadAdmin = async () => {
        let usuario = await find(USER_CURRENTY);
        setAdmin(usuario);
    }

    alterarDados = () => {
        try {
            // const admin_atualizado = await api.put('/administrador/', admin);
            // setAdmin(admin_atualizado);
            ToastAndroid.show("Dados atualizados com sucesso!", ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',}}
                    style={styles.imagem}
                />
                <Text style={styles.text} >{ admin.nome }</Text>
                <Text style={styles.text} >{ admin.email }</Text>
                <View style={styles.forgotContainer}>
                    <Button title='Editar dados' buttonStyle={styles.button} titleStyle={styles.titleStyle} onPress={alterarDados} />
                </View>
            </View>
        </View>
    )
}

PerfilAdmin.navigationOptions = {
    drawerLabel: 'Configurações',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='cogs'
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
    imagem: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        alignContent: 'center',
        alignItems: 'center', 
    },
	text: {
		textAlign: 'center',
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    button: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    titleStyle:{
        fontFamily: 'Roboto-Thin'
	},
});

export default PerfilAdmin;
