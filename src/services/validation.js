function validaEmail(email){
    let retorno = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(email.length>0 && reg.test(email) === false){
        retorno = false;
    }
    return retorno;
}

export{validaEmail};
