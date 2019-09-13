const axios = require('axios')

const api = axios.create({
    baseURL: 'https://fulano-de-sal-api.herokuapp.com/api'
})

export default api;