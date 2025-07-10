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
        <div>
            <Navegacion />
            <div style={{ padding: '20px' }}>
                <h1>Panel de Administrador</h1>
                <TurnosHoyManiana />
            </div>
        </div>
    );
}
