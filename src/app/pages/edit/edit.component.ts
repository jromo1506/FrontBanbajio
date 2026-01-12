import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from '../../components/listado/listado.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TiposService } from '../../services/tipos.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { SwalAlertService } from '../../services/swal-alert.service';

@Component({
  selector: 'app-edit',
  imports: [ListadoComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit{

  proveedorForm:FormGroup;
  tipoForm:FormGroup;


  proveedores:any[] = [];
  categorias:any[] = [];

  
  constructor(private fb: FormBuilder,private tipoService:TiposService,private proveedorService:ProveedoresService,private swalAlert:SwalAlertService) {
    this.proveedorForm =this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

     this.tipoForm =this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

  }
  ngOnInit(): void {
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
  obtenerProvs(){
    this.proveedorService.getProveedores().subscribe(res=>{
      this.proveedores =res;


    },err =>{
      console.log(err);
    });
  }


  confirmarProv() {
    if (this.proveedorForm.invalid){
      this.swalAlert.error("Error","Datos invalidos");
    }
    else{
      this.proveedorService.creaProveedor(this.proveedorForm.value).subscribe(res=>{
        this.swalAlert.success("Hecho","Accion exitosa");
              this.obtenerProvs();
        
      },err=>{
        this.swalAlert.error("Error","Hubo un error en la peticion");
      });
    }

   
    this.proveedorForm.reset();
  }

  confirmarCateg() {
    if (this.tipoForm.invalid){
      this.swalAlert.error("Error","Datos invalidos");
    }
    else{
      this.tipoService.creaTipo(this.tipoForm.value).subscribe(res=>{
        this.swalAlert.success("Hecho","Accion exitosa");
           this.obtenerTipos();
      },err=>{
        this.swalAlert.error("Error","Hubo un error en la peticion");
      });
    }

  
    this.tipoForm.reset();
  }



  eliminaProv(id:string){
    this.proveedorService.deleteProveedor(id).subscribe(res=>{
        this.swalAlert.success("Hecho","Proveedor eliminado");
        this.obtenerProvs();
    });
  }

  
  eliminaCateg(id:string){
    this.tipoService.deleteTipo(id).subscribe(res=>{
        this.swalAlert.success("Hecho","Categoria eliminada");
        this.obtenerTipos();
    });
  }


}

