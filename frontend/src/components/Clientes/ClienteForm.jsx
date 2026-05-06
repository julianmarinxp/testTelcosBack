import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { clienteApi, ciudadApi } from '../../services/api'
import './ClienteForm.css'

function ClienteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  
  const [ciudades, setCiudades] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    loadCiudades()
  }, [])

  useEffect(() => {
    if (isEdit) {
      loadCliente()
    }
  }, [id])

  const loadCiudades = async () => {
    try {
      const response = await ciudadApi.getAll()
      setCiudades(response.data)
    } catch (error) {
      console.error('Error cargando ciudades:', error)
    }
  }

  const loadCliente = async () => {
    try {
      setLoading(true)
      const response = await clienteApi.get(id)
      const cliente = response.data.data
      reset({
        name: cliente.name,
        email: cliente.email,
        phone: cliente.phone || '',
        city_id: cliente.city_id || '',
      })
    } catch (error) {
      alert('Error al cargar el cliente')
      navigate('/clientes')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      setSubmitting(true)

      const payload = {
        ...data,
        city_id: data.city_id ? parseInt(data.city_id) : null,
      }

      if (isEdit) {
        await clienteApi.update(id, payload)
      } else {
        await clienteApi.create(payload)
      }

      navigate('/clientes')
    } catch (error) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0][0]
        alert(firstError)
      } else {
        alert(`Error al ${isEdit ? 'actualizar' : 'crear'} el cliente`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading"><div className="spinner"></div></div>
  }

  return (
    <div className="cliente-form">
      <div className="page-header">
        <h2>{isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-group">
          <label>Nombre *</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'error' : ''}`}
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'error' : ''}`}
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido'
              }
            })}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="text"
            className="form-control"
            {...register('phone')}
          />
        </div>

        <div className="form-group">
          <label>Ciudad</label>
          <select className="form-control" {...register('city_id')}>
            <option value="">Seleccionar ciudad</option>
            {ciudades.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <Link to="/clientes" className="btn btn-secondary">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? <span className="spinner"></span> : (isEdit ? 'Actualizar' : 'Guardar')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClienteForm
