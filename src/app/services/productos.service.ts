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

}
