import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ToastAndroid,
} from 'react-native';

import { Card } from 'react-native-elements';
import SelectMultiple from '../../../../components/SelectMultiple'

import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'


const Categoria = (props) => {
    const [categoria, setCategoria] = useState( props.item );
    const [selectedProdutos, setSelectedProdutos] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [produtos_, setProdutos_] = useState([]);
    const [qtdCarnes, setQtdCarnes] = useState(props.qtdCarnes);

    useEffect(() => {
        init = async () => {
            let usuario = await find(USER_CURRENTY);
            const response = await api.get('/protegido/cardapio/ultimoPorCategoria',
                {
                    headers: {
                        Authorization: usuario.token
                    },
                    params: {
                        idCategoria: categoria.idCategoria
                    }
                }
            );
            setProdutos(response.data);
            
            loadProdutos();
        }
        init();
    }, []);

    loadProdutos = () => {
        // Busca os produtos dessa categorias.
        const novos_produtos = [];
        produtos.forEach(produto => {
            const p = { label: produto.nome, value: produto.id, nomeCategoria: categoria.nome };
            novos_produtos.push(p);
        });
        setProdutos_(novos_produtos);
    }

    onSelectionsChange = (data, item) => {
        let _qtd = qtdCerta(item.nomeCategoria);
        if(!_qtd == 0){
            // só pode selecionar 1
            if(_qtd == 1){
                data.length > 1 ? decision(data, item, _qtd, true) : decision(data, item, _qtd, false);
            }else{
                // seleção de carnes
                data.length > qtdCarnes ? decision(data, item, qtdCarnes, true) : decision(data, item, qtdCarnes, false);
            }
        }else{
            //seleção livre ( salada, acompanhamento, bebidas... )
            decision(data, item, null, false);
        }
    }

    decision = (data, item, qtdMax, decision) =>{
        if(decision){
            item.checked = false;
            ToastAndroid.show(`Só pode selecionar ${qtdMax} para ${item.nomeCategoria}`, ToastAndroid.SHORT);
        }else{
            setSelectedProdutos(data);
            props.produtosSelecionados(item);
        }
    }

    // verifica a substring no nome da categoria para pegar a quantidade certa para restringir
    qtdCerta = (nomeCategoria) => {
        let nomeLower = nomeCategoria.toLowerCase();
        let qtd = 1;
        if(nomeLower.includes('carne')){
            qtd = qtdCarnes + 1;
        }else if(nomeLower.includes('acompanhamento') || nomeLower.includes('salada') || nomeLower.includes('bebida') ){
            // zero pois será feita uma verificação de restrinção 
            qtd = 0;
        }
        return qtd;
    }

    return (
        <View>
            <Card containerStyle={styles.listItem}>
                <View>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, marginBottom: 20 }}>{categoria.nome}</Text>
                    {
                        produtos_.length > 0 && 
                        <SelectMultiple
                            options={produtos_}
                            onSelected={onSelectionsChange} 
                        />
                    }
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        marginTop: 20,
        marginBottom: 3,
        padding: 30,
        backgroundColor: '#FFFFFF',
		borderColor: '#FFFFFF',
		elevation:6,
		shadowOffset: { width: 5, height: 5 },
		shadowColor: "black",
		shadowOpacity: 0.5,
        shadowRadius: 10,   
	},
    list: {
		paddingHorizontal: 20,
    },
});

export default Categoria;