import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoProveedorService {

  constructor(private http:HttpClient,private api:ApiService) {
   }


    createProductoProveedor(idProducto: number, idProveedor: number, claveProveedor: string, costo: number): Observable<any> {
      const params = new HttpParams()
        .set('idProveedor', idProveedor)
        .set('claveProveedor', claveProveedor)
        .set('costo', costo);

      return this.http.post(this.api.url +`/productos/${idProducto}/proveedores`, null, { params });
    }


    obtenerCatalogo():Observable<any>{
      return this.http.get(this.api.url + "/catalogo");
    }

}
