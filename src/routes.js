import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Login from './pages/public/Login';
import Cadastro from './pages/public/Cadastro';
import SolicitacaoRecuperacao from './pages/public/SolicitacaoRecuperacao';
import HomeCliente from './pages/private/HomeCliente';
import HomeAdmin from './pages/private/HomeAdmin';
import EnviarCodigo from './pages/public/EnviarCodigo';
import NovaSenha from './pages/public/NovaSenha';


export default createAppContainer(
    createStackNavigator({
        LoginPage:{
            screen:Login
        },
        CadastroPage:{
            screen:Cadastro
        },
        SolicitacaoRecuperacaoPage:{
            screen:SolicitacaoRecuperacao
        },

        EnviarCodigoPage:{
            screen:EnviarCodigo
        },
        NovaSenhaPage:{
            screen:NovaSenha
        },
        HomeClientePage:{
            screen:HomeCliente
        },
        HomeAdministradorPage:{
            screen:HomeAdmin
        }
        },
       
        {
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: '#0f6124'
            },
            headerTitleStyle: {
                color: '#FFF',
                fontFamily: 'Roboto-Thin'
            },
            headerTitle: 'Fulano de Sal',
            headerBackTitle: null,
        },
        mode: 'modal',
        headerLayoutPreset: 'center'
    })
);