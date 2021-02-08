import { Component, HostListener, OnInit } from '@angular/core';
import { Categoria } from '../../models/productos/categoria';
import { element } from 'protractor';
import { translate } from '@angular/localize/src/utils';
import { CategoriaService } from '../../services/categoria/categoria.service';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {
  categorias: Categoria [] = []
  constructor( private categoriaService: CategoriaService ) { }

  ngOnInit(): void {
    this.categoriaService.ListaCategorias().subscribe( categorias => {
      this.categorias = categorias;
    } );
  }

}
