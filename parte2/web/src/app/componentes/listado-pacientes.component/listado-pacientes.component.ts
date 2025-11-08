import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { PacienteService } from '../../servicios/paciente.service';
import { ObraSocialService } from '../../servicios/obra-social.service';
import { Paciente } from '../../modelos/paciente';
import { ObraSocial } from '../../modelos/obra-social';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-listado-pacientes',
    imports: [FormsModule, CommonModule],
    templateUrl: './listado-pacientes.component.html'
})
export class ListadoPacientesComponent implements OnInit {
    @Output() pacienteEliminado = new EventEmitter<void>();


    pacientes: Paciente[] = [];
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
                    id: Number((os as any).id || (os as any).obraSocialId),
                    nombre: (os as any).nombre
                }));

                this.cargarPacientes();
            },
            error: err => console.error('Error al cargar obras sociales:', err)
        });
    }

    cargarPacientes() {
        this.pacienteService.obtenerPacientes().subscribe({
            next: (data: any[]) => {
                this.pacientes = data.map(p => ({
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
            },
            error: err => console.error('Error al cargar pacientes:', err)
        });

    }

    getNombreObraSocial(id?: number) {
        return this.obrasSociales.find(os => os.id === id)?.nombre || 'Sin Obra Social';
    }

    eliminarPaciente(paciente: Paciente) {
        if (paciente.esUsuario) {
            alert('No se puede eliminar al titular del grupo familiar.');
            return;
        }
        if (!paciente.id) return;
        this.pacienteService.eliminarPaciente(paciente).subscribe(() => {
            this.pacientes = this.pacientes.filter(p => p.id !== paciente.id);
            this.pacienteEliminado.emit();
        });
    }



}
