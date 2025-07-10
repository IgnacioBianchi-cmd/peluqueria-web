// src/RegisterAdmin.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterAdmin() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5163/api/auth/register-admin?secret=123', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombreCompleto: nombre, email, password }),
            });
            if (res.ok) {
                alert('Administrador registrado');
                navigate('/');
            } else {
                const data = await res.json();
                setError(data?.mensaje || 'Error al registrar');
            }
        } catch (err) {
            setError('Error de red');
        }
    };

    return (
        <div style={{ padding: 32 }}>
            <h2>Registrar Administrador</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Nombre completo" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <br />
                <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <br />
                <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <br />
                <input placeholder="Clave secreta" value={clave} onChange={e => setClave(e.target.value)} required />
                <br />
                <button type="submit">Registrar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
