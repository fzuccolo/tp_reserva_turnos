import { dom2 } from './dom.js';

let usuarioId = 0;
let userEmail = "";
let limite = 0;

export const lecturaApi = (apiUrl) => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => procesar(data))
    .then(datosProcesados => agregarDom(datosProcesados))
    .catch(error => console.error('Error al obtener los datos de la API:', error));
};

const procesar = (datos) => {
  return new Promise((resolve, reject) => {
    try {
      datos.forEach(usuario => {
        usuarioId = usuario.usuarioId;
        userEmail = usuario.email;
        limite = usuario.limite;
        console.log(`Procesado Usuario ID: ${usuarioId}, Email: ${userEmail}, Límite: ${limite}`);
      });
      resolve(datos);
    } catch (error) {
      reject(error);
    }
  });
};

const agregarDom = (datos) => {
  datos.forEach(usuario => {
    const mensaje = `Buen día, <span>${usuario.email}</span>`;
    dom2("div", mensaje, "data-user", "contenedor-principal", true);
  });
};
