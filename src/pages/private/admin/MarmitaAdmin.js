import React, { useState,Component,useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import api from '../../../services/api';
import {find} from '../../../services/banco';
import {USER_CURRENTY} from '../../../services/key'
import IconMaterial from 'react-native-vector-icons/FontAwesome';

const baseURL = 'https://api.github.com';
const searchTerm = 'react';
const perPage = 20;

// export default class MarmitaAdmin extends Component {

//     constructor(props){
//         super(props);
//         this.loadRepositories();
//     }
    
//     state = {
//         data: [],
//         loading: false,
//       };
    
//       componentDidMount() {
//         this.loadRepositories();
//       }
    
//       loadRepositories = async () => {
//         if (this.state.loading) return;
    
//         this.setState({ loading: true });
//         let usuario = await find(USER_CURRENTY);
//         //const response = await fetch(`${baseURL}/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${page}`);
//         const response = await api.get('/protegido/marmita/lista',{ headers: {Authorization: usuario.token,}}) ;
//         this.setState({
//           data: [ ...this.state.data, ...response.data],
//           loading: false,
//         });
//       }
  
//     renderItem = ({ item }) => (
//       <View style={mystyles.listItem}>
//         <Text>{item.tipoMarmita}</Text>
//       </View>
//     );

//     renderFooter = () => {
//         if (!this.state.loading) return null;
//         return (
//           <View style={mystyles.loading}>
//             <ActivityIndicator />
//           </View>
//         );
//       };
  
//     render() {
//       return (
//         <View style={ styles.mainContainer }>
//             <MenuButton navigation={this.props.navigation}/>
//             <FlatList
//             style={{ marginTop: 50 }}
//             contentContainerStyle={mystyles.list}
//             data={this.state.data}
//             renderItem={this.renderItem}
//             keyExtractor={item => item.idMarmita}
//             />
//         </View>
//       );    
//     }
//   }
const MarmitaAdmin = (props) => {

    const[data,setData] = useState([]);
    const[loading,setLoading] = useState(false);
    const[usuario,setUsuario] = useState({});

    useEffect(() => {
        loadRepositories();
      }, []);

    loadRepositories = async () => {
        setLoading(true);
        let usuario = await find(USER_CURRENTY);
         //const response = await fetch(`${baseURL}/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${page}`);
        const response = await api.get('/protegido/marmita/lista',{ headers: {Authorization: usuario.token,}});
        setData(response.data);
        setLoading(false);
    }
     
    renderItem = ({ item }) => (
      <View style={mystyles.listItem}>
        <Text>{item.tipoMarmita}</Text>
      </View>
    );
    
    renderFooter = () => {
        if (!loading) return null;
        return (
          <View style={mystyles.loading}>
            <ActivityIndicator />
          </View>
        );
      };

    

    return (
       
        <View style={ styles.mainContainer }>
            <MenuButton navigation={props.navigation}/>
            <View style={ styles.mainContainer }>
             <FlatList
             style={{ marginTop: 50 }}
             contentContainerStyle={mystyles.list}
             data={data}
             renderItem={renderItem}
             keyExtractor={item => item.idMarmita}
            />
         </View>
         <TouchableOpacity
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:70,
                position: 'absolute',                                          
                bottom: 25,                                                    
                right: 25,
                height:70,
                backgroundColor:'#fff',
                borderRadius:100,
                }}
            >
           <IconMaterial
            name='plus'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
            />
            </TouchableOpacity>
        </View>
    )
}

MarmitaAdmin.navigationOptions = {
    drawerLabel: 'Marmitas',
    drawerIcon:({focused, tintColor}) => (
        <IconMaterial
            name='cutlery'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

const mystyles = StyleSheet.create({
    list: {
      paddingHorizontal: 20,
    },
  
    listItem: {
      backgroundColor: '#EEE',
      marginTop: 20,
      padding: 30,
    },

    loading: {
        alignSelf: 'center',
        marginVertical: 20,
      }
  });

export default MarmitaAdmin;