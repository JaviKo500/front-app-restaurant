import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Para crear modales del ng boostrap
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { BASE_URL, API_CATE } from 'src/environments/configurations';
import swal from 'sweetalert2';
import { Categoria } from '../../models/productos/categoria';
import { TipoCategoria } from 'src/app/models/productos/tipo-categoria';
import { ComboService } from 'src/app/services/combo/combo.service';

@Component({
  selector: 'app-categoria-listar',
  templateUrl: './categoria-listar.component.html',
  styleUrls: ['./categoria-listar.component.css'],
})
export class CategoriaListarComponent implements OnInit {
  categoria = new Categoria();
  //datos para pagnacion
  paginador: any;
  path: any = '/dashboard/categorias/page';
  //termina datos paginacion
  listaTipoCategorias: TipoCategoria[] = [];
  api: any = BASE_URL;
  listaCategorias: Categoria[] = [];
  imagenCategoria: File = null;
  pathImg: string;
  modalReference: NgbModalRef;
  constructor(
    private modalService: NgbModal,
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarCategoriaspageable();
    this.listarTiposCategorias();
  }

  onChange(event): void {
    this.imagenCategoria = event.target.files[0];
    if (this.imagenCategoria.type.indexOf('image') < 0) {
      this.imagenCategoria = null;
      swal.fire('Error', 'Solo imágenes', 'error');
    }
  }

  //listar Tipo categorias
  listarTiposCategorias(): void {
    this.categoriaService.listarTiposCategorias().subscribe((res) => {
      this.listaTipoCategorias = res;
      console.log(res);
    });
  }

  private listarCategoriaspageable(): void {
    //listar todas las categorias sin excepcion.
    console.log('Paginando.....');
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.categoriaService
        .ListaCategoriasPageable(page)
        .subscribe((categorias: any) => {
          this.listaCategorias = categorias.content;
          this.paginador = categorias;
        });
    });
  }

  openLg(content) {
    this.categoria = new Categoria();
    // vaciamos el path al crear una nueva categoria
    this.pathImg = null;
    this.modalReference = this.modalService.open(content);
  }
  //abrimos modal con los datos de esa categoria
  abrirModalActualizarCate(MCategoria, cate: Categoria): void {
    if (cate) {
      this.openLg(MCategoria);
      //cargamos los datos
      this.categoria = cate;
      // path para cargar img en el componente preview
      this.pathImg = 'category/img/' + this.categoria.imagen;
    }
  }
  //metodo para registrar categoria
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
            this.listarCategoriaspageable();
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
              this.listarCategoriaspageable();
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

  cargarImagenCategoria(id: number): void {
    this.categoriaService
      .saveImgCategoria_Producto(this.imagenCategoria, id, API_CATE, '')
      .subscribe(
        (res) => {
          //alerta de mensaje al guardar el
          swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoría registrada correctamente',
            showConfirmButton: false,
            timer: 1000,
          });
          //termina alerta
          //restablecer variables
          console.log('guardado');
          this.imagenCategoria = null;
          this.listarCategoriaspageable();
          this.CerrarAllModals();
        },
        (error) => {
          this.categoriaService
            .deleteCategoriaDefinitive(id)
            .subscribe((res) => {});
          console.log('error');
          console.log(error);
          this.imagenCategoria = null;
        }
      );
  }

  CamposLlenos(): boolean {
    let band = false;
    let cat = this.categoria;
    if (cat.nombre.length > 2 && cat.tipo) {
      band = true;
    }
    return band;
  }

  //comparar-validar datos de tipo categorias en boostrap
  compararCategoria(o1: TipoCategoria, o2: TipoCategoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }

  eliminarCategoria(idCategoria: number): void {
    swal
      .fire({
        title: '¿Esta seguro de eliminar esta categoría?',
        text:
          'Sí ud elimina esta categoría es posible que pierda productos y recibos relacionadas con esta categoría.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar de todas formas',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.categoriaService
            .deleteCategoria(idCategoria)
            .subscribe((res) => {
              this.listarCategoriaspageable();
              swal.fire('Borrado', res, 'success');
              console.log(res);
            });
        }
      });
  }
}
