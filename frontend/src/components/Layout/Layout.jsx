import { Outlet, Link } from 'react-router-dom'
import './Layout.css'

function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Gestión de Clientes</h1>
        </div>
      </header>
      
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Prueba Técnica Full Stack</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
