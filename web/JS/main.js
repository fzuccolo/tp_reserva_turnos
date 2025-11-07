// importaciones
import { dom2 } from './COMMON/dom.js';
import { lecturaApi } from './COMMON/api.js';

const apiUrl = 'http://localhost:8000/api/usuario';

// mensaje de bienvenida
dom2('h1', '¡Bienvenido al Sistema de Obras Sociales!', 'titulo-bienvenida', 'titulo-bienvenida');

// carga dinámica de datos del usuario
lecturaApi(apiUrl);
