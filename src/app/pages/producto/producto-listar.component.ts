import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/productos/producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { BASE_URL } from 'src/environments/configurations';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent implements OnInit {
  listaProductos: Producto[] = [];
  //variable contenedor de los datos de la paginacion de productos
  paginador: any;
  path: any = '/dashboard/productos/page';
  producto: Producto = new Producto();
  api: any = BASE_URL;
  constructor(
    private productoserService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarProductospage();
  }

  listarProductospage(): void {
    console.log('Paginando.....');
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.productoserService
        .ObtenerProductosPageable(page)
        .subscribe((res) => {
          this.listaProductos = res.content;
          console.log('lista');
          console.log(res.content);
          this.paginador = res;
        });
    });
  }
  eliminarProducto(id: number): void {
    console.log('eliminando prod....');
    swal
      .fire({
        title: '¿Esta seguro de eliminar este producto?',
        text:
          'Sí ud elimina este producto es posible que pierda recibos relacionadas con este producto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar de todas formas',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.productoserService.deleteProducto(id).subscribe((res) => {
            this.listarProductospage();
            swal.fire('Borrado', res, 'success');
            console.log(res);
          });
        }
      });
  }
}
