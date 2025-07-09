import { useEffect, useState } from 'react'
import api from './api'

type Turno = {
  id: number
  fechaHora: string
  confirmado: boolean
  servicios: { nombre: string }[]
}

type TurnosProps = {
  token: string
}

const Turnos = ({ token }: TurnosProps) => {
  const [turnos, setTurnos] = useState<Turno[]>([])
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    api.get('/turnos/mis', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTurnos(res.data))
      .catch(() => setMensaje('No se pudieron cargar los turnos'))
  }, [token])

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Mis Turnos</h2>
      {mensaje && <p className="text-red-600 dark:text-red-400">{mensaje}</p>}
      <div className="grid gap-6 md:grid-cols-2">
        {turnos.map(turno => (
          <div key={turno.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow p-5">
            <div className="mb-2">
              <span className="font-semibold">Fecha:</span> {new Date(turno.fechaHora).toLocaleString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Servicios:</span> {turno.servicios.map(s => s.nombre).join(', ')}
            </div>
            <div>
              <span className="font-semibold">Estado:</span>{' '}
              <span className={turno.confirmado ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                {turno.confirmado ? 'Confirmado' : 'Pendiente'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Turnos
