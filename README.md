# Guía para Clonar y Configurar un Proyecto Filmfanatic

Esta guía te ayudará a clonar un repositorio de GitHub y ejecutar el proyecto en tu entorno local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:
- Git
- Node.js
- npm (generalmente se instala con Node.js)

Puedes verificar si ya están instalados ejecutando los siguientes comandos en tu terminal:

```bash
git --version
node --version
npm --version
```

## Clonar el repositorio


 **Clonar el repositorio**: 
   - Abre una terminal y ejecuta el siguiente comando:
     ```bash
     git clone https://github.com/jcgm1047/filmfanatic.git
     ```

## Instalar dependencias

- Dentro del directorio del proyecto, ejecuta el siguiente comando para instalar todas las dependencias:
     ```bash
     npm install
     ```
## .env

- Asegúrate de configurar las variables de entorno necesarias, como la URL de la base de datos MongoDB, en un archivo .env. Un archivo de ejemplo .env.example se incluye en el repositorio para guiarte.
     ```bash
     #ENV BACKEND
MONGO_URI="mongodb+srv://jcgm1047:oBecSCun6nwgdNVQ@cluster0.bzyly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET=jcgm1047
PORT_BACKEND=3000
#ENV FRONTEND
PORT_FRONTEND=5000
     ```
## Ejecutar la aplicación

Con las dependencias instaladas, puedes ejecutar la aplicación localmente:

- **Para el Back-end**:
  Navega al directorio raíz del proyecto y ejecuta:
  
  ```bash
  npm start
  ```
  
	 
- **Para el Front-end**
  En la carpeta client

   ```bash
  npm start
  ```
    
**¡Felicidades! Ahora tienes el proyecto clonado y ejecutándose localmente. Puedes comenzar a explorar el código.**

