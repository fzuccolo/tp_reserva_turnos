document.addEventListener('DOMContentLoaded', function () {
    var p = document.getElementById('bienvenida');
    p.textContent = 'Cargando usuario...';

    apiGet('/api/usuario')
        .then(function (lista) {
            if (!lista || !lista.length) {
                p.textContent = 'No hay datos de usuario.';
                return;
            }
            var user = lista[0];
            p.textContent = 'Hola, ' + (user.email || 'usuario');
        })
        .catch(function () {
            p.textContent = 'No se pudo cargar el usuario.';
        });
});
