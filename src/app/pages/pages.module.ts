import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// modulos creados
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { CategoriaListarComponent } from './categoria/categoria-listar.component';
import { ProductoListarComponent } from './producto/producto-listar.component';
import { MesasComponent } from './configuraciones/mesas/mesas.component';
import { ConfiguracionEmpresaComponent } from './configuraciones/configuracion-empresa/configuracion-empresa.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { VentaComponent } from './venta/venta.component';
import { FormularioComboComponent } from './producto/formulario-combo/formulario-combo.component';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    FormularioComponent,
    CategoriaListarComponent,
    ProductoListarComponent,
    MesasComponent,
    ConfiguracionEmpresaComponent,
    PedidosComponent,
    UsuariosComponent,
    FormularioUsuarioComponent,
    VentaComponent,
    FormularioComboComponent
  ],
  exports: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class PagesModule { }
