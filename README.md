# 💇‍♀️ Turnero Web para Peluquería & Spa

Sistema completo de gestión de turnos para clientes y profesionales en un centro de estética, desarrollado como trabajo integrador para la materia de Desarrollo Web y Móvil.

---

## 🧠 Tecnologías utilizadas

- ASP.NET MVC con Razor Pages (.NET 9)
- ASP.NET Web API RESTful (.NET 9)
- React + TypeScript (SPA profesional)
- Entity Framework Core + SQLite
- JWT (JSON Web Tokens) para autenticación
- QR Generator (.NET)
- React Router y Context API
- Vite, TailwindCSS

---

## ⚙️ Componentes del Proyecto

### 1. Cliente Web (MVC + Razor Pages)
- Permite a los clientes registrarse, iniciar sesión, ver y reservar turnos.
- Interfaz amigable y responsive.

### 2. API RESTful (ASP.NET Web API)
- Expone endpoints seguros para login, gestión de turnos, usuarios y QR.
- Usa JWT para proteger las rutas.

### 3. SPA Profesional (React)
- Dashboard para trabajadores del spa.
- Muestra turnos diarios, permite editarlos y escanear QRs para validarlos.

---

## 🚀 Instrucciones de instalación y ejecución

Es necesario crear appsettings.Development.json
En la carpeta mvc-app, creá un archivo appsettings.Development.json con este contenido:

{
  "Smtp": {
    "Host": "sandbox.smtp.mailtrap.io",
    "Port": 587,
    "Username": "TU_USERNAME",
    "Password": "TU_PASSWORD",
    "From": "no-reply@turneroapp.com"
  }
}

Obtené tus credenciales en https://mailtrap.io

### 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/turnero-peluqueria.git
cd turnero-peluqueria
```

### 2. Ejecutar la API (carpeta `/turneroapp.api`)

```bash
cd turneroapp.api
dotnet ef database update
dotnet run
```

### 3. Ejecutar la web MVC (carpeta `/mvc-app`)

```bash
cd mvc-app
dotnet run
```

### 4. Ejecutar la SPA (carpeta `/Spa-React`)

```bash
cd Spa-React
npm install
npm run dev
```

> 📌 Asegúrese de que las tres aplicaciones estén conectadas con la misma base de datos y que la API esté corriendo en `https://localhost:5001` o similar.

---

## 🔐 Seguridad y autenticación

- Las contraseñas se almacenan con hash y salt (Identity).
- Inicio de sesión con credenciales protegidas.
- Los endpoints de la API se protegen con JWT.
- Cada QR generado incluye un token único y válido por tiempo limitado o hasta escaneo.

---

## ✅ Requisitos funcionales cumplidos

- [x] Registro de usuarios (clientes y profesionales)
- [x] Login con ASP.NET Identity y JWT
- [x] Reserva de turnos con múltiples servicios
- [x] Edición y eliminación de turnos
- [x] Dashboard profesional en React
- [x] Generación de QR con enlace seguro desde .NET
- [x] Acceso exclusivo mediante QR a validación de turno
- [x] Relación entre turnos, clientes y servicios
- [x] Base de datos generada por EF Core

---

## 🎯 Escenario de uso

Este sistema está diseñado para cubrir las necesidades de gestión de turnos en una peluquería o centro de estética moderno, tanto para clientes como para el personal. Incluye reservas personalizadas, pagos y validación por QR.


---

## 📂 Estructura del repositorio

```
turnero-peluqueria/
│
├── turneroapp.api/          # API REST con .NET
├── mvc-app/                 # Web pública para clientes (Razor Pages)
├── Spa-React/               # SPA profesional en React
├── /db/                     # Migraciones EF Core
├── /Capturas/               # Capturas demostrativas del proyecto
├── /Videos/                 # Video demostrativo del proyecto
└── README.md                # Este archivo
```

---

## 👥 Autores

- Ignacio Bianchi Berman  
- Ivan Luciano Cirilo Rodriguez
- Jose Oscar Thorlét
- Marco Antonio Jesus Godoy
- Lucas Rabinovich

---