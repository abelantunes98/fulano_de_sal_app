import React, { useState } from 'react';
import { 
    KeyboardAvoidingView,
    Text,
    View,
    ScrollView,
    ToastAndroid,
    StyleSheet,
} from 'react-native';

import { Card, Button, Input } from 'react-native-elements';
import { findString } from '../../services/banco';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { criptografar } from '../../services/criptografia';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../services/api';

const SolicitacaoRecuperacao = (props) => {
    const [loadSolicitar, setLoadSolicitar] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenha2, setNovaSenha2] = useState('');

    handler_entrar = async () => {
        // Confere se as senhas digitadas nos dois campos são iguais
        if (novaSenha == novaSenha2) {    
            setLoadSolicitar(true);        
            var email = await findString('email');
            let senhaCriptografada = await criptografar(novaSenha);
            try {
                await api.post('/publico/usuario/recuperarSenha', {
                    email,
                    senha:senhaCriptografada
                });
            } catch(error) {
                ToastAndroid.show(error.response.data['message'],ToastAndroid.SHORT);
            }

            setLoadSolicitar(false);
            ToastAndroid.show('Senha alterada com sucesso!' ,ToastAndroid.SHORT);
            props.navigation.navigate('LoginPage');
        } else {
            alert('As senhas não conferem!');
        }
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

const styles = StyleSheet.create({
	mainContainer: {
		flexGrow : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
	},
	infoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	inforCard: {
        width: '93%',
        borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	},
	text: {
		fontFamily: 'Oswald-Regular',
		fontSize: 16,
		paddingTop: 10
	},
	icons: {
		paddingRight: 10
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	button: {
		marginTop: 10,
        backgroundColor: '#0f6124',
        width: 115,
	},
	titleStyle:{
        fontFamily: 'Roboto-Thin'
	},
	buttonCancel: {
		marginTop: 10,
        backgroundColor: '#82080a',
        width: 115,
    },
    forgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});

export default SolicitacaoRecuperacao;