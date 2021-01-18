import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/productos/categoria';
import { Producto } from 'src/app/models/productos/producto';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { API_PROD } from 'src/environments/configurations';
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
  img_url: any[];
  bandera_imagen = false;
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.ListarCategorias();
  }

  onChange(event): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.img_url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.bandera_imagen = true;
    }
    this.imagenProducto = event.target.files[0];
    if (this.imagenProducto.type.indexOf('image') < 0) {
      this.imagenProducto = null;
      this.bandera_imagen = false;
      swal.fire('Error', 'Solo imágenes', 'error');
    }
  }

  RegistrarProducto(): void {
    if (this.CamposCompletos()) {
      if (this.imagenProducto) {
        this.productoService
          .RegistarProducto(this.producto)
          .subscribe((response) => {
            this.cargarImagenProducto(response.id);
          });
      } else {
        swal.fire('Observación', 'Debe seleccionar una imágen.', 'warning');
      }
    } else {
      swal.fire('Observación', 'Debe llenar los campos.', 'warning');
    }
  }

  cargarImagenProducto(id: number): void {
    this.categoriaService
      .saveImgCategoria_Producto(this.imagenProducto, id, API_PROD)
      .subscribe(
        (res) => {
          console.log('guardado');
          this.imagenProducto = null;
          this.img_url = null;
        },
        (error) => {
          this.productoService.deleteProducto(id).subscribe((res) => {});
          console.log('error');
          console.log(error);
          this.imagenProducto = null;
        }
      );
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
