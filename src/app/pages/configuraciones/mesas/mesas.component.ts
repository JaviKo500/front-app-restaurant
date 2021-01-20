import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Para crear modales del ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mesa } from 'src/app/models/mesa/mesa';
import { MesaService } from 'src/app/services/mesa/mesa.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
})
export class MesasComponent implements OnInit {
  mesa: Mesa = new Mesa();
  //datos para componete paginador
  paginador: any;
  path: any = '/dashboard/mesas/page';
  //termina paginacion
  listaMesas: Mesa[] = [];
  chec: boolean = true;
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private mesasService: MesaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarMesasPageable();
  }

  //listar mesas paginador
  listarMesasPageable(): void {
    console.log('Paginando.....');
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.mesasService.ObtenerMesasPageable(page).subscribe((mesas: any) => {
        this.listaMesas = mesas.content;
        console.log(mesas.content);
        this.paginador = mesas;
      });
    });
  }

  saveMesa(): void {
    console.log(this.mesa.estado);
  }

  updateMesa(): void {}
  openLg(modalMesa) {
    this.mesa = new Mesa();
    this.modalReference = this.modalService.open(modalMesa);
  }
  //abrimos modal con los datos de esa categoria
  ModalActualizarMesa(modalMesa, mesa) {
    if (mesa) {
      this.openLg(modalMesa);
      //cargamos los datos
      this.mesa = mesa;
    }
  }
}
