import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// modulos creados
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { CategoriaListarComponent } from './categoria/categoria-listar.component';
import { ProductoListarComponent } from './producto/producto-listar.component';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, FormularioComponent, CategoriaListarComponent, ProductoListarComponent ],
  exports: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    FormsModule
  ]
})
export class PagesModule { }
