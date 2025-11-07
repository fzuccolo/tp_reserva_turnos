# Resultados de APIs

## GET /api/paciente
Devuelve la lista de pacientes pertenecientes al grupo familiar del usuario de id = 1

Resultado (JSON):
```json
[
    {
        "id": 1,
        "nombre": "María",
        "apellido": "González",
        "dni": "30111222",
        "fechaNacimiento": "1980-05-14",
        "sexo": "F",
        "obraSocialId": 1,
        "telefono": "+5491122334455",
        "direccion": "Av. Siempre Viva 123",
        "parentesco": "Titular"
    },
    {
        "id": 2,
        "nombre": "Santiago",
        "apellido": "González",
        "dni": "38123456",
        "fechaNacimiento": "2010-09-02",
        "sexo": "M",
        "obraSocialId": 1,
        "telefono": null,
        "direccion": "Av. Siempre Viva 123",
        "parentesco": "Hijo"
    }
]
```

## GET /api/paciente/{id}
Devuelve los datos del paciente de id = {id} perteneciente al grupo familiar del usuario de id = 1

Ejemplo para id = 2

Resultado (JSON):
```json
{
    "id": 2,
    "nombre": "Santiago",
    "apellido": "González",
    "dni": "38123456",
    "fechaNacimiento": "2010-09-02",
    "sexo": "M",
    "obraSocialId": 1,
    "telefono": null,
    "direccion": "Av. Siempre Viva 123",
    "parentesco": "Hijo"
}
```

## POST /api/paciente
Crea un nuevo paciente y lo añade al grupo familiar del usuario de id = 1

Request (ejemplo):
```json
{
    "nombre": "Lucía",
    "apellido": "Pérez",
    "dni": "40222333",
    "fechaNacimiento": "1995-11-20",
    "sexo": "F",
    "obraSocialId": 2,
    "telefono": "+5491166677788",
    "direccion": "Calle Falsa 456",
    "parentesco": "Cónyuge"
}
```

Resultado (JSON) — recurso creado:
```json
{
    "id": 3,
    "nombre": "Lucía",
    "apellido": "Pérez",
    "dni": "40222333",
    "fechaNacimiento": "1995-11-20",
    "sexo": "F",
    "obraSocialId": 2,
    "telefono": "+5491166677788",
    "direccion": "Calle Falsa 456",
    "parentesco": "Cónyuge",
    "createdAt": "2025-11-07T10:15:30Z"
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
        "id": 1,
        "nombre": "ObraSocial Salud",
        "telefono": "+541134445566",
        "direccion": "Av. Salud 100",
        "plan": "Plan General"
    },
    {
        "id": 2,
        "nombre": "Cobertura Plus",
        "telefono": "+541198776655",
        "direccion": "Calle Cobertura 200",
        "plan": "Plan Familiar"
    }
]
```

## GET /api/obrasocial/{id}
Devuelve los datos de la obra social de id = 1

Resultado (JSON):
```json
{
    "id": 1,
    "nombre": "ObraSocial Salud",
    "telefono": "+541134445566",
    "direccion": "Av. Salud 100",
    "plan": "Plan General",
    "contacto": {
        "email": "info@obrasocialsalud.example",
        "horario": "Lun a Vie 9:00-17:00"
    }
}
```

## GET /api/usuario
Devuelve una lista con un único elemento: los datos del usuario de id = 1

Resultado (JSON):
```json
[
    {
        "id": 1,
        "nombre": "Juan",
        "apellido": "Pérez",
        "email": "juan.perez@example.com",
        "telefono": "+5491177776666",
        "direccion": "Av. Central 1",
        "grupoFamiliarId": 1
    }
]
```

## GET /api/usuario/{id}
Devuelve los datos del usuario de id = {id}. El valor de {id} debe ser 1

Resultado (JSON) — id = 1:
```json
{
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan.perez@example.com",
    "telefono": "+5491177776666",
    "direccion": "Av. Central 1",
    "grupoFamiliarId": 1
}
```