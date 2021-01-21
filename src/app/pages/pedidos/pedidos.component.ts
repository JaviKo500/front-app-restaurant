import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// Modelos
import { Mesa } from 'src/app/models/mesa/mesa';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  private modalRef: NgbModalRef;

  mesasPedidos: Mesa [] = [];
  nombreMesa: string;
  pedidosPorMesa: Pedido [] = [];
  cantidadPedido:number = 0;
  listaPedidos: Pedido [] = [
    {
      id: 1,
      mesa: {
        id:1,
        nombre: 'mesa1',
        nombreQr: 'mesa1',
        estado: true
      }
    },
    {
      id: 2,
      mesa: {
        id:2,
        nombre: 'mesa2',
        nombreQr: 'mesa2',
        estado: true
      }
    }
    ,
    {
      id: 3,
      mesa: {
        id:2,
        nombre: 'mesa2',
        nombreQr: 'mesa2',
        estado: true
      }
    }
    ,
    {
      id: 3,
      mesa: {
        id:3,
        nombre: 'mesa3',
        nombreQr: 'mesa3',
        estado: true
      }
    }
  ];
  constructor( private modalService: NgbModal ) { }
  ngOnInit(): void {
    this.filtrarPorMesas();
  }
  // filtramos por mesa para separar los pedidos en la vista del cliente
  filtrarPorMesas(){
    let nombreMesa = [];
    this.listaPedidos.forEach(( pedido: Pedido ) => {
      if(!nombreMesa.includes( pedido.mesa.id )){
        this.mesasPedidos.push(pedido.mesa);
        nombreMesa.push(pedido.mesa.id);
      }
    });
  }
  // filtramos los pedidos por mesa para el modal
  filtrarPedidosPorMesa(mesa,modalPedido){
    this.nombreMesa = mesa;
    this.pedidosPorMesa = this.listaPedidos.filter( (pedido: Pedido) => pedido.mesa.nombre === mesa);
    this.modalRef = this.modalService.open(modalPedido, { size: 'xl', centered: true, scrollable: true });
  }
  // Para hacer un badge con la cantidad de pedidos
  numeroPedidos(idMesa: number): number{
    this.cantidadPedido = 0;
    for (const pedido of this.listaPedidos) {
        if(pedido.mesa.id === idMesa){
        this.cantidadPedido++
        }
    }
    return this.cantidadPedido;
  }
}
