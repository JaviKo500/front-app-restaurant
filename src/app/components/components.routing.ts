import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';
import { ProductosComponent } from './menu-cliente/productos/productos.component';
import { HomeClienteComponent } from './menu-cliente/home-cliente/home-cliente.component';
import { FormularioClienteComponent } from './menu-cliente/formulario-cliente/formulario-cliente.component';
import { MesaComponent } from './menu-cliente/mesa/mesa.component';
const routes: Routes = [
  {
    path: 'cliente',
    component: MenuClienteComponent,
    children: [
        { path: '', component: HomeClienteComponent, },
        { path: ':id', component: ProductosComponent, },
        { path: 'formulario/registro', component: FormularioClienteComponent},
        { path: 'otra/mesa', component: MesaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule {}
