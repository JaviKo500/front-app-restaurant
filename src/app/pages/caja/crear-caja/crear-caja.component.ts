import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-crear-caja',
  templateUrl: './crear-caja.component.html',
  styleUrls: ['./crear-caja.component.css']
})
export class CrearCajaComponent implements OnInit {
  public modalRef: NgbModalRef;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  abrirModalCaja(modalCaja): void {
    this.modalRef = this.modalService.open(modalCaja, {
      centered: true,
    });
  }
  cerrarModal(): void {
    this.modalRef.close();
  }
}
