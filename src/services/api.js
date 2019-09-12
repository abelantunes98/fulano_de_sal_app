const axios = require('axios')

const api = axios.create({
    baseUrl: 'http://fulano-de-sal-api.herokuapp.com/api'
})

export default api;