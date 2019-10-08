import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,

} from 'react-native';

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from 'react-native-elements';
import { element } from 'prop-types';
import IconButton from 'react-native-vector-icons/FontAwesome';
import SelectMultiple from 'react-native-select-multiple';

const cardapio = [
    {
        id: '1',
        tittleDescription: 'Escolha uma opção de Feijão',
        produtos: ['Feijoada', 'Carioca'],
    },
    {
        id: '2',
        tittleDescription: 'Escolha uma opção de arroz',
        produtos: ['Branco', 'Refolgado'],
    },
    {
        id: '3',
        tittleDescription: 'Escolha também uma opção de Macarrão',
        produtos: ['Macarrão Espaguete'],
    },
    {
        id: '4',
        tittleDescription: 'Agora escolha uma opção de Carne',
        produtos: ['Calabresa Acebolada', 'Torta de Frango'],
    },
    {
        id: '5',
        tittleDescription: 'Pode escolher mais de um acompanhamento',
        produtos: ['Abacaxi à Milanesa', 'Farofa Farinha Refogada'],
    },
    {
        id: '6',
        tittleDescription: 'Escolha as saladas que quiser também',
        produtos: ['Vinagrete', 'Beterraba ao Molho Rosé'],
    },
    {
        id: '7',
        tittleDescription: 'Sobremesas por apenas R$ 2,00',
        produtos: ['Pudim de Leite', 'Mousse de Maracujá', 'Mousse de Limão', 'Mousse de Morango'],
    },
]

const fruits = ['Apples', 'Oranges', 'Pears']
// --- OR ---
// const fruits = [
//   { label: 'Apples', value: 'appls' },
//   { label: 'Oranges', value: 'orngs' },
//   { label: 'Pears', value: 'pears' }
// ]

// renderItem = ({ item }) => (
//     <View >
//         <Card style={styles.listItem}>
//             <Text>{item.tittleDescription}</Text>
//             {/* item.produtos.forEach(element => {
//                 <Text style={{ textAlign: 'right', fontSize: 10 }}>{element}</Text>
//             }); */}
//         </Card>
//     </View>
// );



const Pedido = (props) => {
    const [selectedFruits, setSelectedFruits] = useState([]);

    const renderLabel = (label, style) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
            <View style={{marginLeft: 10}}>
              <Text style={style}>{label}</Text>
            </View>
          </View>
        )
      }

    onSelectionsChange = (selectedFruits) => {
      // selectedFruits is array of { label, value }
      setSelectedFruits(selectedFruits)
    }

    return (

        <View>
            <SelectMultiple
                items={fruits}
                renderLabel={renderLabel}
                selectedItems={selectedFruits}
                onSelectionsChange={onSelectionsChange} />
        </View>

        // <View style={styles.mainContainer}>
        //     <MenuButton navigation={props.navigation} />
        //     <View style={styles.mainContainer}>
        //         <FlatList
        //             style={{ marginTop: 50 }}
        //             contentContainerStyle={styles.list}
        //             data={cardapio}
        //             renderItem={renderItem}
        //             keyExtractor={item => item.id}
        //         />
        //         <TouchableOpacity style={styles.floatButton}>
        //             <IconButton
        //                 name='plus'
        //                 size={20}
        //                 color='#ffffff'
        //                 style={styles.iconsDrawer}
        //             />
        //         </TouchableOpacity>
        //     </View>
        // </View>


        // <View>
        //     <Text style={styles.textStyle}>A entrega é grátis!</Text>
        // </View>

    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    listItem: {
        backgroundColor: '#EEE',
        marginTop: 20,
        padding: 30
    },
    list: {
        paddingHorizontal: 20,
    },
    floatButton: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 25,
        right: 25,
        height: 70,
        backgroundColor: '#0f6124',
        borderRadius: 100,
    },
    iconsDrawer: {
        paddingRight: 2
    },
    titleStyle: {
        fontSize: 20,
        color: '#aaa',
    },

    textStyle: {
        fontSize: 16,
        color: '#CCC',
    },
});

Pedido.navigationOptions = {
    drawerLabel: 'Pedido',
    // drawerIcon:({focused, tintColor}) => (
    //     <IconFont
    //         size={20}
    //         color='black'
    //         style={ styles.iconsDrawer }
    //     />
    // )
}

export default Pedido;