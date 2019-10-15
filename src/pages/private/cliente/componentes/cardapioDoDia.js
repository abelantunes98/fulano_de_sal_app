import React from 'react';
import {
    SafeAreaView,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native'

import { Card } from 'react-native-elements';

const DATA = [
    {
        id: '1',
        nome: 'Feijão',
        produtos: [
            {
                nome: 'Feijoada',
                id: 10,
            },
            {
                nome: 'Carioca',
                id: 11,
            }],
    },
    {
        id: '2',
        nome: 'Arroz',
        produtos: [
            {
                nome: 'Branco',
                id: 12,
            },
            {
                nome: 'Refolgado',
                id: 13,
            }
        ],
    },
    {
        id: '3',
        nome: 'Macarrão',
        produtos: [
            {
                nome: 'Macarrão Espaguete',
                id: 14,
            },
        ],
    },
    {
        id: '4',
        nome: 'Carnes',
        produtos: [
            {
                nome: 'Calabresa Acebolada',
                id: 15,
            },
            {
                nome: 'Torta de Frango',
                id: 16,
            }
        ],
    },
    {
        id: '5',
        nome: 'Acompanhamentos',
        produtos: [
            {
                nome: 'Abacaxi à Milanesa',
                id: 17,
            },
            {
                nome: 'Farofa Farinha Refogada',
                id: 18,
            }
        ],
    },
    {
        id: '6',
        nome: 'Saladas',
        produtos: [
            {
                nome: 'Vinagrete',
                id: 19,
            },
            {
                nome: 'Beterraba ao Molho Rosé',
                id: 20,
            }
        ],
    },
    {
        id: '7',
        nome: 'Sobremesas',
        produtos: [
            {
                nome: 'Pudim de Leite',
                id: 21,
            },
            {
                nome: 'Mousse de Maracujá',
                id: 22,
            },
            {
                nome: 'Mousse de Limão',
                id: 23,
            },
            {
                nome: 'Mousse de Morango',
                id: 24,
            },
        ],
    },
]

const CardapioDoDia = props => {

    function Item({ title, produtos }) {
        return (
            <Card containerStyle={ styles.subcontainer }>
                <Text style={styles.title}>{title}</Text>
                <FlatList
                    style={styles.options}
                    data={produtos}
                    renderItem={({ item }) => (
                        <Text style={styles.produtos}>{item.nome}</Text>
                    )}
                    // As chaves precisam ser Strings.
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card>
        );
    }

    return (
        <FlatList
            data={DATA}
            renderItem={({ item }) => (
                <Item
                    title={item.nome}
                    produtos={item.produtos}
                />
            )}
            // As chaves precisam ser Strings.
            keyExtractor={(item) => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    item: {
        backgroundColor: '#eeeeee',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        marginBottom: 5,
        color: 'black',
        fontWeight: '700',
        fontSize: 22,
    },
    options: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        
    },
    produtos: {
        padding: 3,
        margin: 8,
        color: '#aaaaaa',
        fontWeight: '700',
        fontSize: 16,
    },
    subcontainer: {
        marginTop: 20,
		paddingTop: 15,
		paddingBottom: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
    },
});

export default CardapioDoDia;