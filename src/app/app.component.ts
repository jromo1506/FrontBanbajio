import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FooterComponent],
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
