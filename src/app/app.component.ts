import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BanBajio';


  constructor(private router:Router) {
    
  }

  irListado(){
    this.router.navigate(["/listaProductos"]);
  }

  irCatalogo(){
   this.router.navigate(["/catalogoProveedores"]);
  }
}
