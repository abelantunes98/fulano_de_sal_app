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


const Pedido = (props) => {
    const [cardapio, setCardapio] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        loadInfo();
    },[]);

    loadInfo = async () =>{
        setLoad(true);
        let usuario = await find(USER_CURRENTY);

        const response = await api.get('/protegido/cardapio/ultimo', {
            headers: { Authorization: usuario.token }
        });

        if (!vazio(response.data)) {
            setCardapio(response.data);
        }
        setLoad(false);
    }

    function vazio(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    function Categoria({ title, produtos }) {
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

    return(
        <View>
            {!load &&
                    <FlatList
                        data={cardapioDoDia}
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

export default Pedido;