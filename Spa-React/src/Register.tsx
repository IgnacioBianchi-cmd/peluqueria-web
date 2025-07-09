import { useState } from 'react'
import api from './api'

const Register = () => {
  const [nombreCompleto, setNombreCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje('')
    try {
      await api.post('/auth/register', { nombreCompleto, email, password })
      setMensaje('Registro exitoso. Ahora puedes iniciar sesión.')
    } catch (err: any) {
      setMensaje('Error al registrar usuario')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Registro</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow p-6 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombreCompleto}
          onChange={e => setNombreCompleto(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 dark:border-gray-600"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 dark:border-gray-600"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 dark:border-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
        {mensaje && <p className="text-center text-green-600 dark:text-green-400">{mensaje}</p>}
      </form>
    </div>
  )
}

export default Register
