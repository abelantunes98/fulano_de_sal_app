import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Card } from 'react-native-elements';
import SelectMultiple from 'react-native-select-multiple';

import api from '../../../../../services/api';
import { USER_CURRENTY } from '../../../../../services/key';
import { find } from '../../../../../services/banco';

export default function Marmita( props ) {
    const [marmitas, setMarmitas] = useState([]);
    const [selectedMarmita, setSelectedMarmita] = useState([]);
    const [marmitas_, setMarmitas_] = useState([]);

    useEffect(() => {
        init();
    }, []);

    init = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/marmita/listar',
            {
                headers: {
                    Authorization: usuario.token
                } 
            }
        );
        setMarmitas(response.data);

        loadProdutos();
    }

    loadProdutos = () => {
        // Busca os produtos dessa categorias.
        const novas_marmitas = [];
        marmitas.map((marmita) => {
            const p = { label: marmita.tipoMarmita, value: marmita.idMarmita };
            novas_marmitas.push(p);
        });
        setMarmitas_(novas_marmitas);
    }

    onSelectionsChange = (data, item) => {
        setSelectedMarmita([item]);
        props.marmitaSelecionada(item);
    }

    return (
        <View >
            <Card containerStyle={styles.listItem}>
                <Text style={{ textAlign: 'center' }}>Marmitas</Text>

                {marmitas_ && <SelectMultiple 
                    items={marmitas_}
                    checkboxStyle={{ tintColor: 'green' }}
                    selectedCheckboxStyle={{ tintColor: 'green' }}
                    selectedItems={selectedMarmita} 
                    onSelectionsChange={onSelectionsChange} 
                />
                }
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
		backgroundColor: '#FFF',
		marginTop: 20,
        padding: 30,
        borderRadius: 10
	},
    list: {
		paddingHorizontal: 20,
    },
});
