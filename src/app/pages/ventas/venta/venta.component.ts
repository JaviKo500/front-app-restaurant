import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mesa } from 'src/app/models/mesa/mesa';
import { Pedido } from 'src/app/models/pedidos/pedido';
import { MesaService } from 'src/app/services/mesa/mesa.service';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  mesas: Mesa[] = [];
  ConsumidorFinal: boolean = false;
  mesa: Mesa = new Mesa();
  pedido: Pedido = new Pedido();
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {}
  abrirModalCliente(modal) {
    this.modalReference = this.modalService.open(modal, { size: 'xl' });
  }
  abrirModalMesa(modal) {
    this.obtenerMesas();
    this.modalReference = this.modalService.open(modal, { scrollable: true });
  }
  CerrarModal(): void {
    this.modalReference.close();
  }
  obtenerMesas(): void {
    this.mesaService.ObtenerMesas().subscribe((res) => {
      console.log(res);
      this.mesas = res;
    });
  }
  seleccionarMesa(mesa: Mesa): void {
    this.mesa = mesa;
    this.pedido.mesa = this.mesa;
    this.CerrarModal();
  }
}
