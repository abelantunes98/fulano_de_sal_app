import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ToastAndroid,
    TextInput,
    Alert,
} from 'react-native'

import { styles } from '../../../styles/styles';
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
        <View style={{ flexGrow : 1, backgroundColor: '#ffffff' }}>
            <MenuButton navigation={props.navigation}/>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',}}
                    style={{ width: 150, height: 150, borderRadius: 150 / 2, alignContent: 'center', alignItems: 'center' }}
                />

                <View>
                    <Text style={{ textAlign: 'center' }}>Nome</Text>
                    <TextInput  style={{ textAlign: 'center' }} 
                                value={ admin.nome } 
                                onChangeText={(nome) => {
                                        const admin_alterado = { 
                                            ...admin,
                                            nome
                                        };
                                        setAdmin(admin_alterado);
                                    }
                                }
                    />
                    
                    <Text style={{ textAlign: 'center' }}>E-mail</Text>
                    <Text style={{ marginTop: 10 }} >{ admin.email }</Text>
                </View>

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

export default PerfilAdmin;