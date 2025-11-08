import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TurnoService } from '../../servicios/turno.service';
import { PacienteService } from '../../servicios/paciente.service';
import { SucursalService } from '../../servicios/sucursal.service';
import { Paciente } from '../../modelos/paciente';
import { Sucursal } from '../../modelos/sucursal';
import { Turno } from '../../modelos/turno';

@Component({
    selector: 'app-reservar-turno',
    templateUrl: './reservar-turno.component.html',
    imports: [FormsModule, CommonModule]
})
export class ReservarTurnoComponent implements OnInit {
    @Output() turnoReservado = new EventEmitter<void>();
    pacientes: Paciente[] = [];
    sucursales: Sucursal[] = [];
    turnos: Turno[] = [];
    pacienteId: number | undefined;
    sucursalId: number | undefined;
    fecha = '';
    hora = '';

    private turnoService = inject(TurnoService);
    private pacienteService = inject(PacienteService);
    private sucursalService = inject(SucursalService);

    ngOnInit() {
        this.cargarPacientes();
        this.cargarSucursales();
        this.cargarTurnos();
    }

    cargarPacientes() {
        this.pacienteService.obtenerPacientes().subscribe({
            next: data => {
                this.pacientes = data.map(p => ({
                    id: Number((p as any).id || (p as any).pacienteId),
                    nombres: p.nombres,
                    apellidos: p.apellidos,
                    dni: p.dni,
                    fechaDeNacimiento: p.fechaDeNacimiento,
                    obraSocialId: p.obraSocialId,
                    sexo: p.sexo,
                    credencial: p.credencial,
                    esUsuario: p.esUsuario
                }));

                if (this.pacientes.length > 0) {
                    this.pacienteId = this.pacientes[0].id!;
                }
            },
            error: err => console.error('Error al cargar pacientes:', err)
        });
    }

    cargarSucursales() {
        this.sucursalService.obtenerSucursales().subscribe({
            next: data => {
                this.sucursales = data.map(s => ({
                    id: Number((s as any).id || (s as any).sucursalId),
                    nombre: s.nombre,
                    direccion: s.direccion
                }));

                if (this.sucursales.length > 0) {
                    this.sucursalId = this.sucursales[0].id!;
                }
            },
            error: err => console.error('Error al cargar sucursales:', err)
        });
    }

    cargarTurnos() {
        this.turnoService.obtenerTurnos().subscribe({
            next: data => {
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

    reservar() {
        if (this.pacienteId === undefined || this.sucursalId === undefined || !this.fecha || !this.hora) {
            alert('Debe completar todos los campos.');
            return;
        }

        // Parsear hora y minutos de forma segura
        const [horaStr, minStr] = this.hora.split(':');
        const horaNum = parseInt(horaStr, 10);
        const minNum = parseInt(minStr, 10);

        if (isNaN(horaNum) || isNaN(minNum)) {
            alert('Formato de hora inválido.');
            return;
        }

        // Validar horario 9-18
        if (horaNum < 9 || horaNum >= 18) {
            alert('El horario debe estar entre las 09:00 y las 18:00.');
            return;
        }

        // Validar múltiplos de 5 minutos
        if (minNum % 5 !== 0) {
            alert('Los minutos deben ser múltiplos de 5.');
            return;
        }

        // Validar turno duplicado para este paciente
        if (this.turnos.some(t => Number(t.pacienteId) === Number(this.pacienteId))) {
            alert('Este paciente ya tiene un turno asignado.');
            return;
        }

        // Construir horario ISO en 24h
        const horarioLocal = `${this.fecha}T${horaNum.toString().padStart(2, '0')}:${minNum.toString().padStart(2, '0')}:00`;

        // Validar turno duplicado en la sucursal
        if (this.turnos.some(t => t.horario === horarioLocal && t.sucursalId === this.sucursalId)) {
            alert('Ya existe un turno en ese horario para esta sucursal.');
            return;
        }

        const nuevoTurno: Turno = {
            pacienteId: this.pacienteId!,
            sucursalId: this.sucursalId!,
            horario: horarioLocal
        };

        this.turnoService.reservarTurno(nuevoTurno).subscribe({
            next: () => {
                alert('Turno reservado correctamente');
                this.fecha = '';
                this.hora = '';
                this.pacienteId = undefined;
                this.sucursalId = undefined;
                this.turnoReservado.emit();
            },
            error: err => console.error('Error al reservar turno:', err)
        });
    }
}
