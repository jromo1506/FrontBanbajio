import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwalAlertService } from '../../services/swal-alert.service';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProductoProveedorService } from '../../services/producto-proveedor.service';
import { TiposService } from '../../services/tipos.service';

@Component({
  selector: 'app-listado',
  imports: [NgxPaginationModule,CommonModule, ModalComponent,ReactiveFormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss'
})
export class ListadoComponent implements OnInit{

  form: FormGroup;
   formVinc: FormGroup;
  page = 1;
  pageSize = 5;
  showModal = false;
 idMod=0;

  showVinc = false;


   @Input() productos:any[]=[];
   proveedores:any[]=[];
   categorias:any[]=[];

  constructor(private tipoService:TiposService,private swalAlert: SwalAlertService, private fb: FormBuilder,private productoService:ProductosService,private proveedorService:ProveedoresService,private productoProveedorService:ProductoProveedorService) {
     this.form = this.fb.group({
      clave: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required]],
      tipo: ['', Validators.required],
      estatus: ['', Validators.required]
    });

     this.formVinc = this.fb.group({
      idProducto: ['', Validators.required],
      idProveedor: ['', Validators.required],
      claveProveedor: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      costo: [0, [
        Validators.required,
        Validators.min(0)
      ]]
    });
  }

  
  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerProvs();
     this.obtenerTipos();
  }

    obtenerTipos(){
    this.tipoService.getTipos().subscribe(res=>{
      this.categorias = res;
   
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

  obtenerProvs(){
    this.proveedorService.getProveedores().subscribe(res=>{
      this.proveedores =res;


    },err =>{
      console.log(err);
    });
  }


  showVincular(id:string){
    this.formVinc.patchValue({idProducto:id});
    this.showVinc=true
  }

  vincular(){
    

    const body = {
      idProducto:this.formVinc.value.idProducto ,
      idProveedor:  Number(this.formVinc.value.idProveedor) ,
      claveProveedor: this.formVinc.value.claveProveedor,
      costo: this.formVinc.value.costo
    };

    console.log(body);

    this.productoProveedorService.createProductoProveedor(body.idProducto,body.idProveedor,body.claveProveedor,body.costo).subscribe(
      res=>{
        this.swalAlert.success("Hecho","Articulo publicado");
      },
      err=>{
        console.log(err);
      }
    );
    // this.productoProveedorService.crear(body).subscribe(...)
  }
  

  editarProducto(producto: any) {
    this.idMod=producto.idProducto;
    this.form.patchValue({
      clave: producto.clave,
      nombre: producto.nombre,
      precio: producto.precio,
      tipo: producto.tipo,
      estatus: producto.estatus
    });
    this.showModal = true;

  
  }

  eliminarProducto(id:string) {
    this.productoService.deleteProducto(id).subscribe(res=>{
      this.swalAlert.success("Exito","Producto eliminado");
      this.obtenerProductos();
    });
  }

  submit() {
    if (this.form.valid) {
    
      const payload = {
      ...this.form.value,
      idTipoProducto: Number(this.form.value.tipo), // convierte string a number
      clave: this.form.value.clave,
      nombre: this.form.value.nombre,
      precio: this.form.value.precio,
      estatus: this.form.value.estatus
    };
      console.log(payload);
      this.productoService.editarProveedor(this.idMod,payload).subscribe(res=>{
        this.swalAlert.success("Hecho","Producto modificado");
        this.obtenerProductos();
      });
    }
  }
}
