import { 
    createAppContainer, 
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Login from './pages/public/Login';
import Cadastro from './pages/public/Cadastro';
import SolicitacaoRecuperacao from './pages/public/SolicitacaoRecuperacao';
import EnviarCodigo from './pages/public/EnviarCodigo';
import NovaSenha from './pages/public/NovaSenha';

import HomeCliente from './pages/private/HomeCliente';
import PedidosCliente from './pages/private/PedidosCliente';
import ConfiguracoesCliente from './pages/private/ConfiguracoesCliente'
import LogoutCliente from './pages/private/LogoutCliente'

import PedidosAdmin from './pages/private/admin/PedidosAdmin';
import ProdutosAdmin from './pages/private/admin/ProdutosAdmin';
import QuentinhaAdmin from './pages/private/admin/QuentinhaAdmin';
import CardapioAdmin from './pages/private/admin/CardapioAdmin';

// Navigator páginas admin
const homeAdminNavigator = createDrawerNavigator({
    Pedidos: PedidosAdmin,
    Cardápio: CardapioAdmin,
    Produtos: ProdutosAdmin,
    Marmitas: QuentinhaAdmin,
});

// Navigator páginas cliente
const homeClienteNavigator = createDrawerNavigator({
    Início: HomeCliente,
    Pedidos: PedidosCliente,
    Configurações: ConfiguracoesCliente,
    Sair: LogoutCliente,
});

// Navigator inicial
const initNavigator = createStackNavigator({
    LoginPage: Login,
    CadastroPage: Cadastro,
    SolicitacaoRecuperacaoPage: SolicitacaoRecuperacao,
    EnviarCodigoPage: EnviarCodigo,
    NovaSenhaPage: NovaSenha,
}, {
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

// Alternador entre os navigator's
const SwitchNavigator = createSwitchNavigator({
    initNavigatorPage: initNavigator,
    homeAdminNavigatorPage: homeAdminNavigator,
    homeClienteNavigatorPage: homeClienteNavigator,
});

export default createAppContainer(SwitchNavigator);