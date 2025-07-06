# TurneroApp

Sistema de gestión de turnos para peluquería/estética.

## Estructura

- `mvc-app`: Aplicación ASP.NET MVC con Razor Pages (registro/login, CRUD turnos y servicios, QR dinámico)
- `api`: API RESTful protegida con JWT, consumida por la SPA
- `spa`: Próximamente (React/Vue)

## Requisitos

- .NET 8 o superior
- SQL Server
- Node.js (para la SPA)

## Cómo correr el proyecto

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

```bash
cd mvc-app
dotnet ef database update
dotnet run
```

```bash
cd ../api
dotnet ef database update
dotnet run
```
