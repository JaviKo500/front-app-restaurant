import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { ProductosComponent } from './menu-cliente/productos/productos.component';
import { HomeClienteComponent } from './menu-cliente/home-cliente/home-cliente.component';
const routes: Routes = [
  {
    path: 'cliente',
    component: MenuClienteComponent,
    children: [
        { path: '', component: HomeClienteComponent, },
        { path: ':id', component: ProductosComponent, },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
