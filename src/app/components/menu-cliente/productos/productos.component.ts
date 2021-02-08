import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetallePedido } from 'src/app/models/pedidos/detalle-pedido';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { BASE_URL } from 'src/environments/configurations';

import { Producto } from '../../../models/productos/producto';
import { PedidoService } from '../../../services/pedido/pedido.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  @HostBinding() pasarPedidos = [];

  private modalRef: NgbModalRef;
  api = BASE_URL;
  // variables
  notificacion: any;
  // Instancia objetos
  item: DetallePedido = new DetallePedido();
  items: DetallePedido[] = [];
  producto: Producto = new Producto();

  productos: Producto[] = [];
  constructor(
    private modalService: NgbModal,
    private productoService: ProductoService,
    private pedidosService: PedidoService,
    private activatedRoute: ActivatedRoute
  ) {
    // inicalizamos variable para notificaciones
    // @ts-ignore
    this.notificacion = Metro.notify;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id');
      if (id) {
        this.listarProductosPorCategoria(id);
      }
    });
    // para regresar items si hay cambios en el navarcomponent
    this.pedidosService.change.subscribe( items => this.items = items);
  }

  //listar productos por categoria

  listarProductosPorCategoria(id: number): void {
    this.productoService.ObtenerProductosClientes(id).subscribe((res) => {
      // console.log(res);
      this.productos = res;
    });
  }

  // agregar un producto al pedido
  agregarProducto(prod: Producto): void {
    console.log('producto');
    console.log(prod);

    if (this.existeProducto(prod.id)) {
      this.incrementarCantidad(prod.id);
      this.notificaciones(
        'Actualizado',
        'se actualizó la cantidad del producto'
      );
      console.log(this.items);
    } else {
      //agregamos el produxto al item
      this.item.producto = prod;
      this.items.push(this.item);
      this.notificaciones('Agregado', 'se agregó un producto');
      console.log(this.items);
      // llamo metodo par pasar los items al servico
      this.pedidosService.pasarPedidos( this.items );
    }
    console.log('agrgado');
    //cerrar modal y restaurar valor del item
    this.cerrarModalDetalle();
  }
  productoModal(producto: Producto, modal): void {
    this.producto = producto;
    this.modalRef = this.modalService.open(modal, { centered: true });
  }
  sumarCantidad(): void {
    this.item.cantidad++;
  }

  restarCantidad(): void {
    if (this.item.cantidad > 1) {
      this.item.cantidad--;
    }
  }

  notificaciones(mensaje: string, titulo: string): void {
    this.notificacion.create(mensaje, titulo, { cls: 'info' });
  }

  //cerrar modal de detalle
  cerrarModalDetalle(): void {
    this.item = new DetallePedido();
    this.modalRef.close();
  }

  // verificar si un producto existe en el pedido
  existeProducto(id: number): boolean {
    let band = false;
    this.items.forEach((item: DetallePedido) => {
      if (id === item.producto.id) {
        band = true;
      }
    });
    return band;
  }

  // si existe un producto duplicado aumentar la cantidad
  incrementarCantidad(id: number): void {
    this.items = this.items.map((item: DetallePedido) => {
      if (id === item.producto.id) {
        item.cantidad += this.item.cantidad;
      }
      return item;
    });
  }

  //eliminar un producto de la lista del pedido
  eliminarProducto(id: number): void {
    this.items = this.items.filter(
      (item: DetallePedido) => id !== item.producto.id
    );
  }
}
