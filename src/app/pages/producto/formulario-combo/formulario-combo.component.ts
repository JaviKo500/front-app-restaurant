import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, mergeMap } from 'rxjs/operators';

import swal from 'sweetalert2';

import { PreviewImgComponent } from '../../../components/preview-img/preview-img.component';
import { Producto } from '../../../models/productos/producto';
import { ProductoService } from '../../../services/productos/producto.service';
import { API_PROD, BASE_URL } from '../../../../environments/configurations';
import { Combo } from 'src/app/models/productos/combo';
import { ProductoCombo } from 'src/app/models/productos/producto-combo';
import { ComboService } from 'src/app/services/combo/combo.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
@Component({
  selector: 'app-formulario-combo',
  templateUrl: './formulario-combo.component.html',
  styleUrls: ['./formulario-combo.component.css'],
})
export class FormularioComboComponent implements OnInit {
  @ViewChild('img_url', { static: false }) img_url: PreviewImgComponent;
  imagenProducto: File;
  combo: Combo = new Combo();
  api: any = BASE_URL;
  constructor(
    private productoService: ProductoService,
    private comboService: ComboService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {}
  onChange(event): void {
    this.imagenProducto = event.target.files[0];
    if (this.imagenProducto.type.indexOf('image') < 0) {
      this.imagenProducto = null;
      swal.fire('Error', 'Solo imágenes', 'error');
    }
  }

  //registrar combo
  registrarCombo(): void {
    if (this.camposLlenos()) {
      if (this.imagenProducto) {
        this.comboService.registrarCombo(this.combo).subscribe((res) => {
          console.log(res);
        });
      } else {
        swal.fire('Observación', 'Debe seleccionar una imágen.', 'warning');
      }
    }
  }

  //campos completos
  camposLlenos(): boolean {
    let band = false;
    let c = this.combo;
    if (!c.categoria || c.itemscombo.length == 0 || c.precio == 0) {
      swal.fire('Observación', 'Completar los campos', 'warning');
    } else {
      band = true;
    }
    return band;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      distinctUntilChanged(),
      mergeMap((term) =>
        term ? this.productoService.getProductoByTerm(term) : []
      )
    );
  // para mostrar datos en la lista del input
  formatter = (producto: Producto) =>
    producto.nombre +
    ' -> $' +
    producto.precio +
    ' -> ' +
    producto.categoria.nombre;
  data: Producto[] = [];
  // para cuando se seleciona un item
  seleccionarProducto = (producto: Producto) => {
    let itemscombo: ProductoCombo = new ProductoCombo();
    itemscombo.producto = producto;
    //verificar si existe sino hacer un nuevo push
    if (!this.existeProducto(producto.id)) {
      this.combo.itemscombo.push(itemscombo);
    } else {
      //si existe solo suma la cantidad
      this.combo.itemscombo = this.combo.itemscombo.map(
        (item: ProductoCombo) => {
          if (item.producto.id == producto.id) {
            item.cantidad++;
          }
          return item;
        }
      );
    }
    return '';
  };

  existeProducto(id: number): boolean {
    let band = false;
    this.combo.itemscombo.forEach((item: ProductoCombo) => {
      if (item.producto.id === id) {
        band = true;
      }
    });
    return band;
  }

  eliminarProductoArray(id: number) {
    this.combo.itemscombo = this.combo.itemscombo.filter(
      (item: ProductoCombo) => id !== item.producto.id
    );
  }

  actualizarCantidad$(id: number, event: any) {
    let cantidad: number = event.target.value as number;
    if (cantidad <= 0) {
      return this.eliminarProductoArray(id);
    }

    this.combo.itemscombo = this.combo.itemscombo.map((item: ProductoCombo) => {
      if (item.producto.id === id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  cargarImagenProducto(id: number): void {
    this.categoriaService
      .saveImgCategoria_Producto(this.imagenProducto, id, API_PROD, 'combo')
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
          this.combo = new Combo();
          this.img_url.vaciarUrl();
        },
        (error) => {
          this.productoService
            .deleteProductoDefinitive(id)
            .subscribe((res) => {});
          console.log('error');
          console.log(error);
          this.imagenProducto = null;
        }
      );
  }
}
