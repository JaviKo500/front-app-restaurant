import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

<<<<<<< HEAD

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

=======
>>>>>>> 5e5d57f42f65b455fd5b93aaad1e81f72b8fed47
// modulos creados
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

<<<<<<< HEAD


=======
//importacion de conexion http
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaService } from './services/categoria/categoria.service';
>>>>>>> 5e5d57f42f65b455fd5b93aaad1e81f72b8fed47

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
