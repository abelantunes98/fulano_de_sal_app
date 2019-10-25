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

    //qtd de carnes fornecida pelo props de cardapioCliente
    const [qtdCarnes, setQtdCarnes] = useState(props.qtdCarnes);

    qtdCerta = (nomeCategoria) => {
        let nomeLower = nomeCategoria.toLowerCase();
        let qtd = 1;
        if(nomeLower.includes('carne')){
            qtd = qtdCarnes;
        }else if(nomeLower.includes('acompanhamento') || nomeLower.includes('salada')){
            // zero pois será feita uma verificação de restrinção 
            qtd = 0;
        }
        console.log(qtd);
        return qtd;
    }

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
        console.log(data);
        console.log(item);
        console.log('tamanho do array: ' + data.length);
        console.log('nome da categoria: ' + item.nomeCategoria);
        // setSelectedProdutos(data);
        let _qtd = qtdCerta(categoria.nome);
        console.log('quantidade retornada: ' + _qtd);
        if(!_qtd == 0){
            // só pode selecionar 1
            if(_qtd == 1){
                data.length > 1 ? printInvalid(_qtd) : sucess();
            }else{
                // seleção de carnes
                data.length > qtdCarnes + 1 ? printInvalid(_qtd) : sucess();
            }
        }else{
            //seleção livre ( salada ou acompanhamento )
            sucess();
        }
        // props.produtosSelecionados(item);

        printInvalid = (qtd) => (ToastAndroid.show(`Desculpe, mas só pode selecionar ${qtd} para ${categoria.nome}`, ToastAndroid.SHORT));

        sucess = () => {
            console.log('chegou');
            setSelectedProdutos(data);
            props.produtosSelecionados(item);
        }
    }

    

    // verifica a substring no nome da categoria para pegar a quantidade certa para restringir
    qtdCerta = (nomeCategoria) => {
        let nomeLower = nomeCategoria.toLowerCase();
        let qtd = 1;
        if(nomeLower.includes('carne')){
            qtd = qtdCarnes;
        }else if(nomeLower.includes('acompanhamento') || nomeLower.includes('salada')){
            // zero pois será feita uma verificação de restrinção 
            qtd = 0;
        }
        console.log(qtd);
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