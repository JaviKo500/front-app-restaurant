import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetallePedido } from 'src/app/models/pedidos/detalle-pedido';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { BASE_URL } from 'src/environments/configurations';

import { Producto } from '../../../models/productos/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
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
    // para regresar items si hay cambios en el navarcomponent
    this.pedidosService.items$.subscribe((items) => {
      this.items = items;
      console.log('items en producto');
      console.log(this.items);
    });
    console.log('compoente prod cargado');

    this.activatedRoute.paramMap.subscribe((params) => {
      let id_cate = +params.get('id_cate');
      if (id_cate) {
        this.listarProductosPorCategoria(id_cate);
      }
    });
  }

  //listar productos por categoria

  listarProductosPorCategoria(id: number): void {
    this.productoService.ObtenerProductosClientes(id).subscribe((res) => {
      this.productos = res;
    });
  }

  // agregar un producto al pedido
  agregarProducto(prod: Producto): void {
    console.log('producto');
    console.log(prod);

    if (this.existeProducto(prod.id)) {
      this.incrementarCantidad(prod.id);
      this.notificaciones('se actualizó la cantidad del producto');
      console.log(this.items);
    } else {
      //agregamos el produxto al item
      this.item.producto = prod;
      this.items.push(this.item);
      this.notificaciones('se agregó un producto');
      // aqui debe estar este medodo par que funcione
      this.pedidosService.items$.emit(this.items);
      console.log(this.items);
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

  notificaciones(mensaje: string): void {
    this.notificacion.setup({
      width: 300,
      timeout: 1000,
      animation: 'easeOutBounce',
    });
    this.notificacion.create(mensaje, '', { cls: 'success' });
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
