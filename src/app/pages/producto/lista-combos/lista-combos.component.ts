import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/services/combo/combo.service';
import { BASE_URL } from 'src/environments/configurations';
import { Combo } from '../../../models/productos/combo';

@Component({
  selector: 'app-lista-combos',
  templateUrl: './lista-combos.component.html',
  styleUrls: ['./lista-combos.component.css'],
})
export class ListaCombosComponent implements OnInit {
  itemsCombos: Combo[] = [];
  api: any = BASE_URL;
  combo: Combo;
  private modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private comboService: ComboService
  ) {}

  ngOnInit(): void {
    this.listarCombosPageable();
  }

  listarCombosPageable(): void {
    this.comboService.listarCombosPageable(0).subscribe((res) => {
      console.log(res.combos.content);
      this.itemsCombos = res.combos.content;
    });
  }

  // combos items
  productosCombo(combo: Combo, modalPedido) {
    console.log(combo);

    this.combo = combo;
    this.modalRef = this.modalService.open(modalPedido, {
      size: 'xl',
      centered: true,
      scrollable: true,
    });
  }

  cambiarestado(combo): void {
    console.log(combo.estado);
    this.comboService.CambiarEstadoCombo(combo).subscribe((res) => {
      //colocar lña notificacion
      console.log(res);
    });
  }
}
