import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { ProductoListarComponent } from './producto/producto-listar.component';
import { CategoriaListarComponent } from './categoria/categoria-listar.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Inicio', subTitle: 'Bienvenido'  } },
      { path: 'crearpro', component: FormularioComponent, data: { title: 'Productos', subTitle: 'Administrar producto' } },
      { path: 'productos', component: ProductoListarComponent },
      { path: 'categorias', component: CategoriaListarComponent, data: { title: 'Categorías', subTitle: 'Administra tus categorías' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
