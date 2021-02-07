import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { Categoria } from '../../../models/productos/categoria';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css'],
})
export class HomeClienteComponent implements OnInit {
  categorias: Categoria[] = [];
  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias(): void {
    this.categoriaService.ListaCategorias().subscribe((res) => {
      console.log(res);
      this.categorias = res;
    });
  }
}
