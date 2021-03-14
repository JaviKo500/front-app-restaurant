import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-listar-movimientos-caja',
  templateUrl: './listar-movimientos-caja.component.html',
  styleUrls: ['./listar-movimientos-caja.component.css']
})
export class ListarMovimientosCajaComponent implements OnInit {

  public modalRef: NgbModalRef;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  abrirDetalle(modalDetalle): void {
    this.modalRef = this.modalService.open(modalDetalle, {
      centered: true,
      size: 'xl'
    });
  }
  cerrarModal(): void {
    this.modalRef.close();
  }
}
