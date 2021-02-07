import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetallePedido } from 'src/app/models/pedidos/detalle-pedido';
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
  }

  //listar productos por categoria

  listarProductosPorCategoria(id: number): void {
    this.productoService.ObtenerProductosClientes(id).subscribe((res) => {
      console.log(res);
      this.productos = res;
    });
  }

  // agregar un producto al pedido
  agregarProducto(prod: Producto): void {
    console.log('agrgado');
    this.notificaciones('agrgado', 'Notificación');

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
}
