import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sucursal } from '../modelos/sucursal';

@Injectable({ providedIn: 'root' })
export class SucursalService {
    private http = inject(HttpClient);
    private baseUrl = 'http://localhost:5000/api/sucursal';

    obtenerSucursales(): Observable<Sucursal[]> {
        return this.http.get<Sucursal[]>(this.baseUrl);
    }
}
