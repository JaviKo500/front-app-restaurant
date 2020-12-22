import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/productos/categoria';
import { Producto } from 'src/app/models/productos/producto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  imagenProducto: File;
  producto: Producto = new Producto();
  listaCategorias: Categoria[] = [];
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.ListarCategorias();
  }

  RegistrarProducto(): void {
    if (this.CamposCompletos()) {
      if (this.imagenProducto) {
        this.productoService
          .RegistarProducto(this.producto)
          .subscribe((response) => {
            console.log(response);
          });
      } else {
        swal.fire('Observación', 'Debe seleccionar uma imágen.', 'warning');
      }
    } else {
      swal.fire('Observación', 'Debe llenar los campos.', 'warning');
    }
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

  CamposCompletos(): boolean {
    let band = false;
    if (
      this.producto.categoria != undefined &&
      this.producto.descripcion.length > 2 &&
      this.producto.nombre.length > 2 &&
      this.producto.precio > 0
    ) {
      band = true;
    }
    return band;
  }
}
