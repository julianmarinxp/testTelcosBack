import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ClienteList from './components/Clientes/ClienteList'
import ClienteForm from './components/Clientes/ClienteForm'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/clientes" replace />} />
        <Route path="clientes" element={<ClienteList />} />
        <Route path="clientes/nuevo" element={<ClienteForm />} />
        <Route path="clientes/editar/:id" element={<ClienteForm />} />
      </Route>
    </Routes>
  )
}

export default App
