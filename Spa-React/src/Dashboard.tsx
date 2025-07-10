// src/Dashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TurnosHoyManiana from './TurnosHoyManiana';
import Navegacion from './Navegacion';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navegacion />
            <main className="max-w-4xl mx-auto mt-10 px-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
                    <h1 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">Panel de Administrador</h1>
                    <TurnosHoyManiana />
                </div>
            </main>
        </div>
    );
}
