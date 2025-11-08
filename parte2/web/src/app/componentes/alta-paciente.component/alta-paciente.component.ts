import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PacienteService } from '../../servicios/paciente.service';
import { ObraSocialService } from '../../servicios/obra-social.service';
import { Paciente } from '../../modelos/paciente';
import { ObraSocial } from '../../modelos/obra-social';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  imports: [FormsModule, CommonModule]
})
export class AltaPacienteComponent implements OnInit {
  @Output() agregarPaciente = new EventEmitter<void>();

  nombre = '';
  apellido = '';
  dni = '';
  fechaNacimiento = '';
  obraSocialId: number = 0;
  sexo: 'M' | 'F' | 'X' = 'F';
  credencial: string = '';
  obrasSociales: ObraSocial[] = [];

  private pacienteService = inject(PacienteService);
  private obraSocialService = inject(ObraSocialService);

  ngOnInit() {
    this.cargarObrasSociales();
  }

  cargarObrasSociales() {
    this.obraSocialService.obtenerObrasSociales().subscribe({
      next: data => {
        this.obrasSociales = data.map(os => ({
          id: Number((os as any).obraSocialId),
          nombre: (os as any).nombre
        }));

        if (this.obrasSociales.length > 0) {
          this.obraSocialId = this.obrasSociales[0].id;
        }
      },
      error: err => console.error('Error al cargar obras sociales:', err)
    });
  }

  submit() {
    const nuevoPaciente: Paciente = {
      nombres: this.nombre,
      apellidos: this.apellido,
      dni: this.dni,
      fechaDeNacimiento: this.fechaNacimiento,
      obraSocialId: this.obraSocialId,
      sexo: this.sexo,
      credencial: this.credencial,
      esUsuario: false
    };

    this.pacienteService.crearPaciente(nuevoPaciente).subscribe({
      next: pacienteCreado => {
        console.log('Paciente creado:', pacienteCreado);
        this.nombre = this.apellido = this.dni = this.fechaNacimiento = '';
        this.obraSocialId = this.obrasSociales[0]?.id || 0;
        this.sexo = 'F';
        this.credencial = '';
        this.agregarPaciente.emit();
        alert('Paciente creado correctamente');
      },
      error: err => console.error('Error al crear paciente:', err)
    });
  }
}
