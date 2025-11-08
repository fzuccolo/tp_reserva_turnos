import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../modelos/turno';

@Injectable({ providedIn: 'root' })
export class TurnoService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:5000/api/turno';

    obtenerTurnos(): Observable<Turno[]> {
        return this.http.get<Turno[]>(this.baseUrl);
    }

    reservarTurno(turno: Turno): Observable<Turno> {
        return this.http.post<Turno>(this.baseUrl, turno);
    }

    cancelarTurno(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

}
