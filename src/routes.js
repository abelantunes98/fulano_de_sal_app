import { createAppContainer, 
    createSwitchNavigator,
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Login from './pages/public/Login';
import Cadastro from './pages/public/Cadastro';
import SolicitacaoRecuperacao from './pages/public/SolicitacaoRecuperacao';
import HomeCliente from './pages/private/HomeCliente';
import HomeAdmin from './pages/private/admin/HomeAdmin';
import EnviarCodigo from './pages/public/EnviarCodigo';
import NovaSenha from './pages/public/NovaSenha';
import PedidosAdmin from './pages/private/admin/PedidosAdmin';
import ProdutosAdmin from './pages/private/admin/ProdutosAdmin';
import QuentinhaAdmin from './pages/private/admin/QuentinhaAdmin';
import CardapioAdmin from './pages/private/admin/CardapioAdmin';

// Navigator páginas admin
const homeAdminNavigator = createDrawerNavigator({
    Início:{
        screen:HomeAdmin
    },
    Pedidos:{
        screen:PedidosAdmin
    },
    Produtos:{
        screen:ProdutosAdmin
    },
    Cardápio:{
        screen:CardapioAdmin
    },
    Quentinha:{
        screen:QuentinhaAdmin
    }
},

);

//Implementar semelhante ao homeAdminNavigator
//const HomeClienteNavigator = 

// Navigator inicial
const initNavigator = createStackNavigator({
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
});

const switchNavigator = createSwitchNavigator({
    initNavigatorPage: {
        screen:initNavigator
    },
    homeAdminNavigatorPage: {
        screen:homeAdminNavigator
    },
});


export default createAppContainer(switchNavigator);