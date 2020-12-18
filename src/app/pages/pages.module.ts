import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modulos creados
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { CategoriaListarComponent } from './categoria/categoria-listar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PagesComponent, DashboardComponent, FormularioComponent, CategoriaListarComponent ],
  exports: [
    DashboardComponent
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
