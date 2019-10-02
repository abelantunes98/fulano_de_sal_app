import { StyleSheet } from 'react-native';

const stylesCC = StyleSheet.create({
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
        width: '50%',
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


});

export { stylesCC };