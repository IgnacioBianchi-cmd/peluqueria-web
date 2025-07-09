import { useEffect, useState, type SetStateAction } from 'react'
import api from './api'

type Servicio = {
  id: number
  nombre: string
  descripcion: string
  precio: number
  duracion: string
}

const Servicios = () => {
  const [servicios, setServicios] = useState<Servicio[]>([])

  useEffect(() => {
    api.get('/servicios')
      .then((res: { data: SetStateAction<Servicio[]> }) => setServicios(res.data))
      .catch(() => setServicios([]))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6">Servicios</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {servicios.map(servicio => (
          <div key={servicio.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow p-5">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{servicio.nombre}</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2">{servicio.descripcion}</p>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Precio: <span className="font-bold">${servicio.precio}</span></span>
              <span>Duración: <span className="font-bold">{servicio.duracion}</span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Servicios
