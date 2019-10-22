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
		backgroundColor: '#FFF',
		marginTop: 20,
        padding: 15,
        borderRadius: 10
	},
    list: {
		paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    produtos: {
        padding: 3,
        margin: 8,
        color: '#aaaaaa',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default Cardapio;