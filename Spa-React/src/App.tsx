import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './Home'
import Servicios from './Servicios'
import Reservas from './Reservas'
import Contacto from './Contacto'
import Login from './Login'
import Register from './Register'
import Turnos from './Turnos'
import './App.css'

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
    if (email) {
      localStorage.setItem('email', email)
    } else {
      localStorage.removeItem('email')
    }
  }, [token, email])

  const handleLogout = () => {
    setToken(null)
    setEmail(null)
  }

  return (
    <Router>
      <nav className="bg-white dark:bg-gray-900 shadow mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-4">
              <Link to="/" className="text-lg font-bold text-blue-600 hover:text-blue-800">Spa</Link>
              <Link to="/servicios" className="nav-link">Servicios</Link>
              <Link to="/reservas" className="nav-link">Reservas</Link>
              <Link to="/turnos" className="nav-link">Mis Turnos</Link>
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </div>
            <div className="flex space-x-4">
              {!token && <Link to="/login" className="nav-link">Login</Link>}
              {!token && <Link to="/register" className="nav-link">Registro</Link>}
              {token && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/reservas" element={
            token ? <Reservas token={token} /> : <Navigate to="/login" />
          } />
          <Route path="/turnos" element={
            token ? <Turnos token={token} /> : <Navigate to="/login" />
          } />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={
            token
              ? <Navigate to="/" />
              : <Login setToken={setToken} setEmail={setEmail} />
          } />
          <Route path="/register" element={
            token
              ? <Navigate to="/" />
              : <Register />
          } />
        </Routes>
      </main>
    </Router>
  )
}

export default App
