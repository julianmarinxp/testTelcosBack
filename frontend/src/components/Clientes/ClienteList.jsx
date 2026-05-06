import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clienteApi, ciudadApi } from '../../services/api'
import './ClienteList.css'

function ClienteList() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [filters, setFilters] = useState({
    search: '',
    city_id: '',
    page: 1,
  })
  const [ciudades, setCiudades] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    loadClientes()
  }, [filters.page])

  useEffect(() => {
    loadCiudades()
  }, [])

  const loadClientes = async () => {
    try {
      setLoading(true)
      const response = await clienteApi.getAll(filters)
      setClientes(response.data.data)
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        total: response.data.total,
      })
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar clientes' })
    } finally {
      setLoading(false)
    }
  }

  const loadCiudades = async () => {
    try {
      const response = await ciudadApi.getAll()
      setCiudades(response.data)
    } catch (error) {
      console.error('Error cargando ciudades:', error)
    }
  }


  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value, page: 1 }))
  }

  const applyFilters = () => {
    loadClientes()
  }

  const clearFilters = () => {
    setFilters({ search: '', city_id: '', page: 1 })
    setTimeout(loadClientes, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return
    
    try {
      await clienteApi.delete(id)
      setMessage({ type: 'success', text: 'Cliente eliminado exitosamente' })
      loadClientes()
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar cliente' })
    }
  }

  const goToPage = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setFilters(prev => ({ ...prev, page }))
    }
  }

  if (loading && clientes.length === 0) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className="cliente-list">
      <div className="page-header">
        <h2>Lista de Clientes</h2>
        <Link to="/clientes/nuevo" className="btn btn-primary">
          + Nuevo Cliente
        </Link>
      </div>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            name="search"
            placeholder="Buscar cliente..."
            value={filters.search}
            onChange={handleFilterChange}
          />
        </div>

        <select
          name="city_id"
          value={filters.city_id}
          onChange={handleFilterChange}
          className="form-control"
        >
          <option value="">Todas las ciudades</option>
          {ciudades.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button onClick={applyFilters} className="btn btn-primary">
          Filtrar
        </button>
        <button onClick={clearFilters} className="btn btn-secondary">
          Limpiar
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No se encontraron clientes
                </td>
              </tr>
            ) : (
              clientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.name}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone || '-'}</td>
                  <td>{cliente.city?.name || '-'}</td>
                  <td className="actions">
                    <Link
                      to={`/clientes/editar/${cliente.id}`}
                      className="btn btn-success btn-icon"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cliente.id)}
                      className="btn btn-danger btn-icon"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.last_page > 1 && (
        <div className="pagination">
          <button 
            onClick={() => goToPage(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
          >
            Anterior
          </button>
          <span>Página {pagination.current_page} de {pagination.last_page}</span>
          <span>({pagination.total} total)</span>
          <button 
            onClick={() => goToPage(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.last_page}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default ClienteList
