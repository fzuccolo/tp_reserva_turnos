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

Ejemplos:

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

