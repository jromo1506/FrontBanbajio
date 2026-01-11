import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from '../../components/listado/listado.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import Swal from 'sweetalert2';
import { SwalAlertService } from '../../services/swal-alert.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ListadoComponent,LoaderComponent,ModalComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  loading = false;
  showModal = false;
  form: FormGroup;

  productos: any[] = []; // lista de productos que se pueden agregar

  constructor(private swalAlert: SwalAlertService, private fb: FormBuilder,private router:Router) {
    this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required]],
      tipo: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }

  ngOnInit() {}

  agregarProducto() {
    if (this.form.valid) {
      this.productos.push(this.form.value); // agrega el producto al arreglo
      this.form.reset(); // limpia el formulario
      this.showModal = false;
      this.swalAlert.success("Producto agregado", "El producto se ha agregado correctamente");
    } else {
      this.form.markAllAsTouched(); // muestra errores si hay campos inválidos
    }
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }


  irEdit(){
    this.router.navigate(["/edit"])
  }
}
