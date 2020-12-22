import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from 'src/environments/configurations';
import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs';
import { Producto } from 'src/app/models/productos/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}
  private url: string = BASE_URL;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  RegistarProducto(producto: Producto): Observable<Producto> {
    return this.http
      .post(this.url, producto, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response),
        catchError((e) => {
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
  }
}
