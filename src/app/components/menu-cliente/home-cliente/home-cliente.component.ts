import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../../models/productos/categoria';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {
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
      imagen: 'assets/icons/comida.jpg',
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
      imagen: 'assets/icons/comida.jpg',
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
      imagen: 'assets/icons/comida.jpg',
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
