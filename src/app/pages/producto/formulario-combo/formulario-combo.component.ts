import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, flatMap, map, mergeMap, filter } from 'rxjs/operators';
import { Producto } from '../../../models/productos/producto';
import { ProductoService } from '../../../services/productos/producto.service';
import { BASE_URL } from '../../../../environments/configurations';
@Component({
  selector: 'app-formulario-combo',
  templateUrl: './formulario-combo.component.html',
  styleUrls: ['./formulario-combo.component.css']
})
export class FormularioComboComponent implements OnInit {
  api: any = BASE_URL;
  arrayDePrueba: Producto [] = [];
  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {

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
