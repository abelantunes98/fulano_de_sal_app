import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ProgressBarAndroid,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconButton from 'react-native-vector-icons/FontAwesome';
import { Card, Button } from 'react-native-elements';
import { find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import api from '../../../services/api';

import SelectMultiple from 'react-native-select-multiple';


const Pedido = (props) => {
    const [cardapio, setCardapio] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        loadInfo = async () =>{
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
    
            const response = await api.get('/protegido/cardapio/ultimo', {
                headers: { Authorization: usuario.token }
            });
    
            if (!vazio(response.data)) {
                setCardapio(response.data.categorias);            
            }

            setLoad(false);
        }
    
        loadInfo();
    },[]);

    
    function vazio(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    function Categoria({ title, produtos }) {
        const [produtos_, setProdutos_] = useState([]);
        const [selectedProdutos, setSelectedProdutos] = useState([]);

        useEffect(()=>{
            loadProdutos();
        },[])

        loadProdutos = () => {
            // Busca os produtos dessa categorias.
            const novos_produtos = [];
            produtos.forEach(produto => {
                console.log(produto);
                const p = { label: produto.nome, value: produto.idProduto };
                novos_produtos.push(p);
            });
            setProdutos_(novos_produtos);
        }

        onSelectionsChange = (data, item) => {
            console.log(data);
            setSelectedProdutos(data);
            // props.produtosSelecionados(item);
        }

        return (
            <Card>
                <Text>{title}</Text>
                {produtos_ && <SelectMultiple 
                                    items={produtos_}
                                    checkboxStyle={{ tintColor: 'green' }}
                                    selectedCheckboxStyle={{ tintColor: 'green' }}
                                    selectedItems={selectedProdutos} 
                                    onSelectionsChange={onSelectionsChange} 
                              />
                }
            </Card>
        );
    }

    return(
        <View style={styles.mainContainer}>
            <Text>Opa</Text>
            {!load &&
                    <FlatList
                        data={cardapio}
                        renderItem={({ item }) => (
                            <Categoria
                                title={item.nome}
                                produtos={item.produtos}
                            />
                        )}
                        // As chaves precisam ser Strings.
                        keyExtractor={(item) => item.nome.toString()}
                    />
                }
                {load && <ProgressBarAndroid/>}
        </View>
    );
}

Pedido.navigationOptions = {
    drawerLabel: 'Pedido',
    drawerIcon: ({ focused, tintColor }) => (
        <IconMaterial
            name='plus-circle'
            size={20}
            color='black'
            style={{ padding: 2 }}
        />
    )

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
})

export default Pedido;