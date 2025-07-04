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
