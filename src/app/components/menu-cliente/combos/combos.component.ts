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
  combo = new Combo();
  api = BASE_URL;
  constructor( 
    private modalService: NgbModal,
    private activatedRouter: ActivatedRoute, 
    private comboService: ComboService
    ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap
      .subscribe( (params) => {
        let id_combo = +params.get('id');        
        if (id_combo) {
          this.comboService.obtenerComboId( id_combo )
            .subscribe( item => {
              this.combo = item.combo;              
            } )
        }
      });
  }
  modalDetalleCombo(modalDetalle): void {
    this.modalRef = this.modalService.open(modalDetalle, {
      centered: true
    });
  }

}
