import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Combo } from '../../../models/productos/combo';
import { ComboService } from '../../../services/combo/combo.service';
import { BASE_URL } from '../../../../environments/configurations';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css']
})
export class CombosComponent implements OnInit {
  public modalRef: NgbModalRef;
  combos: Combo [] = [];
  combo: Combo;
  api = BASE_URL;
  constructor( 
    private modalService: NgbModal,
    private activatedRouter: ActivatedRoute, 
    private comboService: ComboService
    ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap
      .subscribe( (params) => {
        let id_categoria = +params.get('id');        
        console.log(id_categoria);
        if (id_categoria) {
          this.comboService.ObtenerCombosClientes(id_categoria)
            .subscribe( combosCliente => {
              console.log(combosCliente);
              this.combos = combosCliente;
            })
        }
      });
  }
  modalDetalleCombo(modalDetalle): void {
    this.modalRef = this.modalService.open(modalDetalle, {
      centered: true
    });
  }
  comboModal(combo: Combo, modal): void {
    this.combo = combo;
    this.modalRef = this.modalService.open(modal, { centered: true , size: 'xl'});
  }

}
