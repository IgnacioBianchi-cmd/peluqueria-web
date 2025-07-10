// src/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from './api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginAdmin(email, password);
            if (data.rol !== 'admin') {
                setError('Solo administradores pueden acceder');
                return;
            }
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div style={{ padding: 32 }}>
            <h2>Login Administrador</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <br />
                <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <br />
                <button type="submit">Ingresar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
