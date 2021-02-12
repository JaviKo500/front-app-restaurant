import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetallePedido } from 'src/app/models/pedidos/detalle-pedido';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { Cliente } from 'src/app/models/persona/cliente';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  public modalRef: NgbModalRef;
  //detalle de productos provenientes de productos component items
  items: DetallePedido[] = [];
  modalRegistrar: any;
  pedido: Pedido = new Pedido();
  constructor(
    private modalService: NgbModal,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    // llamo detecto evento del servicio pedidos cuando se agrega pedidos en productos component
    this.pedidoService.change.subscribe((items) => (this.pedido.items = items));
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
    this.modalRef = this.modalService.open(this.modalRegistrar, {
      centered: true,
      size: 'xl',
    });
  }
  cerrarModal(): void {
    this.modalRef.close();
  }

  postEnviarPedido(): void {
    swal
      .fire({
        title: '¿Desea registrarse?',
        text: 'opcional',
        icon: 'question',
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#000',
        denyButtonText: `Enviar pedido`,
        confirmButtonText: 'Registrarme',
      })
      .then((result) => {
        if (result.isConfirmed) {
          // si el cliente se quiere registrar sus datos
          this.cerrarModal();
          this.modalRegistrarCliente();
        } else if (result.isDenied) {
          // si solo quiere enviar los datos
          this.cerrarModal();
          this.enviarPedido();
        }
      });
  }

  // este metodo se ejecuta cuando el cliente se registra y manda a guardar sus datos desde el componente formulario-cliente
  guardarEnviarDatos(bandera): void {
    if (bandera) {
      this.cerrarModal();
      // aqui llamamos metodo del pedido con el cliente
      this.enviarPedido();
    }
  }

  AsignarCliente(cliente: Cliente): void {
    if (cliente) {
      //asignado el cliente al pedido
      this.pedido.cliente = cliente;
    }
  }

  enviarPedido(): void {
    this.cerrarModal();
    swal.fire('Pedido', 'Enviado', 'success');
    if (this.pedido.items.length > 0) {
      console.log('si');
    } else {
      //mensaje
    }
    // console.log(this.pedido);
  }

  //eliminar un producto de la lista del pedido
  eliminarProducto(id: number): void {
    this.pedido.items = this.pedido.items.filter(
      (item: DetallePedido) => id !== item.producto.id
    );
    this.pedidoService.pasarPedidos(this.pedido.items);
  }
  //calcular importe de cada producto
  public calcularImporte(cantidad: number, precio: number): number {
    let total = cantidad * precio;
    return Math.round(total * 100) / 100;
  }
  //calcular el total del poedido
  calcularTotal(): number {
    let total = 0;
    this.pedido.items.forEach((items: DetallePedido) => {
      total += this.calcularImporte(items.cantidad, items.producto.precio);
    });
    return Math.floor(total * 100) / 100;
  }
}
