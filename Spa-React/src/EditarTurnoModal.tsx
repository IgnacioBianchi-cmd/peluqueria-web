import { useState } from 'react';
import { editarTurno } from './api';

interface Props {
    turno: {
        id: number;
        fechaHora: string;
        estado: string;
    };
    onClose: () => void;
    onGuardar: () => void;
}

export default function EditarTurnoModal({ turno, onClose, onGuardar }: Props) {
    const [fecha, setFecha] = useState(turno.fechaHora.slice(0, 16));
    const [estado, setEstado] = useState(turno.estado);
    const token = localStorage.getItem('token') || '';

    const handleGuardar = async () => {
        const actualizado = {
            fechaHora: new Date(fecha).toISOString(),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm border border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">Editar Turno</h3>
                <label className="block mb-3 text-sm font-medium text-gray-700">
                    Fecha y Hora:
                    <input
                        type="datetime-local"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                </label>
                <label className="block mb-3 text-sm font-medium text-gray-700">
                    Estado:
                    <select
                        value={estado}
                        onChange={e => setEstado(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="realizado">Realizado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </label>
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={handleGuardar}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
