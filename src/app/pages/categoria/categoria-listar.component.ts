import { Component, OnInit } from '@angular/core';

// Para crear modales del ng boostrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
      this.listaCategorias = categorias.categorias;
      console.log(categorias);
    });
  }

  openLg(content) {
    this.modalService.open(content);
  }
  saveCategoria(): void {
    //servicio para registrar las categorias
    this.categoriaService
      .RegistarCategoria(this.categoria)
      .subscribe((response) => {
        //trabajar la respuesta de la peticion http
        console.log(response);
      });
    console.log(this.categoria);

    //listar las categorias al final del proceso de registro.routing
    this.listarCategorias();
  }
}
