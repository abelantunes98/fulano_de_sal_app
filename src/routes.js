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

import HomeCliente from './pages/private/cliente/HomeCliente';
import PedidosCliente from './pages/private/cliente/PedidosCliente';
import ConfiguracoesCliente from './pages/private/cliente/ConfiguracoesCliente'
import LogoutCliente from './pages/private/cliente/LogoutCliente'
import NovoPedido from './pages/private/cliente/NovoPedido'

import PedidosAdmin from './pages/private/admin/PedidosAdmin';
import CardapioMain from './pages/private/admin/cardapio/CardapioMain';
import ProdutosAdmin from './pages/private/admin/ProdutosAdmin';
import MarmitaAdmin from './pages/private/admin/marmita/MarmitaAdmin';
import CategoriasAdmin from './pages/private/admin/CategoriasAdmin';
import PerfilAdmin from './pages/private/admin/PerfilAdmin';
import LogoutAdmin from './pages/private/admin/LogoutAdmin';

// Navigator páginas admin
const homeAdminNavigator = createDrawerNavigator({
    Pedidos: PedidosAdmin,
    Cardápio: CardapioMain,
    Produtos: ProdutosAdmin,
    Marmitas: MarmitaAdmin,
    Categorias: CategoriasAdmin,
    Configurações: PerfilAdmin,
    Sair: LogoutAdmin,
});

// Navigator páginas cliente
const homeClienteNavigator = createDrawerNavigator({
    Home: HomeCliente,
    PedidosCliente: PedidosCliente,
    Novo: NovoPedido,
    Configuracoes: ConfiguracoesCliente,
    Sair: LogoutCliente,
},{
    contentOptions:{
        activeTintColor: 'green',
        labelStyle:{
            fontSize: 16,
        }    
    }
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