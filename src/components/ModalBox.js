import React, { forwardRef, useState, createRef, useImperativeHandle, useRef, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    ScrollView,
    Alert,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import api from '../services/api';
import { USER_CURRENTY } from '../services/key';
import { find } from '../services/banco';
import RadioForm from 'react-native-simple-radio-button';
import MarmitaAdmin from '../pages/private/admin/marmita/MarmitaAdmin';

const ModalBox = forwardRef((props, ref) => {

    const modalRef = useRef();
    const [content, setContent] = useState(<Text>None</Text>);

    useImperativeHandle(ref, () => ({
        open: (event, nomeCategoria='', idCategoria='') => {
            contentModal(event, nomeCategoria, idCategoria);
            modalRef.current.open();
        },
    }));

    closeModal = () => {
        modalRef.current.close();
    };

    function contentModal(event, item='') {
        let r;
        switch (event) {
            case 'cadastroCategoria':
                r = (<CadastroCategorias close={closeModal} />);
                break;
            case 'editarCategoria':
                r = (
                <EditaCategoria
                    close={closeModal}
                    nome={item.descricao}
                    id={item.id}
                />);
                break;
            case 'cadastroMarmita':
                r = (<CadastroMarmitas close={closeModal}/>);
                break;
            case 'editarMarmita':
                r = (<EditaMarmita item={item}  close={closeModal}/>);
                break;
            case 'cadastroProduto':
                r = (<CadastroProdutos close={closeModal}/>);
                break;
            case 'editarProduto':
                r = (<EditaProduto close={closeModal}/>);
                 break;
            default:
                r = <Text>None</Text>;
            break;
        }
        setContent(r);
    };


    return (
        <Modal
            style={styles.modal}
            ref={modalRef}
            onClosed={props.refresh}>
            {content}
        </Modal>
    );
});
const EditaMarmita = (props) => {

    const[marmita,setMarmita] = useState(props.item);
    const [load,setLoad] = useState(false);
    const [descricao, setDescricao] = useState(marmita.descricao);
    const [tipo,setTipo] = useState(marmita.tipoMarmita);
    const [valor,setValor] = useState(marmita.valor.toString()); 
    const [tipos,setTipos] = useState([]);
    const [tradicional,setTradicional] = useState(false);

    useEffect(() => {
        setTipos([{label:'Tradicional',value:'TRADICIONAL'},{label:'Com divisórias', value:'DIVISORIA'}]);
        if(tipo=='TRADICIONAL'){
            setTradicional(true);
        }
      }, []);

    onSelectionsChange = (data) => {
        setSelectedTipo(data);
    }

    handle_editar = async () => {
        setLoad(true);
        try {
            let usuario = await find(USER_CURRENTY);
            
            let marmitaSave = {
                'idMarmita':marmita.idMarmita,
                'descricao': descricao,
                'tipoMarmita': tipo,
                'valor': valor
              }
            await api.post('/protegido/marmita/atualizar',
               marmitaSave,
                {
                    headers: { Authorization: usuario.token }
                });
            ToastAndroid.show("Editada com sucesso",ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'],ToastAndroid.LONG);
        } finally {
            props.close();
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Editar Marmita</Text>
            <Text style={styles.inputTitle}>Tipo</Text>
                {tradicional &&
                <RadioForm
                buttonColor={'#0f6124'}
                radio_props={tipos}
                initial={0}
                onPress={(value) => {setTipo(value)}}
                />
                }{!tradicional &&
                    <RadioForm
                    buttonColor={'#0f6124'}
                    radio_props={tipos}
                    initial={1}
                    onPress={(value) => {setTipo(value)}}
                    />
                }

            <Text style={styles.inputTitle}>Descrição</Text>
            <Input
                placeholder='Descricao'
                value={descricao}
                onChangeText={setDescricao}
            />

            <Text style={styles.inputTitle}>Valor</Text>
            <Input
                placeholder='Valor'
                value={valor}
                onChangeText={setValor}
                keyboardType={'numeric'}               
            />

            <View style={styles.buttonContainer}>
                <Button
                    title='Cancelar'
                    buttonStyle={styles.button}
                    onPress={props.close}
                />
                <Button
                    title='Editar'
                    buttonStyle={styles.button}
                    onPress={handle_editar}
                    loading = {load}
                />
            </View>
        </ScrollView>
    );

}

const CadastroMarmitas  = ({close}) => {
    
    const [load,setLoad] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [tipo,setTipo] = useState('TRADICIONAL');
    const [valor,setValor] = useState(''); 
    const [tipos,setTipos] = useState([]);

    useEffect(() => {
        setTipos([{label:'Tradicional',value:'TRADICIONAL'},{label:'Com divisórias', value:'DIVISORIA'}]);
      }, []);

    onSelectionsChange = (data) => {
        setSelectedTipo(data);
    }

    handle_cadastro = async () => {
        setLoad(true);
        try {
            let usuario = await find(USER_CURRENTY);
            let marmita = {
                'descricao': descricao,
                'tipo': tipo,
                'valor': valor
              }
            await api.post('/protegido/marmita/',
               marmita,
                {
                    headers: { Authorization: usuario.token }
                });
            ToastAndroid.show("Cadastrado com sucesso",ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'],ToastAndroid.LONG);
        } finally {
            close();
        }

    }
    

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Cadastrar Marmita</Text>
            <Text style={styles.inputTitle}>Tipo</Text>
                <RadioForm
                buttonColor={'#0f6124'}
                radio_props={tipos}
                initial={0}
                onPress={(value) => {setTipo(value)}}
                />

            <Text style={styles.inputTitle}>Descrição</Text>
            <Input
                placeholder='Descricao'
                value={descricao}
                onChangeText={setDescricao}
            />

            <Text style={styles.inputTitle}>Valor</Text>
            <Input
                placeholder='Valor'
                value={valor}
                onChangeText={setValor}
                keyboardType={'numeric'}
               
            />

            <View style={styles.buttonContainer}>
                <Button
                    title='Cancelar'
                    buttonStyle={styles.button}
                    onPress={close}
                />
                <Button
                    title='Cadastrar'
                    buttonStyle={styles.button}
                    onPress={handle_cadastro}
                    loading = {load}
                />
            </View>
        </ScrollView>
    );
};

const CadastroCategorias = ({ close }) => {

    const [descricao, setDescricao] = useState('');

    handle_cadastro = async () => {
        try {
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/',
                { 'descricao': descricao },
                {
                    headers: { Authorization: usuario.token }
                });
        } catch (e) {
            ToastAndroid.show('Categoria não foi cadastrada')
        } finally {
            close();
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Cadastrar categoria</Text>
            <Text style={styles.inputTitle}>Descrição</Text>
            <Input
                placeholder='Nome da categoria'
                value={descricao}
                onChangeText={setDescricao}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title='Cancelar'
                    buttonStyle={styles.button}
                    onPress={close}
                />
                <Button
                    title='Cadastrar'
                    buttonStyle={styles.button}
                    onPress={handle_cadastro}
                />
            </View>
        </ScrollView>
    );
};

const EditaCategoria = (props) => {

    const [descricao, setDescricao] = useState(props.nome);
    const id = props.id;

    handle_edicao = async () => {
            try {
                let usuario = await find(USER_CURRENTY);
                await api.post('/protegido/categoria/atualizar',
                    { 
                        'descricao': descricao, 
                        'id': id
                    },
                    {
                        headers: { Authorization: usuario.token }
                    });
            } catch (e) {
                ToastAndroid.show('Categoria não foi editada')
            } finally {
                props.close();
            }    
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar categoria</Text>
        <Text style={styles.inputTitle}>Descrição</Text>
        <Input
            placeholder='Nome da categoria'
            value={descricao}
            onChangeText={setDescricao}
        />
        <View style={styles.buttonContainer}>
            <Button
                title='Cancelar'
                buttonStyle={styles.button}
                onPress={props.close}
            />
            <Button
                title='Editar'
                buttonStyle={styles.button}
                onPress={handle_edicao}
            />
        </View>
    </ScrollView>
    );
};


const CadastroProdutos = ({ close }) => {
    /* Necessário mostrar as categorias para o admin escolher*/
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [id, setId] = useState('');
    //const categorias = await api.get('/protegido/categoria/listar', { headers: { Authorization: usuario.token } });


    handle_cadastro = async () => {
        try {
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/produto/',
                { 'categoria':{'descricao': descricao,'id':id},'nome': nome },
                {
                    headers: { Authorization: usuario.token }
                });
        } catch (e) {
            ToastAndroid.show('Produto não foi cadastrado')
        } finally {
            close();
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Cadastrar produto</Text>
            <Text style={styles.inputTitle}>Nome</Text>
            <Input
                placeholder='Nome do produto'
                value={nome}
                onChangeText={setNome}
            />
             <Text style={styles.inputTitle}>Categoria</Text>
            <Input
                placeholder='Nome da categoria'
                value={descricao}
                onChangeText={setDescricao}
            />
             <Text style={styles.inputTitle}>idCategoria</Text>
            <Input
                placeholder='id da categoria'
                value={id}
                onChangeText={setId}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title='Cancelar'
                    buttonStyle={styles.button}
                    onPress={close}
                />
                <Button
                    title='Cadastrar'
                    buttonStyle={styles.button}
                    onPress={handle_cadastro}
                />
            </View>
        </ScrollView>
    );
};

const EditaProduto = (props) => {
    /* Necessário mostrar as categorias para o admin escolher*/
    const [nome, setNome] = useState(props.nome);
    const idProduto = props.idProduto;

    handle_edicao = async () => {
            try {
                let usuario = await find(USER_CURRENTY);
                await api.post('/protegido/produto/atualizar',
                    { 
                        'categoria':{
                            'descricao':descricao,
                            'id':id
                        },
                        'nome': nome, 
                        'idProduto': idProduto
                    },
                    {
                        headers: { Authorization: usuario.token }
                    });
            } catch (e) {
                ToastAndroid.show('Produto não foi editado')
            } finally {
                props.close();
            }    
    };
    
    return (
        <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar produto</Text>
        <Text style={styles.inputTitle}>Nome</Text>
        <Input
            placeholder='Nome do produto'
            value={nome}
            onChangeText={setNome}
        />
        <Input
            placeholder='Categoria do produto'
            value={nome}
            onChangeText={setNome}
        />
        <View style={styles.buttonContainer}>
            <Button
                title='Cancelar'
                buttonStyle={styles.button}
                onPress={props.close}
            />
            <Button
                title='Editar'
                buttonStyle={styles.button}
                onPress={handle_edicao}
            />
        </View>
    </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        marginTop: 25,
        marginBottom: 25,
        fontFamily: 'Oswald-Bold',
        fontSize: 28,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        fontFamily: 'Oswald-Regular',
        fontSize: 16,
        paddingTop: 10,
        paddingLeft: 10
    },
    modal: {
        justifyContent: 'center',
        height: 400,
        width: '97%'
    },
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom:'10%'
    },
    buttonContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});


export default ModalBox;