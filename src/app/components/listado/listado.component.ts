import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-listado',
  imports: [NgxPaginationModule,CommonModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent {
    cuentas = [
    {
      titular: 'Juan Pérez',
      cuenta: '123456',
      saldo: 2999,
      tipo: 'Ahorro',
      estatus: 'Activa'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Débito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Débito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Débito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Débito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Débito',
      estatus: 'Inactiva'
    }
    // más registros
  ];
  page = 1;
  pageSize = 5;
}
