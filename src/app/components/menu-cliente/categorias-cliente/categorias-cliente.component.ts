import { Component, Input, OnInit } from '@angular/core';
import { BASE_URL } from 'src/environments/configurations';

// ngbootstrap

// models
import { Categoria } from '../../../models/productos/categoria';

@Component({
  selector: 'app-categorias-cliente',
  templateUrl: './categorias-cliente.component.html',
  styleUrls: ['./categorias-cliente.component.css'],
})
export class CategoriasClienteComponent implements OnInit {
  @Input() categorias: Categoria[] = [];
  categoria: Categoria;
  api = BASE_URL;

  constructor() {}

  ngOnInit(): void {}
}
