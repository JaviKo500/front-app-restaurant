import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Combo } from '../../../models/productos/combo';
import { ComboService } from '../../../services/combo/combo.service';
import { BASE_URL } from '../../../../environments/configurations';
import { DetalleComboPedido } from 'src/app/models/pedidos/detalle-combo-pedido';
import { PedidoService } from 'src/app/services/pedido/pedido.service';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css'],
})
export class CombosComponent implements OnInit {
  public modalRef: NgbModalRef;
  notificacion: any;
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
  }

  // agregar un producto al pedido
  agregarProducto(comb: Combo): void {
    if (this.existeCombo(comb.id)) {
      this.incrementarCantidad(comb.id);
      this.notificaciones('se actualizó la cantidad del producto');
    } else {
      //agregamos el produxto al item
      this.item.combo = comb;
      this.items.push(this.item);
      this.notificaciones('se agregó un producto');
      // aqui debe estar este medodo par que funcione
      this.pedidoService.itemscombo$.emit(this.items);
    }
    //cerrar modal y restaurar valor del item
    this.cerrarModalDetalle();
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
}
