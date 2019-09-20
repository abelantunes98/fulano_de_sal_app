import React, {useState} from 'react';
import { KeyboardAvoidingView,
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native';

import { Card, Button, Input} from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import{styles} from '../../styles/styles';
import api from '../../services/api';
import { findString } from '../../services/banco';

const SolicitacaoRecuperacao = (props)=>{
    const [loadSolicitar,setLoadSolicitar] = useState(false);
    const [codigo, setCodigo]= useState('');

    async function handler_entrar(){
        setLoadSolicitar(true);
        var email = await findString('email'); 

        try{
        const response = await api.post('/publico/usuario/confirmaCodigo',{
            codigo,    
            email
        });

        // response.data é um Boolean.
        if (response.data) {
            props.navigation.navigate('NovaSenhaPage');
        } else {
            ToastAndroid.show('O código está errado!', ToastAndroid.SHORT);
        }

        }catch(error){
            ToastAndroid.show(error.response.data['message'],ToastAndroid.SHORT);
        }
        setLoadSolicitar(false);

    }
        
    return (
        <ScrollView contentContainerStyle={ styles.mainContainer }>
            <KeyboardAvoidingView>
                <View style={ styles.infoContainer }>
                    <Card containerStyle={ styles.inforCard }>
                        <Text style={{
                            fontFamily: 'Oswald-Bold', 
                            textAlign: 'center', 
                            fontSize: 28 }}>Solicitar Recuperação</Text>

                        <Text style={styles.text} >Código recebido em seu E-mail</Text>
                        <Input
                            leftIcon={
                                <IconFont
                                    name='envelope'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            autoCapitalize='none'
                            placeholder='Código'
                            keyboardType='default'
                            value={codigo}
                            onChangeText={setCodigo}
                            style={styles.input}
                        />

                        <View style={styles.forgotContainer}>
                            <Button 
                                title='Enviar'
                                buttonStyle={styles.button}
                                onPress={handler_entrar}   
                                titleStyle={styles.titleStyle}  
                                loading={loadSolicitar}                      
                            />
                            <Button
                                icon={
                                    <IconMaterial 
                                        name='cancel'
                                        size={15}
                                        color='white'
                                        style={ styles.icons }
                                    />
                                }
                                iconLeft
                                title='Cancelar'
                                buttonStyle={styles.buttonCancel}
                                onPress={_=>{props.navigation.navigate('LoginPage')}}
                                titleStyle={styles.titleStyle}  
                            />
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};


export default SolicitacaoRecuperacao;