import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSucursalesComponent } from './listado-sucursales.component';

describe('ListadoSucursalesComponent', () => {
  let component: ListadoSucursalesComponent;
  let fixture: ComponentFixture<ListadoSucursalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSucursalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoSucursalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
