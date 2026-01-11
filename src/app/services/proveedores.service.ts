import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  constructor(private http:HttpClient,private api:ApiService) { }


  getProveedores():Observable<any>{
    return this.http.get(this.api.url +"/proveedores");
  }

  creaProveedor(prov:any):Observable<any>{
    return this.http.post(this.api.url +"/proveedores",prov);
  }

  deleteProveedor(id:string):Observable<any>{
    return this.http.delete(this.api.url +"/proveedores/"+id);
  }


}
