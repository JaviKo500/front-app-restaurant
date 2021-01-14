import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private modalRef: NgbModalRef;
  constructor( private modalService: NgbModal ) { }

  ngOnInit(): void {
  }
  modalPedido(modal): void {
    this.modalRef = this.modalService.open(modal, { centered: true });
  }
  modalNotificacion(modal): void {
    this.modalRef = this.modalService.open(modal, { centered: true });
  }
}
