import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ProgressBarAndroid,
    ToastAndroid,
    Alert,
    Text,
    Picker,
} from 'react-native'
import { Button, Input } from 'react-native-elements';

import api from '../../../../services/api';
import { find } from '../../../../services/banco';
import { USER_CURRENTY } from '../../../../services/key'

import Categoria from './Categoria';

const CardapioCliente = (props) => {
    const [categorias, setCategorias] = useState([])
    const [produtosSelecionados, setProdutosSelecionados] = useState([])
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [tipoPagamento, setTipoPagamento] = useState('DINHEIRO');
    const [tipos, setTipos] = useState([])
    // const [ids, setIds] = useState([]);
    // campo de observação
    const [obs, setObs] = useState('');

    // recebe a quantidade de carne passada pelo props
    const [qtdCarnes, setQtdCarnes] = useState(props.qtdCarnes);

    useEffect(() => {
        preLoad();
        setTipos([{ label: 'Dinheiro', value: 'DINHEIRO' }, { label: 'Cartão', value: 'CARTAO' }]);
    }, [])

    preLoad = async () => {
        setLoading(true);
        await loadCategorias();
        setLoading(false);
    }

    loadCategorias = async () => {
        let usuario = await find(USER_CURRENTY);
        console.log(usuario);
        const response = await api.get('/protegido/cardapio/ultimo', { headers: { Authorization: usuario.token, } });
        console.log(response.data.categorias);
        setCategorias(response.data.categorias);
        setUser(usuario);
        setLoading(false);
    }

    itemJaExiste = (item) => {
        let saida = false;
        produtosSelecionados.forEach(element => {
            if (element.value === item.value) {
                saida = true;
            }
        });
        return saida;
    }

    onProdutosSelecionados = (item) => {
        if (itemJaExiste(item)) {
            const p = produtosSelecionados.filter((e) => { return e.value !== item.value });
            setProdutosSelecionados(p);
        } else {
            const p = [...produtosSelecionados, item];
            setProdutosSelecionados(p);
        }
    }

    renderItem = ({ item }) => {
        return <Categoria qtdCarnes={qtdCarnes} item={item} produtosSelecionados={onProdutosSelecionados} />
    }

    confirmar = () => {
        Alert.alert(
            `${user.nome}, confirmar pedido para`,
            `${user.endereco}?\n\nCaso tenha informado outro endereço nas observações, ignorar.`,
            [
                { text: 'Não' },
                { text: 'Sim', onPress: () => handlerSubmit() },
            ],
        );
    }

    handlerSubmit = async () => {
        try{
            setLoading(true);
            console.log(produtosSelecionados);
            let pedido = buildPedido(produtosSelecionados);
    
            await api.post('/protegido/pedido/',
                pedido,
                {
                    headers: { Authorization: user.token }
                });
            
            ToastAndroid.show("Obrigado! Aguarde a confirmação =)", ToastAndroid.SHORT);
            props.fecharModal();
            setLoading(false);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } 
    }

    buildPedido = (prodSelecionados) =>{
        const ids = [];
       
        prodSelecionados.forEach(produto => {
            ids.push(produto.value);
        });
        
        return {
            "email": user.email,
            "idMarmita": props.idMarmita,
            "idProdutos": ids,
            "observacoes": obs,
            "tipoPagamento": tipoPagamento,
        }
    }


    cancelar = () => {
        props.fecharModal();
    }

    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.mainContainer}>
                {!loading &&
                    <ScrollView style={{ marginBottom: 40 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, margin: 20 }}>OPÇÕES</Text>
                        <FlatList
                            style={{ marginTop: 20 }}
                            contentContainerStyle={styles.list}
                            data={categorias}
                            renderItem={renderItem}
                            keyExtractor={categoria => categoria.idCategoria.toString()}
                        />
                        <View>
                            <Text style={styles.inputTitle}>Escolha o Pagamento</Text>
                            <Picker
                                selectedValue={tipoPagamento}
                                style={{ height: 50, width: 300 }}
                                onValueChange={(tipo)=>{setTipoPagamento(tipo)}}>
                                {tipos.map(v => {
                                    return (<Picker.Item key={v} label={v.label} value={v.value} />);
                                })}
                            </Picker>
                        </View>
                        <View style={{marginTop: 40}}>
                            <Input placeholder='Observação. Ex: "pouco arroz", "deixar na casa ao lado", etc.' value={obs} onChangeText={setObs} multiline={true} />
                        </View>
                        <View style={styles.forgotContainer}>
                            <Button
                                buttonStyle={{
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: '#0f6124',
                                    width: 115,
                                }}
                                titleStyle={styles.titleStyle}
                                title='Cancelar'
                                onPress={cancelar}
                            />
                            <Button
                                buttonStyle={{
                                    marginTop: 10,
                                    marginBottom: 10,
                                    backgroundColor: '#0f6124',
                                    width: 115,
                                }}
                                titleStyle={styles.titleStyle}
                                title='Enviar'
                                onPress={confirmar}
                                loading={loading}
                            />
                        </View>
                    </ScrollView>
                }{loading && <ProgressBarAndroid />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    listItem: {
        backgroundColor: '#EEE',
        marginTop: 10,
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
        bottom: 10,
        right: 25,
        height: 70,
        backgroundColor: '#0f6124',
        borderRadius: 100,
    },
    iconsDrawer: {
        paddingRight: 2
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    titleStyle: {
        fontFamily: 'Roboto-Thin'
    },
    mainLoading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    inputTitle: {
        alignSelf: 'center',
        fontFamily: 'Oswald-Regular',
        fontSize: 16,
        margin: 20,
        padding: 10,
    },
});

export default CardapioCliente;