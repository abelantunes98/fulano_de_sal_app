import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { Card } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';

import api from '../../../../../services/api';
import { USER_CURRENTY } from '../../../../../services/key';
import { find } from '../../../../../services/banco';

const Categoria = (props) => {
    const [categoria, setCategoria] = useState( props.item );
    const [selectedProdutos, setSelectedProdutos] = useState([]);
    const [produtos, setProdutos] = useState();
    const [produtos_, setProdutos_] = useState([]);

    useEffect(() => {
        init = async () => {
            let usuario = await find(USER_CURRENTY);
            const response = await api.get('/protegido/produto/listarPorCategoria?idCategoria='+categoria.id, { headers: { Authorization: usuario.token } });
            setProdutos(response.data);
            console.log(produtos);
            loadProdutos();
        }

        init();
    }, [])

    loadProdutos = () => {
        // Busca os produtos dessa categorias.
        const novos_produtos = [];
        produtos.forEach(produto => {
            const p = { label: produto.nome, value: produto.idProduto };
            novos_produtos.push(p);
        });
        setProdutos_(novos_produtos);
    }

    onSelectionsChange = (data, item) => {
        setSelectedProdutos(data);
        props.produtosSelecionados(item);
    }

    return (
        <View >
            <Card style={styles.listItem}>
                <Text style={{ textAlign: 'center' }}>{categoria.descricao}</Text>

                {produtos_ && <SelectMultiple 
                                    items={produtos_}
                                    checkboxStyle={{ tintColor: 'green' }}
                                    selectedCheckboxStyle={{ tintColor: 'green' }}
                                    selectedItems={selectedProdutos} 
                                    onSelectionsChange={onSelectionsChange} 
                              />
                }
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