import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// modulos creados
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

//importacion de conexion http
import { HttpClientModule } from '@angular/common/http';

import { CategoriaService } from './services/categoria/categoria.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    AuthModule,
    NgbModule,
  ],
  providers: [CategoriaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
