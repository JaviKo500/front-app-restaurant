import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Combo } from '../../../models/productos/combo';
import { ProductoCombo } from '../../../models/productos/producto-combo';

@Component({
  selector: 'app-lista-combos',
  templateUrl: './lista-combos.component.html',
  styleUrls: ['./lista-combos.component.css']
})
export class ListaCombosComponent implements OnInit {
  itemsCombos: Combo [] = [ {id: 1, nombre: 'hamburguesa', descripcion:'ninguna', precio: 2.0, imagen: 'assets/icons/comida.jpg', 
  categoria: { id:1, nombre: 'combo', imagen:'', estado: true, tipo: { id: 1, tipo: 'na'} }, 
  itemsCombo: [
                { id:1, 
                  producto:
                           {id: 1,
                              nombre: "papas",
                              descripcion: "sn",
                              precio: 2.2,
                              imagen: "assets/icons/comida.jpg",
                              categoria: {
                                id: 1,
                                nombre: "prueba",
                                imagen: "jar-loading.gif",
                                estado: true,
                                tipo: { id: 1, tipo: 'na'}
                              }
                           },
                  cantidad: 2
                },
                { id:2, 
                  producto:
                           {id: 2,
                              nombre: "arroz",
                              descripcion: "sn",
                              precio: 2.3,
                              imagen: "assets/icons/comida.jpg",
                              categoria: {
                                id: 1,
                                nombre: "prueba",
                                imagen: "jar-loading.gif",
                                estado: true,
                                tipo: { id: 1, tipo: 'na'}
                              }
                           },
                  cantidad: 2
                }
              ]
  }];
  combo: Combo ;
  private modalRef: NgbModalRef;

  constructor( private modalService: NgbModal ) { }

  ngOnInit(): void {
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
