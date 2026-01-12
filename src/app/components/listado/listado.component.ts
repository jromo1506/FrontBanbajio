import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwalAlertService } from '../../services/swal-alert.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-listado',
  imports: [NgxPaginationModule,CommonModule, ModalComponent,ReactiveFormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent implements OnInit{

  form: FormGroup;
  page = 1;
  pageSize = 5;
  showModal = false;

   @Input() productos:any[]=[];

  constructor(private swalAlert: SwalAlertService, private fb: FormBuilder,private productoService:ProductosService) {
     this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required]],
      tipo: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(res=>{
        this.productos=res;
    },error => {
            console.log(error);

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
