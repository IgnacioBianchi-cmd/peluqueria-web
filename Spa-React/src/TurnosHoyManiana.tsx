import { useEffect, useState } from 'react';
import {
    getTurnos,
    desactivarQR,
} from './api';
import EditarTurnoModal from './EditarTurnoModal';

interface Turno {
    id: number;
    fechaHora: string;
    estado: string;
    qrActivo: boolean;
    usuario: {
        nombreCompleto: string;
        email: string;
    };
    servicios: { nombre: string }[];
}

export default function TurnosHoyManiana() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [token, setToken] = useState('');
    const [modalTurno, setModalTurno] = useState<Turno | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            cargarTurnos(storedToken);
        }
    }, []);

    const cargarTurnos = async (tk: string) => {
        try {
            const data = await getTurnos(tk);
            setTurnos(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleEliminar = async (id: number) => {
        const confirmado = window.confirm("�Est�s seguro de que quer�s eliminar este turno? Esta acci�n no se puede deshacer.");
        if (!confirmado) return;

        try {
            const response = await fetch(`http://localhost:5163/api/turnos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setTurnos(prev => prev.filter(t => t.id !== id));
            } else {
                alert("No se pudo eliminar el turno.");
            }
        } catch (error) {
            console.error("Error al eliminar turno:", error);
            alert("Ocurri� un error al eliminar el turno.");
        }
    };

    const handleDesactivarQR = async (id: number) => {
        if (await desactivarQR(id, token)) {
            setTurnos(prev =>
                prev.map(t => (t.id === id ? { ...t, qrActivo: false } : t))
            );
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Turnos de Hoy y Mañana</h2>
            <div className="overflow-x-auto rounded-xl shadow">
                <table className="min-w-full bg-white/10 text-white rounded-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gradient-to-r from-purple-800 to-blue-800 text-white">
                            <th className="px-4 py-2">Cliente</th>
                            <th className="px-4 py-2">Servicios</th>
                            <th className="px-4 py-2">Fecha</th>
                            <th className="px-4 py-2">Estado</th>
                            <th className="px-4 py-2">QR</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnos.map(turno => (
                            <tr key={turno.id} className="odd:bg-white/5 even:bg-white/0 hover:bg-purple-900/20 transition">
                                <td className="px-4 py-2">{turno.usuario?.nombreCompleto ?? "Sin nombre"}</td>
                                <td className="px-4 py-2">{turno.servicios?.map(s => s.nombre).join(', ')}</td>
                                <td className="px-4 py-2">{new Date(turno.fechaHora).toLocaleString('es-AR')}</td>
                                <td className="px-4 py-2">{turno.estado}</td>
                                <td className="px-4 py-2">
                                    <span className={turno.qrActivo ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
                                        {turno.qrActivo ? 'Activado' : 'Desactivado'}
                                    </span>
                                </td>
                                <td className="px-4 py-2 space-x-2">
                                    <button
                                        onClick={() => setModalTurno(turno)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleEliminar(turno.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                                    >
                                        Eliminar
                                    </button>
                                    {turno.qrActivo && (
                                        <button
                                            onClick={() => handleDesactivarQR(turno.id)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                                        >
                                            Desactivar QR
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalTurno && (
                <EditarTurnoModal
                    turno={modalTurno}
                    onClose={() => setModalTurno(null)}
                    onGuardar={() => {
                        setModalTurno(null);
                        cargarTurnos(token);
                    }}
                />
            )}
        </div>
    );
}
