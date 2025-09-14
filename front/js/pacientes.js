document.addEventListener('DOMContentLoaded', function () {
    var tbody = document.getElementById('rows');
    var estado = document.getElementById('estado');

    estado.textContent = '';

    apiGet('/api/paciente')
        .then(function (data) {
            if (!data || data.length === 0) {
                estado.textContent = 'No hay pacientes cargados.';
                tbody.innerHTML = '';
                return;
            }

            var html = '';
            for (var i = 0; i < data.length; i++) {
                var p = data[i];
                var fecha = '';
                if (p.fechaDeNacimiento) {
                    var d = new Date(p.fechaDeNacimiento);
                    var dd = ('0' + d.getDate()).slice(-2);
                    var mm = ('0' + (d.getMonth() + 1)).slice(-2);
                    var yyyy = d.getFullYear();
                    fecha = dd + '/' + mm + '/' + yyyy;
                }

                var obra = (p.obraSocial && p.obraSocial.nombre) ? p.obraSocial.nombre : '-';
                var titular = p.esUsuario ? 'Sí' : 'No';

                html += '<tr>'
                    + '<td>' + (p.apellidos || '') + '</td>'
                    + '<td>' + (p.nombres || '') + '</td>'
                    + '<td>' + (p.dni || '') + '</td>'
                    + '<td>' + fecha + '</td>'
                    + '<td>' + (p.sexo || '') + '</td>'
                    + '<td>' + obra + '</td>'
                    + '<td>' + titular + '</td>'
                    + '</tr>';
            }
            tbody.innerHTML = html;
        })
        .catch(function () {
            estado.textContent = 'Error cargando pacientes.';
        });
});
