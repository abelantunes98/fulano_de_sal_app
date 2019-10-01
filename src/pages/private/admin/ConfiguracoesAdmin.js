import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ToastAndroid
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import { Button } from 'react-native-elements';

const ConfiguracoesAdmin = (props) => {
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        loadAdmin();
    }, []);

    loadAdmin = async () => {
        let usuario = await find(USER_CURRENTY);
        setAdmin(usuario);
    }

    alterarDados = () => {
        ToastAndroid.show('Page de alterar dados', ToastAndroid.SHORT);
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
                    style={{ width: 150, height: 150, borderRadius: 150 / 2, alignContent: "center", alignItems: "center" }}
                />
                <Text style={{ textAlign: "center" }}>{ admin.nome }</Text>
                <Text style={{ textAlign: "center" }}>{ admin.email }</Text>
                <View style={styles.forgotContainer}>
                    <Button title='Alterar dados' buttonStyle={styles.button} titleStyle={styles.titleStyle} onPress={alterarDados} />
                </View>
            </View>
        </View>
    )
}

ConfiguracoesAdmin.navigationOptions = {
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

export default ConfiguracoesAdmin;