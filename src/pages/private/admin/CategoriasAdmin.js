import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Card } from 'react-native-elements';

import { USER_CURRENTY } from '../../../services/key';
import { find } from '../../../services/banco';
import api from '../../../services/api';
import MenuButton from '../MenuButton';
import IconMaterial from 'react-native-vector-icons/AntDesign';
import IconButton from 'react-native-vector-icons/FontAwesome';

const CategoriasAdmin = (props) => {
    const[data,setData] = useState([]);

    useEffect(() => {
        loadRepositories();
      }, []);

    loadRepositories = async () => {
        let usuario = await find(USER_CURRENTY);
        const response = await api.get('/protegido/categoria/listar',{ headers: { Authorization: usuario.token } });
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
                    <IconButton
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

const styles = StyleSheet.create({
    mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
    listItem: {
		backgroundColor: '#EEE',
		marginTop: 20,
		padding: 30
	},
    list: {
		paddingHorizontal: 20,
    },
    floatButton:{
		borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 25,                                                    
        right: 25,
        height:70,
        backgroundColor:'#0f6124',
        borderRadius:100,
    },
    iconsDrawer: {
		paddingRight: 2
	},
});

export default CategoriasAdmin;