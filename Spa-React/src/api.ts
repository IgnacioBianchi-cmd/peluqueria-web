import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia la URL según tu API
})

// Interceptor para agregar token JWT si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
