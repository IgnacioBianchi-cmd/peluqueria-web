// src/Navegacion.tsx
import { useNavigate } from 'react-router-dom';

export default function Navegacion() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header style={estiloHeader}>
            <h2 style={{ margin: 0 }}>Admin Peluquería</h2>
            <button onClick={logout} style={estiloBoton}>Cerrar sesión</button>
        </header>
    );
}

const estiloHeader: React.CSSProperties = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const estiloBoton: React.CSSProperties = {
    background: '#fff',
    color: '#333',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer',
};
