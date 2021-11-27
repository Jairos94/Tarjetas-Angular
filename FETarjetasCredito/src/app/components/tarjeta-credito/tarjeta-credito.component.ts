import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  //! Siempre es bueno dejar espacios entre las consultas
  listTarjetas: any[] = [];
  accion = 'Agregar';
  id: number | undefined;
  /* 
  !Importante es debe hacer los imports del form
  ?Se inica el form
  */
  form: FormGroup;
  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private _tarjetaService: TarjetaService) {
    //? Aquí se utiliza el form
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.ObtenerTarjetas();
  }

  ObtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listTarjetas = data;
    }, error => {
      console.log(error);

    })
  }

  guardarTarjeta() {
    console.log(this.form);
    const tarjeta: any = {

      //? Se accede al formulario
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    if (this.id == undefined) {
      //se agrega tarjeta
      //this.listTarjetas.push(tarjeta);
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('Se registró con exito', 'Tarjeta registrada');
        this.ObtenerTarjetas();
        this.form.reset();
      },
        error => {
          console.log(error);
          this.toastr.error('Error al ingresar la tarjeta', 'Error');
        })
    } else {
      // se edita tarjeta
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data => {
        
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('Se editó con excito la tarjeta', 'Tarjeta editado');
        this.ObtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }

  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('Se eliminó la tarjeta', 'Eliminar tarjeta')
      this.ObtenerTarjetas();
    }, error => {
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: any) {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv

    })
  }

}
