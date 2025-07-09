import { useEffect, useState } from 'react'
import api from './api'

type Servicio = {
  id: number
  nombre: string
}

type ReservasProps = {
  token: string
}

const Reservas = ({ token }: ReservasProps) => {
  const [servicios, setServicios] = useState<Servicio[]>([])
  const [servicioId, setServicioId] = useState<number | ''>('')
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    api.get('/servicios')
      .then(res => setServicios(res.data))
      .catch(() => setServicios([]))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensaje('')
    try {
      await api.post('/turnos', {
        servicioId,
        fechaHora: fecha
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMensaje('Reserva realizada con éxito')
    } catch (err: any) {
      setMensaje('Error al reservar turno')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Reservar Turno</h2>
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow p-6 flex flex-col gap-4">
        <select
          value={servicioId}
          onChange={e => setServicioId(Number(e.target.value))}
          required
          className="p-2 rounded border border-gray-300 dark:border-gray-600"
        >
          <option value="">Selecciona un servicio</option>
          {servicios.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
          className="p-2 rounded border border-gray-300 dark:border-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Reservar
        </button>
        {mensaje && <p className="text-center text-green-600 dark:text-green-400">{mensaje}</p>}
      </form>
    </div>
  )
}

export default Reservas
