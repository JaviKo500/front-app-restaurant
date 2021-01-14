import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';

// ngbootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PreviewImgComponent } from './preview-img/preview-img.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { NavBarComponent } from './menu-cliente/nav-bar/nav-bar.component';
import { CarouselComponent } from './menu-cliente/carousel/carousel.component';
import { ProductosComponent } from './menu-cliente/productos/productos.component';
import { CategoriasClienteComponent } from './menu-cliente/categorias-cliente/categorias-cliente.component';
import { ClienteSidebarComponent } from './menu-cliente/cliente-sidebar/cliente-sidebar.component';
import { HomeClienteComponent } from './menu-cliente/home-cliente/home-cliente.component';



@NgModule({
  declarations: [PreviewImgComponent, PaginatorComponent, SpinnerComponent, MenuClienteComponent, NavBarComponent, CarouselComponent, ProductosComponent, CategoriasClienteComponent, ClienteSidebarComponent, HomeClienteComponent],
  exports: [
    PreviewImgComponent,
    PaginatorComponent,
    SpinnerComponent,
    CategoriasClienteComponent
   ],
  imports: [
    CommonModule,
    NgbModule,
    SharedModule,
    RouterModule
  ]
})
export class ComponentsModule { }
