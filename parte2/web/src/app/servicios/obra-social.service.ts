import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObraSocial } from '../modelos/obra-social';
import { Sucursal } from '../modelos/sucursal';

@Injectable({ providedIn: 'root' })
export class ObraSocialService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:5000/api/obrasocial';

    obtenerObrasSociales(): Observable<ObraSocial[]> {
        return this.http.get<ObraSocial[]>(this.baseUrl);
    }
}
