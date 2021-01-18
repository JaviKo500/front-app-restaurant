import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/productos/producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { BASE_URL } from 'src/environments/configurations';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent implements OnInit {
  listaProductos: Producto[] = [];
  producto: Producto = new Producto();
  api: any = BASE_URL;
  constructor(private productoserService: ProductoService) {}

  ngOnInit(): void {
    this.listarProductos();
  }
  listarProductos(): void {
    this.productoserService.ObtenerProductos().subscribe((res) => {
      this.listaProductos = res;
      console.log('lista');
      console.log(res);   
    });
  }
}
