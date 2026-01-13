import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private api:ApiService,private http:HttpClient) { }



  getProductos():Observable<any>{
    return this.http.get(this.api.url + "/productos");
  }


  crearProducto(prod:any):Observable<any>{
    return this.http.post(this.api.url + "/productos",prod);
  }

  editarProveedor(id:number,prod:any):Observable<any>{
    return this.http.put(this.api.url + "/productos/"+id,prod);
  }

  deleteProducto(id:string):Observable<any>{
    return this.http.delete(this.api.url + "/productos/eliminaRelaciones/"+id);
  }

}
