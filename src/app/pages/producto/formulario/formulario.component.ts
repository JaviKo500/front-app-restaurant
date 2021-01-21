import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  pathImg: string;
  imagenProducto: File;
  producto: Producto = new Producto();
  listaCategorias: Categoria[] = [];
  img_url: any[];
  bandera_imagen = false;
  constructor(
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ListarCategorias();
    this.activatedRoute.paramMap.subscribe((params) => {
      let id: number = +params.get('id');
      if (id) {
        this.buscarproducto(id);
      }
    });
  }

  buscarproducto(id: number) {
    swal.showLoading();
    this.productoService.ObtenerProducto(id).subscribe((response) => {
      console.log(response);
      this.producto = response;
      this.pathImg = this.producto.imagen;
      console.log(this.pathImg);
      swal.close();
    });
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
  //metodo para actualizar un producto
  actualizaProducto(): void {
    //validamos campos
    if (this.CamposCompletos()) {
      if (this.imagenProducto) {
        this.productoService.updateProduct(this.producto).subscribe((res) => {
          console.log('Producto actualizado');
          console.log(res);
        }),
          (error) => {
            console.log(error.mensaje);
          };
      } else {
        if (!this.producto.imagen) {
          //si no existe un nombre de imagen no se puede actualizar.
          swal.fire('Advertencia', 'Debe seleccionar su imagen', 'warning');
        } else {
          this.productoService.updateProduct(this.producto).subscribe(
            (response) => {
              console.log('Producto actualizado');
              console.log(response);
            },
            (error) => {
              console.log(error.mensaje);
            }
          );
        }
      }
    } else {
      swal.fire('Observación', 'Debe llenar los campos.', 'warning');
    }
  }
  //temina metodo de actualizaProducto
  cargarImagenProducto(id: number): void {
    this.categoriaService
      .saveImgCategoria_Producto(this.imagenProducto, id, API_PROD)
      .subscribe(
        (res) => {
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto guardado correctamente',
            showConfirmButton: false,
            timer: 1000,
          });
          console.log('guardado');
          this.imagenProducto = null;
          this.img_url = null;
          this.producto = new Producto();
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
