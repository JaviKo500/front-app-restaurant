import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ngbootstrap

import { PreviewImgComponent } from './preview-img/preview-img.component';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
  declarations: [PreviewImgComponent, PaginatorComponent],
  exports: [
    PreviewImgComponent,
    PaginatorComponent
   ],
  imports: [
    CommonModule,
  ]
})
export class ComponentsModule { }
