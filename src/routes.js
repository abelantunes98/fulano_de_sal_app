import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"

import Login from "./pages/publico/Login";
import Cadastro from "./pages/publico/Cadastro";
import SolicitacaoRecuperacao from "./pages/publico/SolicitacaoRecuperacao";

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
        }
       
    }, {
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: "#0f6124"
            },
            headerTitleStyle: {
                color: "#FFF",
                fontFamily: "Roboto-Thin"
            },
            headerTitle: "Fulano de Sal",
            headerBackTitle: null,
        },
        mode: "modal",
        headerLayoutPreset: "center"
    })
);