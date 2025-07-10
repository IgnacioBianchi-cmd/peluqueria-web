import { useNavigate } from 'react-router-dom';

export default function Navegacion() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <header className="bg-gradient-to-r from-purple-900 via-slate-900 to-blue-900 shadow-lg px-6 py-4 flex items-center justify-between border-b border-white/10">
            <h2 className="text-xl font-bold text-white tracking-wide m-0 select-none">
                Admin Peluquería
            </h2>
            <button
                onClick={logout}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
                Cerrar sesión
            </button>
        </header>
    );
}
    