import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from '../../components/listado/listado.component';
import { ProveedoresService } from '../../services/proveedores.service';
import { TiposService } from '../../services/tipos.service';
import { ProductoProveedorService } from '../../services/producto-proveedor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedores',
  imports: [ListadoComponent,CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.scss'
})
export class ProveedoresComponent implements OnInit{

  categorias:any[]=[];
  proveedores:any[]=[];

  catalogo:any[]=[];
  constructor(private proveedorService:ProveedoresService,private tipoService:TiposService,private ppService:ProductoProveedorService) {
  }

  ngOnInit(): void {
    this.ppService.obtenerCatalogo().subscribe(res=>{
      this.catalogo= res;
      console.log(res);
    });
  }
}
