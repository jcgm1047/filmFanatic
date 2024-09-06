# FilmFanatic

FilmFanatic es una aplicación web para descubrir, buscar y filtrar películas. Los usuarios pueden registrarse, iniciar sesión, navegar por las películas y dejar reseñas. Los administradores tienen acceso a un panel de control donde pueden gestionar los perfiles de los usuarios.

## Tecnologías utilizadas
- **Frontend:**
  - React
  - Bootstrap
  - Axios
  - React Router
  - Hooks de React

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - JWT (JsonWebToken) para autenticación

### Características
1. **Autenticación de usuarios:** Los usuarios pueden registrarse, iniciar sesión y cerrar sesión.
2. **Roles de usuario:** Los usuarios tienen roles asignados (como usuario o administrador).
3. **Panel de administrador:** Los administradores pueden gestionar perfiles y ver todos los usuarios registrados.
4. **Filtrado de películas:** Filtrado de películas por género y año.
5. **Búsqueda de películas:** Los usuarios pueden buscar películas por nombre.
6. **Protección de rutas:** Las rutas sensibles están protegidas y sólo accesibles según el rol del usuario.

### Instalación
Sigue estos pasos para clonar y ejecutar este proyecto localmente.
Requisitos previos:

- Node.js v14+ o superior.
- MongoDB Atlas o local (asegúrate de tener una base de datos configurada).

### 1. Clonar el repositorio:

```bash
git clone https://github.com/jcgm1047/filmfanatic.git
cd filmfanatic
```

### 2. Instalar dependencias del backend:

En la carpeta raíz del proyecto (donde está el servidor), ejecuta:
```bash
npm install
```

### 3. Instalar dependencias del frontend:

Navega a la carpeta `client` y ejecuta:
```bash
cd client
npm install
```

### 4. Configuración del archivo `.env`:

En la carpeta raíz (del servidor), crea un archivo `.env` con las siguientes variables de entorno:

```bash
#ENV BACKEND
MONGO_URI="mongodb+srv://jcgm1047:oBecSCun6nwgdNVQ@cluster0.bzyly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET=jcgm1047
PORT_BACKEND=3000

#ENV FRONTEND
PORT_FRONTEND=5000
```

### 5. Ejecutar el servidor backend:

En la carpeta raíz del proyecto, ejecuta:

```bash
npm start
```

Esto iniciará el servidor backend en `http://localhost:3000` (o el puerto especificado en el `.env`).

### 6. Ejecutar la aplicación React (Frontend):

En otra terminal, navega al directorio del cliente (client) y ejecuta:

```bash
npm start
```

Esto iniciará la aplicación frontend en `http://localhost:5000` (o el puerto especificado en el `.env`).

## Uso

- **Registro e inicio de sesión:** Los usuarios pueden registrarse proporcionando un nombre de usuario, email y contraseña. Los administradores pueden iniciar sesión con credenciales especiales.
- **Panel de administración:** El administrador puede gestionar los usuarios a través del panel de administración.
- **Búsqueda y filtrado de películas:** Los usuarios pueden buscar películas utilizando la barra de búsqueda o aplicando filtros por género y año.

## Endpoints del API
Autenticación

- `POST /api/auth/login`: Iniciar sesión.
- `POST /api/auth/register`: Registrarse.
- `GET /api/auth/me`: Obtener perfil del usuario autenticado.

Perfiles

- `GET /api/profiles`: Obtener todos los perfiles de usuarios (solo admin).
- `POST /api/profiles`: Crear un nuevo perfil (solo admin).
- `PUT /api/profiles/:id`: Actualizar un perfil (solo admin).
- `DELETE /api/profiles/:id`: Eliminar un perfil (solo admin).
