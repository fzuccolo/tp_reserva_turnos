import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListadoPacientesComponent } from './componentes/listado-pacientes.component/listado-pacientes.component';
import { ReservarTurnoComponent } from './componentes/reservar-turno.component/reservar-turno.component';
import { ListadoTurnosComponent } from './componentes/listado-turnos.component/listado-turnos.component';
import { ListadoSucursalesComponent } from './componentes/listado-sucursales.component/listado-sucursales.component';
import { AltaPacienteComponent } from './componentes/alta-paciente.component/alta-paciente.component';


@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ListadoPacientesComponent,
        ReservarTurnoComponent,
        ListadoTurnosComponent,
        ListadoSucursalesComponent,
        AltaPacienteComponent
    ],
    templateUrl: './app.html',
    styleUrls: ['./app.css']

})
export class App {
    protected readonly title = signal('tp2');
}
