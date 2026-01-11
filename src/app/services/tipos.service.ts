import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  constructor(private http:HttpClient,private api:ApiService) { }

    getTipos():Observable<any>{
      return this.http.get(this.api.url +"/tipos-producto");
    }
  
    creaTipo(prov:any):Observable<any>{
      return this.http.post(this.api.url +"/tipos-producto",prov);
    }
  
    deleteTipo(id:string):Observable<any>{
      return this.http.delete(this.api.url +"/tipos-producto/"+id);
    }
  
  
}
