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
      { title: 'Listar productos', url: '/' },
      { title: 'Crear productos', url: 'crear' }
    ]
  }];
  constructor() { }
}
