import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

export const routes: Routes = [
    {path:"listaProductos",component:HomeComponent},
    {path:"catalogoProveedores",component:ProveedoresComponent},
    {path:"edit",component:EditComponent},
    {path:"**",redirectTo:"listaProductos"}
];
