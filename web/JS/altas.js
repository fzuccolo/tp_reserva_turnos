const apiBase = "http://localhost:8000/api";

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("form-paciente");
  const selectObra = document.getElementById("obraSocialId");
  const mensaje = document.getElementById("mensaje");

  // Cargar obras sociales
  try {
    const res = await fetch(`${apiBase}/obrasocial`);
    if (!res.ok) throw new Error("Error al obtener obras sociales");
    const obras = await res.json();

    selectObra.innerHTML = '<option value="">Seleccione una obra social</option>';
    obras.forEach(o => {
      const opt = document.createElement("option");
      opt.value = o.obraSocialId;
      opt.textContent = o.nombre;
      selectObra.appendChild(opt);
    });
  } catch {
    selectObra.innerHTML = '<option value="">Error al cargar obras sociales</option>';
  }

  // Envío del formulario
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const data = {
      apellidos: form.apellidos.value.trim(),
      nombres: form.nombres.value.trim(),
      dni: parseInt(form.dni.value, 10),
      fechaDeNacimiento: form.fechaDeNacimiento.value + "T00:00:00",
      sexo: form.sexo.value,
      obraSocialId: parseInt(form.obraSocialId.value, 10),
      credencial: form.credencial.value.trim()
    };

    try {
      const res = await fetch(`${apiBase}/paciente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();
      mostrarMensaje("Paciente creado correctamente.", "exito");
      form.reset();
    } catch {
      mostrarMensaje("Error al crear paciente.", "error");
    }
  });

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
