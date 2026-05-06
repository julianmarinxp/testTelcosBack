import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Clientes API
export const clienteApi = {
  getAll: (params = {}) => api.get('clients', { params }),
  get: (id) => api.get(`clients/${id}`),
  create: (data) => api.post('clients', data),
  update: (id, data) => api.put(`clients/${id}`, data),
  delete: (id) => api.delete(`clients/${id}`),
}

// Ciudades API
export const ciudadApi = {
  getAll: () => api.get('cities'),
}

export default api
