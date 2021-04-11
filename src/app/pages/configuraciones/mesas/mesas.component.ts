import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

// ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// constantes
import { API_QR } from 'src/environments/configurations';
// modelos
import { Mesa } from 'src/app/models/mesa/mesa';
// servicios
import { MesaService } from 'src/app/services/mesa/mesa.service';
@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css'],
})
export class MesasComponent implements OnInit {
  mesa: Mesa = new Mesa();
  //datos para componete paginador
  api: string = API_QR;
  //qr data
  QR_DATA: string = '';
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
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.mesasService.ObtenerMesasPageable(page).subscribe((mesas: any) => {
        this.listaMesas = mesas.content;
        this.paginador = mesas;
      });
    });
  }

  saveMesa(): void {
    console.log(this.mesa.estado);
    if (this.camposLlenos()) {
      this.mesasService.registrarMesa(this.mesa).subscribe((res) => {
        //alerta de mensaje al guardar el
        this.listarMesasPageable();
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.mensaje,
          showConfirmButton: false,
          timer: 1000,
        });
        //termina alerta
        this.modalReference.close();
      });
    }
  }

  updateMesa(): void {
    if (this.camposLlenos()) {
      this.mesasService.actualizarMesa(this.mesa).subscribe((res) => {
        console.log(res);
        //alerta de mensaje al actualizar el
        this.listarMesasPageable();
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.mensaje,
          showConfirmButton: false,
          timer: 1000,
        });
        //termina alerta
        this.modalReference.close();
      });
    }
  }

  deletMesa(id: number): void {
    swal
      .fire({
        title: '¿Esta seguro de eliminar esta categoría?',
        text:
          'Sí ud elimina esta mesa es posible que pierda recibos relacionadas con esta mesa.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar de todas formas',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.mesasService.deleteMesa(id).subscribe((res) => {
            this.listarMesasPageable();
            swal.fire('Borrado', res, 'success');
          });
        }
      });
  }

  openLg(modalMesa) {
    this.mesa = new Mesa();
    this.modalReference = this.modalService.open(modalMesa);
  }
  abrirModalMesaQR(modal, mesa: Mesa): void {
    this.QR_DATA = this.api + 'cliente/home/mesa/' + mesa.id;
    this.modalReference = this.modalService.open(modal);
  }
  //abrimos modal con los datos de esa categoria
  ModalActualizarMesa(modalMesa, mesa) {
    if (mesa) {
      this.openLg(modalMesa);
      //cargamos los datos
      this.mesa = mesa;
    }
  }

  camposLlenos(): boolean {
    let band = false;
    if (this.mesa.nombre.length < 3) {
      console.log('llenar los campos');
      return band;
    } else {
      return (band = true);
    }
  }
}
