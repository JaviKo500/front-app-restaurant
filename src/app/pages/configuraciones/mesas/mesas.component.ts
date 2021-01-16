import { Component, OnInit } from '@angular/core';

// Para crear modales del ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Mesa } from '../../../models/mesa.model';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {
  listaMesas: Mesa [] = [
    {
      id:1,
      nombre: 'mesa1',
      nombreQr: 'mesa1',
      estado: true
    }
  ];
  mesa: Mesa = new Mesa();

  modalReference: NgbModalRef;
  constructor(  private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  saveMesa(): void{

  }

  updateMesa(): void {

  }
  openLg(modalMesa) {
    this.mesa = new Mesa();
    this.modalReference = this.modalService.open(modalMesa);
  }
  //abrimos modal con los datos de esa categoria
  ModalActualizarMesa(modalMesa, mesa){
    if (mesa) {
      this.openLg(modalMesa);
      //cargamos los datos
      this.mesa = mesa;
    }
  }

}
