# TOL Slots Dashboard

## Archivos del frontend

```
index.html      ← Login
invite.html     ← Registro con token de invitación
dashboard.html  ← Dashboard (redirige a login si no hay sesión)
slots_data.json ← Datos locales (se actualiza desde Excel)
```

## Cambiar URL de la API

En `index.html` e `invite.html`, línea:
```js
const API = 'http://localhost:8000';
```
Reemplazarla por la URL donde corre tu API.

## Endpoints que necesita el frontend

### POST /auth/login
Request:  { "email": "...", "password": "..." }
Response OK (200):    { "ok": true, "email": "..." }
Response error (401): { "message": "Email o contraseña incorrectos." }

### POST /auth/register
Request:  { "token": "...", "email": "...", "password": "..." }
Response OK (200):    { "ok": true }
Response error (400): { "message": "Razón del error" }

### GET /auth/validate-invite/:token
Response OK (200):    { "valid": true, "email": "..." }  ← email puede ser null
Response error (400): { "message": "Token inválido o expirado." }

## Sesión
Solo usa localStorage. Al hacer login exitoso se guarda tol_email.
Al hacer logout se borra. No hay tokens ni cookies.
