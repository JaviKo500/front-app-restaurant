import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, mergeMap,  } from 'rxjs/operators';

import swal from 'sweetalert2';

import { PreviewImgComponent } from '../../../components/preview-img/preview-img.component';
import { Producto } from '../../../models/productos/producto';
import { ProductoService } from '../../../services/productos/producto.service';
import { BASE_URL } from '../../../../environments/configurations';
@Component({
  selector: 'app-formulario-combo',
  templateUrl: './formulario-combo.component.html',
  styleUrls: ['./formulario-combo.component.css']
})
export class FormularioComboComponent implements OnInit {
  @ViewChild( 'img_url' , { static: false }) img_url: PreviewImgComponent;
  imagenProducto: File;
  api: any = BASE_URL;
  arrayDePrueba: Producto [] = [];
  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    
    
  }
  onChange(event): void {
    this.imagenProducto = event.target.files[0];
    if (this.imagenProducto.type.indexOf('image') < 0) {
      this.imagenProducto = null;
      swal.fire('Error', 'Solo imágenes', 'error');
    }    
  }
  search = (text$: Observable<string>) => text$.pipe(
    distinctUntilChanged(),
    mergeMap(term => term ? this.productoService.getProductoByTerm(term):[])
  );
  // para mostrar datos en la lista del input
  formatter = (producto: Producto) => producto.nombre;
   data: Producto [] = [];
   // para cuando se seleciona un item
  seleccionarProducto = (producto: Producto) => {
    if (this.arrayDePrueba.length > 0){
      this.arrayDePrueba = this.arrayDePrueba.filter( (item: Producto) => item.id !== producto.id );
    }
    this.arrayDePrueba.push(producto);
    return '';
  }

  eliminarProductoArray = ( id ) => {
    this.arrayDePrueba = this.arrayDePrueba.filter( (item: Producto) => item.id !== id );
    console.log(this.arrayDePrueba);
    
  }
  
}
