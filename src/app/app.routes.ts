import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"edit",component:EditComponent},
    {path:"**",redirectTo:"home"}
];
