import axios from 'axios'

const development =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

let baseURL = 'http://localhost:8080/'
if (!development)
    baseURL = 'https://basicemployeedirectorywebapi.azurewebsites.net/api'

const instance =  axios.create({
    baseURL,
})

export default instance
