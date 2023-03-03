import axios from 'axios'

const httpService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}/api`,
  timeout: 100000,
})

httpService.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        'content-type': 'application/Json',
        token: localStorage.getItem('adminToken'),
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default httpService
