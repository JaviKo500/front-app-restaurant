import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/productos/producto';
import { ProductoService } from 'src/app/services/productos/producto.service';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent implements OnInit {
  listaProductos: Producto[] = [];
  producto: Producto = new Producto();
  constructor(private productoserService: ProductoService) {}

  ngOnInit(): void {}

  

}
