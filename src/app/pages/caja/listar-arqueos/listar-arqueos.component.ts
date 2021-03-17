import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Arqueo } from 'src/app/models/caja/arqueo';
import { ArqueoService } from 'src/app/services/caja/arqueo.service';
@Component({
  selector: 'app-listar-arqueos',
  templateUrl: './listar-arqueos.component.html',
  styleUrls: ['./listar-arqueos.component.css'],
})
export class ListarArqueosComponent implements OnInit {
  //paginacion
  paginador: any;
  path: any = '/dashboard/arqueos/page';
  //termina paginacion
  //fechas de peticion de arqueos
  desde: Date = new Date();
  hasta: Date = new Date();
  public modalRef: NgbModalRef;
  arqueos: Arqueo[] = [];
  constructor(
    private modalService: NgbModal,
    private arqueoService: ArqueoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarArqueos();
  }

  listarArqueos(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.arqueoService
        .obtenerArqueosFecha(page, this.desde, this.hasta)
        .subscribe((res) => {
          this.arqueos = res.content;
          this.paginador = res;
          console.log(this.arqueos);
          console.log('fechas');
          console.log(this.desde);
          console.log(this.hasta);
        });
    });
  }

  //************************************************ */
  //--------------------modales-----------------------
  abrirModalDetalleArqueo(modalDetallerArqueo): void {
    this.modalRef = this.modalService.open(modalDetallerArqueo, {
      centered: true,
    });
  }
  cerrarModal(): void {
    this.modalRef.close();
  }
}
