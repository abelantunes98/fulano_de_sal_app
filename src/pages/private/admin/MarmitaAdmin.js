import React, { useState,Component,useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { Card} from 'react-native-elements';

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import api from '../../../services/api';
import {find} from '../../../services/banco';
import {USER_CURRENTY} from '../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';

const MarmitaAdmin = (props) => {

    const[data,setData] = useState([]);

    useEffect(() => {
        loadRepositories();
      }, []);

    loadRepositories = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/marmita/listar',{ headers: {Authorization: usuario.token,}});
        setData(response.data);
    }
     
    renderItem = ({ item }) => (
         <View >
          <Card style={styles.listItem}>
            <Text>{item.tipoMarmita}</Text>
          </Card>
      </View>
    );

    return (       
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <View style={ styles.mainContainer }>
                <FlatList
                    style={{ marginTop: 50 }}
                    contentContainerStyle={styles.list}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.idMarmita.toString()}
                />
                <TouchableOpacity style={styles.floatButton}>
                    <IconMaterial
                        name='plus'
                        size={20}
                        color='#ffffff'
                        style={ styles.iconsDrawer }
                        />
                </TouchableOpacity>
            </View>
        </View>
    )
}

MarmitaAdmin.navigationOptions = {
    drawerLabel: 'Marmitas',
    drawerIcon:() => (
        <IconMaterial
            name='cutlery'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}
export default MarmitaAdmin;