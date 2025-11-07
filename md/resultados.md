# Resultados de APIs

## GET /api/paciente
Devuelve la lista de pacientes pertenecientes al grupo familiar del usuario de id = 1

Resultado (JSON):
```json
[
    {
        "pacienteId": 1,
        "apellidos": "Pérez",
        "nombres": "Juan",
        "dni": 12345678,
        "fechaDeNacimiento": "1990-01-01T00:00:00",
        "sexo": "M",
        "obraSocial": {
            "obraSocialId": 1,
            "nombre": "Particular"
        },
        "credencial": "",
        "esUsuario": true
    },
    {
        "pacienteId": 2,
        "apellidos": "Pérez",
        "nombres": "María",
        "dni": 12345679,
        "fechaDeNacimiento": "1991-01-01T00:00:00",
        "sexo": "F",
        "obraSocial": {
            "obraSocialId": 1,
            "nombre": "Particular"
        },
        "credencial": "",
        "esUsuario": false
    },
    {
        "pacienteId": 3,
        "apellidos": "Pérez",
        "nombres": "Juan",
        "dni": 12345910,
        "fechaDeNacimiento": "1990-01-01T00:00:00",
        "sexo": "M",
        "obraSocial": {
            "obraSocialId": 2,
            "nombre": "OSDE"
        },
        "credencial": "",
        "esUsuario": false
    },
    {
        "pacienteId": 4,
        "apellidos": "Gramajo",
        "nombres": "Esther",
        "dni": 47552545,
        "fechaDeNacimiento": "1947-02-17T00:00:00",
        "sexo": "F",
        "obraSocial": {
            "obraSocialId": 3,
            "nombre": "Swiss Medical"
        },
        "credencial": "564654561321321",
        "esUsuario": false
    },
    {
        "pacienteId": 5,
        "apellidos": "Gramajo",
        "nombres": "Esther",
        "dni": 4775552,
        "fechaDeNacimiento": "1947-02-17T00:00:00",
        "sexo": "F",
        "obraSocial": {
            "obraSocialId": 3,
            "nombre": "Swiss Medical"
        },
        "credencial": "564654561321321",
        "esUsuario": false
    }
]
```

## GET /api/paciente/{id}
Devuelve los datos del paciente de id = {id} perteneciente al grupo familiar del usuario de id = 1

Ejemplo para id = 2

Resultado (JSON):
```json
{
    "pacienteId": 2,
    "apellidos": "Pérez",
    "nombres": "María",
    "dni": 12345679,
    "fechaDeNacimiento": "1991-01-01T00:00:00",
    "sexo": "F",
    "obraSocial": {
        "obraSocialId": 1,
        "nombre": "Particular"
    },
    "credencial": "",
    "esUsuario": false
}
```

## POST /api/paciente
Crea un nuevo paciente y lo añade al grupo familiar del usuario de id = 1

Request (ejemplo):
```json
{
    "apellidos": "Pérez",
    "nombres": "Juan",
    "dni": 12345910,
    "fechaDeNacimiento": "1990-01-01T00:00:00",
    "sexo": "M",
    "obraSocialId": 2,
    "credencial": ""
}
```

Resultado (JSON) — recurso creado:
```json
{
    "pacienteId": 3,
    "apellidos": "Pérez",
    "nombres": "Juan",
    "dni": 12345910,
    "fechaDeNacimiento": "1990-01-01T00:00:00",
    "sexo": "M",
    "obraSocial": {
        "obraSocialId": 2,
        "nombre": "OSDE"
    },
    "credencial": "",
    "esUsuario": false
}
```

## DELETE /api/paciente/{id}
Elimina el paciente de id = {id} perteneciente al grupo familiar del usuario de id = 1

Ejemplo para id = 3

Resultado (JSON):
```json
{
    "message": "Paciente eliminado",
    "id": 3
}
```

## GET /api/obrasocial
Devuelve la lista de obras sociales existentes en el sistema

Resultado (JSON):
```json
[
    {
        "obraSocialId": 1,
        "nombre": "Particular"
    },
    {
        "obraSocialId": 2,
        "nombre": "OSDE"
    },
    {
        "obraSocialId": 3,
        "nombre": "Swiss Medical"
    },
    {
        "obraSocialId": 4,
        "nombre": "Galeno"
    }
]
```

## GET /api/obrasocial/{id}
Devuelve los datos de la obra social de id = 1

Resultado (JSON):
```json
{
    "obraSocialId": 2,
    "nombre": "OSDE"
}
```

## GET /api/usuario
Devuelve una lista con un único elemento: los datos del usuario de id = 1

Resultado (JSON):
```json
[
    {
        "usuarioId": 1,
        "email": "juanperez@example.com",
        "limite": 5
    }
]
```

## GET /api/usuario/{id}
Devuelve los datos del usuario de id = {id}. El valor de {id} debe ser 1

Resultado (JSON) — id = 1:
```json
[
    {
        "usuarioId": 1,
        "email": "juanperez@example.com",
        "limite": 5
    }
]
```