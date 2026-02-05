### Aplicación de gestión de contactos

La aplicación se desarrolló utilizando arquitectura MVC con PHP (API) para el backend y ReactJS para el frontend.
La comunicación entre el frontend y el backend se hace mediante una API REST que da respuestas en formato JSON
En ella se permite crear, listar, filtrar y eliminar contactos, incluyendo validaciones básicas para nombre, email y teléfono.
El objetivo es demostrar el consumo de una API REST desde React y mostrar de forma correcta y organizada el backend.

### Requisitos y versiones utilizadas

- Backend
PHP 8.2.12
MySQL (MariaDB 10.4.32)

- Frontend
Node.js 22.20.0
npm
React 19.2.0

### Instrucciones para levantar el backend

1. Clonar el repositorio de git

2. Copiar la carpeta del backend dentro del directorio C:/xampp/htdocs.

3. Crear una base de datos en MySQL con el nombre contactos_db.

4. Importar el archivo SQL ubicado en database/contactos_db.sql.

5. Configurar la conexión a la base de datos en el archivo config/database.php.

6. Ajustar los valores de host, nombre de la base de datos, usuario y contraseña según el entorno local.

7. Iniciar Apache y MySQL desde el panel de control de XAMPP.

- La API quedará disponible en:
- http://localhost/contactos_api/contactos

### Instrucciones para levantar el frontend

1. Ingresar a la carpeta del frontend:
- C:/xampp/htdocs/contactos_front

2. instalar las dependencias con el comando = npm install.

3. Configurar la URL del backend en el archivo correspondiente del frontend (donde se realiza el fetch o axios).
- URL del backend: http://localhost/contactos_api/contactos

4. Iniciar la aplicación con el comando: npm run dev.

5. Acceder a la aplicación desde el navegador:
- http://localhost:5173

### Base de datos

- La base de datos que se utilizó se llama contactos_db y en ella tiene una única tabla llamada contactos.

- El script de creación de la base de datos y la tabla se encuentra en:
- database/contactos_db.sql

### Endpoints de la API

GET /contactos
Devuelve la lista de todos los contactos registrados.

POST /contactos
Permite crear un nuevo contacto.
Requiere los siguientes campos: nombre, email, telefono.

DELETE /contactos/{id}
Elimina un contacto según su ID.

### Estructura del proyecto (Backend)

La aplicación backend sigue una arquitectura MVC organizada de la siguiente forma:

contactos_api/
├── controllers/
│ └── ContactosController.php
├── models/
│ └── Contactos.php
├── views/
│ └── (no utilizada, la API devuelve JSON)
├── config/
│ └── database.php
├── database/
│ └── contactos_db.sql
└── index.php