import React, { forwardRef, useState, useImperativeHandle, useRef, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ToastAndroid,
    ScrollView,
    Picker,
} from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import api from '../services/api';
import { USER_CURRENTY } from '../services/key';
import { find } from '../services/banco';

const ModalBox = forwardRef((props, ref) => {

    const modalRef = useRef();
    const [content, setContent] = useState(<Text>None</Text>);

    useImperativeHandle(ref, () => ({
        open: (event, item = {}) => {
            contentModal(event, item);
            modalRef.current.open();
        },
    }));

    closeModal = () => {
        modalRef.current.close();
    };

    function contentModal(event, item = {}) {
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
                r = (<CadastroMarmitas close={closeModal} />);
                break;
            case 'editarMarmita':
                r = (<EditaMarmita item={item} close={closeModal} />);
                break;
            case 'cadastroProduto':
                r = (<CadastroProdutos
                    item={item}
                    close={closeModal} />);
                break;
            case 'editarProduto':
                r = (<EditaProduto
                    close={closeModal}
                    item={item.item}
                    categorias={item.categorias}
                />);
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
            onClosed={props.refresh}
            hardwareAccelerated={true}
            transparent={true}
            >
            {content}
        </Modal>
    );
});
const EditaMarmita = (props) => {

    const [marmita] = useState(props.item);
    const [load, setLoad] = useState(false);
    const [descricao, setDescricao] = useState(marmita.descricao);
    const [tipo, setTipo] = useState(marmita.tipoMarmita);
    const [valor, setValor] = useState(marmita.valor.toString());
    const [tipos, setTipos] = useState([]);


    useEffect(() => {
        setTipos([{ label: 'Tradicional', value: 'TRADICIONAL' }, { label: 'Com divisórias', value: 'DIVISORIA' }]);
    }, []);

    handle_editar = async () => {
      
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);

            let marmitaSave = {
                'idMarmita': marmita.idMarmita,
                'descricao': descricao,
                'tipoMarmita': tipo,
                'valor': valor
            }
            await api.post('/protegido/marmita/atualizar',
                marmitaSave,
                {
                    headers: { Authorization: usuario.token }
                });
            ToastAndroid.show("Marmita editada com sucesso", ToastAndroid.SHORT);
            setLoad(false);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            props.close();
        }

    }
    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style ={styles.content}>
                <Text style={styles.title}>Editar Marmita</Text>
                <Text style={styles.inputTitle}>Tipo</Text>
                <Picker
                    selectedValue={tipo}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue) => {
                        setTipo(itemValue);
                    }}>
                    
                    {tipos.map(v => {
                        return (<Picker.Item key={v} label={v.label} value={v.value} />);
                    })}
                </Picker>
                <Text style={styles.inputTitle}>Descrição</Text>
                <Input
                    placeholder='Descricao'
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline={true}

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
                        loading={load}
                    />
                </View>
            </View>
        </Card>
    </ScrollView>
    );

}

const CadastroMarmitas = ({ close }) => {

    const [load, setLoad] = useState(false);
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('TRADICIONAL');
    const [valor, setValor] = useState('');
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        setTipos([{ label: 'Tradicional', value: 'TRADICIONAL' }, { label: 'Com divisórias', value: 'DIVISORIA' }]);
    }, []);

    handle_cadastro = async () => {
        try {
            setLoad(true);
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
            ToastAndroid.show("Marmita cadastrada com sucesso", ToastAndroid.SHORT);
            setLoad(false);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            close();
        }

    }


    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style ={styles.content}>
                <Text style={styles.title}>Cadastrar Marmita</Text>
                <Text style={styles.inputTitle}>Tipo</Text>
                <Picker
                    selectedValue={tipo}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(tipo)=>{setTipo(tipo)}}>
                    {tipos.map(v => {
                        return (<Picker.Item key={v} label={v.label} value={v.value} />);
                    })}
                </Picker>

                <Text style={styles.inputTitle}>Descrição</Text>
                <Input
                    placeholder='Descricao'
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline={true}
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
                        loading={load}
                    />
                </View>
                </View>
            </Card>
        </ScrollView> 
    );
};

const CadastroCategorias = ({ close }) => {

    const [descricao, setDescricao] = useState('');
    const [load, setLoad] = useState(false);

    handle_cadastro = async () => {
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/',
                { 'descricao': descricao },
                {
                    headers: { Authorization: usuario.token }
                });
            setLoad(false);
            ToastAndroid.show('Categoria cadastrada com sucesso',ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            close();
        }

    }

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style ={styles.content}>
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
                        loading={load}
                    />
                </View>
                </View>
            </Card>
        </ScrollView>
    );
};

const EditaCategoria = (props) => {

    const [descricao, setDescricao] = useState('');
    const [id,setId] = useState('');
    const [load, setLoad] = useState(false);

    useEffect(() => {
       setDescricao(props.nome);
       setId(props.id);
    }, []);

    handle_edicao = async () => {
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/categoria/atualizar',
                {
                    'descricao': descricao,
                    'id': id
                },
                {
                    headers: { Authorization: usuario.token }
                });
                setLoad(false);
                ToastAndroid.show("Categoria editada com sucesso",ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            props.close();
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style ={styles.content}>
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
                        loading={load}
                    />
                </View>
                </View>
            </Card>
        </ScrollView>
    );
};


const CadastroProdutos = (props) => {
    const [load,setLoad] = useState(false);
    const [nome, setNome] = useState('');
    const [categorias, setCategorias] = useState(props.item);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

    useEffect(() => {
        setCategoriaSelecionada(categorias[0]);
     }, []);

    handle_cadastro = async () => {
        
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/produto/',
                { 'idCategoria': categoriaSelecionada.id, 'nome': nome },
                {
                    headers: { Authorization: usuario.token }
                });
                ToastAndroid.show("Produto cadastrado com sucesso", ToastAndroid.SHORT);
            setLoad(false);
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            props.close();
        }
       

    }

    function pickerChange(index) {
        categorias.map((v, i) => {
            if (index === i) {
                setCategoriaSelecionada({ id: v.id, descricao: v.descricao });
            }
        })
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style ={styles.content}>
                <Text style={styles.title}>Cadastrar produto</Text>
                <Text style={styles.inputTitle}>Nome</Text>
                <Input
                    placeholder='Nome do produto'
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.inputTitle}>Categoria</Text>
                <Picker
                    selectedValue={categoriaSelecionada.descricao}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        pickerChange(itemIndex);
                    }}>
                    {categorias.map(v => {
                        return (<Picker.Item key={v.id} label={v.descricao} value={v.descricao} />);
                    })}
                </Picker>

                <View style={styles.buttonContainer}>
                    <Button
                        title='Cancelar'
                        buttonStyle={styles.button}
                        onPress={props.close}
                    />
                    <Button
                        title='Cadastrar'
                        buttonStyle={styles.button}
                        onPress={handle_cadastro}
                        loading={load}
                    />
                </View>
                </View>
            </Card>
        </ScrollView>
    );
};

const EditaProduto = (props) => {

    const [nome, setNome] = useState('');
    const [idProduto,setIdProduto] = useState('');
    const [categorias, setCategorias] = useState(props.categorias);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [load,setLoad] = useState(false);

    useEffect(() => {
        setNome(props.item.nome);
        setIdProduto(props.item.idProduto);
        setCategoriaSelecionada(props.item.categoria);
     }, []);

    handle_edicao = async () => {
        try {
            setLoad(true);
            let usuario = await find(USER_CURRENTY);
            await api.post('/protegido/produto/atualizar',
                {
                    'categoria': {
                        'descricao': categoriaSelecionada.descricao,
                        'id': categoriaSelecionada.id
                    },
                    'nome': nome,
                    'idProduto': idProduto
                },
                {
                    headers: { Authorization: usuario.token }
                });
            setLoad(false);
            ToastAndroid.show('Produto editado com sucesso')
        } catch (error) {
            ToastAndroid.show(error.response.data['message'], ToastAndroid.SHORT);
        } finally {
            props.close();
        }
    };

    function pickerChange(index) {
        categorias.map((v, i) => {
            if (index === i) {
                setCategoriaSelecionada({ id: v.id, descricao: v.descricao });
            }
        })
    };

    return (
        <ScrollView contentContainerStyle={styles.content}>
            <Card containerStyle={styles.card}>
                <View style ={styles.content}>
                <Text style={styles.title}>Editar produto</Text>
                <Text style={styles.inputTitle}>Nome</Text>
                <Input
                    placeholder='Nome do produto'
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.inputTitle}>Categoria</Text>
                <Picker
                    selectedValue={categoriaSelecionada.descricao}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) => {
                        pickerChange(itemIndex);
                        console.log(itemIndex);
                    }}>
                    {categorias.map(v => {
                        return (<Picker.Item key={v.id} label={v.descricao} value={v.descricao} />);
                    })}
                </Picker>

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
                        loading={load}
                    />
                </View>
             </View>
        </Card>
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
        width: '97%',
    },
    button: {
        marginRight: 10,
        backgroundColor: '#0f6124',
        width: 115,
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: '6%'
    },
    buttonContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    card: {
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	}
});


export default ModalBox;