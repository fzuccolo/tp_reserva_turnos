# TP Programación Avanzada II

## API de turnos

Archivo `turnos.zip` dado extraído a `turnos/`.

### Compilar y correr

    cd turnos
    dotnet build
    ASPNETCORE_ENVIRONMENT=Development dotnet run

### Cambios hechos a la API

* Se subió el límite de pacientes por usuario de 5 a 10
* Se agregó una Policy para desarrollo

### Endpoints

    GET /api/obrasocial
    GET /api/obrasocial/{id}

    GET /api/paciente
    GET /api/paciente/{id}
    POST /api/paciente
    DELETE /api/paciente?id={id}

    GET /api/usuario
    GET /api/usuario/{id}

### Ejemplos

    curl -i http://localhost:5000/api/obrasocial
    curl -i http://localhost:5000/api/obrasocial/1

    curl -i http://localhost:5000/api/paciente
    curl -i http://localhost:5000/api/paciente/2

    curl -i -X POST http://localhost:5000/api/paciente \
        -H 'Content-Type: application/json' \
        -H 'Accept: application/json' \
        -d '{
            "apellidos": "García",
            "nombres": "Ana",
            "dni": 26174623,
            "fechaDeNacimiento": "1995-05-05",
            "sexo": "F",
            "obraSocialId": 1,
            "credencial": "ABC-124"
        }'

    curl -i -X DELETE http://localhost:5000/api/paciente?id=2  # FIXME: arreglar en la API

    curl -i http://localhost:5000/api/usuario
    curl -i http://localhost:5000/api/usuario/1


## Frontend

Servir el front en puerto `5500`:

    cd front
    python3 -m http.server 5500

Abrir http://localhost:5500/index.html

### Screenshots

<img width="600" alt="Screenshot from 2025-09-14 11-19-15" src="https://github.com/user-attachments/assets/07f8c6db-2ad1-4197-8bbc-ce1ab7c4bc7c" />
<img width="600" alt="Screenshot from 2025-09-14 11-20-20" src="https://github.com/user-attachments/assets/75c83288-6d6c-4aa7-941f-4fc888696fc6" />
<img width="600" alt="Screenshot from 2025-09-14 11-34-03" src="https://github.com/user-attachments/assets/b5e008f4-4e2d-43f9-9d07-0d4f9d4108e8" />
<img width="600" alt="Screenshot from 2025-09-14 11-22-26" src="https://github.com/user-attachments/assets/d8598187-fbb0-4819-9a88-b22481eac04e" />
<img width="600" alt="Screenshot from 2025-09-14 11-34-59" src="https://github.com/user-attachments/assets/e7b06342-e8cb-49ad-9641-e93c5b386444" />

