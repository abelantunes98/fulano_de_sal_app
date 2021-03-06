/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react';
import Routes from "./src/routes";
import NetInfo from "@react-native-community/netinfo";
import { Alert, BackHandler, YellowBox} from 'react-native';

export default function App() {
	YellowBox.ignoreWarnings([
		'Warning: componentWillMount is deprecated',
		'Warning: Failed child context type: Invalid',
		'Warning: componentWillReceiveProps is deprecated',
	])
	
	const[connected,setIsConnected] = useState(false);

	NetInfo.fetch().then(state => {
		let conn = state.isConnected;
		setIsConnected(state.isConnected);
		if(!conn){
			Alert.alert(
                'O aplicativo necessita de internet.',
                'Confira a sua conexão com a internet e tente novamente.',
				[
                    {text: 'OK',onPress:_=>{
						BackHandler.exitApp();
					}},
				],
                {cancelable: false},
              );	
		}
		
	});

  	return connected && <Routes />
}
