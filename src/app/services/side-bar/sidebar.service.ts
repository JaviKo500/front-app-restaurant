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
      title: 'Ventas',
      icon: 'fas fa-file-invoice-dollar',
      url: '',
      subMenu: [
        {
          title: 'Realizar venta',
          icon: 'fas fa-shopping-cart',
          url: 'venta/:id',
        },
      ],
    },
    {
      title: 'Caja',
      icon: 'fas fa-cash-register',
      url: '',
      subMenu: [
        {
          title: 'Abrir Arqueo',
          icon: 'fas fa-dolly-flatbed',
          url: 'creararqueo',
        },
        {
          title: 'Listar Arqueos',
          icon: 'fas fa-list-ul',
          url: 'arqueos/page/:page',
        },
        {
          title: 'Listar Movimientos Caja',
          icon: 'fas fa-luggage-cart',
          url: 'movimientos',
        },
        {
          title: 'Crear Caja',
          icon: 'fas fa-briefcase',
          url: 'crearcaja/page/:page',
        },
      ],
    },
    {
      title: 'Gestión de usuarios',
      icon: 'fas fa-users',
      url: '',
      subMenu: [
        {
          title: 'Lista de usuarios ',
          icon: 'fas fa-address-book',
          url: 'usuarios/page/0',
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
      title: 'Combos / Especiales',
      icon: 'fas fa-gifts ',
      url: '',
      subMenu: [
        {
          title: 'Lista combos',
          icon: 'fas fa-boxes',
          url: 'combos/page/0',
        },
        {
          title: 'Crear combo o promoción',
          icon: 'fas fa-hamburger',
          url: 'crearcombo/:id',
        },
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
