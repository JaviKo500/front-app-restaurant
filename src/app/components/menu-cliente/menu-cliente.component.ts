import { Component, HostListener, OnInit } from '@angular/core';
import { Categoria } from '../../models/productos/categoria';
import { element } from 'protractor';
import { translate } from '@angular/localize/src/utils';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {
  categorias: Categoria [] = [
    {
      id: 1,
      estado: true,
      imagen: 'assets/icons/comida.jpg',
      nombre: 'Jugos'
    },
    {
      id: 2,
      estado: true,
      imagen: 'assets/icons/user-c2.png',
      nombre: 'Arroz'
    },
    {
      id: 6,
      estado: true,
      imagen: 'assets/icons/comida.jpg',
      nombre: 'Agua'
    },
    {
      id: 3,
      estado: true,
      imagen: 'assets/icons/user-c2.png',
      nombre: 'Colas'
    },
    {
      id: 4,
      estado: true,
      imagen: 'assets/icons/comida.jpg',
      nombre: 'Encebollado'
    },
    {
      id: 5,
      estado: true,
      imagen: 'assets/icons/user-c2.png',
      nombre: 'Ceviche'
    },
    {
      id: 5,
      estado: true,
      imagen: 'assets/icons/comida.jpg',
      nombre: 'Ceviche'
    },
    {
      id: 5,
      estado: true,
      imagen: 'assets/icons/comida.jpg',
      nombre: 'Ceviche'
    }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
