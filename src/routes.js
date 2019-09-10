import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default createAppContainer(
    createStackNavigator({
        Login:{
            screen:Login
        },
        Cadastro:{
            screen:Cadastro
        }
       
    }, {
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: "#0f6124"
            },
            headerTitleStyle: {
                color: "#FFF"
            },
            headerTitle: "Fulano de Sal",
            headerBackTitle: null,
        },
        mode: "modal",
        headerLayoutPreset: "center"
    })
);