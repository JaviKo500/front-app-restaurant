import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './producto/formulario/formulario.component';
import { ListarComponent } from './producto/listar/listar.component';



@NgModule({
  declarations: [FormularioComponent, ListarComponent],
  exports: [
    FormularioComponent,
    ListarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
