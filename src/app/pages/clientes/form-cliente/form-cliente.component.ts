import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/persona/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css'],
})
export class FormClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  constructor(private clienteService: ClienteService) {}
  erroresBackend: string[] = [];
  ngOnInit(): void {}

  registrarCliente(): void {
    console.log(this.cliente);
    //validar los campos
    if (this.camposCompletos()) {
      //llamar al servicio
      this.clienteService.RegistrarCliente(this.cliente).subscribe(
        (res) => {
          this.cliente = new Cliente();
          this.erroresBackend = [];
        },
        (err) => {
          if (err.status === 409) {
            this.erroresBackend = err.error.errores as string[];
          } else {
            this.erroresBackend = [];
          }
        }
      );
    }
  }

  //verificar campos completos
  camposCompletos(): boolean {
    let c = this.cliente;
    //eliminar espacios del email
    this.cliente.email = this.cliente.email.replace(/ /g, '');
    console.log(this.cliente);

    if (
      c.nombres.length < 3 ||
      c.apellidos.length < 3 ||
      c.direccion.length < 3 ||
      c.email.length < 3
    ) {
      swal.fire(
        'Observación',
        'Completar todos los campos con almenos 3 carcateres.',
        'warning'
      );
      return false;
    } else {
      return true;
    }
  }
}
