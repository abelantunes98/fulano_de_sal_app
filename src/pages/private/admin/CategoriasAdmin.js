import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';

import { styles } from '../../../styles/styles';
import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';

const CategoriasAdmin = (props) => {
    const[data,setData] = useState([]);

    useEffect(() => {
        loadRepositories();
      }, []);

    loadRepositories = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/lista',{ headers: {Authorization: usuario.token,}});
        setData(response.data);
    }
     
    renderItem = ({ item }) => (
         <View >
          <Card style={styles.listItem}>
            <Text>{item.descricao}</Text>
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
                    keyExtractor={item => item.id.toString()}
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

CategoriasAdmin.navigationOptions = {
    drawerLabel: 'Categorias',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='tags'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

export default CategoriasAdmin;