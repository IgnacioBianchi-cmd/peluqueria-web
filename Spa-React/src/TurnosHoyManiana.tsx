import { useEffect, useState } from 'react';
import {
    getTurnos,
    cancelarTurno,
    desactivarQR,
} from './api';
import EditarTurnoModal from './EditarTurnoModal';

interface Turno {
    id: number;
    fechaHora: string; // ? corregido
    estado: string;
    qrActivo: boolean;
    usuario: {        // ? corregido de 'cliente'
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
        const confirmado = window.confirm("¿Estás seguro de que querés eliminar este turno? Esta acción no se puede deshacer.");
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
            alert("Ocurrió un error al eliminar el turno.");
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
            <h2>Turnos de Hoy y Mañana</h2>
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Servicios</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>QR</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map(turno => (
                        <tr key={turno.id}>
                            <td>{turno.usuario?.nombreCompleto ?? "Sin nombre"}</td>
                            <td>{turno.servicios?.map(s => s.nombre).join(', ')}</td>
                            <td>{new Date(turno.fechaHora).toLocaleString('es-AR')}</td>
                            <td>{turno.estado}</td>
                            <td>{turno.qrActivo ? 'Activado' : 'Desactivado'}</td>
                            <td>
                                <button onClick={() => setModalTurno(turno)}>Editar</button>{' '}
                                <button onClick={() => handleEliminar(turno.id)}>Eliminar</button>{' '}
                                {turno.qrActivo && (
                                    <button onClick={() => handleDesactivarQR(turno.id)}>Desactivar QR</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
