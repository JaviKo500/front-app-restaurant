import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public modalRef: NgbModalRef;
  modalRegistrar: any;
  constructor( private modalService: NgbModal ) { }

  ngOnInit(): void {
  }
  modalPedido(modal, modalRegistro): void {
    this.modalRef = this.modalService.open(modal, { centered: true });
    // para guardar la data del modal si desea o no resgistrarse el cliente
    this.modalRegistrar = modalRegistro;
  }
  modalNotificacion(modal): void {
    console.log(modal);
    this.modalRef = this.modalService.open(modal, { centered: true });
  }
  modalRegistrarCliente(): void {
    this.modalRef = this.modalService.open(this.modalRegistrar, { centered: true, size: 'xl' });
  }
  cerrarModal() : void {
    this.modalRef.close();
  }

  postEnviarPedido(): void {
    swal.fire({
      title: '¿Desea registrarse?',
      text: "opcional",
      icon: 'question',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#000',
      denyButtonText: `Enviar pedido`,
      confirmButtonText: 'Registrarme'
    }).then((result) => {
      if (result.isConfirmed) {
        // si el cliente se quiere registrar sus datos
        this.cerrarModal();
        this.modalRegistrarCliente();
      } else if ( result.isDenied ) {
        // si solo quiere enviar los datos
        this.cerrarModal();
        this.enviarPedido();
      }

    })
  }

  // este metodo se ejecuta cuando el cliente se registra y manda a guardar sus datos desde el componente formulario-cliente
  guardarEnviarDatos(bandera): void {
    if( bandera ) {
      this.cerrarModal();
      // aqui llamamos metodo del pedido con el cliente
      this.enviarPedido();
    }
  }

  enviarPedido(): void {
    this.cerrarModal();
    swal.fire('Pedido','Enviado','success');
  }
}
