import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { FormularioComboComponent } from './producto/formulario-combo/formulario-combo.component';
import { ListaCombosComponent } from './producto/lista-combos/lista-combos.component';
import { VentaComponent } from './ventas/venta/venta.component';
//qr code
import { QRCodeModule } from 'angularx-qrcode';
import { CrearCajaComponent } from './caja/crear-caja/crear-caja.component';
import { AbrirArqueCajaComponent } from './caja/abrir-arque-caja/abrir-arque-caja.component';
import { ListarArqueosComponent } from './caja/listar-arqueos/listar-arqueos.component';
import { ListarMovimientosCajaComponent } from './caja/listar-movimientos-caja/listar-movimientos-caja.component';

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
    FormularioComboComponent,
    ListaCombosComponent,
    VentaComponent,
    CrearCajaComponent,
    AbrirArqueCajaComponent,
    ListarArqueosComponent,
    ListarMovimientosCajaComponent,
  ],
  exports: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    FormsModule,
    NgbModule,
    QRCodeModule,
  ],
})
export class PagesModule {}
