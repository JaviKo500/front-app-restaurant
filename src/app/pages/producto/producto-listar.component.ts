import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/productos/producto';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent implements OnInit {
  listaProductos: Producto[] = [];
  producto: Producto = new Producto();
  constructor() {}

  ngOnInit(): void {}
}
