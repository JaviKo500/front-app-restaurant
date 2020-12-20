import { Component, OnInit } from '@angular/core';

// Para crear modales del ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from '../../models/productos/categoria';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css'],
})
export class CategoriaListarComponent implements OnInit {
  categoria = new Categoria();
  listaCategorias: Categoria[] = [];
  imagenCategoria: File;
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  private listarCategorias(): void {
    //listar todas las categorias sin excepcion.
    this.categoriaService.ListaCategorias().subscribe((categorias: any) => {
      this.listaCategorias = categorias;
      console.log(categorias);
    });
  }

  openLg(content) {
    this.categoria = new Categoria();
    this.modalReference = this.modalService.open(content);
  }

  saveCategoria(): void {
    //servicio para registrar las categorias
    this.categoriaService
      .RegistarCategoria(this.categoria)
      .subscribe((response) => {
        //trabajar la respuesta de la peticion http
        console.log(response);
        //listar las categorias al final del proceso de registro
        this.listarCategorias();
        this.CerrarAllModals();
      });
    console.log(this.categoria);
  }
  //abrimos modal con los datos de esa categoria
  abrirModalActualizarCate(MCategoria, cate: Categoria): void {
    if (cate) {
      this.openLg(MCategoria);
      //cargamos los datos
      this.categoria = cate;
    }
  }
  //metodo para actualizar las categorias
  updateCategoria(): void {
    this.categoriaService
      .ActualizarCategoria(this.categoria)
      .subscribe((response) => {
        console.log(response);
        this.listarCategorias();
      });
  }

  CerrarModal(): void {
    this.modalReference.close();
  }

  CerrarAllModals() {
    this.modalService.dismissAll();
  }
}
