import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from '../../components/listado/listado.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import Swal from 'sweetalert2';
import { SwalAlertService } from '../../services/swal-alert.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';
import { TiposService } from '../../services/tipos.service';
import { ProductosService } from '../../services/productos.service';
@Component({
  selector: 'app-home',
  imports: [ListadoComponent,LoaderComponent,ModalComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  loading = false;
  showModal = false;
  showProveedores = false;
  form: FormGroup;

  productos: any[] = []; 

  
  proveedoresSeleccionados: number[] = [];

  constructor(private swalAlert: SwalAlertService, private fb: FormBuilder,private router:Router, private proveedorService:ProveedoresService,private tipoService:TiposService,private productoService:ProductosService) {
    this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required]],
      tipo: ['', Validators.required],
      estatus: ['', Validators.required]
    });
  }


  proveedores:any[]=[];
  categorias:any[]=[];
  ngOnInit() {
    this.obtenerTipos();
    this.obtenerProvs();
  }


 
  obtenerTipos(){
    this.tipoService.getTipos().subscribe(res=>{
      this.categorias = res;
   
    },err =>{
      console.log(err);
    });
  }
  obtenerProvs(){
    this.proveedorService.getProveedores().subscribe(res=>{
      this.proveedores =res;


    },err =>{
      console.log(err);
    });
  }


   obtenerProductos(){
    this.productoService.getProductos().subscribe(res=>{
        this.productos=res;
    },error => {
            console.log(error);

    });
  }



  agregarProducto() {
    if (this.form.valid) {
    // limpia el formulario
      this.showModal = false;
      console.log(this.form.value);
      this.productoService.crearProducto(this.form.value).subscribe(res=>{
        
         this.obtenerProductos();
        this.swalAlert.success("Producto agregado", "El producto se ha agregado correctamente");
        this.form.reset(); 
      },err=>{
        console.log(err);
      });
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



toggleProveedor(id: number, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;

  if (checked) {
    if (!this.proveedoresSeleccionados.includes(id)) {
      this.proveedoresSeleccionados.push(id);
    }
  } else {
    this.proveedoresSeleccionados =
      this.proveedoresSeleccionados.filter(pid => pid !== id);
  }
}

guardarRelacion() {
  // SOLO IDs
  console.log(this.proveedoresSeleccionados);
  // ej: [1, 3, 5]
}

}
