// src/api.ts
const API_URL = 'http://localhost:5163/api'; // Cambiá según tu entorno

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Credenciales inválidas');
    return res.json();
}

export async function getTurnos(token: string) {
    const res = await fetch(`${API_URL}/turnos/proximos`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener turnos');
    return res.json();
}

export async function editarTurno(id: number, datos: any, token: string) {
    const res = await fetch(`${API_URL}/turnos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
    });
    return res.ok;
}

export async function cancelarTurno(id: number, token: string) {
    const res = await fetch(`${API_URL}/turnos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
}

export async function desactivarQR(id: number, token: string) {
    const res = await fetch(`${API_URL}/turnos/${id}/desactivar-qr`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
}

export async function loginAdmin(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Login incorrecto');
    return await res.json();
}
