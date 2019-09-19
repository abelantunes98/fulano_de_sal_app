import { sha256 } from 'react-native-sha256';

function criptografar(dados){
	return  sha256(dados);
}
export {criptografar};