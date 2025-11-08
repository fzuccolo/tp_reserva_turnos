import { Component, inject, OnInit } from '@angular/core';
import { Turno } from '../../modelos/turno';
import { TurnoService } from '../../servicios/turno.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Paciente } from '../../modelos/paciente';
import { PacienteService } from '../../servicios/paciente.service';

@Component({
  selector: 'app-listado-turnos',
  imports: [FormsModule, CommonModule],
  templateUrl: './listado-turnos.component.html'
})
export class ListadoTurnosComponent implements OnInit {
  turnos: Turno[] = [];
  pacientes: Paciente[] = [];

  constructor(private turnoService: TurnoService) {}
  private pacienteService = inject(PacienteService);

  ngOnInit() {
    this.cargarPacientes();
    //this.cargarTurnos();
  }

  cargarPacientes() {
    this.pacienteService.obtenerPacientes().subscribe({
      next: data => {
        this.pacientes = (data as any[]).map((p: any) => ({
        id: Number(p.pacienteId),
        nombres: p.nombres,
        apellidos: p.apellidos,
          dni: p.dni,
          fechaDeNacimiento: p.fechaDeNacimiento,
          sexo: p.sexo,
          credencial: p.credencial,
          obraSocialId: p.obraSocial ? Number(p.obraSocial.obraSocialId) : 0,
          esUsuario: p.esUsuario
        }));

        // Una vez cargados los pacientes, cargamos los turnos
        this.cargarTurnos();
      },
      error: err => console.error('Error al cargar pacientes:', err)
    });
  }

  cargarTurnos() {
    this.turnoService.obtenerTurnos().subscribe({
      next: data => {
        // Mapear siempre el id correcto
        this.turnos = data.map(t => ({
          id: t.id || (t as any).turnoId,
          pacienteId: t.pacienteId,
          sucursalId: t.sucursalId,
          horario: t.horario
        }));
      },
      error: err => console.error('Error al obtener turnos:', err)
    });
  }

  cancelarTurno(id: number) {
    this.turnoService.cancelarTurno(id).subscribe({
      next: () => {
        alert('Turno cancelado correctamente');
        // Actualizar la lista de turnos
        this.turnos = this.turnos.filter(t => t.id !== id);
      },
      error: err => console.error('Error al cancelar turno:', err)
    });
  }

  getNombrePaciente(id?: number) {
    const paciente = this.pacientes.find(p => p.id === id);
    console.log('Paciente encontrado:', paciente);
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : 'Sin Nombre';
  }
}
