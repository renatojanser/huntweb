import axios from 'axios'

const api = axios.create({ baseURL: 'https://node-api-procucts.herokuapp.com/api' })

export default api
