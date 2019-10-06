import React, { useState,useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
	Alert
} from 'react-native'
import {Card,Button,Header, Input} from 'react-native-elements';

import MenuButton from '../../MenuButton';
import api from '../../../../services/api';
import {find} from '../../../../services/banco';
import {USER_CURRENTY} from '../../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';
import IconButton from 'react-native-vector-icons/FontAwesome';

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
	
	cadastrarMarmita = async () => {
	
	}
     
    renderItem = ({ item }) => (
         <View >
            <Card containerStyle={styles.listItem}>
				<View>
					<View style={styles.buttons}>
						<Button 
							buttonStyle={styles.button}
							icon={
								<IconButton
									name='pencil'
									size={15}
									color='#EEE'
									style={styles.iconsDrawer}
								/>
							}
						/>
						<Button 
							buttonStyle={styles.button}
							icon={
								<IconButton
									name='trash-o'
									size={15}
									color='#EEE'
									style={styles.iconsDrawer}
								/>
							}
						/>
					</View>
					<View>
                        <Text>{item.tipoMarmita}</Text>
					</View>
				</View>
			</Card>
      </View>
    );

    return (       
        <View style={styles.mainContainer}>
        <MenuButton navigation={props.navigation} />
        <View style={styles.mainContainer}>
		<Header
			centerComponent={{ text: 'Marmitas', style: styles.tileHeader }}
			containerStyle={styles.header}
			/>
            <FlatList
                style={{ marginTop: 50 }}
                contentContainerStyle={styles.list}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.idMarmita.toString()}
            />
            <TouchableOpacity style={styles.floatButton} onPress={cadastrarMarmita}>
                <IconButton
                    name='plus'
                    size={20}
                    color='#ffffff'
                    style={styles.iconsDrawer}
                />
            </TouchableOpacity>
        </View>
    </View>
    );
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

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ffffff'
	},
	nome: {
		color: '#000000',
		fontSize: 18,
		marginBottom: 15
	},
	categoria: {
		color: '#000000',
		fontSize: 9
	},
	list: {
		paddingTop: 10,
		paddingHorizontal: 16
	},
	button: {
		backgroundColor: '#0f6124',
		borderRadius: 100,
		height: 30,
		width: 30,
		marginLeft: 18,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	listItem: {
		marginTop: 20,
		paddingTop: 10,
		paddingBottom: 50,
		paddingEnd: 10,
		padding: 30,
		borderRadius: 10,
		backgroundColor: '#EEE'
	},
	iconsDrawer: {
		paddingRight: 2
	},
	floatButton: {
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.2)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		position: 'absolute',
		bottom: 25,
		right: 25,
		height: 70,
		backgroundColor: '#0f6124',
		borderRadius: 100
	},
	header:{
		backgroundColor: '#0f6124',
		justifyContent: 'space-around',
		height:56
	},
	tileHeader:{
		color: '#FFF',
		fontFamily: 'Roboto-Thin',
		fontSize:20,
		marginBottom:25
	}
});

export default MarmitaAdmin;