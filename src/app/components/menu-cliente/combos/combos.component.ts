import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Combo } from '../../../models/productos/combo';
import { ComboService } from '../../../services/combo/combo.service';
import { BASE_URL } from '../../../../environments/configurations';
import { DetalleComboPedido } from 'src/app/models/pedidos/detalle-combo-pedido';
import { PedidoService } from 'src/app/services/pedido/pedido.service';
import { Pedido } from 'src/app/models/pedidos/pedido';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css'],
})
export class CombosComponent implements OnInit {
  public modalRef: NgbModalRef;
  notificacion: any;
  pedido_local: Pedido = new Pedido();
  combos: Combo[] = [];
  items: DetalleComboPedido[] = [];
  item: DetalleComboPedido = new DetalleComboPedido();
  combo: Combo;
  api = BASE_URL;
  constructor(
    private modalService: NgbModal,
    private activatedRouter: ActivatedRoute,
    private comboService: ComboService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      let id_categoria = +params.get('id');
      console.log(id_categoria);
      if (id_categoria) {
        this.comboService
          .ObtenerCombosClientes(id_categoria)
          .subscribe((combosCliente) => {
            console.log(combosCliente);
            this.combos = combosCliente;
          });
      }
    });
    this.recuperarDelLocalStorage();
    //obtener la lista modificada de
    this.pedidoService.itemscombo$.subscribe((items) => {
      this.items = items;
    });
  }

  // agregar un producto al pedido
  agregarCombo(comb: Combo): void {
    console.log(comb);

    if (this.existeCombo(comb.id)) {
      this.incrementarCantidad(comb.id);
      //ARREGLAR LAS NOTIFICACIOINES
      //this.notificaciones('se actualizó la cantidad del producto');
    } else {
      //agregamos el produxto al item
      this.item.combo = comb;
      this.items.push(this.item);
      //ARREGLAR LAS NOTIFICACIOINES
      //this.notificaciones('se agregó un producto');
      // aqui debe estar este medodo par que funcione
      this.pedidoService.itemscombo$.emit(this.items);
    }
    //cerrar modal y restaurar valor del item
    this.cerrarModalDetalle();
    console.log(this.items);
  }

  // verificar si un producto existe en el pedido
  existeCombo(id: number): boolean {
    let band = false;
    this.items.forEach((item: DetalleComboPedido) => {
      if (id === item.combo.id) {
        band = true;
      }
    });
    return band;
  }

  // si existe un producto duplicado aumentar la cantidad
  incrementarCantidad(id: number): void {
    this.items = this.items.map((item: DetalleComboPedido) => {
      if (id === item.combo.id) {
        item.cantidad += this.item.cantidad;
      }
      //actualizar en el nav bar
      this.pedidoService.itemscombo$.emit(this.items);
      return item;
    });
  }

  //eliminar un combo de la lista del pedido
  eliminarCombo(id: number): void {
    this.items = this.items.filter(
      (item: DetalleComboPedido) => id !== item.combo.id
    );
  }

  modalDetalleCombo(modalDetalle): void {
    this.modalRef = this.modalService.open(modalDetalle, {
      centered: true,
    });
  }
  comboModal(combo: Combo, modal): void {
    this.combo = combo;
    this.modalRef = this.modalService.open(modal, {
      centered: true,
      size: 'xl',
    });
  }
  //para mensajes toast
  notificaciones(mensaje: string): void {
    this.notificacion.setup({
      width: 300,
      timeout: 1000,
      animation: 'easeOutBounce',
    });
    this.notificacion.create(mensaje, '', { cls: 'success' });
  }

  sumarCantidad(): void {
    this.item.cantidad++;
  }

  restarCantidad(): void {
    if (this.item.cantidad > 1) {
      this.item.cantidad--;
    }
  }

  //cerrar modal de detalle
  cerrarModalDetalle(): void {
    this.item = new DetalleComboPedido();
    this.modalRef.close();
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
          this.items = this.pedido_local.combos;
        }
      }
    }
  }
}
