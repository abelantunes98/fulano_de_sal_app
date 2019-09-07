import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default createAppContainer(
    createStackNavigator({
        Cadastro,
        Login,
        
    }, {
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: "#1385F7"
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