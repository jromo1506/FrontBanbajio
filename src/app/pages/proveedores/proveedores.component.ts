import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from '../../components/listado/listado.component';
import { ProveedoresService } from '../../services/proveedores.service';
import { TiposService } from '../../services/tipos.service';
import { ProductoProveedorService } from '../../services/producto-proveedor.service';
import { CommonModule } from '@angular/common';
import { SwalAlertService } from '../../services/swal-alert.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-proveedores',
  imports: [ListadoComponent,CommonModule,ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit{

  categorias:any[]=[];
  proveedores:any[]=[];
page: number = 1;

  catalogo:any[]=[];
  formFiltros: FormGroup;
  constructor(private fb:FormBuilder,private alertSwal:SwalAlertService,private proveedorService:ProveedoresService,private tipoService:TiposService,private ppService:ProductoProveedorService) {
    
    this.formFiltros = this.fb.group({
        idTipoProducto: [null],
        esActivo: [null],
        busqueda: ['']
    });

  }

  ngOnInit(): void {
    this.getCatalogo();
      this.obtenerTipos();
    this.obtenerProvs();
  }

  getCatalogo(){
    this.ppService.obtenerCatalogo().subscribe(res=>{
      this.catalogo= res;
      console.log(res);
    });
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


  getUtilidad(arti: any): number {
  return arti.costo - arti.precio;
}


  eliminarRelacion(idP:string,idPP:string){
    this.ppService.deletePP(idP,idPP).subscribe(res=>{
      this.alertSwal.success("Hecho","Articulo eliminado");
      this.getCatalogo();
    });
  
  }


  buscar() {
  const filtros = this.formFiltros.value;
    console.log(filtros);
    this.ppService.filtros(filtros).subscribe(res=>{
      console.log(res);
      this.catalogo=res;
    },err=>{
      console.log(err);
    }
  );
  }

}
