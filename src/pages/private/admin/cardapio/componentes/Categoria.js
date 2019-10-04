import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';

import { Card, CheckBox, Button } from 'react-native-elements';

import SelectMultiple from 'react-native-select-multiple'

const Categoria = (props) => {
    const [categoria, setCategoria] = useState( props.item );
    const [produtos, setProdutos] = useState( [{nome: 'arroz branco', id: 1}, {nome: 'arroz refogado', id: 2}] );
    const [selectedProdutos, setSelectedProdutos] = useState([]);
    const [produtos_, setProdutos_] = useState([]);

    useEffect(() => {
        if (categoria.descricao === 'Arroz') {
            setProdutos_(['Arroz Branco', 'Arroz Refogado']);
        } else if (categoria.descricao === 'Feijão') {
            setProdutos_(['Carioca', 'Sempre Verde']);
        } else if (categoria.descricao === 'Macarrão') {
            setProdutos_(['Espaguete']);
        } else if (categoria.descricao === 'Carne') {
            setProdutos_(['Frango', 'Escondidinho de calabresa']);
        }
    }, [])

    loadProdutos = () => {
        // Busca os produtos dessa categorias.
    }

    onSelectionsChange = (data) => {
        setSelectedProdutos(data);
    }

    concluir = () => {
        console.log(selectedProdutos);
    }

    return (
        <View >
            <Card style={styles.listItem}>
                <Text style={{ textAlign: 'center' }}>{categoria.descricao}</Text>

                {produtos_ && <SelectMultiple items={produtos_} selectedItems={selectedProdutos} onSelectionsChange={onSelectionsChange} />}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
		backgroundColor: '#EEE',
		marginTop: 20,
		padding: 30
	},
    list: {
		paddingHorizontal: 20,
    },
});

export default Categoria;