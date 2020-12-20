import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ngbootstrap

import { PreviewImgComponent } from './preview-img/preview-img.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MenuClienteComponent } from './menu-cliente/menu-cliente.component';



@NgModule({
  declarations: [PreviewImgComponent, PaginatorComponent, SpinnerComponent, MenuClienteComponent],
  exports: [
    PreviewImgComponent,
    PaginatorComponent,
    SpinnerComponent
   ],
  imports: [
    CommonModule,
  ]
})
export class ComponentsModule { }
