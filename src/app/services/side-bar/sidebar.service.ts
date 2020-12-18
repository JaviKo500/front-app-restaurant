import { Injectable } from '@angular/core';
import { SideBarModel } from '../../models/side-bar/sidebar.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: SideBarModel [] = [{
    title: 'Productos',
    icon: '',
    subMenu: [
      { title: 'Lista de productos', url: 'productos' },
      { title: 'Agregar producto', url: 'crearpro' },
      { title: 'Categorias', url: 'categorias' }
    ]
  }];
  constructor() { }
}
