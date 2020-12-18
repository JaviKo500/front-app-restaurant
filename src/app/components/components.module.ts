import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ngbootstrap

import { PreviewImgComponent } from './preview-img/preview-img.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
  declarations: [PreviewImgComponent, PaginatorComponent, SpinnerComponent],
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
