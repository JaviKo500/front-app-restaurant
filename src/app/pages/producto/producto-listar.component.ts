import { Component, OnInit } from '@angular/core';
import { ProductoModel } from '../../models/productos/producto.model';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css']
})
export class ProductoListarComponent implements OnInit {
  listaProductos: ProductoModel [] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
