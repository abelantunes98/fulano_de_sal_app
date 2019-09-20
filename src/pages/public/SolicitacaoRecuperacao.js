import React, {useState} from 'react';
import { KeyboardAvoidingView,
    Text,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native';

import { Card, Button, Input} from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { saveString } from '../../services/banco';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import{styles} from '../../styles/styles';
import api from '../../services/api';

const SolicitacaoRecuperacao = (props)=>{
    const [loadSolicitar,setLoadSolicitar] = useState(false);
    const [email, setEmail]= useState('');

    async function handler_entrar(){
        setLoadSolicitar(true);
        saveString('email', email);
        
        try{
        const response = await api.get('/publico/usuario/solicitarRecuperacao',{
            params:{
                email:email
            }
        });

        props.navigation.navigate('EnviarCodigoPage');

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

                        <Text style={styles.text} >Email</Text>
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
                            placeholder='Digite seu email'
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />

                        <View style={styles.forgotContainer}>
                            <Button 
                                title='Solicitar'
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