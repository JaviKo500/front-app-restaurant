import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComboService } from 'src/app/services/combo/combo.service';
import { Combo } from '../../../models/productos/combo';
import { ProductoCombo } from '../../../models/productos/producto-combo';

@Component({
  selector: 'app-lista-combos',
  templateUrl: './lista-combos.component.html',
  styleUrls: ['./lista-combos.component.css'],
})
export class ListaCombosComponent implements OnInit {
  itemsCombos: Combo[] = [];
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
}
