import { Component, OnInit } from '@angular/core';
// ngBoostrap
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// modelos
// servicios

@Component({
  selector: 'app-lista-ventas',
  templateUrl: './lista-ventas.component.html',
  styleUrls: ['./lista-ventas.component.css']
})
export class ListaVentasComponent implements OnInit {
  modalRef: NgbModalRef;
  fechaInico: NgbDateStruct;
  fechaFin: NgbDateStruct;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  abrirModalDetalleCliente(modalDetallerCliente): void {
    this.modalRef = this.modalService.open(modalDetallerCliente, {
      centered: true,
    });
  }
  abrirModalDetallePedido(modalDetallerPedido ): void {
    this.modalRef = this.modalService.open(modalDetallerPedido, {
      centered: true,
      size: 'xl',
    });
  }
  cerrarModal(): void {
    this.modalRef.close();
  }
}
