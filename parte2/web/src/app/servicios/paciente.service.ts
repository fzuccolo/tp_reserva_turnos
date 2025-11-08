import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../modelos/paciente';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private http = inject(HttpClient);
  private url = 'http://localhost:5000/api/paciente';

  obtenerPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.url);
  }

  crearPaciente(p: Paciente): Observable<Paciente> {
  const paciente = {
    Nombres: p.nombres,
    Apellidos: p.apellidos,
    DNI: p.dni,
    FechaDeNacimiento: p.fechaDeNacimiento,
    ObraSocialId: p.obraSocialId,
    Sexo: p.sexo,          // agregado
    Credencial: p.credencial // agregado
  };
  return this.http.post<Paciente>(this.url, paciente);
}


  eliminarPaciente(p: Paciente): Observable<void> {
    return this.http.delete<void>(`${this.url}/${p.id}`);
  }
}