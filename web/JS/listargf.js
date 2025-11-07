const apiBase = "http://localhost:8000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const tablaBody = document.querySelector("#tabla-pacientes tbody");
  const mensaje = document.getElementById("mensaje");

  try {
    const res = await fetch(`${apiBase}/paciente`);
    if (!res.ok) throw new Error("Error al obtener los pacientes");
    const pacientes = await res.json();

    if (pacientes.length === 0) {
      tablaBody.innerHTML = `<tr><td colspan="8">No hay pacientes cargados.</td></tr>`;
      return;
    }

    tablaBody.innerHTML = "";
    pacientes.forEach(p => {
      const fila = document.createElement("tr");
      if (p.esUsuario) fila.classList.add("fila-titular");

      fila.innerHTML = `
        <td>${p.apellidos}</td>
        <td>${p.nombres}</td>
        <td>${p.dni}</td>
        <td>${formatearFecha(p.fechaDeNacimiento)}</td>
        <td>${p.sexo}</td>
        <td>${p.obraSocialNombre ?? "-"}</td>
        <td>${p.credencial ?? "-"}</td>
        <td>${p.esUsuario ? "Sí" : "No"}</td>
      `;
      tablaBody.appendChild(fila);
    });

    mostrarMensaje("Listado de pacientes cargado correctamente.", "exito");
  } catch (error) {
    tablaBody.innerHTML = `<tr><td colspan="8">Error al cargar pacientes.</td></tr>`;
    mostrarMensaje(error.message, "error");
  }

  // Función para formatear la fecha
  function formatearFecha(fechaISO) {
    if (!fechaISO) return "-";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-AR");
  }

  // Función para mostrar mensajes flotantes
  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = `mensaje ${tipo} visible`;
    mensaje.classList.remove("oculto");

    setTimeout(() => {
      mensaje.classList.remove("visible");
      setTimeout(() => mensaje.classList.add("oculto"), 400);
    }, 3000);
  }
});
