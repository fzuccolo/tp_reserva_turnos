document.addEventListener('DOMContentLoaded', function () {
    var selOS = document.getElementById('obraSocialId');
    var res = document.getElementById('resultado');
    var form = document.getElementById('form');
    var btn = form.querySelector('button');

    res.textContent = '';
    apiGet('/api/obrasocial')
        .then(function (obras) {
            var html = '<option value="">Seleccionar...</option>';
            for (var i = 0; i < obras.length; i++) {
                var os = obras[i];
                html += '<option value="' + os.obraSocialId + '">' + os.nombre + '</option>';
            }
            selOS.innerHTML = html;
        })
        .catch(function () {
            res.textContent = 'No se pudieron cargar las obras sociales.';
        });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        res.textContent = 'Enviando…';
        btn.disabled = true;

        var body = {
            apellidos: document.getElementById('apellidos').value.trim(),
            nombres: document.getElementById('nombres').value.trim(),
            dni: parseInt(document.getElementById('dni').value, 10),
            fechaDeNacimiento: document.getElementById('fecha').value, // yyyy-mm-dd
            sexo: document.getElementById('sexo').value,
            obraSocialId: parseInt(document.getElementById('obraSocialId').value, 10),
            credencial: document.getElementById('credencial').value.trim()
        };

        if (!body.apellidos || !body.nombres || !body.sexo || !body.obraSocialId || !body.credencial || !body.fechaDeNacimiento || !body.dni) {
            res.textContent = 'Todos los campos deben estar completos.';
            btn.disabled = false;
            return;
        }
        if (isNaN(body.dni) || body.dni <= 0) {
            res.textContent = 'El DNI debe ser un número mayor que 0.';
            btn.disabled = false;
            return;
        }

        apiPost('/api/paciente', body)
            .then(function (creado) {
                res.textContent = 'Paciente creado con ID: ' + creado.pacienteId;
                form.reset();
                selOS.selectedIndex = 0;
            })
            .catch(function (err) {
                res.textContent = 'Error: ' + (err && err.message ? err.message : 'no se pudo procesar');
            })
            .finally(function () {
                btn.disabled = false;
            });
    });
});
