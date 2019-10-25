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
        console.log('data no onSelections Change: ', data);
        console.log('item no onSelectionChages',item);
        console.log('tamanho do array: ' + data.length);
        console.log('nome da categoria: ' + item.nomeCategoria);
        // setSelectedProdutos(data);
        let _qtd = qtdCerta(item.nomeCategoria);
        console.log('quantidade retornada: ' + _qtd);
        if(!_qtd == 0){
            // só pode selecionar 1
            if(_qtd == 1){
                props.qtdSelecionada(_qtd, 0);
                data.length > 1 ? printInvalid(_qtd, item) : sucess(data, item);
            }else{
                // seleção de carnes
                data.length > qtdCarnes + 1 ? printInvalid(_qtd, item) : sucess(data, item);
                
            }
        }else{
            //seleção livre ( salada ou acompanhamento )
            props.qtdSelecionada(0, 2);
            sucess(data, item);
        }
        // props.produtosSelecionados(item);
    }

    printInvalid = (qtd, item) => (ToastAndroid.show(`Só pode selecionar ${qtd} para ${item.nomeCategoria}`, ToastAndroid.SHORT));

    sucess = (data,item) => {
        console.log('chegou no sucess');
        console.log('dados: ' , data);
        console.log('item: ' , item);
    
        setSelectedProdutos(data);
        props.produtosSelecionados(item);
    }

    

    // verifica a substring no nome da categoria para pegar a quantidade certa para restringir
    qtdCerta = (nomeCategoria) => {
        let nomeLower = nomeCategoria.toLowerCase();
        let qtd = 1;
        if(nomeLower.includes('carne')){
            qtd = qtdCarnes;
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
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>{categoria.nome}</Text>
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
		backgroundColor: '#FFFFFF',
		marginTop: 20,
        padding: 30,
        borderRadius: 10
	},
    list: {
		paddingHorizontal: 20,
    },
});

export default Categoria;