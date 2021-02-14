import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from '../../../models/productos/categoria';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
})
export class HomeClienteComponent implements OnInit {
  categorias: Categoria[] = [];
  constructor(
    private categoriaService: CategoriaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCategorias();
    this.activatedRoute.paramMap.subscribe((params) => {
      let id_mesa = +params.get('id_mesa');
      if (id_mesa as Number) {
        console.log('si');
        //pasar el valor al nav bar para el pedido
      } else {
        this.router.navigate(['/cliente/mesas']);
        console.log('no');
      }
    });
  }

  listarCategorias(): void {
    this.categoriaService.ListaCategorias().subscribe((res) => {
      console.log(res);
      this.categorias = res;
    });
  }
}
