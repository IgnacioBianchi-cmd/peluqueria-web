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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Registrar Administrador</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-base"
                        placeholder="Nombre completo"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                    />
                    <input
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-base"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-base"
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <input
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:bg-white/15 hover:border-white/30 text-base"
                        placeholder="Clave secreta"
                        value={clave}
                        onChange={e => setClave(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-transparent active:scale-[0.98]"
                    >
                        Registrar
                    </button>
                    {error && <p className="text-center text-red-300 bg-red-500/20 border border-red-500/30 rounded-xl p-2 text-sm">{error}</p>}
                </form>
            </div>
        </div>
    );
}
