import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/productos/categoria';
import { Producto } from 'src/app/models/productos/producto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  imagenProducto: File;
  producto: Producto = new Producto();
  listaCategorias: Categoria[] = [];
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.ListarCategorias();
  }

  RegistrarProducto(): void {
    console.log(this.producto);
  }

  ListarCategorias(): void {
    this.categoriaService.ListaCategorias().subscribe((response) => {
      this.listaCategorias = response;
      console.log(this.listaCategorias);
    });
  }

  //comparar-validar datos de categorias en boostrap
  compararCategoria(o1: Categoria, o2: Categoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
