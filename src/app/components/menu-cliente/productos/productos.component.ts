import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Producto } from '../../../models/productos/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  private modalRef: NgbModalRef;

  // variables
  cantidad = 1;
  notificacion: any;
  // Instancia objetos
  producto: Producto = new Producto();


  productos: Producto [] = [
    {
      id:1,
      nombre:'Coca Cola',
      categoria: {
        id: 5,
        estado: true,
        imagen: 'assets/icons/comida.jpg',
        nombre: 'Ceviche'
      },
      descripcion:'Jugo',
      precio:2.5,
      imagen:'assets/icons/comida.jpg'
    },
    {
      id:1,
      nombre:'Coca Cola',
      categoria: {
        id: 5,
        estado: true,
        imagen: 'assets/icons/comida.jpg',
        nombre: 'Ceviche'
      },
      descripcion:'Jugo',
      precio:2.5,
      imagen:'assets/icons/comida.jpg'
    },
    {
      id:1,
      nombre:'Coca Cola',
      categoria: {
        id: 5,
        estado: true,
        imagen: 'assets/icons/comida.jpg',
        nombre: 'Ceviche'
      },
      descripcion:'Jugo',
      precio:2.5,
      imagen:'assets/icons/comida.jpg'
    },
    {
      id:1,
      nombre:'Coca Cola',
      categoria: {
        id: 5,
        estado: true,
        imagen: 'assets/icons/comida.jpg',
        nombre: 'Ceviche'
      },
      descripcion:'Jugo',
      precio:2.5,
      imagen:'assets/icons/comida.jpg'
    }
  ];
  constructor( private modalService: NgbModal ) {
    // inicalizamos variable para notificaciones
    // @ts-ignore
    this.notificacion = Metro.notify;
  }

  ngOnInit(): void {
  }

  // agregar un producto al pedido
  agregarProducto(prod: Producto): void {
    this.notificacion.create("This is a notify", "Title", {});
    console.log('agrgado');
  }
  productoModal(producto: Producto, modal): void {
    this.cantidad = 1;
    this.producto = producto;
    this.modalRef = this.modalService.open(modal, { centered: true });
  }
  sumarCantidad(): void {
    this.cantidad++;
  }

  restarCantidad(): void {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

}
