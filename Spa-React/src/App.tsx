// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import RegisterAdmin from './RegisterAdmin';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/registro-admin" element={<RegisterAdmin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
