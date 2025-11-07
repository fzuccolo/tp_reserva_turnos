# README

## Requisitos
- Tener instalado .NET SDK (verificar con `dotnet --version`).
- Tener un servidor web para servir la API si no se utiliza el servidor integrado de VSCode para testing. Opciones:
    - Usar el servidor integrado de la aplicación (.NET Kestrel) con `dotnet run`.
    - Usar IIS Express / otro servidor local o la extensión Live Server de VSCode para pruebas estáticas si aplica.

## Endpoints de la API
La API expone los siguientes endpoints:

- GET `/api/paciente`  
    Devuelve la lista de pacientes pertenecientes al grupo familiar del usuario de id = 1

- GET `/api/paciente/{id}`  
    Devuelve los datos del paciente de id = {id} perteneciente al grupo familiar del usuario de id = 1

- POST `/api/paciente`  
    Crea un nuevo paciente y lo añade al grupo familiar del usuario de id = 1

- DELETE `/api/paciente/{id}`  
    Elimina el paciente de id = {id} perteneciente al grupo familiar del usuario de id = 1

- GET `/api/obrasocial`  
    Devuelve la lista de obras sociales existentes en el sistema

- GET `/api/obrasocial/{id}`  
    Devuelve los datos de la obra social de id = {id}

- GET `/api/usuario`  
    Devuelve una lista con un único elemento: los datos del usuario de id = 1

- GET `/api/usuario/{id}`  
    Devuelve los datos del usuario de id = {id}. El valor de `{id}` debe ser 1

## Pruebas y documentación adicional
En este repositorio hay documentos con las pruebas realizadas (logs, ejemplos de requests y respuestas):
- [md/pruebas.md](MD/pruebas.md)
- [md/resultados.md](MD/resultados.md)

(Ajustar rutas si los archivos están en otra ubicación.)

## Cómo probar con Postman en Windows
1. Asegurarse de que la API esté corriendo (por ejemplo `dotnet run`). Anotar la URL base (ej.: `http://localhost:5000` o `https://localhost:5001`).
2. Abrir Postman.
3. Crear una nueva request:
     - Seleccionar método (GET, POST, DELETE).
     - URL: `{BASE_URL}/api/...` (ej.: `http://localhost:5000/api/paciente`).
4. Headers (si aplica):  
     - `Content-Type: application/json`
5. Para POST `/api/paciente`: en la pestaña Body seleccionar `raw` y `JSON` e insertar JSON, por ejemplo:
     {
         "nombre": "Juan",
         "apellido": "Pérez",
         "dni": "12345678",
         "fechaNacimiento": "1980-01-01",
         "obraSocialId": 1
     }
6. Ejecutar la request y revisar la respuesta en Postman.
7. Para DELETE usar `DELETE {BASE_URL}/api/paciente/{id}` con el id correspondiente.
8. Si recibe errores de CORS o conexión:
     - Verificar que el servidor esté escuchando en la URL y puerto usados.
     - Revisar configuración CORS en la API si se prueba desde orígenes distintos.
