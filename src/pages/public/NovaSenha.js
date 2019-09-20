import React, {useState} from 'react';
import { KeyboardAvoidingView,
    Text,
    AsyncStorage,
    View,
    ScrollView,
    ToastAndroid
} from 'react-native';

import { Card, Button, Input} from 'react-native-elements';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import{styles} from '../../styles/styles';
import api from '../../services/api';

const SolicitacaoRecuperacao = (props)=>{
    const [loadSolicitar,setLoadSolicitar] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenha2, setNovaSenha2] = useState('');

    async function handler_entrar(){
        setLoadSolicitar(true);        
       try {
            var email = await  AsyncStorage.getItem('email');
        }
        catch(error) {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
        
        try{
        const response = await api.post('/publico/usuario/recuperarSenha',{
                email,
                senha:novaSenha
        });
        ToastAndroid.show(response.data['message'],ToastAndroid.SHORT);
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
                            fontSize: 28 }}>Alteração de Senha</Text>

                        <Text style={styles.text} >Nova senha</Text>
                       
                        <Input
                            leftIcon={
                                <IconFont
                                    name='user-secret'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Nova senha'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                        />    

                       <Input
                            leftIcon={
                                <IconFont
                                    name='user-secret'
                                    size={15}
                                    color='black'
                                    style={ styles.icons }
                                />
                            }
                            placeholder='Confirme a nova senha'
                            secureTextEntry={true}
                            containerStyle={styles.input}
                            secureTextEntry={true}
                            value={novaSenha2}
                            onChangeText={setNovaSenha2}
                        />    

                        <View style={styles.forgotContainer}>
                            <Button 
                                title='Confirmar'
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