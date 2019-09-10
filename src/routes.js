import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default createAppContainer(
    createStackNavigator({
        Login,
        Cadastro,

    }, {
        defaultNavigationOptions: {
            headerStyle:{
                backgroundColor: "#76DC4E"
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