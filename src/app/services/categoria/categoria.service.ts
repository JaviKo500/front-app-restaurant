import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/environments/configurations';
import { catchError, map } from 'rxjs/operators';
import { Categoria } from 'src/app/models/productos/categoria';
import { Observable, throwError } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private url: string = BASE_URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  RegistarCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http
      .post(this.url + 'register/categoria', categoria, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }

  ListaCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url + 'get/categories');
  }
}
