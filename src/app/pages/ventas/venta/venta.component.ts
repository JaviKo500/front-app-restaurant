import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  abrirModalCliente(modal) {
    this.modalReference = this.modalService.open(modal, { size: 'xl' });
  }
  abrirModalMesa(modal) {
    this.modalReference = this.modalService.open(modal);
  }
  CerrarModal(): void {
    this.modalReference.close();
  }

}
