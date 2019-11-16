import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    FlatList,
    StyleSheet,
    View,
    ProgressBarAndroid,
} from 'react-native'

import { Card } from 'react-native-elements';
// import api from '../../../../services/api';
import api from '../../../../services/api';
import { USER_CURRENTY } from '../../../../services/key';
import { find } from '../../../../services/banco';


const CardapioDoDia = props => {
    const [data, setData] = useState(Date);
    const [cardapioDoDia, setCardapioDoDia] = useState({});
    const [load,setLoad] = useState(false);
    
    useEffect(() => {
        loadInfo();
    }, []);

    loadInfo = async () => {
        setLoad(true);
        let usuario = await find(USER_CURRENTY);

        const response = await api.get('/protegido/cardapio/ultimo', {
            headers: { Authorization: usuario.token }
        });

        if (!vazio(response.data)) {
            setData(response.data.data);
            setCardapioDoDia(response.data.categorias);
        }
        setLoad(false);
    }

    function vazio(obj) {
        return obj==null || Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    function Item({ title, produtos }) {
        return (
            <Card containerStyle={styles.subcontainer}>
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
    if (!vazio(cardapioDoDia)) {
        return (
            <View>
                {!load &&
                    <FlatList
                        data={cardapioDoDia}
                        renderItem={({ item }) => (
                            <Item
                                title={item.nome}
                                produtos={item.produtos}
                            />
                        )}
                        // As chaves precisam ser Strings.
                        keyExtractor={(item) => item.nome.toString()}
                        ListFooterComponent={View}
					    ListFooterComponentStyle={{height:200}}
                    />
                }
                {load && <ProgressBarAndroid/>}
          </View>
        );
    } else {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, textAlign: "center" }}>Desculpe, mas ainda não temos um cardápio disponível.</Text>
            </View>
        );
    }


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
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
        marginBottom: 5,
        color: 'black',
        fontWeight: '700',
        fontSize: 22,
    },
    options: {
        paddingTop: 10,
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',

    },
    produtos: {
        margin: 5,
        color: '#aaaaaa',
        fontWeight: '700',
        fontSize: 16,
    },
    subcontainer: {
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderColor: '#FFF',
		elevation:6,
		shadowOffset: { width: 5, height: 5 },
		shadowColor: "black",
		shadowOpacity: 0.5,
		shadowRadius: 10
    },
});

export default CardapioDoDia;