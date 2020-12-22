import { Component, OnInit } from '@angular/core';

// Para crear modales del ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { BASE_URL, API_CATE } from 'src/environments/configurations';
import swal from 'sweetalert2';
import { Categoria } from '../../models/productos/categoria';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css'],
})
export class CategoriaListarComponent implements OnInit {
  categoria = new Categoria();
  api: any = BASE_URL;
  listaCategorias: Categoria[] = [];
  img_url: any[];
  bandera_imagen = false;
  imagenCategoria: File = null;
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
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
    this.imagenCategoria = event.target.files[0];
    if (this.imagenCategoria.type.indexOf('image') < 0) {
      this.imagenCategoria = null;
      this.bandera_imagen = false;
      swal.fire('Error', 'Solo imágenes', 'error');
    }
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
    //validar los campos de la categoria
    if (this.CamposLlenos()) {
      if (this.imagenCategoria) {
        this.categoriaService
          .ActualizarCategoria(this.categoria)
          .subscribe((response) => {
            this.cargarImagenCategoria(Number(response.id));
            console.log(response);
            this.CerrarAllModals();
            this.listarCategorias();
          });
        //si no existe un archivo o el archivo de imagen es erroneo se verifica que exista un nombre de imagenCategoria
        //en el backend y si existe se pasa a actualizar la categoria a excepcion de la imagen
      } else {
        if (!this.categoria.imagen) {
          //si no existe un nombre de imagen no se puede actualizar.
          swal.fire('Advertencia', 'Debe seleccionar su imagen', 'warning');
        } else {
          this.categoriaService.ActualizarCategoria(this.categoria).subscribe(
            (response) => {
              console.log('Categoria actualizado');
              this.listarCategorias();
              this.CerrarAllModals();
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

  CerrarModal(): void {
    this.modalReference.close();
  }

  CerrarAllModals() {
    this.modalService.dismissAll();
  }

  saveCategoria(): void {
    if (this.CamposLlenos()) {
      if (this.imagenCategoria) {
        //servicio para registrar las categorias
        this.categoria.estado = true;
        this.categoriaService
          .RegistarCategoria(this.categoria)
          .subscribe((res) => {
            this.cargarImagenCategoria(Number(res.id));
            console.log('categoria id: ' + res.id);
          });
      } else {
        swal.fire('Observación', 'Debe seleccionar uma imágen', 'warning');
      }
    } else {
      swal.fire('Observación', 'Debe llenar los campos.', 'warning');
    }
  }

  cargarImagenCategoria(id: number): void {
    this.categoriaService
      .saveImgCategoria_Producto(this.imagenCategoria, id, API_CATE)
      .subscribe(
        (res) => {
          console.log('guardado');
          this.imagenCategoria = null;
          this.img_url = null;
          this.listarCategorias();
          this.CerrarAllModals();
        },
        (error) => {
          this.categoriaService.deleteCategoria(id).subscribe((res) => {});
          console.log('error');
          console.log(error);
          this.imagenCategoria = null;
        }
      );
  }

  CamposLlenos(): boolean {
    let band = false;
    let cat = this.categoria;
    if (cat.nombre.length > 2) {
      band = true;
    }
    return band;
  }
}
