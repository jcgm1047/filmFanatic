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

## Clonar el Repositorio

1. **Obtener la URL del Repositorio**: 
   - Encuentra la URL del repositorio que deseas clonar. Esto se puede encontrar en la página del repositorio en GitHub, bajo el botón "Clone or download".

2. **Clonar el Repositorio**: 
   - Abre una terminal y ejecuta el siguiente comando:
     ```bash
     git clone https://github.com/username/repository-name.git
     ```
   - Reemplaza `https://github.com/username/repository-name.git` con la URL que copiaste.

3. **Navegar al Directorio del Proyecto**:
   - Cambia al directorio del proyecto usando:
     ```bash
     cd repository-name
     ```
   - Cambia `repository-name` por el nombre del directorio que Git ha creado.

## Instalar Dependencias

- Dentro del directorio del proyecto, ejecuta el siguiente comando para instalar todas las dependencias:
  ```bash
  npm install
