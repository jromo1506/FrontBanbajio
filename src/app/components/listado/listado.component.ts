import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  showModal = false;

   productos = [
    { clave: 'P001', nombre: 'Producto A', precio: 100, tipo: 'Electrónico', estatus: 'Activo' },
    { clave: 'P002', nombre: 'Producto B', precio: 250, tipo: 'Hogar', estatus: 'Inactivo' },
    { clave: 'P003', nombre: 'Producto C', precio: 75, tipo: 'Ropa', estatus: 'Activo' },
    { clave: 'P004', nombre: 'Producto D', precio: 150, tipo: 'Alimentos', estatus: 'Activo' },
    { clave: 'P005', nombre: 'Producto E', precio: 300, tipo: 'Deporte', estatus: 'Inactivo' }
    // más registros
  ];

  constructor(private swalAlert: SwalAlertService, private fb: FormBuilder) {
     this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required]],
      tipo: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }

  editarProducto(producto: any) {
    this.form.patchValue({
      clave: producto.clave,
      nombre: producto.nombre,
      precio: producto.precio,
      tipo: producto.tipo,
      estatus: producto.estatus
    });
    this.showModal = true;
  }

  eliminarProducto(producto: any) {
    console.log(producto);
    this.swalAlert.confirm("¿Estas seguro?", "Esta acción no puede deshacerse");
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
