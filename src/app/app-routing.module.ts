import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';
import { MenuClienteComponent } from './components/menu-cliente/menu-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'cliente', component: MenuClienteComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
