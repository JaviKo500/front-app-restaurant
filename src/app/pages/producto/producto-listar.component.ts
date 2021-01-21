import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/productos/producto';
import { ProductoService } from 'src/app/services/productos/producto.service';
import { BASE_URL } from 'src/environments/configurations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto-listar',
  templateUrl: './producto-listar.component.html',
  styleUrls: ['./producto-listar.component.css'],
})
export class ProductoListarComponent implements OnInit {
  listaProductos: Producto[] = [
    {
      id:1,
      nombre: 'coda',
      precio: 2.5,
      descripcion: 'bebida',
      categoria: {nombre:'bebida',id: 1,estado:true,imagen:'/aapp'},
      imagen:'sasa'
    }
  ];
  //variable contenedor de los datos de la paginacion de productos
  paginador: any;
  path:any='/dashboard/productos/page';
  producto: Producto = new Producto();
  api: any = BASE_URL;
  constructor(
    private productoserService: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listarProductospage();
  }
  listarProductos(): void {
    this.productoserService.ObtenerProductos().subscribe((res) => {
      this.listaProductos = res;
      console.log('lista');
      console.log(res);
    });
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
}
