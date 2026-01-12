import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url:string ="http://localhost:8080/api";

  constructor() { }



}
