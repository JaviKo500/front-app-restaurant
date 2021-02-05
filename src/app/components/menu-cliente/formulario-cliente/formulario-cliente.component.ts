import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/models/persona/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import swal from 'sweetalert2';

//service cliente
@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css'],
})
export class FormularioClienteComponent implements OnInit {
  @Output() registrocliente: EventEmitter<boolean> = new EventEmitter();
  @Output() reclienteRetorno: EventEmitter<Cliente> = new EventEmitter();
  @Input() cerrarModalRef: NgbModalRef;

  //alcena errores del backend
  erroresBackend: string[] = [];

  cliente: Cliente = new Cliente();
  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {}

  registrarCliente(): void {
    console.log(this.cliente);
    //validar los campos
    if (this.camposCompletos()) {
      console.log('validacion aceptada');
      //llamar al servicio
      this.clienteService.RegistrarCliente(this.cliente).subscribe(
        (res) => {
          console.log(res);
          //asignamos el cliente de retorno al evento
          this.reclienteRetorno.emit(res.cliente);
          //asignamos la ceptacion del pedido
          //this.cerrarModal();
          this.cliente = new Cliente();
          this.registrocliente.emit(true);
        },
        (err) => {
          if (err.status === 409) {
            this.erroresBackend = err.error.mensaje as string[];
            console.log('mensaje en ts');
            console.log(this.erroresBackend);
          }
        }
      );
    }
  }
  cerrarModal(): void {
    this.cerrarModalRef.close();
  }

  //verificar campos completos
  camposCompletos(): boolean {
    let c = this.cliente;
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
