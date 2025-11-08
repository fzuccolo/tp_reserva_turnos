import { Component, OnInit } from '@angular/core';
import { Sucursal } from '../../modelos/sucursal';
import { SucursalService } from '../../servicios/sucursal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-sucursales',
  imports: [CommonModule],
  templateUrl: './listado-sucursales.component.html'
})
export class ListadoSucursalesComponent implements OnInit {
  sucursales: Sucursal[] = [];

  constructor(private sucursalService: SucursalService) {}

  ngOnInit() {
    this.sucursalService.obtenerSucursales().subscribe(s => this.sucursales = s);
  }
}
