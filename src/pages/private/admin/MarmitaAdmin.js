import React, { useState,Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { styles } from '../../../styles/styles';
import MenuButton from '../MenuButton';
import api from '../../../services/api';
import {find} from '../../../services/banco';
import {USER_CURRENTY} from '../../../services/key'

const baseURL = 'https://api.github.com';
const searchTerm = 'react';
const perPage = 20;

export default class MarmitaAdmin extends Component {

    constructor(props){
        super(props);
    }
    
    state = {
        data: [],
        loading: false,
      };
    
      componentDidMount() {
        this.loadRepositories();
      }
    
      loadRepositories = async () => {
        if (this.state.loading) return;
    
        this.setState({ loading: true });
        let usuario = await find(USER_CURRENTY);
        //const response = await fetch(`${baseURL}/search/repositories?q=${searchTerm}&per_page=${perPage}&page=${page}`);
        const response = await api.get('/protegido/marmita/lista',{ headers: {Authorization: usuario.token,}}) ;
        this.setState({
          data: [ ...this.state.data, ...response.data],
          loading: false,
        });
      }
  
    renderItem = ({ item }) => (
      <View style={mystyles.listItem}>
        <Text>{item.tipoMarmita}</Text>
      </View>
    );

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
          <View style={mystyles.loading}>
            <ActivityIndicator />
          </View>
        );
      };
  
    render() {
      return (
        <View style={ styles.mainContainer }>
            <MenuButton navigation={this.props.navigation}/>
            <FlatList
            style={{ marginTop: 50 }}
            contentContainerStyle={mystyles.list}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.idMarmita}
            onEndReached={this.loadRepositories}

            />
        </View>
      );
    }
  }
// const MarmitaAdmin = (props) => {

//     const[list,setList] = useState([]);

//     async function buscaLista(){
//         let usuario = await find(USER_CURRENTY);
//         try{
//             let lista = await api.get('/protegido/marmita/lista',{ headers: {
//                 Authorization: usuario.token,
//             }}); 
//             setList(lista);
//             ToastAndroid.show(error.response.data['message'],ToastAndroid.SHORT);   
//         } catch (e){
//             ToastAndroid.show("show",ToastAndroid.SHORT);
//         }
//     }
//     renderItem = ({ item }) => (
//         <View style={mystyles.listItem}>
//           <Text>{item.valor}</Text>
//         </View>
//       );    

//     return (
//         <View style={ styles.mainContainer }>
//             <MenuButton navigation={props.navigation}/>
//             <Text style={{alignSelf: 'center'}}>Marmitas</Text>
            
//         </View>
//     )
// }

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

// export default MarmitaAdmin;