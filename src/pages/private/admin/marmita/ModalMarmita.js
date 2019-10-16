import React, {useState, useEffect} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

const ModalMarmita = (props) => {

const [modalVisible,setModalVisible] = useState(props.visible);

    useEffect(() => {
        alert(modalVisible);
    }, []);


    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
           setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
}

export default ModalMarmita;