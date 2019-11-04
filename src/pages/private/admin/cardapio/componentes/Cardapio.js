import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ProgressBarAndroid,
    Text,
} from 'react-native'
import { Button, Card } from 'react-native-elements';

const Cardapio = (props) => {
    return (
        <View>
            <Card containerStyle={styles.listItem}>
                <Text style={ styles.title }>{props.title}</Text>
                <FlatList
                    style={styles.list}
                    data={props.produtos}
                    renderItem={({ item }) => (
                        <Text style={styles.produtos}>{item.nome}</Text>
                    )}
                    // As chaves precisam ser Strings.
                    keyExtractor={(item) => item.id.toString()}
                />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
		flex : 1, 
		justifyContent : 'center',
		backgroundColor: '#ffffff'
    },
    listItem: {
        borderRadius: 10,
		backgroundColor: '#FFF',
		borderColor:'#000'
	},
    list: {
        paddingTop: 10,
		paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
    },
    produtos: {
        margin: 5,
        color: '#aaaaaa',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default Cardapio;