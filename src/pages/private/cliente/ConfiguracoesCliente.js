import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native'

import { styles } from '../../../styles/styles';
import { stylesCC } from '../../../styles/configClienteStyle';
import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button, Input } from 'react-native-elements';

const ConfiguracoesCliente = (props) => {
    return (
        <View style = {stylesCC.mainContainer}>
            
            <MenuButton navigation={props.navigation}/>

            <View style={ stylesCC.childContainerOne }>
                <Image 
                    style={ stylesCC.imgHeader }
                    source={require('../../../images/LOGO1.png')}
                />
            </View>
            
            <View style={ stylesCC.childContainerTwo }>
                <Image
                   style={ stylesCC.imgMain }
                   source={require('../../../images/usernot.png')}
                />   
                
            </View>

            <View style={ stylesCC.childContainerThree }>
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

            <View style={ stylesCC.childContainerFour }>
                <Button
                    buttonStyle={ stylesCC.button }
                    title="Editar Configurações"
                ></Button>
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

export default ConfiguracoesCliente;