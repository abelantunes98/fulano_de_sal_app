import React from 'react';
import {
    View,
    Image,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';

const ConfiguracoesCliente = (props) => {
    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation}/>
            <View style={ styles.childContainerOne }>
                <Image 
                    style={ styles.imgHeader }
                    source={require('../../../images/LOGO1.png')}
                />
            </View>

            <View style={ styles.childContainerTwo }>
                <Image
                   style={ styles.imgMain }
                   source={require('../../../images/usernot.png')}
                />
            </View>

            <View style={ styles.childContainerThree }>
                <Input
                    leftIcon={
                        <IconFont
                            name='user'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder='Fulano de Tal'
                    autoCapitalize='words'
                    style={styles.input}
                />
                <Input
                    leftIcon={
                        <IconFont
                            name='envelope'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder='fulanodetal@fulanin.com'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={styles.input}
                />
                <Input
                    leftIcon={
                        <IconFont
                            name='phone'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder='(83)99360-2956'
                    keyboardType='phone-pad'
                    style={styles.input}
                />
                <Input
                    leftIcon={
                        <IconFont
                            name='address-card'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder='Rua dos Alfeneiros - 4'
                    autoCapitalize='words'
                    style={styles.input}
                />
            </View>

            <View style={ styles.childContainerFour }>
                <Button
                    buttonStyle={ styles.button }
                    title='Editar Configurações'
                />
            </View>
        </View>
    )
}

ConfiguracoesCliente.navigationOptions = {
    drawerLabel: 'Configurações',
    drawerIcon:({focused, tintColor}) => (
        <IconFont
            name='cogs'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent : "space-around",
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    // logo
    childContainerOne:{
        flexDirection: "row",
        borderBottomWidth: 3,
        borderBottomColor: '#000000',
        height: '10%',
    },
    // imagem
    childContainerTwo:{
        height: '25%', 
        alignItems: "center",
        justifyContent: "center",
    },
    // informações
    childContainerThree:{
        height: '50%',
        width: '100%',
    },
    // botão
    childContainerFour:{
        height: '10%',
        width: '100%',
        alignItems: "center",
    },
    button:{
        marginTop: 10,
        backgroundColor: '#0f6124',
    },
    imgHeader:{
        width: 100,
        height: 50,
    },
    imgMain:{
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    iconsDrawer: {
		paddingRight: 2
	},
});

export default ConfiguracoesCliente;