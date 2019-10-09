import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    ToastAndroid,
    StyleSheet,
} from 'react-native'

import MenuButton from '../MenuButton';
import IconFont from 'react-native-vector-icons/FontAwesome';
import { save, find } from '../../../services/banco';
import { USER_CURRENTY } from '../../../services/key';
import { Button, Input } from 'react-native-elements';
import api from '../../../services/api';

const ConfiguracoesCliente = (props) => {

    const [userDados, setUserDados] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');

    useEffect(()=>{
        carregarDados();
    }, []);

    carregarDados = async () =>{
        let userDadosRet = await find(USER_CURRENTY);
        setUserDados(userDadosRet);
    }

    enviaDados = async () => {
        /*
         O usuario pode alterar quantos dados quiser, exceto o E-mail, caso ele
         decida alterar só um, como o nome, os outros parâmetros são preenchidos
         pelos dados de usuário salvos.
        */
        let nomeEnviar;
        let enderecoEnviar;
        let telefoneEnviar;
        let emailEnviar = userDados.email;
        let senhaEnviar = userDados.senha;
        if (telefone == '') {
            telefoneEnviar = userDados.telefone;
        } else {
            telefoneEnviar = telefone;
        }
        if (endereco == '') {
            enderecoEnviar = userDados.endereco;
        } else {
            enderecoEnviar = endereco;
        }
        if (nome == '') {
            nomeEnviar = userDados.nome;
        } else {
            nomeEnviar = nome;
        }

        // Verifica se algum dado foi digitado.
        if (telefone != '' || nome != '' || endereco != '') {
            
            try {
                const response = await api.post('/protegido/cliente/atualizar', 
                {
                    email: emailEnviar, 
                    senha: senhaEnviar,
                    endereco: enderecoEnviar,
                    telefone: telefoneEnviar,
                    nome: nomeEnviar
                },
                {headers: { Authorization: userDados.token }}
            );
        
            if (response.status == 200) {
                let data = response.data
                userDados.nome = data.nome;
                userDados.endereco = data.endereco;
                userDados.telefone = data.telefone;

                // Altera os dados salvos.
                save(USER_CURRENTY, userDados);
                // Limpa os campos onde o usuario digitou.
                setEndereco('');
                setNome('');
                setTelefone('');
                
                ToastAndroid.show('Dados atualizados com sucesso!', ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show('Erro, tente novamente mais tarde!',ToastAndroid.SHORT);
        }
        } else {
            ToastAndroid.show('Insira algum dado para alterar!',ToastAndroid.SHORT);
        }
    }
    return (
        <View style={styles.mainContainer}>
            <MenuButton navigation={props.navigation} title='Configurações' />
            <View style={ styles.childContainerOne }>
                <Image 
                    style={ styles.imgHeader }
                    source={require('../../../images/LOGO1.png')}
                />
            </View>

            <View style={ styles.childContainerTwo }>
                <Image
                   style={ styles.imgMain }
                   source={require('../../../images/usernot.png')}
                />
            </View>

            <View style={ styles.childContainerThree }>
                <Input
                    leftIcon={
                        <IconFont
                            name='user'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder={userDados.nome}
                    autoCapitalize='words'
                    value={nome}
                    onChangeText={setNome}
                    style={styles.input}
                />
                <Input
                    leftIcon={
                        <IconFont
                            name='envelope'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder={userDados.email}
                    autoCapitalize='none'
                    placeholderTextColor='#000000'
                    editable={false}
                    style={styles.input}
                />
                <Input
                    leftIcon={
                        <IconFont
                            name='phone'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder={userDados.telefone}
                    keyboardType='phone-pad'
                    value={telefone}
                    onChangeText={setTelefone}
                    style={styles.input}
                />
                <Input
                    leftIcon={
                        <IconFont
                            name='address-card'
                            size={15}
                            color='black'
                            style={ styles.icons }
                        />
                    }
                    placeholder={userDados.endereco}
                    autoCapitalize='words'
                    value={endereco}
                    onChangeText={setEndereco}
                    style={styles.input}
                />
                <Button
                    buttonStyle={ styles.buttonSenha }
                    title='Alterar senha'
                    onPress={_=>{props.navigation.navigate('AlterarSenha')}}
                />
            </View>

            <View style={ styles.childContainerFour }>
                <Button
                    buttonStyle={ styles.button }
                    title='Salvar Configurações'
                    onPress={enviaDados}
                />
            </View>
        </View>
    )
}

ConfiguracoesCliente.navigationOptions = {
    drawerLabel: 'Configurações',
    drawerIcon:({focused, tintColor}) => (
        <IconFont
            name='cogs'
            size={20}
            color='black'
            style={ styles.iconsDrawer }
        />
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent : "space-around",
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    // logo
    childContainerOne:{
        flexDirection: "row",
        borderBottomWidth: 3,
        borderBottomColor: '#000000',
        height: '10%',
    },
    // imagem
    childContainerTwo:{
        height: '25%', 
        alignItems: "center",
        justifyContent: "center",
    },
    // informações
    childContainerThree:{
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: "center"
    },
    // botão
    childContainerFour:{
        height: '10%',
        width: '100%',
        alignItems: "center",
    },
    button:{
        marginTop: 10,
        backgroundColor: '#0f6124',
    },
    buttonSenha:{
        marginTop: 5,
        backgroundColor: '#0f6124',
        borderRadius: 50,
        width: '40%',
        paddingEnd: '5%'
    },
    imgHeader:{
        width: 100,
        height: 50,
    },
    imgMain:{
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    iconsDrawer: {
		paddingRight: 2
	},
});

export default ConfiguracoesCliente;