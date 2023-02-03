import axios from 'axios'

const httpService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api`,
  timeout: 10000,
})

httpService.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        'content-type': 'application/Json',
        token: JSON.parse(localStorage.getItem('token')).token,
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default httpService