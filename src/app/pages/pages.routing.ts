import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { ProductoListarComponent } from './producto/producto-listar.component';
import { CategoriaListarComponent } from './categoria/categoria-listar.component';
import { MesasComponent } from './configuraciones/mesas/mesas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { ConfiguracionEmpresaComponent } from './configuraciones/configuracion-empresa/configuracion-empresa.component';
import { FormularioComboComponent } from './producto/formulario-combo/formulario-combo.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { title: 'Inicio', subTitle: 'Bienvenido' },
      },
      {
        path: 'crearpro/:id',
        component: FormularioComponent,
        data: { title: 'Productos', subTitle: 'Administrar producto' },
      },
      {
        path: 'crearcombo/:id',
        component: FormularioComboComponent,
        data: { title: 'Especiales', subTitle: 'Crea tus propios combos o promociones' },
      },
      {
        path: 'usuarios/page/0',
        component: UsuariosComponent,
        data: { title: 'Usuarios', subTitle: 'Administrar tus usuarios' },
      },
      {
        path: 'crearusu/:id',
        component: FormularioUsuarioComponent,
        data: { title: 'Usuarios', subTitle: 'Agrega usuarios' },
      },
      {
        path: 'productos/page/:page',
        component: ProductoListarComponent,
        data: { title: 'Productos', subTitle: 'Lista de productos' },
      },
      {
        path: 'categorias/page/:page',
        component: CategoriaListarComponent,
        data: { title: 'Categorías', subTitle: 'Administra tus categorías' },
      },
      {
        path: 'mesas/page/:page',
        component: MesasComponent,
        data: { title: 'Mesas', subTitle: 'Administrar mesas del Restaurante' },
      },
      {
        path: 'empresa',
        component: ConfiguracionEmpresaComponent,
        data: {
          title: 'Empresa ',
          subTitle: 'Configura los datos de tu empresa',
        },
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        data: {
          title: 'Pedidos',
          subTitle: 'Revisa los pedidos de tus clientes',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
