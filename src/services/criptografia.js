import CryptoJS from "react-native-crypto-js";
 
function criptografar(dados){
	let result = CryptoJS.AES.encrypt(dados, 'Ch@vE5eCreTaP@r@Cr1Pt0Gr@fiaD0sD@d0sRel@cion@d05a53NH@').toString();
return result;
	}
export {criptografar};