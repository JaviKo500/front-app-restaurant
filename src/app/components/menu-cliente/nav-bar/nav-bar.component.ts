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
  pedido_local: Pedido;
  constructor(
    private modalService: NgbModal,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    // llamo detecto evento del servicio pedidos cuando se agrega pedidos en productos component
    this.recuperarDelLocalStorage();
    this.pedidoService.change.subscribe((items) => {
      this.pedido.items = items;
      this.guardarEnLocalStorage(this.pedido);
    });
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
      this.pedidoService.registrarPedido(this.pedido).subscribe((res) => {
        console.log(res);
        this.items = [];
        this.pedido = new Pedido();
      });
    } else {
      swal.fire('Observación', 'Debe seleccionar productos', 'warning');
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

  // guardar pedido en el local storage
  guardarEnLocalStorage(pedido: Pedido): void {
    const now = new Date();
    const item = {
      value: pedido,
      expiry: now.getTime() + 1800000,
    };
    localStorage.setItem('pedido', JSON.stringify(item));
    this.recuperarDelLocalStorage();
  }

  // recuperar pedid del local storage
  recuperarDelLocalStorage(): void {
    let pedido_local = localStorage.getItem('pedido');
    if (pedido_local) {
      const item = JSON.parse(pedido_local);
      const now = new Date();
      if (now.getTime() > item.expiry) {
        localStorage.removeItem('pedido');
      } else {
        this.pedido_local = item.value;
        if (this.pedido_local != null) {
          this.pedido = this.pedido_local;
          console.log('pedido local storage');
          console.log(this.pedido);
        }
      }
    }
  }
}
