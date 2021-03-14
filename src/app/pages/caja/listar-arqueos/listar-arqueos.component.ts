import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-listar-arqueos',
  templateUrl: './listar-arqueos.component.html',
  styleUrls: ['./listar-arqueos.component.css']
})
export class ListarArqueosComponent implements OnInit {
  public modalRef: NgbModalRef;
  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }
  abrirModalDetalleArqueo(modalDetallerArqueo): void {
    this.modalRef = this.modalService.open(modalDetallerArqueo, {
      centered: true
    });
  }
  cerrarModal(): void {
    this.modalRef.close();
  }

}
