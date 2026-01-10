import { Component, OnInit } from '@angular/core';
import { ListadoComponent } from '../../components/listado/listado.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import Swal from 'sweetalert2';
import { SwalAlertService } from '../../services/swal-alert.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [ListadoComponent,LoaderComponent,ModalComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  loading = false;
  showModal = false;
   form: FormGroup;

  constructor(private swalAlert:SwalAlertService ,private fb: FormBuilder) {

     this.form = this.fb.group({
      titular: ['', Validators.required],
      cuenta: ['', [Validators.required]],
      saldo: [0, [Validators.required ]],
      tipoCuenta:['', [Validators.required]],
      estatus:['', [Validators.required]]
    });
  }

  ngOnInit() {
   
  }

  agregarCuenta(){
     
  }


 

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

}
