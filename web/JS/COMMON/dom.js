// función para agregar elementos al DOM dinámicamente
export const dom2 = (elemento, contenido, style, parentId = null, html = false) => {
  const elementoNuevo = document.createElement(elemento);
  if (html) {
    elementoNuevo.innerHTML = contenido;
  } else {
    elementoNuevo.textContent = contenido;
  }
  elementoNuevo.className = style;

  if (parentId) {
    document.getElementById(parentId).appendChild(elementoNuevo);
  } else {
    document.body.appendChild(elementoNuevo);
  }
};


