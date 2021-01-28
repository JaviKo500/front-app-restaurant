import { Injectable } from '@angular/core';
import { SideBarModel } from '../../models/side-bar/sidebar.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: SideBarModel[] = [
    {
      title: 'Inicio',
      icon: 'fas fa-home',
      url: '/',
      subMenu: [],
    },
    {
      title: 'Pedidos',
      icon: 'fas fa-th-list',
      url: 'pedidos',
      subMenu: [],
    },
    {
      title: 'Gestión de usuarios',
      icon: 'fas fa-users',
      url: '',
      subMenu: [
        {
          title: 'Lista de usuarios ',
          icon: 'fas fa-address-book',
          url: 'usuarios',
        },
        {
          title: 'Agregar usuarios ',
          icon: 'fas fa-user-plus',
          url: 'crearusu/:id',
        },
      ],
    },
    {
      title: 'Productos',
      icon: 'fas fa-box',
      url: '',
      subMenu: [
        {
          title: 'Lista de productos',
          icon: 'fas fa-list-alt',
          url: 'productos/page/0',
        },
        {
          title: 'Agregar producto',
          icon: 'fa fa-plus-circle',
          url: 'crearpro/:id',
        },
        { title: 'Categorias', icon: 'fa fa-tags', url: 'categorias/page/0' },
      ],
    },
    {
      title: 'Configuraciones',
      icon: 'fas fa-cogs',
      url: '',
      subMenu: [
        { title: 'Configuración empresa', icon: 'fas fa-cog', url: 'empresa' },
        { title: 'Mesas', icon: 'fas fa-chair', url: 'mesas/page/0' },
      ],
    },
  ];
  constructor() {}
}
