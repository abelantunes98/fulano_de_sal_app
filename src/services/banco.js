import AsyncStorage from '@react-native-community/async-storage';

async function save(key,value){
    await setValue(key,JSON.stringify(value));
}
async function find(key){
    let v = await getValue(key);
    return JSON.parse(v);
}

async function setValue(key,value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch(e) {
      
    }
  }

async function getValue(key){
    let retorno = '';
    try {
        const value = await AsyncStorage.getItem(key);
        retorno =  value;
        
    } catch(e) {
    }
 return retorno;
}
export {save,find};