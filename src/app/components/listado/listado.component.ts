import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwalAlertService } from '../../services/swal-alert.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado',
  imports: [NgxPaginationModule,CommonModule, ModalComponent,ReactiveFormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent {

  form: FormGroup;
  page = 1;
  pageSize = 5;
  showModal=false;
  constructor(private swalAlert:SwalAlertService,private fb: FormBuilder) {
     this.form = this.fb.group({
      titular: ['', Validators.required],
      cuenta: ['', [Validators.required]],
      saldo: [0, [Validators.required ]],
      tipoCuenta:['', [Validators.required]],
      estatus:['', [Validators.required]]
    });
  }


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
      tipo: 'Debito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Debito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Debito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Debito',
      estatus: 'Inactiva'
    },
    {
      titular: 'Ana López',
      cuenta: '987654',
      saldo: 1500,
      tipo: 'Debito',
      estatus: 'Inactiva'
    }
    // más registros
  ];


  editarCuenta(cuenta:any){
    this.form.patchValue({
    titular: cuenta.titular,
    cuenta: cuenta.cuenta,
    saldo: cuenta.saldo,
    tipoCuenta: cuenta.tipo,
    estatus: cuenta.estatus
  });

  this.showModal = true;
  }


   eliminarCuenta(cuenta:any){
    console.log(cuenta);
    this.swalAlert.confirm("¿Estas seguro?","Esta acción no puede deshacerse")
  }

  

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
