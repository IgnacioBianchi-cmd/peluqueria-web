import { useState } from 'react';
import { editarTurno } from './api';

interface Props {
    turno: {
        id: number;
        fechaHora: string; // ? actualizado
        estado: string;
    };
    onClose: () => void;
    onGuardar: () => void;
}

export default function EditarTurnoModal({ turno, onClose, onGuardar }: Props) {
    const [fecha, setFecha] = useState(turno.fechaHora.slice(0, 16)); // ? actualizado
    const [estado, setEstado] = useState(turno.estado);
    const token = localStorage.getItem('token') || '';

    const handleGuardar = async () => {
        const actualizado = {
            fechaHora: new Date(fecha).toISOString(), // ? actualizado
            estado,
        };
        const ok = await editarTurno(turno.id, actualizado, token);
        if (ok) {
            onGuardar();
        } else {
            alert('Error al guardar');
        }
    };

    return (
        <div style={modalEstilo}>
            <h3>Editar Turno</h3>
            <label>
                Fecha y Hora:
                <input
                    type="datetime-local"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </label>
            <br />
            <label>
                Estado:
                <select value={estado} onChange={e => setEstado(e.target.value)}>
                    <option value="pendiente">Pendiente</option>
                    <option value="confirmado">Confirmado</option>
                    <option value="realizado">Realizado</option>
                    <option value="cancelado">Cancelado</option>
                </select>
            </label>
            <br />
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={onClose} style={{ marginLeft: 8 }}>Cancelar</button>
        </div>
    );
}

const modalEstilo: React.CSSProperties = {
    position: 'fixed',
    top: '20%',
    left: '35%',
    background: '#fff',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    boxShadow: '0 0 15px rgba(0,0,0,0.2)',
    zIndex: 1000,
};
